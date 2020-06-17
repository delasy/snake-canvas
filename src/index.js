import Game from './game.js'

const game = new Game()

game.start()

game.context.canvas.style.left = '0'
game.context.canvas.style.position = 'fixed'
game.context.canvas.style.top = '0'

// TODO Add game start / game over
// TODO Add collision
// TODO Increase speed when large

/* var hidden, state, visibilityChange;
if (typeof document.hidden !== "undefined") {
hidden = "hidden";
visibilityChange = "visibilitychange";
state = "visibilityState";
} else if (typeof document.mozHidden !== "undefined") {
hidden = "mozHidden";
visibilityChange = "mozvisibilitychange";
state = "mozVisibilityState";
} else if (typeof document.msHidden !== "undefined") {
hidden = "msHidden";
visibilityChange = "msvisibilitychange";
state = "msVisibilityState";
} else if (typeof document.webkitHidden !== "undefined") {
hidden = "webkitHidden";
visibilityChange = "webkitvisibilitychange";
state = "webkitVisibilityState";
}

// Add a listener that constantly changes the title
document.addEventListener(visibilityChange, function() {
document.title = document[state];
}, false);

// Set the initial value
document.title = document[state]; */
