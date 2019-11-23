export default class playerUpdater {
	constructor(items) {
		this.items = items
	}

	update(player, updateData) {
		player.name = updateData.name || "no Name"
		player.info = updateData.info || "No Info"
		player.inventory.gold = updateData.gold;
		return player;
	}

	updateSkills(player, skills) {
		for (let x = 0; x < skills.length; x++) {
				player.skills[skills[x].name].value = skills[x].value;
				player.skills[skills[x].name].current = skills[x].current;
				player.skills[skills[x].name].boost = skills[x].boost;
				player.skills[skills[x].name].xp = skills[x].xp;
				player.skills[skills[x].name].threshold = skills[x].threshold;
		}
		return player
	}

	updateInventory(player, inventory) {
		for (let x = 0; x < inventory.length; x++) {
			player.inventory.addQuantity(this.items.returnOneItem(inventory[x].category_id, inventory[x].subCategory_id, inventory[x].item_index), inventory[x].quantity)
		}
		return player
	}

	updateBank(player, inventory) {
		for (let x = 0; x < inventory.length; x++) {
			player.home.bank.inventory.addQuantity(this.items.returnOneItem(inventory[x].category_id, inventory[x].subCategory_id, inventory[x].item_index), inventory[x].quantity)
		}
		return player
	}
}