export default class ItemSubCategory {
	constructor(name, id, settings) {
		this.name = name;
		this.id = id;
		this.items = [];
		this.settings = settings
	}

	addItem(item) {
		this.items.push(item)
	}

	addItems(itemArr, id) {
		let count = itemArr.length;
		for (let x = 0; x < count; x++) {
			itemArr[x].info.setId(id);
			this.items.push(itemArr[x]);
			id++;
		}
		return (id)

	}

	addWeaponAndArmorItems(itemArr, id) {
		let count = itemArr.length;
		for (let x = 0; x < count; x++) {
			itemArr[x].info.isWearable()
			itemArr[x].info.setId(id);

			this.items.push(itemArr[x]);
			id++;
		}
		return (id)

	}


	addMagicItems(itemArr, id) {
		let count = itemArr.length;
		for (let x = 0; x < count; x++) {
			itemArr[x].info.magic = true;
			itemArr[x].info.setId(id);

			this.items.push(itemArr[x]);
			id++;
		}
		return (id)

	}
	
	listItems() {
		let count = this.items.length
		for (let x = 0; x < count; x++) {
			console.log(this.items[x].info.name);
		}
	}

	returnItems() {
		let items = []
		let count = this.items.length
		for (let x = 0; x < count; x++) {
			items.push(this.items[x].info.copy())
		}
		return(items);
	}

	returnOneItem(index) {
			return(this.items[index].info.copy())
	}

	returnItemNames() {
		let items = []
		let count = this.items.length
		for (let x = 0; x < count; x++) {
			items.push({
						name: this.items[x].info.name, 
						price : this.items[x].info.price,
						recipe : this.items[x].info.recipe 
					});
		}
		return(items);
	}

}
