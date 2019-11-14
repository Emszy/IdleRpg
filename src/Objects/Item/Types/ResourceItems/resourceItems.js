import ItemTemplate from '../ItemTemplate.js'

import {plants} from "../ConsumeableItems/food"
import {farmPlants, itemImages} from "../../../Animations/images"
import ResourceAnimation from "../../../Animations/resourceAnimation"

let Ore = [
	{
		info : new ItemTemplate({
			name: "Ore (T)", 
			img: itemImages.ore.tin,
			use : function() {
				return ({description: "Used to Craft Armor and Weapons", used: false});
			}
		})
	},

	{
		info : new ItemTemplate({
			name: "Ore (C)", 
			img: itemImages.ore.copper,
			use : function() {
				return ({description: "Used to Craft Armor and Weapons", used: false});
			}
		})
	},

	{
		info : new ItemTemplate({
			name: "Ore (I)", 
			img: itemImages.ore.iron,
			use : function() {
				return ({description: "Used to Craft Armor and Weapons", used: false});
			}
		})
	},
	{
		info : new ItemTemplate({
			name: "Ore (G)", 
			img: itemImages.ore.gold,
			use : function() {
				return ({description: "Used to Craft Armor and Weapons", used: false});
			}
		})
	},
	{
		info : new ItemTemplate({
			name: "Ore (P)", 
			img: itemImages.ore.platinum,
			use : function() {
				return ({description: "Used to Craft Armor and Weapons", used: false});
			}
		})
	},
	{
		info : new ItemTemplate({
			name: "Diamond", 
			img: itemImages.ore.diamond,
			use : function() {
				return ({description: "Used To Craft The Best Armor and Weapons", used: false});
			}
		})
	},

]

let Bar = [
	{
		info : new ItemTemplate({
			name: "Bar (B)", 
			img: itemImages.bar.bronze,
			use : function() {
				return ({description: "Used To Create Armor and Weapons", used: false});
			},
			recipe: [{item: Ore[0].info, quantity:5}, {item: Ore[1].info, quantity:5}]
		})
	},
	{
		info : new ItemTemplate({
			name: "Bar (I)", 
			img: itemImages.bar.iron,
			use : function() {
				return ({description: "Used To Create Armor and Weapons", used: false});
			},
			recipe: [{item: Ore[2].info, quantity: 10}]
		})
	},

	{
		info : new ItemTemplate({
			name: "Bar (G)", 
			img: itemImages.bar.gold,
			use : function() {
				return ({description: "Used To Create Armor and Weapons", used: false});
			},
			recipe: [{item: Ore[3].info, quantity: 10}]
		})
	},
	{
		info : new ItemTemplate({
			name: "Bar (P)", 
			img: itemImages.bar.platinum,
			use : function() {
				return ({description: "Used To Create Armor and Weapons", used: false});
			},
			recipe: [{item: Ore[4].info, quantity: 10}]
		})
	},
	{
		info : new ItemTemplate({
			name: "Diamond Brick", 
			img: itemImages.bar.diamond,
			use : function() {
				return ({description: "Used To Craft Diamond Armor", used: false});
			},
			recipe: [{item: Ore[5].info, quantity:10}]
		})
	},

]


let Wood = [
	{
		info : new ItemTemplate({
			name: "Log (O)", 
			img: itemImages.wood.oak,
			use : function() {
            	return ({description: "Used to Fletch weapon Handles", used: false});
			}
		})
	},

	{
		info : new ItemTemplate({
			name: "Log (M)", 
			img: itemImages.wood.maple,
			use : function() {
            	return ({description: "Used to Fletch weapon Handles", used: false});
			}
		})
	},
	{
		info : new ItemTemplate({
			name: "Log (MO)", 
			img: itemImages.wood.mahogony,
			use : function() {
            	return ({description: "Used to Fletch weapon Handles", used: false});
			}
		})
	},
	{
		info : new ItemTemplate({
			name: "Log (MA)", 
			img: itemImages.wood.magic,
			use : function() {
            	return ({description: "Used to Fletch weapon Handles", used: false});
			}
		})
	},
	{
		info : new ItemTemplate({
			name: "Log (SU)", 
			img: itemImages.wood.super,
			use : function() {
            	return ({description: "Used to Fletch weapon Handles", used: false});
			}
		})
	},

]

let Seeds = [
	{
		info : new ItemTemplate({
			name: "Seeds (C)", 
			animation: new ResourceAnimation(farmPlants.carrot), 
			img: itemImages.seed.carrot,
			use : function() {
				let item = plants[0].info.copy();
				item.quantity = 10;
            	return ({item : item, description: "Used For Farming carrots", used: false});
			}
		})
	},

	{
		info : new ItemTemplate({
			name: "Seeds (P)", 
			animation: new ResourceAnimation(farmPlants.potatoe), 
			img: itemImages.seed.potato,
			use : function() {
				let item = plants[1].info.copy();
				item.quantity = 	10;	

            return ({item : item, description: "Used For Farming Potatoes", used: false});
		}
		})
	},
	{
		info : new ItemTemplate({
			name: "Seeds (CO)", 
			animation: new ResourceAnimation(farmPlants.corn), 
			img: itemImages.seed.corn,
			use : function() {
				let item = plants[2].info.copy();
				item.quantity = 10;
            	return ({item : item, description: "Used For Farming Corn", used: false});
			}
		})
	},
	{
		info : new ItemTemplate({
			name: "Seeds (CU)", 
			animation: new ResourceAnimation(farmPlants.cucumber), 
			img: itemImages.seed.cucumber,
			use : function() {
				let item = plants[3].info.copy();
				item.quantity = 10;
            	return ({item : item, description: "Used For Farming Cucumber", used: false});
			}
		})
	},

	{
		info : new ItemTemplate({
			name: "Seeds (T)", 
			animation: new ResourceAnimation(farmPlants.tomato), 
			img: itemImages.seed.tomato,
			use : function() {
				let item = plants[4].info.copy();
				item.quantity = 10;
            	return ({item : item, description: "Used For Farming Tomatoes", used: false});
			}
		})
	},
	{
		info : new ItemTemplate({
			name: "Seeds (A)", 
			animation: new ResourceAnimation(farmPlants.artichoke), 
			img: itemImages.seed.artichoke,
			use : function() {
				let item = plants[5].info.copy();
				item.quantity = 10;
            	return ({item : item, description: "Used For Farming Artichoke", used: false});
			}
		})
	},

]




export {
	 Ore,
	 Bar,
	 Wood,
	 Seeds
}

