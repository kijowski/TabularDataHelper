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
