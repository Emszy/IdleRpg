import Vector2d from '../vector2d' 
import Collision from '../collision' 
import {randomInt} from "../functions"

export default class RigidBody {
	
	constructor(x, y, width, height) {
		this.pos = new Vector2d(x,y);
		this.size = new Vector2d(width, height);
		this.collision = new Collision();
		this.setVelocity(2,2);
		this.stop = false;
		this.stopMining = true;
		this.stopWoodCutting = true;
		this.goHome = false;
		this.stopHunting = true
		this.goFarm = false
		this.currentDirection = "north";
		this.action = "stop"
	}

	setVelocity(x,y) {
		this.velocity = new Vector2d(x,y);
	}

	setPos(x,y) {
		this.pos.x = x;
		this.pos.y = y;
	}

	stopMoving() {
		this.stop = true;
	}

	startMoving() {
		this.stop = false;
	}

	stopMine() {
		this.stopMining = true;
	}

	startMine() {
		this.stopMining = false;
	}

	stopWoodCut() {
		this.stopWoodCutting = true;
	}

	startWoodCut() {
		this.stopWoodCutting = false;
	}

	stopHunt() {
		this.stopHunting = true;
	}

	startHunting() {
		this.stopHunting = false;
	}


	stopGoingHome() {
		this.goHome = true;
	}

	startGoingHome() {
		this.goHome = false;
	}

	stopFarm() {
		this.goFarm = true;
	}

	startFarm() {
		this.goFarm = false;
	}

	createPath(x, y) {

		let arr = []

		for (let i = 0; i < 4; i++) {
			let x1 = randomInt(0,5) * 5;
			let y1 = randomInt(0,5) * 5;
			let size = 32;

			arr.push(new RigidBody(x + x1,y + y1,size,size));
		}

		this.path = {
			index: 0,
			len: 4,
			arr: arr,

			newPath() {
				let arr = []
				let rand = new RigidBody()
				for (let i = 0; i < 4; i++) {
					let x = randomInt(0,50) * 5;
					let y = randomInt(0,50) * 5;
					let size = 2;

					arr.push(new RigidBody(x,y,size,size));
				}
				this.arr = arr;
			},

			next : function() {
				if (this.index === this.len - 1) {
					this.index = 0;
					this.newPath();
				} else {
					this.index++;
				}
			},
		};
	}

	followPath() {
		if (this.move_to(this.path.arr[this.path.index].pos.x, 
			this.path.arr[this.path.index].pos.y)
		   ) 
		{
			this.path.next();
		}
	}

	move_right() {
		if (this.pos.x > 480) {
			return false
		}
		this.pos.x += this.velocity.x;
	}

	move_left() {
		if (this.pos.x <= 0) {
			return false
		}
		
			this.pos.x -= this.velocity.x;

	}

	move_down() {
			this.pos.y += this.velocity.y
	}

	move_up() {
			this.pos.y -= this.velocity.y
	}

	move_to(x,y) {
		
		if (this.at_destination(x,y)) {
		 	return (true);
		}

		if(this.pos.x < x) {
			this.move_right()
			this.currentDirection = "east"
		}

		if (this.pos.y < y) {
			this.move_down()
			this.currentDirection = "south"
		}

		if(this.pos.x > x) {
			this.move_left()
			this.currentDirection = "west"
		}

		if (this.pos.y > y) {
			this.move_up();
			this.currentDirection = "north"
		}
		return(false)


	}

	at_destination(x,y) {
		let point = new RigidBody(x,y,32,32);


		if (this.pos.x < x) {
			this.currentDirection = "east"
		}

		if (this.pos.x > x) {
			this.currentDirection = "west"
		}


		if (this.pos.y < y) {
			this.currentDirection = "south"
		}

		if (this.pos.y > y) {
			this.currentDirection = "north"
		}


		if (this.collide(point)) 
		{
			return true;
		}
		return (false);
	}

	collide(obj) {
		return(this.collision.box(this, obj));
	}

	

	test() {
		this.log();
	}

	log()
	{
		this.pos.log();
		this.size.log();
	}

}