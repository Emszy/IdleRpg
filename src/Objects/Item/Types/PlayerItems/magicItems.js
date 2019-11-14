import ItemTemplate from '../ItemTemplate.js'
import {magicImages} from "../../../Animations/images"

let magicItems = [
	{
		info : new ItemTemplate({ 
			name: "Teleport\nStone", 
			price: 0, 
			img: magicImages.teleportStone,
			use: function(player, level) {
				if (level === 0) {
					player.currLevel = 0
				} else {
					player.currLevel = player.currLevel + level;
				}
				player.teleported = true;
				return {used:false}
			}
		})
	},
	{
		info : new ItemTemplate({ 
			name: "Shield\nStone", 
			price: 0, 
			img: magicImages.defenseStone,
			use: function(player, level) {
				player.skills.defense.boost = level;
				return {used:false}
			}
		})
	},

	{
		info : new ItemTemplate({ 
			name: "Attack\nStone", 
			price: 0, 
			img: magicImages.attackStone,
			use: function(player, level) {
				player.skills.attack.boost = level;
			}

		})
	},

	{
		info : new ItemTemplate({ 
			name: "Archer\nStone", 
			price: 0, 
			img: magicImages.rangeStone,
			use: function(player, level) {
				player.skills.range.boost = level;
			}

		})
	},
	{
		info : new ItemTemplate({ 
			name: "Mining\nStone", 
			price: 0, 
			img: magicImages.miningStone,
			use: function(player, level) {
				player.skills.mining.boost = level;
			}

		})
	},
	{
		info : new ItemTemplate({ 
			name: "Hunting\nStone", 
			price: 0, 
			img: magicImages.huntingStone,
			use: function(player, level) {
				player.skills.hunting.boost = level;
			}

		})
	},
	{
		info : new ItemTemplate({ 
			name: "WoodCutting\nStone", 
			price: 0, 
			img: magicImages.woodcutStone,
			use: function(player, level) {
				player.skills.woodcutting.boost = level;
			}

		})
	},
	
	

]


export {
	magicItems
}

