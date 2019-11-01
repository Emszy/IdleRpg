import ItemTemplate from '../ItemTemplate.js'

import {itemImages} from "../../../Animations/images"


let drinks = [

	{
		info : new ItemTemplate("Water (T)", 0, false, itemImages.water.tiny, 
		function(skill) { 
			skill.thirst.giveLimit(1)
			skill.thirst.addXp(1)
            return ({skill: skill, description: "Drink Up", used: true});
		})
	},

	{
		info : new ItemTemplate("Water (S)", 0, false, itemImages.water.small,
		function(skill) {
			skill.thirst.giveLimit(2)
			skill.thirst.addXp(2)
            return ({skill: skill, description: "Drink Up", used: true});
		})
	},
	{
		info : new ItemTemplate("Water (M)", 0, false, itemImages.water.medium,
		function(skill) {
			skill.thirst.giveLimit(4)
			skill.thirst.addXp(4)
            return ({skill: skill, description: "Drink Up", used: true});
		})
	},
	{
		info : new ItemTemplate("Water (L)", 0, false, itemImages.water.large,
		function(skill) {
			skill.thirst.giveLimit(8)
			skill.thirst.addXp(8)
            return ({skill: skill, description: "Drink Up", used: true});
		})
	},
	{
		info : new ItemTemplate("Water (G)", 0, false, itemImages.water.giant,
		function(skill) {
			skill.thirst.giveLimit(16)
			skill.thirst.addXp(16)
            return ({skill: skill, description: "Drink Up", used: true});
		})
	},
	{
		info : new ItemTemplate("Water (GD)", 0, false, itemImages.water.god,
		function(skill) {
			skill.thirst.giveLimit(32)
			skill.thirst.addXp(32)
            return ({skill: skill, description: "Drink Up", used: true});
		})
	},


]

export default drinks
