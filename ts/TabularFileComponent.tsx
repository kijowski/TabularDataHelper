import React = require("react");

interface FileProps {
  content : string
  delimeter : string
}
interface FileState {
  orderByColumn : number
  ascendingOrder : boolean
}

class FileComponent extends React.Component<FileProps,FileState> {
    state : FileState = {
      orderByColumn : -1,
      ascendingOrder : true
    }

    processRows = (rows:string[]) => {
      let rowComparer = (x,y) => {
        let firstItem = x[this.state.orderByColumn]
        let secondItem = y[this.state.orderByColumn]
        let direction = this.state.ascendingOrder?1:-1;
        if(typeof firstItem === 'undefined' && typeof secondItem === 'undefined'){
          return 0;
        }
        if(typeof firstItem === 'undefined'){
          return -1 * direction;
        }
        if(typeof secondItem === 'undefined'){
          return 1 * direction;
        }
        else{
          return firstItem.localeCompare(secondItem) * direction;
        }
      }

      let splittedRows = rows.filter(row => row.length > 0).map(row => row.split(this.props.delimeter))
      if (this.state.orderByColumn >= 0) {
        return splittedRows.sort((x,y) => rowComparer(x,y))
      }
      return splittedRows
    }

    sortCommand = (mouseEvent) => {
      if (this.state.orderByColumn === -1) {
        let newHeader = React.findDOMNode<HTMLTableHeaderCellElement>(this.refs[mouseEvent])
        newHeader.classList.add("ascending")
        this.setState({orderByColumn : mouseEvent, ascendingOrder : true})
      }
      else{
        let oldHeader = React.findDOMNode<HTMLTableHeaderCellElement>(this.refs[this.state.orderByColumn])
        let newHeader = React.findDOMNode<HTMLTableHeaderCellElement>(this.refs[mouseEvent])
        if (this.state.orderByColumn == mouseEvent) {
          if (this.state.ascendingOrder) {
            oldHeader.classList.remove("ascending")
            newHeader.classList.add("descending")
            this.setState({orderByColumn : mouseEvent, ascendingOrder : false})

          }
          else{
            oldHeader.classList.remove("ascending")
            oldHeader.classList.remove("descending")
            this.setState({orderByColumn : -1, ascendingOrder : false})
          }
        }
        else{
          oldHeader.classList.remove("ascending")
          oldHeader.classList.remove("descending")
          newHeader.classList.add("ascending")
          this.setState({orderByColumn : mouseEvent, ascendingOrder : true})
        }
      }
    }

    copyCommand = (rows,colNo) => {
      let text = ""
      for (let row of rows) {
        if (typeof row[colNo]!=='undefined') {
          text = text + row[colNo] + "\n";
        }
      }
      alert(text);
    }

    getHeaders = (rows) => {
      let maxLength = Math.max.apply(Math,rows.map((x) => x.length))
      let headers = []
      for (let row = 0; row < maxLength; row++) {
          headers.push(<th key={row} ref={row.toString()} >
          <small><a href={'#'} onClick={this.sortCommand.bind(null,row)}>sort</a>{' '}
          <a href={'#'} onClick={this.copyCommand.bind(null,rows,row)}>copy</a></small>
          </th>)
      }
      return headers;
    }

    render(){
      let rows = this.processRows(this.props.content.trim().split("\n"));
      let headers = this.getHeaders(rows)
      let tableStyle = {
        display : 'block',
        overflowX : 'auto'
      }
      return <div className="row">
              <table style={tableStyle}>
              <thead><tr>{headers}</tr></thead>
              <tbody>{rows.map((row, index) => <tr>{row.map((column, colIndex) => <td>{column}</td>)}</tr>)}</tbody>
             </table>
             </div>
    }
}

interface FileInputProps {
  callback : (content:string, delimeter:string) => void
}

class FileInput extends React.Component<FileInputProps,void> {
  update = () => {
    let newContent = React.findDOMNode<HTMLTextAreaElement>(this.refs['contentArea']).value;
    let newDelimeter = React.findDOMNode<HTMLSelectElement>(this.refs['delimeter']).value;
    this.props.callback(newContent, newDelimeter)
  }
  render(){
    return <div>
            <div className='two columns'>
              <label>Content</label>
              <textarea onChange={this.update} placeholder="Paste here..." ref='contentArea'/>
            </div>
            <div className='three columns'>
              <label>Delimeter</label>
              <select ref='delimeter' onChange={this.update}>
                <option value=",">Comma</option>
                <option value=" ">Space</option>
                <option value="\t">Tab</option>
                <option value=";">Colon</option>
                <option value="-">Hyphen</option>
              </select>
            </div>
          </div>
  }
}

interface WrapperState {
  content : string
  delimeter : string
}

class TabularDataWrapper extends React.Component<void, WrapperState>{
  state : WrapperState = {
    content :  "",
    delimeter : ","
  }

  private contentLoaded = (content:string, delimeter:string) => {
      let newState = {
      content : content,
      delimeter : delimeter
      }
      this.setState(newState)
  }

  render(){
    return <div>
            <div className='row'>
              <div className='six columns'>
              <h3>Tabular Data Helper</h3>
                <small>Small utility usefull for comparing tabular data extracted from different sources</small>
              </div>
              <FileInput callback={this.contentLoaded}/>
              </div>
              <div className='row'>
              <FileComponent content={this.state.content} delimeter={this.state.delimeter}/>
          </div>
          </div>
  }
}

export {TabularDataWrapper}
