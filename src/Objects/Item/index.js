import Category from "./itemCategory"
import ItemTemplate from './Types/ItemTemplate.js'


import potions from "./Types/ConsumeableItems/potions"
import {food, cookedFood, plants} from "./Types/ConsumeableItems/food"
import drinks from "./Types/ConsumeableItems/drinks"

import {
	 BronzeArmor,
	 IronArmor,
	 GoldArmor,
	 PlatinumArmor,
	 DiamondArmor
} from "./Types/PlayerItems/armorItems"



import {
	 BronzeWeapons,
	 IronWeapons,
	 GoldWeapons,
	 PlatinumWeapons,
	 DiamondWeapons,
	 rangeWeapons,
	 arrows
} from "./Types/PlayerItems/weaponItems"

import {
	 magicItems
} from "./Types/PlayerItems/magicItems"


import {
	Wood,
	Ore,
	Bar,
	Seeds
} from "./Types/ResourceItems/resourceItems"

import {randomInt} from "../../Helpers/functions"


export default class Items {
	constructor() {
		this.categoryIndex = 0;
		this.subCategoryIndex = 0;
		this.itemIndex = 0;

		this.totalCategories = 0;
		this.totalSubCategories = 0;
		this.totalItems = 0;

		this.categories = [];

		this.createCategories()
		this.createSubCategories();
		this.addConsumeableItemsToSubcategory()
		this.addArmorItemsToSubcategory()
		this.addWeaponItemsToSubcategory()
		this.addResourceItemsToSubcategory()
		this.addMagicItemsToSubcategory();

	}

	nextCategory() {
		this.categoryIndex++;
	}

	prevCategory() {
		this.categoryIndex--;
	}

	nextSubCategory() {
		this.subCategoryIndex++;
	}

	prevSubCategory() {
		this.subCategoryIndex--;
	}

	getItemFromClick(index) {
		return (this.categories[this.categoryIndex].subcategory[this.subCategoryIndex].items[index].info.copy);
	}

	none() {
      let noItem = new ItemTemplate("None", 0, function(skill) {
         return ("No Item to Use");
      })
      noItem.setId(-1);
      noItem.bonus = 0;
      return (noItem);
   }


	randomItemDrop(level) {
      let chance = randomInt(1, 100);
	  if (chance > 100) {
      	return this.none();
      }
		let potions = this.returnItems(0,0);
		let seeds = this.returnItems(1,2);
		let magicStones = this.returnItems(4,0);      
	  
	  // consumable or resources
	  // choose random category, select level of item
	  
	  	chance = randomInt(0, 50);

	  	let currentItems = potions;
	  	if (chance <= 8) {			  
		    currentItems = potions;
	  	} else if (chance > 10 && chance <= 40){
	  		currentItems = seeds
	  	} else if (chance > 40 && chance <= 43) {
	  		currentItems = magicStones
	  		return currentItems[randomInt(0, currentItems.length - 1)]
	  	} else {
	  		return this.none();
	  	}

  		let itemIndex = 0;

  		if (level >= 0 && level < 20) {
  			itemIndex = 0;
	  	}

		else if (level >= 20 && level < 40) {
			itemIndex = randomInt(0, 1);
		}

		else if (level >= 40 && level < 60) {
			itemIndex = randomInt(0, 2);
		}

	    else if (level >= 60 && level < 80) {
			itemIndex = randomInt(0, 3);

	    }

	    else if (level >= 80 && level < 100) {
			itemIndex = randomInt(0, 4);

	    }
	    else {
			itemIndex = randomInt(0, currentItems.length - 1);
	    }

	    return (currentItems[itemIndex]);
      
	}

	randomWeapon(level) {
	 
	  // consumable or resources
	  // choose random category, select level of item
	  	let categoryIndex = 3
  		let subCategoryIndex = 0;
  		let itemIndex = randomInt(0, 1);

  		if (level >= 0 && level < 20) {
  			subCategoryIndex = 0;
	  	}

		else if (level >= 20 && level < 40) {
			subCategoryIndex = randomInt(0, 1);
		}

		else if (level >= 40 && level < 60) {
			subCategoryIndex = randomInt(0, 2);
		}

	    else if (level >= 60 && level < 80) {
			subCategoryIndex = randomInt(0, 3);

	    }

	    else if (level >= 80 && level < 100) {
			subCategoryIndex = randomInt(0, 4);

	    }
	    else {
			subCategoryIndex = randomInt(0, 4);
	    }

		return (this.returnOneItem(categoryIndex, subCategoryIndex, itemIndex));      
	}

	randomFood(level) {
		let categoryIndex = 0
  		let subCategoryIndex = 1;
		let itemIndex = 0
		if (level >= 0 && level < 20) {
  			itemIndex = 0;
	  	}
		else if (level >= 20 && level < 40) {
			itemIndex = 1
		}

		else if (level >= 40 && level < 60) {
			itemIndex = 3
		}

	    else if (level >= 60 && level < 80) {
			itemIndex = 4

	    }

	    else if (level >= 80 && level < 100) {
			itemIndex = 2

	    }
	    else {
			itemIndex = 2
	    }
	    return (this.returnOneItem(categoryIndex, subCategoryIndex, itemIndex));      

	}

	addToCategories(name, settings) {
		this.categories.push(new Category(name, this.totalCategories, settings))
		this.totalCategories++;
	}

	listCategories() {
		let count = this.categories.length
		for (let x = 0; x < count; x++) {
			console.log(this.categories[x].name);
			console.log(this.categories[x].id);

		}
	}

	returnCategorySettings(index) {
		return this.categories[index].settings;
	}

	listSubCategories(index) {
		this.categories[index].listSubCategories();

	}

	returnSubCategories(index) {
		return(this.categories[index].returnSubCategories());
	}

	returnSubCategorySettings(categoryIndex, index) {
		return (this.categories[categoryIndex].returnSubCategorySettings(index));
	}


	returnItems(index, subCategoryIndex) {
		return (this.categories[index].returnItems(subCategoryIndex));
	}

	returnOneItem(index, subCategoryIndex, itemIndex) {
		return (this.categories[index].returnOneItem(subCategoryIndex, itemIndex));
	}

	returnItemNames(index, subCategoryIndex) {
		return (this.categories[index].returnItemNames(subCategoryIndex));
	}

	returnItemsByName(category, subcategory) {
		return (this.categories[category].subcategory[subcategory]);
	}

	createCategories() {

		const consumeableSettings = {
			buyable : true,
			craftable : true

		}
		const resourceSettings = {
			buyable: false,
			craftable : true
			
		}
		const armorSettings = {
			buyable: true,
			craftable: true,
			
		}
		const weaponSettings = {
			buyable: true,
			craftable: true,
		}

		const magicSettings = {
			buyable: false,
			craftable: false,
		}

		this.addToCategories("Consumeable", consumeableSettings);
		this.addToCategories("Resources", resourceSettings);
		this.addToCategories("Armor", armorSettings);
		this.addToCategories("Weapon", weaponSettings);
		this.addToCategories("Magic", magicSettings);

	}

	createSubCategories() {

		const foodSettings = {
			buyable : false,
			useable : true,
			craftable : false,
		}

		const potionSettings = {
			buyable : true,
			useable : true,
			craftable : true,
		}

		const cookFoodSettings = {
			buyable : false,
			useable : true,
			craftable : true,
		}


		const resourceSettings = {
			buyable : false,
			useable : false,
			craftable : false,
		}

		const barSettings = {
			buyable : false,
			useable : false,
			craftable : true
		}

		const weaponSettings = {
			buyable : true,
			useable : false,
			craftable : true
		}

		const armorSettings = {
			buyable : true,
			useable : false,
			craftable : true
		}

		const magicSettings = {
			buyable : false,
			useable : false,
			craftable : false
		}

		this.categories[0].addSubCategory("Potion", this.totalSubCategories++, potionSettings);
		this.categories[0].addSubCategory("Food", this.totalSubCategories++, foodSettings);
		this.categories[0].addSubCategory("Water", this.totalSubCategories++, foodSettings);
		this.categories[0].addSubCategory("Cooked Food", this.totalSubCategories++, cookFoodSettings);
		this.categories[0].addSubCategory("Plants", this.totalSubCategories++, foodSettings);

		this.categories[1].addSubCategory("Ores", this.totalSubCategories++, resourceSettings);
		this.categories[1].addSubCategory("WoodCutting", this.totalSubCategories++, resourceSettings);
		this.categories[1].addSubCategory("Gathering", this.totalSubCategories++, resourceSettings);
		this.categories[1].addSubCategory("Bars", this.totalSubCategories++, barSettings);


		this.categories[2].addSubCategory("Bronze", this.totalSubCategories++, armorSettings);
		this.categories[2].addSubCategory("Iron", this.totalSubCategories++, armorSettings);
		this.categories[2].addSubCategory("Gold", this.totalSubCategories++, armorSettings);
		this.categories[2].addSubCategory("Platinum", this.totalSubCategories++, armorSettings);
		this.categories[2].addSubCategory("Diamond", this.totalSubCategories++, armorSettings);

		this.categories[3].addSubCategory("Bronze", this.totalSubCategories++, weaponSettings);
		this.categories[3].addSubCategory("Iron", this.totalSubCategories++, weaponSettings);
		this.categories[3].addSubCategory("Gold", this.totalSubCategories++, weaponSettings);
		this.categories[3].addSubCategory("Platinum", this.totalSubCategories++, weaponSettings);
		this.categories[3].addSubCategory("Diamond", this.totalSubCategories++, weaponSettings);
		this.categories[3].addSubCategory("Bow", this.totalSubCategories++, weaponSettings);
		this.categories[3].addSubCategory("Arrows", this.totalSubCategories++, weaponSettings);

		this.categories[4].addSubCategory("Magic", this.totalSubCategories++, magicSettings);

	}


	addConsumeableItemsToSubcategory() {
		this.totalItems = this.categories[0].subcategory[0].addItems(potions, this.totalItems);
		this.totalItems = this.categories[0].subcategory[1].addItems(food, this.totalItems);
		this.totalItems = this.categories[0].subcategory[2].addItems(drinks, this.totalItems);
		this.totalItems = this.categories[0].subcategory[3].addItems(cookedFood, this.totalItems);
		this.totalItems = this.categories[0].subcategory[4].addItems(plants, this.totalItems);


	}

	addMagicItemsToSubcategory() {
		this.totalItems = this.categories[4].subcategory[0].addMagicItems(magicItems, this.totalItems);
	}

	addResourceItemsToSubcategory() {
		this.totalItems = this.categories[1].subcategory[0].addItems(Ore, this.totalItems);
		this.totalItems = this.categories[1].subcategory[1].addItems(Wood, this.totalItems);
		this.totalItems = this.categories[1].subcategory[2].addItems(Seeds, this.totalItems);
		this.totalItems = this.categories[1].subcategory[3].addItems(Bar, this.totalItems);

	}


	addArmorItemsToSubcategory() {
		this.totalItems = this.categories[2].subcategory[0].addWeaponAndArmorItems(BronzeArmor, this.totalItems);

		this.totalItems = this.categories[2].subcategory[1].addWeaponAndArmorItems(IronArmor, this.totalItems);

		this.totalItems = this.categories[2].subcategory[2].addWeaponAndArmorItems(GoldArmor, this.totalItems);

		this.totalItems = this.categories[2].subcategory[3].addWeaponAndArmorItems(PlatinumArmor, this.totalItems);

		this.totalItems = this.categories[2].subcategory[4].addWeaponAndArmorItems(DiamondArmor, this.totalItems);
	}

	addWeaponItemsToSubcategory() {
		this.totalItems = this.categories[3].subcategory[0].addWeaponAndArmorItems(BronzeWeapons, this.totalItems);

		this.totalItems = this.categories[3].subcategory[1].addWeaponAndArmorItems(IronWeapons, this.totalItems);

		this.totalItems = this.categories[3].subcategory[2].addWeaponAndArmorItems(GoldWeapons, this.totalItems);

		this.totalItems = this.categories[3].subcategory[3].addWeaponAndArmorItems(PlatinumWeapons, this.totalItems);

		this.totalItems = this.categories[3].subcategory[4].addWeaponAndArmorItems(DiamondWeapons, this.totalItems);
		this.totalItems = this.categories[3].subcategory[5].addWeaponAndArmorItems(rangeWeapons, this.totalItems);
		this.totalItems = this.categories[3].subcategory[6].addWeaponAndArmorItems(arrows, this.totalItems);

	}

	



}
