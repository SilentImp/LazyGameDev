var dependency,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

dependency = ['domReady', 'jquery', 'jquery.hotkeys', 'TimerController', 'SnakeController', 'FoodController', 'BuildingsController'];

define(dependency, function(domReady) {
  var GameController;
  GameController = (function() {
    function GameController() {
      this.down = __bind(this.down, this);
      this.right = __bind(this.right, this);
      this.up = __bind(this.up, this);
      this.left = __bind(this.left, this);
      this.cdStep = __bind(this.cdStep, this);
      this.addBuildings = __bind(this.addBuildings, this);
      this.gameStep = __bind(this.gameStep, this);
      this.updateScore = __bind(this.updateScore, this);
      this.foodEaten = __bind(this.foodEaten, this);
      this.endGame = __bind(this.endGame, this);
      this.quitGame = __bind(this.quitGame, this);
      this.init = __bind(this.init, this);
      this.touch = $('html').hasClass('touch');
      this.controller = $('.controller');
      this.debug = false;
      this.screen = $('.screen.game');
      this.backCount = this.screen.find('.back-count');
      this.fieldWith = 10;
      this.fieldHeight = 10;
      this.placeSize = 40;
      this.houseCount = 2;
      this.backCountNum = 3;
      this.speed = 750;
      this.wrapper = $('#field');
      this.snake = null;
      this.score = 0;
      this.scoreElement = this.screen.find('.stats .count');
      this.quit = this.screen.find('.quit');
      this.quit.on('click', this.quitGame);
    }

    GameController.prototype.init = function() {
      var food, i, k, pos, _i, _j, _k, _ref, _ref1, _ref2;
      if (this.touch) {
        this.controller.show();
      }
      this.speed = 800;
      this.score = 0;
      this.updateScore();
      this.wrapper.find('>*:not(.position):not(.side)').remove();
      this.field = new Array(this.fieldWith);
      for (i = _i = 0, _ref = this.fieldWith; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        this.field[i] = new Array(this.fieldHeight);
      }
      pos = this.wrapper.find('.position');
      if (this.debug) {
        for (i = _j = 0, _ref1 = this.fieldWith; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
          for (k = _k = 0, _ref2 = this.fieldHeight; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; k = 0 <= _ref2 ? ++_k : --_k) {
            pos.append('<div id="' + i + '-' + k + '" class="holder">' + i + ':' + k + '</div>');
            $('#' + i + '-' + k).css({
              '-webkit-transform': 'translateX(' + i * 40 + 'px) translateY(' + k * 40 + 'px)',
              '-moz-transform': 'translateX(' + i * 40 + 'px) translateY(' + k * 40 + 'px)',
              'transform': 'translateX(' + i * 40 + 'px) translateY(' + k * 40 + 'px)'
            });
          }
        }
      }
      this.snake = new window.SnakeController({
        map: this.field,
        debug: this.debug
      });
      $(document).on('die', this.endGame);
      $(document).on('food', this.foodEaten);
      this.addBuildings();
      food = new window.FoodController({
        map: this.field,
        snake: this.snake,
        debug: this.debug
      });
      this.cdCount = this.backCountNum;
      this.timer = new window.RAFTimer({
        duration: 1000,
        callback: this.cdStep
      });
      return this.timer.run();
    };

    GameController.prototype.quitGame = function(event) {
      if (typeof event.preventDefault === "function") {
        event.preventDefault();
      }
      if (this.touch) {
        this.controller.hide();
      }
      if (this.touch) {
        this.controller.find('.left').off('tapone', this.left);
        this.controller.find('.up').off('tapone', this.up);
        this.controller.find('.right').off('tapone', this.right);
        this.controller.find('.down').off('tapone', this.down);
      } else {
        $(document).unbind('keydown', this.left);
        $(document).unbind('keydown', this.up);
        $(document).unbind('keydown', this.right);
        $(document).unbind('keydown', this.down);
      }
      $(document).off('die', this.endGame);
      $(document).off('food', this.foodEaten);
      this.timer.stop();
      return window.MenuController.showMenu(event);
    };

    GameController.prototype.endGame = function() {
      if (this.touch) {
        this.controller.hide();
      }
      if (this.touch) {
        this.controller.find('.left').off('tapone', this.left);
        this.controller.find('.up').off('tapone', this.up);
        this.controller.find('.right').off('tapone', this.right);
        this.controller.find('.down').off('tapone', this.down);
      } else {
        $(document).unbind('keydown', this.left);
        $(document).unbind('keydown', this.up);
        $(document).unbind('keydown', this.right);
        $(document).unbind('keydown', this.down);
      }
      $(document).off('die', this.endGame);
      $(document).off('food', this.foodEaten);
      this.timer.stop();
      $('.screen.game-over .count').text(this.score);
      return window.MenuController.showGameOver();
    };

    GameController.prototype.foodEaten = function() {
      var food;
      food = new window.FoodController({
        map: this.field,
        snake: this.snake,
        debug: this.debug
      });
      if (this.speed > 150) {
        this.speed = Math.round(this.speed - this.speed * 0.075);
      }
      this.timer.duration = this.speed;
      this.score += 10;
      return this.updateScore();
    };

    GameController.prototype.updateScore = function() {
      return this.scoreElement.text(this.score);
    };

    GameController.prototype.gameStep = function(timer) {
      return this.snake.move();
    };

    GameController.prototype.addBuildings = function() {
      var building, i, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = this.houseCount; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        _results.push(building = new window.BuildingsController({
          map: this.field,
          snake: this.snake,
          debug: this.debug
        }));
      }
      return _results;
    };

    GameController.prototype.cdStep = function(timer) {
      var diff;
      diff = this.cdCount - timer.total_ticks;
      this.backCount.removeClass('count');
      if (diff === 0) {
        timer.stop();
        if (this.touch) {
          this.controller.find('.left').on('tapone', this.left);
          this.controller.find('.up').on('tapone', this.up);
          this.controller.find('.right').on('tapone', this.right);
          this.controller.find('.down').on('tapone', this.down);
        } else {
          $(document).on('keydown', null, 'left', this.left);
          $(document).on('keydown', null, 'up', this.up);
          $(document).on('keydown', null, 'right', this.right);
          $(document).on('keydown', null, 'down', this.down);
        }
        timer.duration = this.speed;
        timer.callback = this.gameStep;
        timer.run();
        return;
      }
      this.backCount.text(diff);
      return this.backCount.addClass('count');
    };

    GameController.prototype.left = function(event) {
      if (typeof event.preventDefault === "function") {
        event.preventDefault();
      }
      return this.snake.turn('left');
    };

    GameController.prototype.up = function(event) {
      if (typeof event.preventDefault === "function") {
        event.preventDefault();
      }
      return this.snake.turn('up');
    };

    GameController.prototype.right = function(event) {
      if (typeof event.preventDefault === "function") {
        event.preventDefault();
      }
      return this.snake.turn('right');
    };

    GameController.prototype.down = function(event) {
      if (typeof event.preventDefault === "function") {
        event.preventDefault();
      }
      return this.snake.turn('down');
    };

    return GameController;

  })();
  return domReady(function() {
    return window.GameController = new GameController;
  });
});
