var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["jquery", 'domReady'], function($, domReady) {
  var BuildingsController;
  BuildingsController = (function() {
    function BuildingsController(options) {
      this.remove = __bind(this.remove, this);
      this.add = __bind(this.add, this);
      this.addRandomly = __bind(this.addRandomly, this);
      this.debug = options.debug;
      this.cellSize = options.cellSize || 40;
      this.type = 'building';
      this.map = options.map;
      this.snake = options.snake;
      this.wrapper = options.wrapper || $('#field');
      this.xSize = this.map.length;
      this.ySize = this.map[0].length;
      this.x = null;
      this.y = null;
      this.node = $($('#house-template').html());
      this.addRandomly();
    }

    BuildingsController.prototype.addRandomly = function() {
      var x, y;
      x = Math.max(Math.min(Math.round(Math.random() * this.xSize), this.xSize - 3), 1);
      y = Math.max(Math.min(Math.round(Math.random() * this.ySize), this.ySize - 3), 1);
      return this.add(x, y);
    };

    BuildingsController.prototype.add = function(x, y) {
      var i, k, _i, _j, _ref, _ref1, _ref2, _ref3;
      this.x = x;
      this.y = y;
      for (i = _i = _ref = Math.max(this.x - 1, 0), _ref1 = Math.min(this.x + 2, this.xSize - 1); _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = _ref <= _ref1 ? ++_i : --_i) {
        for (k = _j = _ref2 = Math.max(this.y - 1, 0), _ref3 = Math.min(this.y + 2, this.ySize - 1); _ref2 <= _ref3 ? _j <= _ref3 : _j >= _ref3; k = _ref2 <= _ref3 ? ++_j : --_j) {
          if (typeof this.map[i][k] !== 'undefined') {
            this.addRandomly();
            return false;
          }
        }
      }
      this.node.css({
        '-webkit-transform': 'translateX(' + this.x * this.cellSize + 'px) translateY(' + this.y * this.cellSize + 'px)',
        '-moz-transform': 'translateX(' + this.x * this.cellSize + 'px) translateY(' + this.y * this.cellSize + 'px)',
        'transform': 'translateX(' + this.x * this.cellSize + 'px) translateY(' + this.y * this.cellSize + 'px)'
      });
      this.wrapper.append(this.node);
      this.map[this.x][this.y] = this;
      this.map[this.x + 1][this.y] = this;
      this.map[this.x + 1][this.y + 1] = this;
      this.map[this.x][this.y + 1] = this;
      if (this.debug) {
        $('#' + this.x + '-' + this.y)[0].className = 'holder building';
        $('#' + (this.x + 1) + '-' + this.y)[0].className = 'holder building';
        $('#' + (this.x + 1) + '-' + (this.y + 1))[0].className = 'holder building';
        $('#' + this.x + '-' + (this.y + 1))[0].className = 'holder building';
      }
      return true;
    };

    BuildingsController.prototype.remove = function() {
      this.node.remove();
      this.map[this.x][this.y] = void 0;
      this.map[this.x + 1][this.y] = void 0;
      this.map[this.x + 1][this.y + 1] = void 0;
      this.map[this.x][this.y + 1] = void 0;
      if (this.debug) {
        $('#' + this.x + '-' + this.y)[0].className = 'holder';
        $('#' + (this.x + 1) + '-' + this.y)[0].className = 'holder';
        $('#' + (this.x + 1) + '-' + (this.y + 1))[0].className = 'holder';
        return $('#' + this.x + '-' + (this.y + 1))[0].className = 'holder';
      }
    };

    return BuildingsController;

  })();
  return domReady(function() {
    return window.BuildingsController = BuildingsController;
  });
});
