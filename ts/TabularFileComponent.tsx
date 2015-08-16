import React = require("react");

interface RowProps {
  row : string
  delimeter : string
}

class RowComponent extends React.Component<RowProps,void>{

  render() {
    let columns = this.props.row.split(this.props.delimeter);

    return <tr>
      {columns.map((column, index) => <td>{column}</td>)}
      </tr>
  }
}

interface FileProps {
  content : string
}

interface FileState {
  row : string
  delimeter : string
}

class FileComponent extends React.Component<FileProps,FileState> {
    render(){
      let rows = this.props.content.split("\n");
      return <table><tbody>{rows.map((row, index) => <RowComponent row={row} delimeter = ','/>)}</tbody></table>
    }
}

export {FileComponent}
