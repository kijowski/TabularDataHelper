import React = require('react');
import tfc = require('./components');

window.onload = function () {
  var element = React.createElement(tfc.TabularDataWrapper);
  React.render(element, document.getElementById("mount"));
}
