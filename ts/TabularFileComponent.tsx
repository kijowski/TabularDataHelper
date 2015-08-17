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
    getDifferences = (other:FileComponent) => {

    }
    maxLength : number;

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

      let splittedRows = rows.map(row => row.split(this.props.delimeter))
      this.maxLength = Math.max.apply(Math,splittedRows.map((x) => x.length))
      if (this.state.orderByColumn >= 0) {
        return splittedRows.sort((x,y) => rowComparer(x,y))
      }
      return splittedRows
    }

    onHeaderClick = (mouseEvent) => {
      let newDirection = this.state.orderByColumn == mouseEvent?!this.state.ascendingOrder:true;
      this.setState({orderByColumn : mouseEvent, ascendingOrder : newDirection})
    }

    render(){
      let rows = this.processRows(this.props.content.split("\n"));
      let headers =[];
      for (let i = 0; i < this.maxLength; i++) {
        headers[i] = i;
      }
      return <table>
              <thead><tr>{headers.map((row) => <td key={row} onClick={this.onHeaderClick.bind(null,row)}>Column {row}</td>)}</tr></thead>
              <tbody>{rows.map((row, index) => <RowComponent key={index.toString()} row={row}/>)}</tbody>
             </table>
    }
}

interface FileInputProps {
  callback : (content:string) => void
}

class FileInput extends React.Component<FileInputProps,void> {
  onClick = () => {
    let newContent = React.findDOMNode<HTMLTextAreaElement>(this.refs['contentArea']).value;
    this.props.callback(newContent)
  }
  render(){
    return <div>
            <textarea placeholder="Content..." ref='contentArea'/>
            <input type="button" value='Load' onClick={this.onClick}/>
          </div>
  }
}

interface WrapperProps {

}

interface WrapperState {
  content : string
  delimeter : string
}

class TabularDataWrapper extends React.Component<WrapperProps, WrapperState>{
  state : WrapperState = {
    content :  "First, row\nSecond,row,with,more,columns\nAnd,third,row",
    delimeter : ","
  }

  private contentLoaded = (content:string) => {
      let newState = {content : content, delimeter:this.state.delimeter}
      this.setState(newState)
  }

    render(){
      return <div>
              <FileComponent content={this.state.content} delimeter={this.state.delimeter}/>
              <FileInput callback={this.contentLoaded}/>
            </div>
    }
}

export {TabularDataWrapper}
