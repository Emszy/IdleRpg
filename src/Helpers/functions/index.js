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

function timer (time) {
	let date = new Date();
	let expiration = date.getTime() + time;
	return ({
			date : date,
			time : time,
			expiration: expiration,
			
			reset: function() {
				let date = new Date();
				let newTime = date.getTime()
				this.expiration = newTime + this.time;
			},

			check : function() {
				let date = new Date();
				let newTime = date.getTime()
				if (newTime > this.expiration) {
					this.reset();
					return (true)
				}
				return false
			},

			setExpiration : function(newExpiration) {
				this.time = newExpiration;
				this.reset()
			}
		})
}

export {
	randomInt,
	scale,
	button,
	timer,
}