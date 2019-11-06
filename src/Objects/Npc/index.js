
import Entity from '../Entity'
import AnimalAnimation from "../Animations/animalAnimation"
import {randomInt} from "../../Helpers/functions"
import { npc } from "../Animations/images"
import {settings} from "../../Helpers/settings"

export default class Npc {
	constructor(items) {
		this.items = items
	}

	animals(level) {
		let arr = [];
		for (var i = 0; i < randomInt(1,4); i++) {
				let animalSettings = this.chooseAnimal(level)
				let animal = new Entity({
					name : animalSettings.name,
					x : randomInt(0, 450),
					y : randomInt(0, 450),
					width : 64,
					height : 64,
					startingGold : 0,
					
					status : {
						dead : false,
						deaths : 0,
						currLevel : 1,
						highestLevel : 0,
						teleported : false,
						type : "animal",
					},
					
					skills : {
						attack : 1,
						health : 10,
						defense : 1,
						attackSpeed : 1,
						range : 1,
						magic : 1,
						thirst : 1,
						hunger : 1,
						mining : 1,
						woodcutting : 1,
						hunting : animalSettings.huntingLvl,
						hungerDecay : 1000,
						thirstDecay : 800,
					},
					animation : { 
									singleImg : animalSettings.animation
								},
					items : this.items
				})
				for (var i = 0; i < animalSettings.amount; i++) {
					animal.inventory.add(this.items.randomFood(level))

				}
				animal.body.createPath(animal.body.pos.x, animal.body.pos.y);
				animal.body.setVelocity(settings.animals.walkVelocity.x, settings.animals.walkVelocity.y)
			
			arr.push(animal)
		}
		return (arr);
	}

	chooseAnimal(level) {
		let animal = npc.chicken;
		let name = "chicken";
		let huntingLvl = 1;
		let animation = new AnimalAnimation(npc.chicken);

		if (level >= 0 && level < 20) {
  			 animal = npc.chicken
  			 name = "Chicken"
	  	}
		else if (level >= 20 && level < 40) {
			 animal = npc.cow
			 name = "Cow"
		}

		else if (level >= 40 && level < 60) {
			 animal = npc.pig
			 name = "Pig"
		}

	    else if (level >= 60 && level < 80) {
			 animal = npc.turkey
			 name = "Turkey"
	    }

	    else if (level >= 80 && level < 100) {
			 animal = npc.llama
			 name = "Llama"
	    }
	    else {
			 animal = npc.llama
			 name = "Llama"
	    }

	    let amount = randomInt(settings.animals.itemDropCountRange.start, settings.animals.itemDropCountRange.end);
		animation = new AnimalAnimation(animal);
		return ({
				name : name,
				amount : amount,
				miningLvl : 1,
				woodCutLvl : 1,
				huntingLvl : huntingLvl,
				health : 100,
				animation : animation,
			})
	}




}