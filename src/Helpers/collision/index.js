export default class Collision {

	box(obj1, obj2) {
		if (obj1.pos.x < obj2.pos.x + obj2.size.x &&
		   obj1.pos.x + obj1.size.x > obj2.pos.x &&
		   obj1.pos.y < obj2.pos.y + obj2.size.y &&
		   obj1.pos.y + obj1.size.y > obj2.pos.y) {
		    return (true);
		}
		return (false);
	}

	test() {

	}


	log() {
		 
	}

}