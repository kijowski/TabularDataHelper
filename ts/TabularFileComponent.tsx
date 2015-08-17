import React = require("react");

interface RowProps {
  row : string
  delimeter : string
  key : string
}

class RowComponent extends React.Component<RowProps,void>{

  render() {
    let columns = this.props.row.split(this.props.delimeter);

    return <tr>
      {columns.map((column, index) => <td key={index}>{column}</td>)}
      </tr>
  }
}

interface FileProps {
  content : string
  delimeter : string
}

class FileComponent extends React.Component<FileProps,void> {
    render(){
      let rows = this.props.content.split("\n");
      return <table><tbody>{rows.map((row, index) => <RowComponent key={index.toString()} row={row} delimeter = {this.props.delimeter}/>)}</tbody></table>
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
            <input type="button" value='Go' onClick={this.onClick}/>
          </div>
  }
}


interface WrapperProps {

}

interface WrapperState {
  content : string
  delimeter : string
}

    render(){
    }
}

export {FileComponent}
