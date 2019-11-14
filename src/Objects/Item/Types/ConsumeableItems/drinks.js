import ItemTemplate from '../ItemTemplate.js'

import {itemImages} from "../../../Animations/images"


let drinks = [

	{
		info : new ItemTemplate({ 
			name: "Water (T)", 
			img: itemImages.water.tiny, 
			use: function(skill) { 
				skill.thirst.giveLimit(1)
				skill.thirst.addXp(1)
            	return ({skill: skill, description: "Drink Up", used: true});
			}
		})
	},

	{
		info : new ItemTemplate({ 
			name: "Water (S)", 
			img: itemImages.water.small,
			use: function(skill) {
				skill.thirst.giveLimit(2)
				skill.thirst.addXp(2)
            	return ({skill: skill, description: "Drink Up", used: true});
			}
		})
	},
	{
		info : new ItemTemplate({ 
			name: "Water (M)", 
			img: itemImages.water.medium,
			use: function(skill) {
				skill.thirst.giveLimit(4)
				skill.thirst.addXp(4)
            	return ({skill: skill, description: "Drink Up", used: true});
			}
		})
	},
	{
		info : new ItemTemplate({ 
			name: "Water (L)", 
			img: itemImages.water.large,
			use: function(skill) {
				skill.thirst.giveLimit(8)
				skill.thirst.addXp(8)
            	return ({skill: skill, description: "Drink Up", used: true});
			}
		})
	},
	{
		info : new ItemTemplate({ 
			name: "Water (G)", 
			img: itemImages.water.giant,
			use: function(skill) {
				skill.thirst.giveLimit(16)
				skill.thirst.addXp(16)
            	return ({skill: skill, description: "Drink Up", used: true});
			}
		})
	},
	{
		info : new ItemTemplate({ 
			name: "Water (GD)", 
			img: itemImages.water.god,
			use: function(skill) {
				skill.thirst.giveLimit(32)
				skill.thirst.addXp(32)
            	return ({skill: skill, description: "Drink Up", used: true});
			}
		})
	},


]

export default drinks
