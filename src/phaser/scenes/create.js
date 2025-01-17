import { checkStore, getStoreState } from "../gameloop/checkStore";
import { init } from "../init/init";

export function create() {
	// width and height from image properties
	this.background = this.add.tileSprite(0, 0, 1280, 800, "background");
	this.background.setScale(2.6).setOrigin(0).setDepth(-13); // first tile's depth is -12.5
	this.beeCanFly = getStoreState().config.beeCanFly;
	// builds garden and creates initial flowers
	init(this);

	// collider flag for avoiding running the collision function over and over while the bee is colliding
	this.bee1Collided = false;
	this.musicIsPlaying = false;

	this.song = this.sound.add("song", { loop: true });
	this.song.play();
	this.song.pause();

	// Check the store every .5 secs
	this.time.addEvent({
		delay: 500,
		callback: checkStore,
		callbackScope: this,
		loop: true,
	});

	// keep track of which flowers are "growing"/ moving upward
	//this.flowersGrowing = [];

	// hack to reset bee's accelleration every 1/10 sec so that orbits appear less frequently
	// this.time.addEvent({
	// 	delay: 100,
	// 	callback: function() {
	// 		this.bee.setAcceleration(0, 0);
	// 	},
	// 	callbackScope: this,
	// 	loop: true
	// });
}
