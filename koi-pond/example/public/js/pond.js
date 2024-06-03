/*
  The reason this needs to be in the js folder here in public is that the static files
  that the html can load, must be provided at runtime.  HTML does not have a loader, so 
  it will not be able to get scripts dynamically from non-hosted environments.  
  How we get around this within typescript projects is with a tool called webpack.
  Under the hood, webpack dynamically creates a bundle of all source files, which it then
  packages along with the public files to resolve all import/exports outside of an es6 runtime.
*/

const KOISIZE = 32;

class Pond {
    constructor(canvas, ctx) {
        this.koi = {};
        this.ripples = {};
        this.canvas = canvas;
        this.ctx = ctx;
    }

    init() {
        this.koi[0] = new Koi(this.canvas.width / 2, this.canvas.height / 2);
    }

    update() {
        for (const koiId in this.koi) {
            this.koi[koiId].update();
        }
        for (const rippleId in this.ripples) {
            this.ripples[rippleId].update();
        }
    }

    draw() {
        for (const koiId in this.koi) {
            this.koi[koiId].draw(this.ctx);
        }
        for (const rippleId in this.ripples) {
            this.ripples[rippleId].draw(this.ctx);
        }
    }

    loop() {
        redraw(this.ctx);
        this.update();
        this.draw();
    }
}

class Koi {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = KOISIZE;
        this.h = KOISIZE;
        this.mx = 0;
        this.my = 0;
        this.theta = 0;
    }

    moveTo(x, y) {}

    update() {
        this.x += this.mx;
        this.y += this.my;
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

function getCenter(x, y, w, h) {
    return {
        x: x + w / 2,
        y: y + h / 2,
    };
}

// function getBoundsRect(x, y, w, h) {
//     return {
//         x,
//         y,
//         w,
//         h,
//         left: x,
//         right: x + w,
//         top: y,
//         bottom: y + h,
//         center: getCenter(x, y, w, h),
//         topLeft: { x, y },
//         topRight: { x: x + w, y },
//         bottomLeft: { x, y: y + h },
//         bottomRight: { x: x + w, y: y + h },
//     };
// }

function redraw(ctx) {
    ctx.fillStyle = "#04a0e1";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const canvas = document.querySelector("#pond");
if (canvas) {
    const ctx = canvas.getContext("2d");
    if (ctx) {
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;

        const pond = new Pond(canvas, ctx);
        pond.init();

        // this is one way to do instantiate a simple game loop
        setInterval(() => {
            pond.loop();
        }, 1000 / 60);

        // another would be below, it takes advantage of the browser
        // window's `requestAnimationFrame` function, which returns a
        // frame automatically on the refresh rate of the screen.
        // Almost always 60fps, sometimes unreliable.
        // function gameLoop() {
        //     pond.loop();
        //     window.requestAnimationFrame(gameLoop);
        // }
    }
}
