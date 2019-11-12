
import Entity from '../Entity'
import {playerImages, playerShirts, playerPants, playerHair, playerTools, playerWeapons, playerArmor} from "../Animations/images"
import Animation from "../Animations"

export default class Player {
	main (name, items) {
		return (new Entity({
				name : name,
				x : 150,
				y : 150,
				width : 64,
				height : 64,
				startingGold : 10000000,
				
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
					health : 100,
					defense : 1,
					attackSpeed : 1,
					range : 1,
					magic : 1,
					thirst : 10,
					hunger : 10,
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

	player(name, items) {
		let player = this.main(name, items);
		player.body.action = "walk";
		return player
	}


	merchant(items) {
		let diamondArmor = items.returnItems(2,4)
		let merchant = this.main("The Merchant", items);
		merchant.body.action = "stop";
		merchant.body.currentDirection = "west";
		merchant.body.setPos(200,200)
		merchant.armor.addHelm(diamondArmor[0])
		merchant.armor.addChest(diamondArmor[1])
		merchant.armor.addShield(diamondArmor[4])
		return merchant
	}
}

// 	teleLevel(x, y, map) {		
// 		if (this.highestLevel < this.currLevel) {
// 			this.highestLevel = this.currLevel;
// 		}
// 	}