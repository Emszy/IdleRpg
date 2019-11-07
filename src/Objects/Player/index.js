
import Entity from '../Entity'
import {playerImages, playerShirts, playerPants, playerHair, playerTools, playerWeapons, playerArmor} from "../Animations/images"
import Animation from "../Animations"

export default class Player {
	main (name, items) {
		return (new Entity({
				name : name,
				x : 0,
				y : 0,
				width : 64,
				height : 64,
				startingGold : 100,
				
				status : {
					dead : false,
					deaths : 0,
					currLevel : 0,
					highestLevel : 0,
					teleported : false,
					location : "home",
					destination : "home",
				},
				
				skills : {
					attack : 1,
					health : 50,
					defense : 1,
					attackSpeed : 1,
					range : 1,
					magic : 1,
					thirst : 20,
					hunger : 20,
					mining : 1,
					woodcutting : 1,
					hunting : 1,
					hungerDecay : 300,
					thirstDecay : 100,
				},
				animation : {
						body : new Animation(playerImages.coffee),
						shirt : playerShirts.black,
						pants : playerPants.black,
						hair : playerHair.black,
				},

				items : items


			})
		)

	}
}

// 	teleLevel(x, y, map) {		
// 		if (this.highestLevel < this.currLevel) {
// 			this.highestLevel = this.currLevel;
// 		}
// 	}