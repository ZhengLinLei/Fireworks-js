(() => {
  // EFFECT
  const particlesEffect = 'lighter';// CHANGE THIS FOR MAKE OTHER EFFECTS
  //---------------
    /* AVALIABLE
        
        lighter
        source-over
        xor
        screen

    */

  //---------------


  var cdom = document.createElement("canvas"); // CREATE CANVAS
  cdom.id = "myCanvas"; // NAME 
  cdom.style.position = "fixed";
  cdom.style.left = "0";
  cdom.style.top = "0";
  cdom.style.zIndex = -1;
  document.body.appendChild(cdom); // PRINT
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");

  //RESIZE WHEN RESIZE THE WINDOWS
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas, false);
  resizeCanvas();
  clearCanvas();

  // CLEAR THE CANVAS TO DARK
  function clearCanvas() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  // ONCLICK EVENT
  function mouseDownHandler(e) {
    if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        x = touch.pageX;
        y = touch.pageY;
    } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
        x = e.clientX;
        y = e.clientY;
    }
    fire(x, y); // CALL THE FUNCTION TO CREATE THE FIREWORK IN THE X AND Y POSITION
  }
  var rid;

  // CREATE FIREWORKS
  function fire(x, y) {
    createFireworks(x, y);
    function tick() {
      context.globalCompositeOperation = "destination-out";
      context.fillStyle = "rgba(0,0,0," + 10 / 100 + ")";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.globalCompositeOperation = particlesEffect; 
      drawFireworks();
      rid = requestAnimationFrame(tick); // MOVE DOWN
    }
    cancelAnimationFrame(rid);
    tick();
  }
  var particles = [];
  function createFireworks(sx, sy) {
    particles = [];
    var hue = Math.floor(Math.random() * 51) + 150; // HUE COLOR
    var hueVariance = 30;
    var count = 100;
    for (var i = 0; i < count; i++) {
      var p = {};
      var angle = Math.floor(Math.random() * 360); // OPACITY
      p.radians = (angle * Math.PI) / 180;
      p.x = sx;
      p.y = sy;
      p.speed = Math.random() * 5 + 0.4;
      p.radius = p.speed;
      p.size = Math.floor(Math.random() * 3) + 1;
      p.hue =
        Math.floor(Math.random() * (hue + hueVariance - (hue - hueVariance))) +
        (hue - hueVariance);
      p.brightness = Math.floor(Math.random() * 31) + 50;
      p.alpha = (Math.floor(Math.random() * 61) + 40) / 100;
      particles.push(p);
    }
  }

  // PRINT FIREWORKS
  function drawFireworks() {
    clearCanvas();

    // CREATE WATER MARK
    waterMark();
    
    context.globalCompositeOperation = particlesEffect;
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var vx = Math.cos(p.radians) * p.radius;
      var vy = Math.sin(p.radians) * p.radius + 0.4;
      p.x += vx;
      p.y += vy;
      p.radius *= 1 - p.speed / 100;
      p.alpha -= 0.005;
      context.beginPath();
      context.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
      context.closePath();
      context.fillStyle =
        "hsla(" + p.hue + ", 100%, " + p.brightness + "%, " + p.alpha + ")";
      context.fill();
    }
  }

  // REMOVE THIS IF YOU WANT TO REMOVE THE WATER MARK
  let water = {x:0,y:20};
  // WATERMARK
  function waterMark(){
    context.font = "14px Arial";
    context.fillStyle = "rgba(255,255,255,0.3)";
    context.globalCompositeOperation = "xor";
    context.fillText("Zheng Lin Lei", water.x, water.y);

    if(water.x >= window.innerWidth){
        water.x = 0;
    }
    water.x++;
  }

  // WINDOW EVENT FOR MOUSE AND TOUCH
  document.addEventListener("mousedown", mouseDownHandler, false);
//   document.addEventListener("touchstart", mouseDownHandler, false);
})();
