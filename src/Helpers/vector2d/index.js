export default class Vector2d {
	
	constructor(x, y) {
		this.x = x;
		this.y = y
	}
	
	test() {
		let v = new Vector2d(10,20);
		v.log();

		let one = new Vector2d(20,10);
		one.log();
	}


	log() {
		console.log(this.x, this.y);
	}

}
