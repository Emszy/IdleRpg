import ItemTemplate from '../ItemTemplate.js'
import {itemImages} from "../../../Animations/images"


let food = [

	{
		info : new ItemTemplate({ 
			name: "Chicken", 
			price : 100, 
			img: itemImages.rawMeat.chicken,
				use : function(skill) {
	            	return ({skill: skill, description: "Used In Cooking", used: false});
	            }
			})
	},

	{
		info : new ItemTemplate({ 
			name: "Cow", 
			price : 500, 
			img: itemImages.rawMeat.cow,
				use : function(skill) {
	            	return ({skill: skill, description: "Used In Cooking", used: false});
	            }
			})
	},
	{
		info : new ItemTemplate({ 
			name: "Llama", 
			price : 1500, 
			img: itemImages.rawMeat.llama,
				use : function(skill) {
	            	return ({skill: skill, description: "Used In Cooking", used: false});
	            }
			})
	},
	{
		info : new ItemTemplate({ 
			name: "Pig", 
			price : 3000, 
			img: itemImages.rawMeat.pig,
				use : function(skill) {
	            	return ({skill: skill, description: "Used In Cooking", used: false});
	            }
			})
	},
	{
		info : new ItemTemplate({ 
			name: "Turkey", 
			price : 6000, 
			img: itemImages.rawMeat.turkey,
				use : function(skill) {
	            	return ({skill: skill, description: "Used In Cooking", used: false});
	            }
			})
	},
]

let plants = [
		{
			info : new ItemTemplate({ 
				name: "Carrot", 
				price : 1000, 
				img: itemImages.plants.carrot,
				use : function() {
	            	return ({description: "Used For Farming carrots", used: false});
	        	}
			})
		},

		{
			info : new ItemTemplate({ 
				name: "Potatoes", 
				price : 1500, 
				img: itemImages.plants.potatoes,
				use : function() {
	            	return ({description: "Used For Farming Potatoes", used: false});
	        	}
			})
		},
		{
			info : new ItemTemplate({ 
				name: "Corn", 
				price : 1300, 
				img: itemImages.plants.corn,
				use : function() {
	            	return ({description: "Used For Farming Corn", used: false});
	        	}
			})
		},
		{
			info : new ItemTemplate({ 
				name: "cucumber", 
				price : 800, 
				img: itemImages.plants.cucumber,
				use : function() {
	            	return ({description: "Used For Farming Cucumber", used: false});
	        	}
			})
		},

		{
			info : new ItemTemplate({ 
				name: "Tomatoes", 
				price : 800, 
				img: itemImages.plants.tomatoes,
				use : function() {
	            	return ({description: "Used For Farming Tomatoes", used: false});
	        	}
			})
		},
		{
			info : new ItemTemplate({ 
				name: "Artichoke", 
				price : 800, 
				img: itemImages.plants.artichoke,
				use : function() {
	            	return ({description: "Used For Farming Artichoke", used: false});
	        	}
			})
		}]


let cookedFood = [

	{
		info : new ItemTemplate({ 
			name: "Chicken (C)", 
			price : 100, 	
			img: itemImages.cookedMeat.chicken,
			use : function(skill) {
				skill.hunger.giveLimit(100)
            	return ({skill: skill, description: "Eat Up", used: true});
            },
			recipe: [{item: food[0].info, quantity: 1}]
		})
	},

	{
		info : new ItemTemplate({ 
			name: "Cow (C)", 
			price : 500, 	
			img: itemImages.cookedMeat.cow,
			use : function(skill) {
				skill.hunger.giveLimit(500)
            	return ({skill: skill, description: "Eat Up", used: true});
            },
			recipe: [{item: food[1].info, quantity: 1}]
		})
	},
	{
		info : new ItemTemplate({ 
			name: "Llama (C)", 
			price : 1500, 	
			img: itemImages.cookedMeat.llama,
			use : function(skill) {
				skill.hunger.giveLimit(1000)
            	return ({skill: skill, description: "Eat Up", used: true});
            },
			recipe: [{item: food[2].info, quantity: 1}]
		})
	},
	{
		info : new ItemTemplate({ 
			name: "Pig (C)", 
			price : 3000, 	
			img: itemImages.cookedMeat.pig,
			use : function(skill) {
				skill.hunger.giveLimit(2000)
            	return ({skill: skill, description: "Eat Up", used: true});
            },
			recipe: [{item: food[3].info, quantity: 1}]
		})
	},
	{
		info : new ItemTemplate({ 
			name: "Turkey (C)", 
			price : 6000, 	
			img: itemImages.cookedMeat.turkey,
			use : function(skill) {
				skill.hunger.giveLimit(4000)
            	return ({skill: skill, description: "Eat Up", used: true});
            },
			recipe: [{item: food[4].info, quantity: 1}]
		})
	},
	{
		info : new ItemTemplate({ 
			name: "Carrots (C)", 
			price : 100, 	
			img: itemImages.cookedPlants.carrot,
			use : function(skill) {
				skill.hunger.giveLimit(200)
            	return ({skill: skill, description: "Eat Up", used: true});
            },
			recipe: [{item: plants[0].info, quantity: 1}]
		})
	},
	{
		info : new ItemTemplate({ 
			name: "Potatoes (C)", 
			price : 100, 	
			img: itemImages.cookedPlants.potatoes,
			use : function(skill) {
				skill.hunger.giveLimit(200)
            	return ({skill: skill, description: "Eat Up", used: true});
            },
			recipe: [{item: plants[1].info, quantity: 1}]
		})
	},
	{
		info : new ItemTemplate({ 
			name: "Corn (C)", 
			price : 100, 	
			img: itemImages.cookedPlants.corn,
			use : function(skill) {
				skill.hunger.giveLimit(200)
            	return ({skill: skill, description: "Eat Up", used: true});
            },
			recipe: [{item: plants[2].info, quantity: 1}]
		})
	},
	{
		info : new ItemTemplate({ 
			name: "Cucumber (C)", 
			price : 100, 
			img: itemImages.cookedPlants.cucumber,
			use : function(skill) {
				skill.hunger.giveLimit(200)
            	return ({skill: skill, description: "Eat Up", used: true});
            },
			recipe: [{item: plants[3].info, quantity: 1}]
		})
	},
	{
		info : new ItemTemplate({ 
			name: "Tomatoes (C)", 
			price : 100, 
			img: itemImages.cookedPlants.tomatoes,
			use : function(skill) {
				skill.hunger.giveLimit(200)
            	return ({skill: skill, description: "Eat Up", used: true});
            },
			recipe: [{item: plants[4].info, quantity: 1}]
		})
	},
	{
		info : new ItemTemplate({ 
			name: "Artichoke (C)", 
			price : 100, 
			img: itemImages.cookedPlants.artichoke,
			use : function(skill) {
				skill.hunger.giveLimit(200)
            	return ({skill: skill, description: "Eat Up", used: true});
            },
			recipe: [{item: plants[5].info, quantity: 1}]
		})
	},
]

export {
		food,
		cookedFood,
		plants
	}
