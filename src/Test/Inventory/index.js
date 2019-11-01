import Item from "../../Objects/Item"
import Player from "../../Objects/Player"

export default class InventoryTest {
	constructor() {
		// this.inventory = new Inventory();
		this.player = new Player();
		this.player.setName("PLAYER!")
		this.player2 = new Player();
		this.player2.setName("PLAYER @@@")


		console.log("TESTING INVENTORY")
		this.test();
	}


	fillInventory(items) {

		for (let i = 0; i < 10; i++) {
			console.log(this.player.inventory.add(items.smallPotion()));
			console.log(this.player.inventory.add(items.mediumPotion()));
			console.log(this.player.inventory.add(items.largePotion()));
			console.log(this.player.inventory.add(items.megaPotion()));
			console.log(this.player.inventory.add(items.tinyWater()));
			console.log(this.player.inventory.add(items.smallWater()));
			console.log(this.player.inventory.add(items.mediumWater()));
			console.log(this.player.inventory.add(items.largeWater()));
			console.log(this.player.inventory.add(items.megaWater()));
			console.log(this.player.inventory.add(items.tinyFood()));
			console.log(this.player.inventory.add(items.smallFood()));
			console.log(this.player.inventory.add(items.mediumFood()));
			console.log(this.player.inventory.add(items.largeFood()));
			console.log(this.player.inventory.add(items.megaFood()));
			console.log(this.player.inventory.add(items.healthLevel()));
			console.log(this.player.inventory.add(items.attackSpeedLevel()));
			console.log(this.player.inventory.add(items.attackLevel()));
			console.log(this.player.inventory.add(items.thirstLevel()));
			console.log(this.player.inventory.add(items.hungerLevel()));

		}

	}

	useItems() {
		for (let i = 0; i < 20; i++) {
			this.player2.inventory.useItem(this.player2.skills, 14);
		}
	}

	transferInventory() {
		this.player2.inventory.addInventory(this.player.inventory)

		console.log(this.player2.inventory);


	}

	test() {
		// let skills = new Skills();
		let items = new Item();

		

		this.fillInventory(items)

		this.transferInventory();
		this.useItems();


		console.log("INVENTORY SPACES")

   	 	console.log(this.player2.skills)
	}

}