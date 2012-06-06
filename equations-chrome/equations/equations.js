// Generated by CoffeeScript 1.3.3
(function() {

  window.onload = function() {
    var Timer, changeBrackets, chars, equationBox, findAllIndexes, findAndReplace, findBracket, fontSize, form, funcregex, functions, i, inputBox, insertAtCursor, keyCodeMap, keys, lettersregex, message, miscregex, needBracket, timer, trigfunctions, trigregex, updateBox, updateMath, _i, _len;
    form = document.getElementById('form');
    inputBox = document.getElementById('inputBox');
    equationBox = document.getElementById('equationBox');
    fontSize = parseFloat(equationBox.style.fontSize);
    message = equationBox.innerHTML;
    keyCodeMap = {
      8: "backspace",
      38: "up",
      40: "down",
      59: ";",
      186: ";",
      192: '`',
      219: "[",
      221: "]",
      222: "'"
    };
    chars = {
      '[': '(',
      ']': ')',
      "'": '*',
      ';': '+',
      '`': "'",
      'up': '^(',
      'down': '_'
    };
    lettersregex = {
      'alpha': 'α',
      'beta': 'β',
      'gamma': 'γ',
      'delta': 'δ',
      'Delta': 'Δ',
      'epsilon': 'ε',
      'lambda': 'λ',
      'mu': 'μ',
      'pi': 'π',
      'theta': 'θ',
      'sigma': 'σ',
      'Sigma': '∑',
      'tau': 'τ',
      'omega': 'ω',
      'Omega': 'Ω',
      'inf': '\∞'
    };
    trigfunctions = ['sin', 'cos', 'tan'];
    funcregex = {
      'exp': '\exp',
      'log': '\log',
      'sqrt': '√',
      'integrate': '∫',
      '[lL]aplace': '\\sc L',
      'lim': '\lim'
    };
    miscregex = {
      '===': '≡',
      '<-': '←',
      '->': '→',
      '<==': '⇐',
      '==>': '⇒',
      '<=': '≤',
      '>=': '≥',
      '!=': '≠',
      '!<': '≮',
      '!>': '≯',
      '\\+-': '±',
      '\\*': '×'
    };
    functions = trigfunctions;
    for (i in funcregex) {
      functions.push(i);
    }
    trigregex = {};
    for (_i = 0, _len = trigfunctions.length; _i < _len; _i++) {
      i = trigfunctions[_i];
      trigregex['(arc)?' + i + '(h)?'] = '\\' + '$1' + i + '$2';
    }
    findAndReplace = function(string, object) {
      var j, regex;
      for (i in object) {
        j = object[i];
        regex = new RegExp(i, "g");
        string = string.replace(regex, j);
      }
      return string;
    };
    findAllIndexes = function(source, find) {
      var result, _j, _ref;
      result = [];
      for (i = _j = 0, _ref = source.length - 1; 0 <= _ref ? _j < _ref : _j > _ref; i = 0 <= _ref ? ++_j : --_j) {
        if (source.substring(i, i + find.length) === find) {
          result.push(i);
        }
      }
      return result;
    };
    findBracket = function(string, startPos, opening) {
      var count, range, _j, _k, _l, _len1, _ref, _results, _results1;
      if (opening == null) {
        opening = false;
      }
      count = 0;
      if (opening) {
        range = (function() {
          _results = [];
          for (var _j = startPos; startPos <= -1 ? _j < -1 : _j > -1; startPos <= -1 ? _j++ : _j--){ _results.push(_j); }
          return _results;
        }).apply(this);
      } else {
        range = (function() {
          _results1 = [];
          for (var _k = startPos, _ref = string.length; startPos <= _ref ? _k < _ref : _k > _ref; startPos <= _ref ? _k++ : _k--){ _results1.push(_k); }
          return _results1;
        }).apply(this);
      }
      for (_l = 0, _len1 = range.length; _l < _len1; _l++) {
        i = range[_l];
        if (string[i] === '(') {
          count += 1;
        }
        if (string[i] === ')') {
          count -= 1;
        }
        if (count === 0) {
          return i;
        }
      }
    };
    changeBrackets = function(string, startPos, endPos, prefix) {
      if (prefix == null) {
        prefix = '';
      }
      string = string.slice(0, startPos) + prefix + '{' + string.slice(startPos + 1, endPos) + '}' + string.slice(endPos + 1);
      return string;
    };
    String.prototype.repeat = function(num) {
      return new Array(num + 1).join(this);
    };
    insertAtCursor = function(field, value, del) {
      var endPos, scrollTop, sel, startPos;
      if (del == null) {
        del = 0;
      }
      if (document.selection) {
        field.focus();
        sel = document.selection.createRange();
        if (del) {
          sel.moveStart('character', -del);
        }
        sel.text = value;
        field.focus();
      } else if (field.selectionStart || field.selectionStart === '0') {
        startPos = field.selectionStart - del;
        endPos = field.selectionEnd;
        scrollTop = field.scrollTop;
        field.value = field.value.substring(0, startPos) + value + field.value.substring(endPos, field.value.length);
        field.focus();
        field.selectionStart = startPos + value.length;
        field.selectionEnd = startPos + value.length;
        field.scrollTop = scrollTop;
      } else {
        field.value += value;
        field.focus();
      }
      return updateMath();
    };
    Timer = (function() {

      function Timer() {}

      Timer.prototype.startTimer = function(duration) {
        this.duration = duration;
        this.startTime = (new Date).getTime();
        clearTimeout(this.timeout);
        return this.timeout = setTimeout((function() {
          return updateBox();
        }), this.duration);
      };

      Timer.prototype.isOn = function() {
        if (this.startTime) {
          return (new Date).getTime() - this.startTime < this.duration;
        }
        return false;
      };

      return Timer;

    })();
    timer = new Timer();
    keys = [];
    updateBox = function() {
      var char, length, power, startIdx, _j, _ref;
      if (keys) {
        length = keys.length;
        startIdx = 0;
        if (length > 1) {
          char = keys[length - 1];
          for (i = _j = _ref = length - 1; _j > -1; i = _j += -1) {
            if (keys[i] !== char) {
              startIdx = i + 1;
              break;
            }
          }
          power = length - startIdx;
          if (power > 1) {
            insertAtCursor(inputBox, char + '^' + power.toString(), power);
          }
        }
      }
      return keys = [];
    };
    updateMath = function() {
      var endPos, func, indexes, j, opening, startPos, value, _j, _k, _l, _len1, _len2, _len3, _ref;
      value = inputBox.value.replace(/^\s+/, '').replace(/\s+$/, '');
      if (value) {
        _ref = ['sqrt', '^', 'lim', '/'];
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          func = _ref[_j];
          indexes = findAllIndexes(value, func);
          for (_k = 0, _len2 = indexes.length; _k < _len2; _k++) {
            i = indexes[_k];
            startPos = i + func.length;
            if (value[startPos] === '(') {
              endPos = findBracket(value, startPos);
              if (endPos) {
                if (func === 'lim') {
                  value = changeBrackets(value, startPos, endPos, '↙');
                } else {
                  value = changeBrackets(value, startPos, endPos);
                }
              }
            }
          }
        }
        indexes = findAllIndexes(value, '/');
        for (_l = 0, _len3 = indexes.length; _l < _len3; _l++) {
          j = indexes[_l];
          if (value[j - 1] === ')') {
            endPos = j - 1;
            startPos = findBracket(value, endPos, opening = true);
            if (endPos) {
              value = changeBrackets(value, startPos, endPos);
            }
          }
        }
        value = findAndReplace(value, funcregex);
        value = findAndReplace(value, lettersregex);
        value = findAndReplace(value, trigregex);
        value = findAndReplace(value, miscregex);
        value = value.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
        equationBox.innerHTML = '\$\$' + value + '\$\$';
        return M.parseMath(equationBox);
      } else {
        return equationBox.innerHTML = message;
      }
    };
    updateMath();
    needBracket = function() {
      var f, startPos, string, _j, _k, _len1, _len2;
      startPos = inputBox.selectionStart;
      for (_j = 0, _len1 = trigfunctions.length; _j < _len1; _j++) {
        f = trigfunctions[_j];
        string = inputBox.value.substring(startPos - (f.length + 1), startPos);
        if (string === f + 'h') {
          return true;
        }
      }
      for (_k = 0, _len2 = functions.length; _k < _len2; _k++) {
        f = functions[_k];
        string = inputBox.value.substring(startPos - f.length, startPos);
        if (string === f) {
          return true;
        }
      }
    };
    inputBox.onkeydown = function(event) {
      var bracketsNo, char, initialValue, key, keyCode, startPos, value, _j, _len1;
      keyCode = event.keyCode;
      key = String.fromCharCode(keyCode).toLowerCase();
      initialValue = inputBox.value.slice(0, -1);
      if (keyCode >= 65 && keyCode <= 90) {
        timer.startTimer(300);
        keys.push(key);
      }
      char = keyCodeMap[event.keyCode];
      if (char in chars) {
        event.preventDefault();
        event.stopPropagation();
        if (event.shiftKey && keyCodeMap[event.keyCode] === ']') {
          startPos = inputBox.selectionStart;
          value = inputBox.value.substring(0, startPos);
          bracketsNo = 0;
          for (_j = 0, _len1 = value.length; _j < _len1; _j++) {
            i = value[_j];
            if (i === '(') {
              bracketsNo += 1;
            }
            if (i === ')') {
              bracketsNo -= 1;
            }
          }
          if (bracketsNo > 0) {
            return insertAtCursor(inputBox, ')'.repeat(bracketsNo));
          }
        } else {
          return insertAtCursor(inputBox, chars[char]);
        }
      }
    };
    inputBox.onkeyup = function(event) {
      var keyCode;
      keyCode = event.keyCode;
      if (keyCode >= 65 && keyCode <= 90) {
        if (needBracket()) {
          insertAtCursor(inputBox, '(');
        }
      }
      return updateMath();
    };
    return form.onsubmit = function() {
      return chrome.tabs.create({
        url: 'http://www.wolframalpha.com/input/?i=' + encodeURIComponent(inputBox.value)
      });
    };
  };

}).call(this);
