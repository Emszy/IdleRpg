import ItemTemplate from '../ItemTemplate.js'
import {cookedFood} from "./food"
import {itemImages} from "../../../Animations/images"

let potions = [

	{
		info : new ItemTemplate({
			name: "Potion (T)",
			price: 100,
			img: itemImages.potion.tiny,
			use: function(skill) {
				skill.health.giveLimit(20)
            	return ({skill: skill, description: "Quick health", used: true});;
			}, 
			recipe: [{item: cookedFood[0].info, quantity: 3}, {item: cookedFood[5].info, quantity: 5}]
		})
	},

	{
		info : new ItemTemplate({
			name: "Potion (S)",
			price: 500,
			img: itemImages.potion.small,
			use: function(skill) {
				skill.health.giveLimit(100)
            	return ({skill: skill, description: "Quick health", used: true});;
			},
			recipe: [{item: cookedFood[1].info, quantity: 3}, {item: cookedFood[6].info, quantity: 5}]
		})
	},
	{
		info : new ItemTemplate({
			name: "Potion (M)",
			price: 1500,
			img: itemImages.potion.medium,
			use: function(skill) {
				skill.health.giveLimit(500)
            	return ({skill: skill, description: "Quick health", used: true});;
			},
			recipe: [{item: cookedFood[2].info, quantity: 3}, {item: cookedFood[7].info, quantity: 5}]
		})
	},
	{
		info : new ItemTemplate({
			name: "Potion (L)",
			price: 3000,
			img: itemImages.potion.large,
			use: function(skill) {
				skill.health.giveLimit(1000)
            	return ({skill: skill, description: "Quick health", used: true});;
			}, 
			recipe: [{item: cookedFood[3].info, quantity: 3}, {item: cookedFood[8].info, quantity: 5}]
		})
	},
	{
		info : new ItemTemplate({
			name: "Potion (G)",
			price: 6000,
			img: itemImages.potion.giant,
			use: function(skill) {
				skill.health.giveLimit(2000)
            	return ({skill: skill, description: "Quick health", used: true});;
			}, 
			recipe: [{item: cookedFood[4].info, quantity: 3}, {item: cookedFood[9].info, quantity: 5}]
		})
	},
	{
		info : new ItemTemplate({
			name: "Potion (GD)",
			price: 10000,
			img: itemImages.potion.god,
			use: function(skill) {
				skill.health.giveLimit(5000)
            	return ({skill: skill, description: "Quick health", used: true});;
			}, 
			recipe: [{item: cookedFood[4].info, quantity: 1}, {item: cookedFood[10].info, quantity: 20}]
		})
	},

]

export default potions
