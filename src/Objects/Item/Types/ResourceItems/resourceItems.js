import ItemTemplate from '../ItemTemplate.js'

import {plants} from "../ConsumeableItems/food"
import {farmPlants, itemImages} from "../../../Animations/images"
import ResourceAnimation from "../../../Animations/resourceAnimation"

let Ore = [
	{
		info : new ItemTemplate("Ore (T)", 0, false, itemImages.ore.tin,
		function() {
			return ({description: "Used to Craft Armor and Weapons", used: false});
		})
	},

	{
		info : new ItemTemplate("Ore (C)", 0, false, itemImages.ore.copper,
		function() {
			return ({description: "Used to Craft Armor and Weapons", used: false});
		})
	},

	{
		info : new ItemTemplate("Ore (I)", 0, false, itemImages.ore.iron,
		function() {
			return ({description: "Used to Craft Armor and Weapons", used: false});
		})
	},
	{
		info : new ItemTemplate("Ore (G)", 0, false, itemImages.ore.gold,
		function() {
			return ({description: "Used to Craft Armor and Weapons", used: false});
		})
	},
	{
		info : new ItemTemplate("Ore (P)", 0, false, itemImages.ore.platinum,
		function() {
			return ({description: "Used to Craft Armor and Weapons", used: false});
		})
	},
	{
		info : new ItemTemplate("Diamond", 0, false, itemImages.ore.diamond,
		function() {
			return ({description: "Used To Craft The Best Armor and Weapons", used: false});
		})
	},

]

let Bar = [
	{
		info : new ItemTemplate("Bar (B)", 0, false, itemImages.bar.bronze,
		function() {
			return ({description: "Used To Create Armor and Weapons", used: false});
		},[{item: Ore[0].info, quantity:5}, {item: Ore[1].info, quantity:5}])
	},
	{
		info : new ItemTemplate("Bar (I)", 0, false, itemImages.bar.iron,
		function() {
			return ({description: "Used To Create Armor and Weapons", used: false});
		},[{item: Ore[2].info, quantity: 10}])
	},

	{
		info : new ItemTemplate("Bar (G)", 0, false, itemImages.bar.gold,
		function() {
			return ({description: "Used To Create Armor and Weapons", used: false});
		},[{item: Ore[3].info, quantity: 10}])
	},
	{
		info : new ItemTemplate("Bar (P)", 0, false, itemImages.bar.platinum,
		function() {
			return ({description: "Used To Create Armor and Weapons", used: false});
		},[{item: Ore[4].info, quantity: 10}])
	},
	{
		info : new ItemTemplate("Diamond Brick", 0, false, itemImages.bar.diamond,
		function() {
			return ({description: "Used To Craft Diamond Armor", used: false});
		},[{item: Ore[5].info, quantity:10}])
	},

]


let Wood = [
	{
		info : new ItemTemplate("Log (O)", 0, false, itemImages.wood.oak,
		function() {
            return ({description: "Used to Fletch weapon Handles", used: false});
		})
	},

	{
		info : new ItemTemplate("Log (M)", 0, false, itemImages.wood.maple,
		function() {
            return ({description: "Used to Fletch weapon Handles", used: false});
		})
	},
	{
		info : new ItemTemplate("Log (MO)", 0, false, itemImages.wood.mahogony,
		function() {
            return ({description: "Used to Fletch weapon Handles", used: false});
		})
	},
	{
		info : new ItemTemplate("Log (MA)", 0, false, itemImages.wood.magic,
		function() {
            return ({description: "Used to Fletch weapon Handles", used: false});
		})
	},
	{
		info : new ItemTemplate("Log (SU)", 0, false, itemImages.wood.super,
		function() {
            return ({description: "Used to Fletch weapon Handles", used: false});
		})
	},

]

let Seeds = [
	{
		info : new ItemTemplate("Seeds (C)", 0, new ResourceAnimation(farmPlants.carrot), itemImages.seed.carrot,
		function() {
			let item = plants[0].info.copy();
			item.quantity = 10;
            return ({item : item, description: "Used For Farming carrots", used: false});
		})
	},

	{
		info : new ItemTemplate("Seeds (P)", 0, new ResourceAnimation(farmPlants.potatoe), itemImages.seed.potato,
		function() {
			let item = plants[1].info.copy();
			item.quantity = 10;

            return ({item : item, description: "Used For Farming Potatoes", used: false});
		})
	},
	{
		info : new ItemTemplate("Seeds (CO)", 0, new ResourceAnimation(farmPlants.corn), itemImages.seed.corn,
		function() {
			let item = plants[2].info.copy();
			item.quantity = 10;
            return ({item : item, description: "Used For Farming Corn", used: false});
		})
	},
	{
		info : new ItemTemplate("Seeds (CU)", 0, new ResourceAnimation(farmPlants.cucumber), itemImages.seed.cucumber,
		function() {
			let item = plants[3].info.copy();
			item.quantity = 10;
            return ({item : item, description: "Used For Farming Cucumber", used: false});
		})
	},

	{
		info : new ItemTemplate("Seeds (T)", 0, new ResourceAnimation(farmPlants.tomato), itemImages.seed.tomato,
		function() {
			let item = plants[4].info.copy();
			item.quantity = 10;
            return ({item : item, description: "Used For Farming Tomatoes", used: false});
		})
	},
	{
		info : new ItemTemplate("Seeds (A)", 0, new ResourceAnimation(farmPlants.artichoke), itemImages.seed.artichoke,
		function() {
			let item = plants[5].info.copy();
			item.quantity = 10;
            return ({item : item, description: "Used For Farming Artichoke", used: false});
		})
	},

]




export {
	 Ore,
	 Bar,
	 Wood,
	 Seeds
}

