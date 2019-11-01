import ItemTemplate from '../ItemTemplate.js'
import {itemImages} from "../../../Animations/images"


let food = [

	{
		info : new ItemTemplate("Chicken", 100, false, itemImages.rawMeat.chicken,
		function(skill) {
            return ({skill: skill, description: "Used In Cooking", used: false});
		})
	},

	{
		info : new ItemTemplate("Cow", 500, false, itemImages.rawMeat.cow,
		function(skill) {
            return ({skill: skill, description: "Used In Cooking", used: false});
		})
	},
	{
		info : new ItemTemplate("Llama", 1500, false, itemImages.rawMeat.llama,
		function(skill) {
            return ({skill: skill, description: "Used In Cooking", used: false});
		})
	},
	{
		info : new ItemTemplate("Pig", 3000, false, itemImages.rawMeat.pig,
		function(skill) {
            return ({skill: skill, description: "Used In Cooking", used: false});
		})
	},
	{
		info : new ItemTemplate("Turkey", 6000, false, itemImages.rawMeat.turkey,
		function(skill) {
            return ({skill: skill, description: "Used In Cooking", used: false});
		})
	},
]

let plants = [
		{
			info : new ItemTemplate("Carrot", 1000, false, itemImages.plants.carrot,
			function() {
	            return ({description: "Used For Farming carrots", used: false});
			})
		},

		{
			info : new ItemTemplate("Potatoes", 1500, false, itemImages.plants.potatoes,
			function() {
	            return ({description: "Used For Farming Potatoes", used: false});
			})
		},
		{
			info : new ItemTemplate("Corn", 1300, false, itemImages.plants.corn,
			function() {
	            return ({description: "Used For Farming Corn", used: false});
			})
		},
		{
			info : new ItemTemplate("cucumber", 800, false, itemImages.plants.cucumber,
			function() {
	            return ({description: "Used For Farming Cucumber", used: false});
			})
		},

		{
			info : new ItemTemplate("Tomatoes", 800, false, itemImages.plants.tomatoes,
			function() {
	            return ({description: "Used For Farming Tomatoes", used: false});
			})
		},
		{
			info : new ItemTemplate("Artichoke", 800, false, itemImages.plants.artichoke,
			function() {
	            return ({description: "Used For Farming Artichoke", used: false});
			})
		}]


let cookedFood = [

	{
		info : new ItemTemplate("Chicken (C)", 100, false, itemImages.cookedMeat.chicken,
		function(skill) {
			skill.hunger.giveLimit(100)
            return ({skill: skill, description: "Eat Up", used: true});
		}, [{item: food[0].info, quantity: 1}])
	},

	{
		info : new ItemTemplate("Cow (C)", 500, false, itemImages.cookedMeat.cow,
		function(skill) {
			skill.hunger.giveLimit(500)
            return ({skill: skill, description: "Eat Up", used: true});
		}, [{item: food[1].info, quantity: 1}])
	},
	{
		info : new ItemTemplate("Llama (C)", 1500, false, itemImages.cookedMeat.llama,
		function(skill) {
			skill.hunger.giveLimit(1000)
            return ({skill: skill, description: "Eat Up", used: true});
		}, [{item: food[2].info, quantity: 1}])
	},
	{
		info : new ItemTemplate("Pig (C)", 3000, false, itemImages.cookedMeat.pig,
		function(skill) {
			skill.hunger.giveLimit(2000)
            return ({skill: skill, description: "Eat Up", used: true});
		}, [{item: food[3].info, quantity: 1}])
	},
	{
		info : new ItemTemplate("Turkey (C)", 6000, false, itemImages.cookedMeat.turkey,
		function(skill) {
			skill.hunger.giveLimit(4000)
            return ({skill: skill, description: "Eat Up", used: true});
		}, [{item: food[4].info, quantity: 1}])
	},
	{
		info : new ItemTemplate("Carrots (C)", 100, false, itemImages.cookedPlants.carrot,
		function(skill) {
			skill.hunger.giveLimit(200)
            return ({skill: skill, description: "Eat Up", used: true});
		}, [{item: plants[0].info, quantity: 1}])
	},
	{
		info : new ItemTemplate("Potatoes (C)", 100, false, itemImages.cookedPlants.potatoes,
		function(skill) {
			skill.hunger.giveLimit(200)
            return ({skill: skill, description: "Eat Up", used: true});
		}, [{item: plants[1].info, quantity: 1}])
	},
	{
		info : new ItemTemplate("Corn (C)", 100, false, itemImages.cookedPlants.corn,
		function(skill) {
			skill.hunger.giveLimit(200)
            return ({skill: skill, description: "Eat Up", used: true});
		}, [{item: plants[2].info, quantity: 1}])
	},
	{
		info : new ItemTemplate("Cucumber (C)", 100, false, itemImages.cookedPlants.cucumber,
		function(skill) {
			skill.hunger.giveLimit(200)
            return ({skill: skill, description: "Eat Up", used: true});
		}, [{item: plants[3].info, quantity: 1}])
	},
	{
		info : new ItemTemplate("Tomatoes (C)", 100, false, itemImages.cookedPlants.tomatoes,
		function(skill) {
			skill.hunger.giveLimit(200)
            return ({skill: skill, description: "Eat Up", used: true});
		}, [{item: plants[4].info, quantity: 1}])
	},
	{
		info : new ItemTemplate("Artichoke (C)", 100, false, itemImages.cookedPlants.artichoke,
		function(skill) {
			skill.hunger.giveLimit(200)
            return ({skill: skill, description: "Eat Up", used: true});
		}, [{item: plants[5].info, quantity: 1}])
	},
]

export {
		food,
		cookedFood,
		plants
	}
