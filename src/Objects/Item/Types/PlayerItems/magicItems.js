import ItemTemplate from '../ItemTemplate.js'
import {magicImages} from "../../../Animations/images"

let magicItems = [
	{
		info : new ItemTemplate("Teleport\nStone", 0, false, magicImages.teleportStone,
		function(player, level) {
			if (level === 0) {
				player.currLevel = 0
			} else {
				player.currLevel = player.currLevel + level;
			}
			player.teleported = true;
			return {used:false}

		})
	},
	{
		info : new ItemTemplate("Shield\nStone", 0, false, magicImages.defenseStone,
		function(player, level) {
			player.skills.defense.boost = level;
			return {used:false}
		})
	},

	{
		info : new ItemTemplate("Attack\nStone", 0, false, magicImages.attackStone,
		function(player, level) {
			player.skills.attack.boost = level;

		})
	},

	{
		info : new ItemTemplate("Archer\nStone", 0, false, magicImages.rangeStone,
		function(player, level) {
			player.skills.range.boost = level;

		})
	},
	{
		info : new ItemTemplate("Mining\nStone", 0, false,magicImages.miningStone,
		function(player, level) {
			player.skills.mining.boost = level;

		})
	},
	{
		info : new ItemTemplate("Hunting\nStone", 0, false,magicImages.huntingStone,
		function(player, level) {
			player.skills.hunting.boost = level;

		})
	},
	{
		info : new ItemTemplate("WoodCutting\nStone", 0, false,magicImages.woodcutStone,
		function(player, level) {
			player.skills.woodcutting.boost = level;

		})
	},
	
	

]


export {
	magicItems
}

