import React = require('react');
import tfc = require('./TabularFileComponent');

window.onload = function () {
  var props  = {content : "z,z,z,z,z,z,z,z,z,z,z,z,z"};
  var element = React.createElement(tfc.TabularDataWrapper,props);
  React.render(element, document.getElementById("mount"));
  // React.render(element, document.getElementById("mount2"));
}
