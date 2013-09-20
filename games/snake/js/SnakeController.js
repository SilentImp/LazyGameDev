var dependency,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

dependency = ['jquery', 'domReady'];

define(dependency, function($, domReady) {
  var SnakeController;
  SnakeController = (function() {
    function SnakeController(options) {
      this.move = __bind(this.move, this);
      this.moveTo = __bind(this.moveTo, this);
      this.add = __bind(this.add, this);
      this.addRandomly = __bind(this.addRandomly, this);
      this.turn = __bind(this.turn, this);
      this.debug = options.debug;
      this.type = 'snake';
      this.reason = 'fuck off';
      this.directions = ['up', 'down', 'left', 'right', 'up', 'down', 'left', 'right'];
      this.cellSize = options.cellSize || 40;
      this.wrapper = options.wrapper || $('#field');
      this.map = options.map;
      this.xSize = this.map.length;
      this.ySize = this.map[0].length;
      this.wrapper = $('#field');
      this.head = null;
      this.x = null;
      this.y = null;
      this.direction = null;
      this.addRandomly();
    }

    SnakeController.prototype.turn = function(direction) {
      switch (direction) {
        case "up":
          if (this.oldDirection === 'down') {
            return;
          }
          this.direction = 'up';
          break;
        case "down":
          if (this.oldDirection === 'up') {
            return;
          }
          this.direction = 'down';
          break;
        case "left":
          if (this.oldDirection === 'right') {
            return;
          }
          this.direction = 'left';
          break;
        case "right":
          if (this.oldDirection === 'left') {
            return;
          }
          this.direction = 'right';
      }
      return this.head[0].className = 'train-pos head ' + this.direction;
    };

    SnakeController.prototype.addRandomly = function() {
      var direction, x, y;
      x = Math.max(Math.min(Math.round(Math.random() * this.xSize), this.xSize - 3), 1);
      y = Math.max(Math.min(Math.round(Math.random() * this.ySize), this.ySize - 3), 1);
      direction = this.directions[Math.round(Math.random() * 7)];
      return this.add(x, y, direction);
    };

    SnakeController.prototype.add = function(x, y, direction) {
      var i, k, _i, _j, _ref, _ref1, _ref2, _ref3;
      this.x = x;
      this.y = y;
      this.direction = direction;
      for (i = _i = _ref = Math.max(this.x - 1, 0), _ref1 = Math.min(this.x + 2, this.xSize - 1); _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = _ref <= _ref1 ? ++_i : --_i) {
        for (k = _j = _ref2 = Math.max(this.y - 1, 0), _ref3 = Math.min(this.y + 2, this.ySize - 1); _ref2 <= _ref3 ? _j <= _ref3 : _j >= _ref3; k = _ref2 <= _ref3 ? ++_j : --_j) {
          if (typeof this.map[i][k] !== 'undefined') {
            this.addRandomly();
            return;
          }
        }
      }
      if (this.head !== null) {
        this.head.removeClass('head');
      }
      this.head = $($('#train-template').html());
      this.head[0].className = 'train-pos head ' + this.direction;
      this.moveTo(this.head, this.x, this.y);
      this.wrapper.append(this.head);
      this.nodeCollection = [this.head];
      this.oldDirection = this.direction;
      this.xCollection = [this.x];
      this.yCollection = [this.y];
      this.oCollection = [this.direction];
      this.map[this.x][this.y] = this;
      if (this.debug) {
        return $('#' + this.x + '-' + this.y)[0].className = 'holder snake';
      }
    };

    SnakeController.prototype.moveTo = function(element, x, y) {
      return element.css({
        '-webkit-transform': 'translateX(' + x * this.cellSize + 'px) translateY(' + y * this.cellSize + 'px)',
        '-moz-transform': 'translateX(' + x * this.cellSize + 'px) translateY(' + y * this.cellSize + 'px)',
        'transform': 'translateX(' + x * this.cellSize + 'px) translateY(' + y * this.cellSize + 'px)'
      });
    };

    SnakeController.prototype.move = function() {
      var die, dx, dy, head, i, pop, _i, _ref;
      switch (this.direction) {
        case "up":
          dx = 0;
          dy = -1;
          break;
        case "down":
          dx = 0;
          dy = 1;
          break;
        case "left":
          dx = -1;
          dy = 0;
          break;
        case "right":
          dx = 1;
          dy = 0;
      }
      die = false;
      pop = true;
      this.x += dx;
      this.y += dy;
      if ((this.x >= this.xSize) || (this.x < 0) || (this.y >= this.ySize) || (this.y < 0)) {
        this.reason = 'fall';
        die = true;
        this.head.find('.train').wrapAll("<div class='fall'></div>");
      }
      if ((die === false) && (typeof this.map[this.x][this.y] !== 'undefined')) {
        switch (this.map[this.x][this.y].type) {
          case "food":
            this.head = this.map[this.x][this.y].node;
            delete this.map[this.x][this.y];
            this.moveTo(this.head, this.x, this.y);
            this.wrapper.append(this.head);
            this.nodeCollection.unshift(this.head);
            pop = false;
            $(document).trigger('food');
            break;
          case "snake":
            if ((this.x !== this.xCollection[this.xCollection.length - 1]) || (this.y !== this.yCollection[this.yCollection.length - 1])) {
              this.reason = 'snake';
              die = true;
            }
            break;
          case "building":
            this.map[this.x][this.y].node.addClass('onfire');
            this.reason = 'building';
            die = true;
        }
      }
      this.xCollection.unshift(this.x);
      this.yCollection.unshift(this.y);
      this.oCollection.unshift(this.direction);
      if (!die) {
        this.map[this.x][this.y] = this;
      }
      if (this.debug && !die) {
        $('#' + this.x + '-' + this.y)[0].className = 'holder snake   ';
      }
      if (pop === true) {
        if (this.debug) {
          $('#' + this.xCollection[this.xCollection.length - 1] + '-' + this.yCollection[this.yCollection.length - 1])[0].className = 'holder';
        }
        delete this.map[this.xCollection[this.xCollection.length - 1]][this.yCollection[this.yCollection.length - 1]];
        this.xCollection.pop();
        this.yCollection.pop();
        this.oCollection.pop();
      }
      head = 'head ';
      for (i = _i = 0, _ref = this.nodeCollection.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        this.nodeCollection[i][0].className = 'train-pos ' + head + this.oCollection[i];
        this.moveTo(this.nodeCollection[i], this.xCollection[i], this.yCollection[i]);
        head = '';
      }
      this.oldDirection = this.direction;
      if (die === true) {
        return $(document).trigger('die');
      }
    };

    return SnakeController;

  })();
  return domReady(function() {
    return window.SnakeController = SnakeController;
  });
});
