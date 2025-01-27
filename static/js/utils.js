continue_handler =(event)=>{
    if(event.keyCode == spaceKey)document.getElementById("next").click();
}

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
function addElement(element,position,center=false)
{
  //element.css({"grid-row":"2","grid-column":"2"})
  if(center) element.css({"position": "absolute",
    "left":"50%","top":"50%",
    "transform":"translate(-50%, -50%)"});
  $(position).append(element);
}

function addElementByGrid(element,rowStart,rowEnd,colStart,colEnd)
{
  //element.css({"grid-row":"2","grid-column":"2"})
  element.css({'grid-row-start':rowStart.toFixed(0),
    'grid-row-end':rowEnd.toFixed(0),
    'grid-column-start':colStart.toFixed(0),
    'grid-column-end':colEnd.toFixed(0),
    'text-align':'center'});
  $("#experiment").append(element);
}

// function equivalent to linspace in matlab - generates an array of n evenly spaced numbers between min and max (inclusive for both) 
function linspace(min,max,nBins) {
  var i;
  ret = Array(nBins);
  nBins--;
  for (i = nBins; i >= 0; i--) {
    ret[i] = (i*max+(nBins-i)*min)/nBins; 
  }
  return ret;
}


// function equivalent to randi in matlab - generates a random integer between min and max (inclusive for both) 
function randi(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
}


// function equivalent to repmat in matlab - repeats a given array nReps times
function repmat(array, nReps) {
  var result = [];
  while (nReps--) {
    result = result.concat(array);
  }
  return result;
}



function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}
