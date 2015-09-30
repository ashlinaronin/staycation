stayCation.controller('MovablesCtrl', function MovablesCtrl($scope, $stateParams) {


    //Attempt using multiple-selection and multiple-drag: not currently working in canvas!

    // var canvas = document.getElementById("test-canvas");
    // var context = canvas.getContext('2d');
    // var backgroundImg = new Image();
    // backgroundImg.onload = function() {
    //   context.drawImage(backgroundImg, 10, 10);
    // };
    // backgroundImg.setAttribute("multiple-selection-item", "");
    // backgroundImg.setAttribute("multiple-drag-item", "");
    // backgroundImg.src = "https://cdn2.iconfinder.com/data/icons/bright-food-products/512/lobster-128.png";
    // console.log(backgroundImg);

  //Attempt using tutorial at http://simonsarris.com/blog/510-making-html5-canvas-useful
  function Shape(x,y,w,h,fill) {
    this.x = x || 0;
    this.x = y || 0;
    this.w = w || 1;
    this.h = h || 1;
    this.fill = fill || '#AAAAAA';
  }

  Shape.prototype.draw = function(ctx) {
    ctx.fillStyle = this.fill;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  function CanvasState(canvas) {
    this.valid = false; //when true, canvas will redraw everything

    this.shapes = []; //collection of things to be drawn
    this.dragging = false; //keep track of when we are dragging
    this.selection = null; //current selected object -> can be array for multiple selection

    this.dragoffx = 0; //see mousedown/mousemove events
    this.dragoffy = 0;

    var myState = this;

    canvas.addEventListener('selectstart', function(e) {e.preventDefault(); return false;}, false);

    //Up, down, and move are for dragging
    canvas.addEventListener('mousedown', function(e) {
      var mouse = myState.getMouse(e);
      var mx = mouse.x;
      var my = mouse.y;
      var shapes = myState.shapes;
      var l = shapes.length;

      for (var i = l-1; i >= 0; i--) {
        if (shapes[i].contains(mx, my)) {
          var mySel = shapes[i];
          //Keep track of where in the object we clicked so we can move it smoothly (see mousemove)
          myState.dragoffx = mx - mySel.x;
          myState.dragoffy = my - mySel.y;
          myState.dragging = true;
          myState.selection = mySel;
          myState.valid = false;
          return;
        }
      }
      //If we have an object selected, we deselect it:
      if(myState.selection) {
        myState.selection = null;
        myState.valid = false;
      }
    }, true);
  }


})
