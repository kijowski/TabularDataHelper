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
  delimeter : string
}

    render(){
    }
}

export {FileComponent}
