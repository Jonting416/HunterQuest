"use strict";

/**
 * Main class. Instantiate or extend Game to create a new game of your own
 */
class Game extends DisplayObjectContainer {
	
	constructor(gameId, width, height, canvas) {
		super("game");

		Game.instance = this;

		this.gameId = gameId;
		this.width = width;
		this.height = height;
		this.canvas = canvas;
		this.g = canvas.getContext('2d'); //the graphics object
		this.clock = new GameClock();
		this.playing = false;
		this.resetting = false;

		this.pressedKeys = new ArrayList();
		this.clickedKeys = {};

		/* Setup a key listener */
		window.addEventListener("keydown", onKeyDown, true);
		window.addEventListener("keyup", onKeyUp, true);
		
	}

	static getInstance() {
		return Game.instance;
	}

	reset() {
		this.resetting = true;
		this.removeAll();
		this.soundManager.stopAllSounds();
		this.initialize();
		this.resetting = false;
	}

	update(pressedKeys) {
		super.update(pressedKeys);
	}
	
	draw(context) {
		super.draw(context);
	}

	nextFrame() {
		game.update(this.pressedKeys);
		game.draw(this.g);
		if (this.playing) window.requestAnimationFrame(tick);
	}

	start() {
		this.playing = true;
		window.requestAnimationFrame(tick); //Notice that tick() MUST be defined somewhere! See LabOneGame.js for an example
	}

	pause() {
		this.playing = false;
		this.soundManager.stopAllSounds();
	}


	/**
	 * For dealing with keyCodes
	 */
	addKey(keyCode) {
		// console.log("Key Code: " + keyCode); //for your convenience, you can see what the keyCode you care about is
		if(this.pressedKeys.indexOf(keyCode) == -1) this.pressedKeys.push(keyCode);
	}
	removeKey(keyCode) {
		this.pressedKeys.remove(keyCode);
	}

}

function onKeyDown(e) {
	Game.getInstance().addKey(e.keyCode);
}
function onKeyUp(e) {
	Game.getInstance().removeKey(e.keyCode);
}
