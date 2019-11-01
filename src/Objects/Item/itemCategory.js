import ItemSubCategory from "./itemSubCategory"

export default class ItemCategory {
	
	constructor(name, id, settings) {
		this.name = name;
		this.id = id;
		this.subcategory = [];
		this.settings = settings
	}
	
	addSubCategory(name, id, settings) {
		this.subcategory.push(new ItemSubCategory(name, id, settings));
	}

	listSubCategories() {
		let count = this.subcategory.length
		for (let x = 0; x < count; x++) {
			console.log(this.subcategory[x].name);
			console.log(this.subcategory[x].id);
		}
	}

	returnSubCategories() {
		let subcategories = [];
		let count = this.subcategory.length
		for (let x = 0; x < count; x++) {
			subcategories.push({
								name: this.subcategory[x].name, 
								id : this.subcategory[x].id
							  })


		}
		return (subcategories);
	}

	returnSubCategorySettings(index) {
		return (this.subcategory[index].settings);
	}

	returnItems(subCategoryIndex, itemIndex) {
		return(this.subcategory[subCategoryIndex].returnItems())
	}

	returnOneItem(subCategoryIndex, itemIndex) {
		return(this.subcategory[subCategoryIndex].returnOneItem(itemIndex));
	}

	returnItemNames(subCategoryIndex) {
		return(this.subcategory[subCategoryIndex].returnItemNames())
	}
}
