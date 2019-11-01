import ItemTemplate from '../ItemTemplate.js'
import {cookedFood} from "./food"
import {itemImages} from "../../../Animations/images"

let potions = [

	{
		info : new ItemTemplate("Potion (T)", 100, false, itemImages.potion.tiny,
		function(skill) {
			skill.health.giveLimit(20)
            return ({skill: skill, description: "Quick health", used: true});;
		}, [{item: cookedFood[0].info, quantity: 3}, {item: cookedFood[5].info, quantity: 5}])
	},

	{
		info : new ItemTemplate("Potion (S)", 500, false, itemImages.potion.small,
		function(skill) {
			skill.health.giveLimit(100)
            return ({skill: skill, description: "Quick health", used: true});;
		},[{item: cookedFood[1].info, quantity: 3}, {item: cookedFood[6].info, quantity: 5}])
	},
	{
		info : new ItemTemplate("Potion (M)", 1500, false, itemImages.potion.medium,
		function(skill) {
			skill.health.giveLimit(500)
            return ({skill: skill, description: "Quick health", used: true});;
		},[{item: cookedFood[2].info, quantity: 3}, {item: cookedFood[7].info, quantity: 5}])
	},
	{
		info : new ItemTemplate("Potion (L)", 3000, false, itemImages.potion.large,
		function(skill) {
			skill.health.giveLimit(1000)
            return ({skill: skill, description: "Quick health", used: true});;
		}, [{item: cookedFood[3].info, quantity: 3}, {item: cookedFood[8].info, quantity: 5}])
	},
	{
		info : new ItemTemplate("Potion (G)", 6000, false, itemImages.potion.giant,
		function(skill) {
			skill.health.giveLimit(2000)
            return ({skill: skill, description: "Quick health", used: true});;
		}, [{item: cookedFood[4].info, quantity: 3}, {item: cookedFood[9].info, quantity: 5}])
	},
	{
		info : new ItemTemplate("Potion (GD)", 10000, false, itemImages.potion.god,
		function(skill) {
			skill.health.giveLimit(5000)
            return ({skill: skill, description: "Quick health", used: true});;
		}, [{item: cookedFood[4].info, quantity: 1}, {item: cookedFood[10].info, quantity: 20}])
	},

]

export default potions
