import React = require('react');
import tfc = require('./TabularFileComponent');

window.onload = function () {
  var props  = {content : "First, row\nSecond,row,with,more,columns\nAnd,third,row"};
  var element = React.createElement(tfc.FileComponent,props);
  React.render(element, document.getElementById("mount"));
}
