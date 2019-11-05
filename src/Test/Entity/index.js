import Entity from "../../Objects/Entity"
import Items from "../../Objects/Item"
import {randomInt} from "../../Helpers/functions"
export default class EntityTest {
	constructor() {
		// this.testPlayer();
		// this.testRange();

		this.player1 = new Entity(this.player());
		let arrows = this.player1.items.returnItems(3,6);
		this.addArmor(this.player1, arrows[1]);
		
		this.enemies = [];

		this.enemies[0] = new Entity(this.enemy());
		this.player1.range.shoot(this.player1, this.enemies[0]);

		this.player1.range.log();


	}

	testPlayer() {
		let player = new Entity(this.player());
		this.displayName(player);
		this.displaySkills(player);
		this.displayLocation(player);
		this.displayArmor(player);
		this.displayHome(player);
		this.displayInventory(player);
		this.displayItems(player);
		this.displayRange(player);
	}

	addArmor(entity, arrows) {
		for (var i = 0; i < 100; i++) {
			entity.armor.addArrows(arrows);
		}
	}

	testRange() {

		let player = new Entity(this.player());
		let arrows = player.items.returnItems(3,6);
		this.addArmor(player, arrows[0]);
		
		let enemy = [];

		enemy[0] = new Entity(this.enemy());
		player.range.shoot(player, enemy[0]);

		player.range.log();

		for (var i = 0; i < 300; i++) {
			player.range.checkCollision(enemy);
		}



	}

	displaySkills(entity) {
		console.log(entity.skills);
	}

	displayLocation(entity) {
		console.log(entity.body);
	}

	displayArmor(entity) {
		console.log(entity.armor);
	}

	displayHome(entity) {
		console.log(entity.home);
	}
	displayInventory(entity) {
		console.log(entity.inventory);
	}

	displayItems(entity) {
		console.log(entity.items);
	}

	displayName(entity) {
		console.log(entity.name);
	}

	displayRange(entity) {
		console.log(entity.range);
	}

	player() {
		return ({
			name : "Emszy",
			x : 0,
			y : 0,
			width : 64,
			height : 64,
			startingGold : 100,
			dead : false,
			deaths : 0,
			currLevel : 1,
			highestLevel : 0,
			teleported : false,
			
			skills : {
				attack : 1,
				health : 100,
				defense : 1,
				attackSpeed : 1,
				range : 1,
				magic : 1,
				thirst : 1,
				hunger : 1,
				mining : 1,
				woodcutting : 1,
				hunting : 1,
				hungerDecay : 1000,
				thirstDecay : 800,
			},

			items : new Items()


		})
	}

		enemy() {
			return ({
				name : "Bob",
				x : randomInt(0, 450),
				y : randomInt(0, 450),
				width : 64,
				height : 64,
				startingGold : 100,
				dead : false,
				deaths : 0,
				currLevel : 1,
				highestLevel : 0,
				teleported : false,
				
				skills : {
					attack : 1,
					health : 100,
					defense : 1,
					attackSpeed : 1,
					range : 1,
					magic : 1,
					thirst : 1,
					hunger : 1,
					mining : 1,
					woodcutting : 1,
					hunting : 1,
					hungerDecay : 1000,
					thirstDecay : 800,
				},

				items : new Items()

			})
	}
}