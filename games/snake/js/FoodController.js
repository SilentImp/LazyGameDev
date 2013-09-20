var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["jquery", 'domReady'], function($, domReady) {
  var FoodController;
  FoodController = (function() {
    function FoodController(options) {
      this.remove = __bind(this.remove, this);
      this.add = __bind(this.add, this);
      this.addRandomly = __bind(this.addRandomly, this);
      this.debug = options.debug;
      this.cellSize = options.cellSize || 40;
      this.type = 'food';
      this.map = options.map;
      this.snake = options.snake;
      this.wrapper = options.wrapper || $('#field');
      this.xSize = this.map.length;
      this.ySize = this.map[0].length;
      this.x = null;
      this.y = null;
      this.node = $($('#food-template').html());
      this.xPoint = this.wrapper.find('.x-cord');
      this.yPoint = this.wrapper.find('.y-cord');
      if (Math.round(Math.random() * 1) === 0) {
        this.node.addClass('up');
      }
      this.addRandomly();
    }

    FoodController.prototype.addRandomly = function() {
      return this.add(Math.round(Math.random() * (this.xSize - 1)), Math.round(Math.random() * (this.ySize - 1)));
    };

    FoodController.prototype.add = function(x, y) {
      this.x = x;
      this.y = y;
      if (this.map[this.x][this.y] !== void 0) {
        this.addRandomly();
      } else if ((Math.abs(this.snake.x - this.x) < 2) || (Math.abs(this.snake.y - this.y) < 2)) {
        this.addRandomly();
      } else {
        this.node.css({
          '-webkit-transform': 'translateX(' + this.x * this.cellSize + 'px) translateY(' + this.y * this.cellSize + 'px)',
          '-moz-transform': 'translateX(' + this.x * this.cellSize + 'px) translateY(' + this.y * this.cellSize + 'px)',
          'transform': 'translateX(' + this.x * this.cellSize + 'px) translateY(' + this.y * this.cellSize + 'px)'
        });
        this.wrapper.append(this.node);
        this.map[this.x][this.y] = this;
        this.xPoint.css({
          '-webkit-transform': 'translateX(' + this.x * this.cellSize + 'px)',
          '-moz-transform': 'translateX(' + this.x * this.cellSize + 'px)',
          'transform': 'translateX(' + this.x * this.cellSize + 'px'
        });
        this.yPoint.css({
          '-webkit-transform': 'translateY(' + this.y * this.cellSize + 'px)',
          '-moz-transform': 'translateY(' + this.y * this.cellSize + 'px)',
          'transform': 'translateY(' + this.y * this.cellSize + 'px'
        });
      }
      if (this.debug) {
        return $('#' + this.x + '-' + this.y)[0].className = 'holder food';
      }
    };

    FoodController.prototype.remove = function() {
      this.node.remove();
      this.map[this.x][this.y] = void 0;
      if (this.debug) {
        return $('#' + this.x + '-' + this.y)[0].className = 'holder';
      }
    };

    return FoodController;

  })();
  return domReady(function() {
    return window.FoodController = FoodController;
  });
});
