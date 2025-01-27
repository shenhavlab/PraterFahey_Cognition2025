

/* View in fullscreen */
function openFullscreen() {
  var elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  var elem = document.documentElement;
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}

/*Add element to the position and specify if we want to centralize the element*/
function addElement(element,position,center=true)
{
  //element.css({"grid-row":"2","grid-column":"2"})
  if(center) element.css({"position": "absolute",
    "left":"50%","top":"50%",
    "transform":"translate(-50%, -50%)"});
  $(position).append(element);
}

function addElementByGrid(element,rows,cols)
{
  //element.css({"grid-row":"2","grid-column":"2"})
  element.css({'grid-row':rows,'grid-column':cols,'text-align': 'center'});
  $("#experiment").append(element);
}