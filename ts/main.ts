import greet = require('./greeter');
import $ = require('jquery')

let x = new greet.Greeter()

window.onload = function () {
  $(document.body).html(x.hello())
}
