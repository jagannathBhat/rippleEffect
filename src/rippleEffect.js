/*
Plugin for ripple effect.

Creates a ripple animation on applied HTML elements on click.

This project is licensed under the terms of the GNU GPLv3 license.
A copy of the lisence will be found in the root directory of the project as "LICENSE.txt"
*/
(function() {
  var dimension = 0;
  var rippler = null;
  var ripplerCircle = null;
  var start = null;

  function addEvents(a) {
    a.onmousedown = ripple;
  }

  function animStep(timeStamp) {
    if (!start) start = timeStamp;
    var progress = timeStamp - start;
    ripplerCircle.setAttribute("r", progress / 2);
    if (progress < dimension * 2) window.requestAnimationFrame(animStep);
    else {
      setProps("0px", "0px", "0px", "0px", -1, 0, 0, 0);
      start = null;
    }
  }

  function init() {
    rippler = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    ripplerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    rippler.setAttribute("id", "rippler");
    rippler.style.height = "0px";
    rippler.style.position = "absolute";
    rippler.style.width = "0px";
    rippler.style.zIndex = "-1";
    ripplerCircle.setAttribute("fill", "rgba(0, 0, 0, 0.3)");
    rippler.appendChild(ripplerCircle);
    document.body.appendChild(rippler);
    rippler = document.querySelector("#rippler");
    ripplerCircle = rippler.children[0];
  }

  function ripple(a) {
    var obj = {
      height: a.target.offsetHeight,
      left: a.target.offsetLeft,
      top: a.target.offsetTop,
      width: a.target.offsetWidth,
      zIndex: a.target.style.zIndex
    }
    dimension = 1.5 * ((obj.height > obj.width) ? obj.height : obj.width);
    setProps(obj.height + "px", obj.left + "px", obj.top + "px", obj.width + "px", obj.zIndex, a.pageX - obj.left, a.pageY - obj.top, 0);
    window.requestAnimationFrame(animStep);
  }

  function setProps(a, b, c, d, e, f, g, h) {
    var props = ["height", "left", "top", "width", "zIndex"];
    for (i = 0; i < 5; i++) {
      rippler.style[props[i]] = arguments[i];
    }
    ripplerCircle.setAttribute("cx", f);
    ripplerCircle.setAttribute("cy", g);
    ripplerCircle.setAttribute("r", h);
  }

  window.onload = function() {
    init();
    document.querySelectorAll(".jbRippleEffect").forEach(addEvents);
  }
})();
