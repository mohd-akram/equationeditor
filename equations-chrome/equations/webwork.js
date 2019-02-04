// Generated by CoffeeScript 2.3.2
(function() {
  var equation, equationBox, i, inputBox, len, parent;

  for (i = 0, len = inputBoxes.length; i < len; i++) {
    inputBox = inputBoxes[i];
    parent = inputBox.parentNode;
    equationBox = document.createElement('div');
    equationBox.style.display = 'inline-block';
    equationBox.style.padding = '10px';
    parent.insertBefore(equationBox, inputBox);
    parent.insertBefore(document.createElement('br'), inputBox);
    parent.insertBefore(document.createElement('br'), equationBox);
    equation = new Equation(inputBox, equationBox);
  }

}).call(this);

//# sourceMappingURL=webwork.js.map
