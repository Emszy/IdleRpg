import RigidBody from "../rigidBody"

function randomInt(min, max) {
   	 	return Math.floor(Math.random() * (max - min + 1) + min);
}

function scale(value, x1, y1, x2, y2) {
  	 return ((value - x1) * (y2 - x2) / (y1 - x1) + x2)
}


function button (x, y, width, height) {
	return ({
		body : new RigidBody(x,y,width,height)
	})
}
export {
	randomInt,
	scale,
	button,
}