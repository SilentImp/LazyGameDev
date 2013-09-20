var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(function() {
  var TimerController;
  TimerController = (function() {
    function TimerController(options) {
      this.stop = __bind(this.stop, this);
      this.timelog = __bind(this.timelog, this);
      this.run = __bind(this.run, this);
      this.total_ticks = 0;
      this.last = null;
      this.state = false;
      if (typeof options.duration === 'undefined') {
        options.duration = 1000;
      }
      if (typeof options.callback === 'undefined') {
        return false;
      }
      this.callback = options.callback;
      this.duration = options.duration;
    }

    TimerController.prototype.run = function() {
      this.callback(this);
      this.state = true;
      return this.frame = window.requestAnimationFrame(this.timelog);
    };

    TimerController.prototype.timelog = function(time) {
      time === Math.floor(time);
      if (this.last === null) {
        this.last = time;
      }
      this.passed = time - this.last;
      if (this.passed >= this.duration) {
        this.total_ticks++;
        this.last = time;
        this.callback(this);
      }
      if (this.state === true) {
        return this.frame = window.requestAnimationFrame(this.timelog);
      }
    };

    TimerController.prototype.stop = function() {
      this.total_ticks = 0;
      this.last = null;
      this.state = false;
      window.cancelAnimationFrame(this.frame);
      return this;
    };

    return TimerController;

  })();
  return window.RAFTimer = TimerController;
});
