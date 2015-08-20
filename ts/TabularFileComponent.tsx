import React = require("react");

interface RowProps {
  row : string[]
  key : string
}

class RowComponent extends React.Component<RowProps,void>{

  render() {
    return <tr>
      {this.props.row.map((column, index) => <td key={index}>{column}</td>)}
      </tr>
  }
}

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

    maxLength : number;
    rows : string[][];

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
      this.maxLength = Math.max.apply(Math,splittedRows.map((x) => x.length))
      if (this.state.orderByColumn >= 0) {
        return splittedRows.sort((x,y) => rowComparer(x,y))
      }
      return splittedRows
    }

    onHeaderClick = (mouseEvent) => {
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

    onDoubleClick = (colNo) => {
      let text = ""
      for (let row of this.rows) {
        if (typeof row[colNo]!=='undefined') {
          text = text + row[colNo] + "\n";
        }
      }
      //console.log(text)
      alert(text);

    }

    getHeaders = () => {
      let headers = []
      for (let row = 0; row < this.maxLength; row++) {
          headers.push(<th key={row} ref={row.toString()} >
          <small><a href={'#'} onClick={this.onHeaderClick.bind(null,row)}>sort</a>{' '}
          <a href={'#'} onClick={this.onDoubleClick.bind(null,row)}>copy</a></small>
          </th>)
      }
      return headers;
    }

    render(){
      this.rows = this.processRows(this.props.content.trim().split("\n"));
      let headers = this.getHeaders()
      let tableStyle = {
        display : 'block',
        overflowX : 'auto'
      }
      return <div className="row">
              <table style={tableStyle}>
              <thead><tr>{headers}</tr></thead>
              <tbody>{this.rows.map((row, index) => <RowComponent key={index.toString()} row={row}/>)}</tbody>
             </table>
             </div>
    }
}

interface FileInputProps {
  callback : (content:string, delimeter:string) => void
}

class FileInput extends React.Component<FileInputProps,void> {
  onClick = () => {
    let newContent = React.findDOMNode<HTMLTextAreaElement>(this.refs['contentArea']).value;
    let newDelimeter = React.findDOMNode<HTMLSelectElement>(this.refs['delimeter']).value;
    this.props.callback(newContent, newDelimeter)
  }
  render(){
    return <div className="row">
            <div className='six columns'>
            <h3>Tabular Data Helper</h3>
              <small>Small utility usefull for comparing tabular data extracted from different sources</small>
              </div>
            <div className='two columns'>
              <label>Content</label>
              <textarea onChange={this.onClick} rows={1} placeholder="Paste here..." ref='contentArea'/>
            </div>
            <div className='three columns'>
              <label>Delimeter</label>
              <select id="test" ref='delimeter' onChange={this.onClick}>
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
  private copyState = () =>{
    let newState :WrapperState = {
      content: this.state.content,
      delimeter: this.state.delimeter
    }
    return newState
  }

  private contentLoaded = (content:string, delimeter:string) => {
      let newState = this.copyState()
      newState.content = content;
      newState.delimeter = delimeter;
      this.setState(newState)
  }

    render(){
      return <div>
                <FileInput callback={this.contentLoaded}/>
                <FileComponent content={this.state.content} delimeter={this.state.delimeter}/>
            </div>
    }
}

export {TabularDataWrapper}
