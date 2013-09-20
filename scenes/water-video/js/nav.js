(function(global){
  function SceneController(){
    this.dy = 0;
    this.dx = 0;
    this.plane = $(".field");
    this.delay = 50;
    this.timer = null;
    $(document).on('keydown',$.proxy(this.keyController,this));
    $(document).on('keyup',$.proxy(this.stopTurning,this));
  }

  SceneController.prototype.stopTurning = function(event){
    window.clearInterval(this.timer);
    };


  SceneController.prototype.getTransform = function(element){
    var st = window.getComputedStyle(element, null);
    var transform = st.getPropertyValue("-webkit-transform") ||
                    st.getPropertyValue("-moz-transform") ||
                    st.getPropertyValue("-ms-transform") ||
                    st.getPropertyValue("-o-transform") ||
                    st.getPropertyValue("transform");
    if(transform == 'none'){
      transform ='';
    }
    return transform;
  };

  SceneController.prototype.keyController = function(event){
    switch(event.keyCode) {
      case 37:
        window.clearInterval(this.timer);
        this.timer = window.setInterval($.proxy(this.turnLeft,this),this.delay);
        break;
      case 39:
        window.clearInterval(this.timer);
        this.timer = window.setInterval($.proxy(this.turnRight,this),this.delay);
        break;
      case 40:
        window.clearInterval(this.timer);
        this.timer = window.setInterval($.proxy(this.turnDown,this),this.delay);
        break;
      case 38:
        window.clearInterval(this.timer);
        this.timer = window.setInterval($.proxy(this.turnUp,this),this.delay);
        break;
    }
  };

  SceneController.prototype.turnLeft = function(event){
    this.dy-=5;
    if(this.dy<0){
      this.dy = 360 + this.dy;
    }
    this.repos();
  };

  SceneController.prototype.turnRight = function(event){
    this.dy+=5;
    if(this.dy>360){
      this.dy = 360 - this.dy;
    }
    this.repos();
  };

  SceneController.prototype.turnUp = function(event){
    this.dx-=5;
    if(this.dx<0){
      this.dx = 360 + this.dx;
    }
    this.repos();
  };

  SceneController.prototype.turnDown = function(event){
    this.dx+=5;
    if(this.dx>360){
      this.dx = 360 - this.dx;
    }
    this.repos();
  };

  SceneController.prototype.repos = function(){
    this.plane[0].style[Modernizr.prefixed('transform')] = 'rotateY('+this.dy+'deg) rotateX('+this.dx+'deg)';
  };

  function onDomReady(){
    new SceneController;
  }

  $(document).ready(onDomReady);
})(this)