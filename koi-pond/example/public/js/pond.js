/*
  The reason this needs to be in the js folder here in public is that the static files
  that the html can load, must be provided at runtime.  HTML does not have a loader, so 
  it will not be able to get scripts dynamically from non-hosted environments.  
  How we get around this within typescript projects is with a tool called webpack.
  Under the hood, webpack dynamically creates a bundle of all source files, which it then
  packages along with the public files to resolve all import/exports outside of an es6 runtime.
*/

const canvas = document.querySelector("#pond");
if (canvas) {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    // the canvas can be reset to fill the whole screen with this function
    function setCanvas() {
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
    }
    function redraw() {
      ctx.fillStyle = "#04a0e1";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    // which can be called within an event listener to handle resetting on events
    window.addEventListener("resize", () => {
      setCanvas();
      redraw();
    });

    setCanvas();
    redraw();

    // The rest of your code below
  }
}
