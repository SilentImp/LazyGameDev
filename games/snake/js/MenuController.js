var dependency,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

dependency = ['jquery', 'domReady', 'GameController'];

define(dependency, function($, domReady) {
  var MenuController;
  MenuController = (function() {
    function MenuController() {
      this.showGameOver = __bind(this.showGameOver, this);
      this.showGame = __bind(this.showGame, this);
      this.showName = __bind(this.showName, this);
      this.changeName = __bind(this.changeName, this);
      this.showMenu = __bind(this.showMenu, this);
      this.showScore = __bind(this.showScore, this);
      this.focusForm = __bind(this.focusForm, this);
      this.blurForm = __bind(this.blurForm, this);
      this.changeLanguage = __bind(this.changeLanguage, this);
      this.touch = $('html').hasClass('touch');
      this.page = $('.page');
      this.screenGame = $('.screen.game');
      this.screenScore = $('.screen.score');
      this.screenName = $('.screen.name');
      this.screenMenu = $('.screen.menu');
      this.screenGameOver = $('.screen.game-over');
      this.globalNav = this.screenMenu.find('.global-navigation');
      this.langNav = this.screenMenu.find('.language-navigation');
      this.input = this.screenName.find('input');
      this.change = this.globalNav.find('.change');
      this.screenMenu.show();
      if (this.touch === false) {
        this.globalNav.find('.score').on('click', this.showScore);
        this.globalNav.find('.play').on('click', this.showGame);
        this.change.on('click', this.changeName);
        this.langNav.find('a').on('click', this.changeLanguage);
        this.screenScore.find('.menu').on('click', this.showMenu);
        this.screenName.find('.menu').on('click', this.showMenu);
        this.screenGame.find('.menu').on('click', this.showMenu);
        this.screenGameOver.find('.again').on('click', this.showGame);
        this.screenGameOver.find('.menu').on('click', this.showMenu);
      } else {
        this.globalNav.find('.score').on('tapone', this.showScore);
        this.globalNav.find('.play').on('tapone', this.showGame);
        this.change.on('tapone', this.changeName);
        this.langNav.find('a').on('tapone', this.changeLanguage);
        this.screenScore.find('.menu').on('tapone', this.showMenu);
        this.screenName.find('.menu').on('tapone', this.showMenu);
        this.screenGame.find('.menu').on('tapone', this.showMenu);
        this.screenGameOver.find('.again').on('tapone', this.showGame);
        this.screenGameOver.find('.menu').on('tapone', this.showMenu);
      }
      this.input.on('focus', this.focusForm);
      this.input.on('blur', this.blurForm);
      this.screenName.on('submit', this.showGame);
      this.playerName = this.input.val();
      this.change.show();
      this.playerName = null;
    }

    MenuController.prototype.changeLanguage = function(event) {
      var lang, link;
      if (typeof event.preventDefault === "function") {
        event.preventDefault();
      }
      link = $(event.currentTarget);
      lang = link.attr('data-lang');
      this.langNav.find('.selected').removeClass('selected');
      link.addClass('selected');
      return document.l10n.requestLocales(lang);
    };

    MenuController.prototype.blurForm = function(event) {
      var input;
      input = event.currentTarget;
      return window.setTimeout(function() {
        $('.answer-1').removeClass('focused');
        return input.blur();
      }, 350);
    };

    MenuController.prototype.focusForm = function(event) {
      return $('.answer-1').addClass('focused');
    };

    MenuController.prototype.showScore = function(event) {
      if (typeof event.preventDefault === "function") {
        event.preventDefault();
      }
      return this.page[0].className = 'page state-score';
    };

    MenuController.prototype.showMenu = function(event) {
      if (typeof event.preventDefault === "function") {
        event.preventDefault();
      }
      return this.page[0].className = 'page state-menu';
    };

    MenuController.prototype.changeName = function(event) {
      if (typeof event.preventDefault === "function") {
        event.preventDefault();
      }
      return this.page[0].className = 'page state-name';
    };

    MenuController.prototype.showName = function(event) {
      if (typeof event.preventDefault === "function") {
        event.preventDefault();
      }
      if (this.playerName === null) {
        return this.page[0].className = 'page state-name';
      } else {
        return this.showGame(event);
      }
    };

    MenuController.prototype.showGame = function(event) {
      if (typeof event.preventDefault === "function") {
        event.preventDefault();
      }
      this.input.blur();
      this.playerName = this.input.val();
      this.change.show();
      this.page[0].className = 'page state-game';
      return window.GameController.init();
    };

    MenuController.prototype.showGameOver = function() {
      return this.page[0].className = 'page state-game-over';
    };

    return MenuController;

  })();
  return domReady(function() {
    return window.MenuController = new MenuController;
  });
});
