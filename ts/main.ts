import React = require('react');
import testComp = require('./testComponent');

window.onload = function () {
  React.render(React.createElement(testComp.TestReact,{testProp : "34"}), document.getElementById("mount"));
}
