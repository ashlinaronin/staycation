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

    canvas.addEventListener('mousemove', function(e) {
      if (myState.dragging){
        var mouse = myState.getMouse(e);
        //Save offset and use it here so we can drag from where we click
        myState.selection.x = mouse.x - myState.dragoffx;
        myState.selection.y = mouse.y - myState.dragoffy;
        myState.valid = false;
      }
    }, true);

    canvas.addEventListener('mouseup', function(e) {
      myState.dragging = false;
    }, true);

    canvas.addEventListener('dblclick', function(e) {
      var mouse = myState.getMouse(e);
      myState.addShape(new Shape(mouse.x - 10, mouse.y -10, 20, 20, 'rgba(0,255,0,.6)'));
    }, true);

    this.selectionColor = '#CC0000';
    this.selectionWidth = 2;
    this.interval = 30;
    setInterval(function() {myState.draw(); }, myState.interval);
  }

  CanvasState.prototype.draw = function() {
    if (!this.valid) {
      var ctx = this.ctx;
      var shapes = this.shapes;
      this.clear();

      //Add things you want draw in the background all the time here

      var l = shapes.length;
      for (var i = 0; i < l; i++) {
        var shape = shapes[i];
        //Skip drawing of elements that have been moved off the screen:
        if (shape.x > this.width || shape.y > this.height || shape.x + shape.w < 0 || shape.y + shape.h < 0) continue;
        shapes[i].draw(ctx);
      }

      //draw selection
      if (this.selection != null) {
        ctx.strokeStyle = this.selectionColor;
        ctx.lineWidth = this.selectionWidth;
        var mySel = this.selection;
        ctx.strokeRect(mySel.x,mySel.y,mySel.w,mySel.h);
      }

      //Add things you want drawn on top all the time here

      this.valid = true;
    }
  }

  //Creates an object with x and y defined, set to mouse position relative to canvas.
  //Being very accurate requires that you worry about padding and borders!
  CanvasState.prototype.getMouse = function(e) {
    var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;

    //Comput the total offset
    if(element.offsetParent !== undefined){
      do{
        offsetX += element.offsetLeft;
        offsetY += element.offsetTop;
      } while ((element = element.offsetparent));
    }

    offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
    offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;

    //return a simple JS object with x and y defined
    return {x: mx, y: my};
  }

  var s = new CanvasState(document.getElementById('canvas'));
  s.addShape(new )
})
