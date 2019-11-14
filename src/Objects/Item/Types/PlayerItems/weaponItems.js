import ItemTemplate from '../ItemTemplate.js'
import {playerWeapons, playerTools} from "../../../Animations/images"

import {Bar, Wood} from "../ResourceItems/resourceItems"
//take in inventory, move item to armor/weapon slot
//return a bonus whenever needed
let BronzeWeapons = [

	{
		info : new ItemTemplate({
			name : "Mace (B)", 
			price : 10000, 
			bonus : 8,
			speed : 150,
			animation: false, 
			img : false,
			use : function(playerArmor) {
				return playerArmor.addWeapon(this);
			}, 
			recipe: [
				{item: Bar[0].info, quantity: 10}, 
				{item: Wood[0].info, quantity: 500}
			]
		}),
	},
	{
		info : new ItemTemplate({
			name : "Sword (B)", 
			price : 30000, 
			bonus : 12,
			speed : 125,
			animation: false, 
			img : playerWeapons.bronzeSword,
			use : function(playerArmor) {
				return playerArmor.addWeapon(this);
			}, 
			recipe: [
				{item: Bar[0].info, quantity: 20}, 
				{item: Wood[0].info, quantity: 700}
			]
		}),
	},
	{
		info : new ItemTemplate({
			name : "Axe (B)", 
			price : 50, 
			bonus : 2,
			speed : 150,
			animation: false, 
			img : playerTools.bronzeAxe,
			use : function(playerArmor) {
				return playerArmor.addAxe(this);
			}, 
			recipe: [
				{item: Bar[0].info, quantity: 2}, 
				{item: Wood[0].info, quantity: 20}
			]
		}),
	},
	{
		info : new ItemTemplate({
			name : "Pickaxe (B)", 
			price : 50, 
			bonus : 2,
			speed : 150,
			animation: false, 
			img : playerTools.bronzePickaxe,
			use : function(playerArmor) {
				return playerArmor.addPickAxe(this);
			}, 
			recipe: [
				{item: Bar[0].info, quantity: 2}, 
				{item: Wood[0].info, quantity: 20}
			]
		}),
	},
]

let IronWeapons = [
	{
		info : new ItemTemplate({
			name : "Iron Mace", 
			price : 100000, 
			bonus : 20,
			speed : 140,
			animation: false, 
			img : false,
			use : function(playerArmor) {
				return playerArmor.addWeapon(this);
			}, 
			recipe: [
				{item: Bar[1].info, quantity: 10}, 
				{item: Wood[1].info, quantity: 500}
			]
		}),
	},
	{
		info : new ItemTemplate({
			name : "Iron Sword", 
			price : 115000, 
			bonus : 26,
			speed : 115,
			animation: false, 
			img : playerWeapons.ironSword,
			use : function(playerArmor) {
				return playerArmor.addWeapon(this);
			}, 
			recipe: [
				{item: Bar[1].info, quantity: 20}, 
				{item: Wood[1].info, quantity: 700}
			]
		}),
	},
	{
		info : new ItemTemplate({
			name : "Iron Axe", 
			price : 500, 
			bonus : 10,
			speed : 140,
			animation: false, 
			img : playerTools.ironAxe,
			use : function(playerArmor) {
				return playerArmor.addAxe(this);
			}, 
			recipe: [
				{item: Bar[1].info, quantity: 2},
				{item: Wood[1].info, quantity: 20}
			]
		}),
	},

	{
		info : new ItemTemplate({
			name : "Iron Pic", 
			price : 500, 
			bonus : 10,
			speed : 140,
			animation: false, 
			img : playerTools.ironPickaxe,
			use : function(playerArmor) {
				return playerArmor.addPickAxe(this);
			}, 
			recipe: [
				{item: Bar[1].info, quantity: 2},
				{item: Wood[1].info, quantity: 20}
			]
		}),
	},

]


let GoldWeapons = [
	
	{
		info : new ItemTemplate({
			name : "Gold Mace", 
			price : 300000, 
			bonus : 40,
			speed : 130,
			animation: false, 
			img : false,
			use : function(playerArmor) {
				return playerArmor.addWeapon(this);
			}, 
			recipe: [
				{item: Bar[2].info, quantity: 10}, 
				{item: Wood[2].info, quantity: 500}
			]
		}),
	},
	{
		info : new ItemTemplate({
			name : "Gold Sword", 
			price : 350000, 
			bonus : 50,
			speed : 105,
			animation: false, 
			img : playerWeapons.goldSword,
			use : function(playerArmor) {
				return playerArmor.addWeapon(this);
			}, 
			recipe: [
				{item: Bar[2].info, quantity: 20}, 
				{item: Wood[2].info, quantity: 700}
			]
		}),
	},
	{
		info : new ItemTemplate({
			name : "Gold Axe", 
			price : 20000, 
			bonus : 20,
			speed : 130,
			animation: false, 
			img : playerTools.goldAxe,
			use : function(playerArmor) {
				return playerArmor.addAxe(this);
			}, 
			recipe: [
				{item: Bar[2].info, quantity: 2},
				{item: Wood[2].info, quantity: 20}
			]
		}),
	},
	
	{
		info : new ItemTemplate({
			name : "Gold Pic", 
			price : 20000, 
			bonus : 20,
			speed : 130,
			animation: false, 
			img : playerTools.goldPickaxe,
			use : function(playerArmor) {
				return playerArmor.addPickAxe(this);
			}, 
			recipe: [
				{item: Bar[2].info, quantity: 2},
				{item: Wood[2].info, quantity: 20}
			]
		}),
	},
]


let PlatinumWeapons = [
	
	{
		info : new ItemTemplate({
			name : "Platinum Mace", 
			price : 800000, 
			bonus : 70,
			speed : 120,
			animation: false, 
			img : false,
			use : function(playerArmor) {
				return playerArmor.addWeapon(this);
			}, 
			recipe: [
				{item: Bar[3].info, quantity: 20}, 
				{item: Wood[3].info, quantity: 500}
			]
		}),
	},
	{
		info : new ItemTemplate({
			name : "Platinum Sword", 
			price : 900000, 
			bonus : 85,
			speed : 95,
			animation: false, 
			img : playerWeapons.platinumSword,
			use : function(playerArmor) {
				return playerArmor.addWeapon(this);
			}, 
			recipe: [
				{item: Bar[3].info, quantity: 30}, 
				{item: Wood[3].info, quantity: 700}
			]
		}),
	},

	{
		info : new ItemTemplate({
			name : "Platinum Axe", 
			price : 50000, 
			bonus : 40,
			speed : 120,
			animation: false, 
			img : playerTools.platinumAxe,
			use : function(playerArmor) {
				return playerArmor.addAxe(this);
			}, 
			recipe: [
				{item: Bar[3].info, quantity: 2}, 
				{item: Wood[3].info, quantity: 20}
			]
		}),
	},
	{
		info : new ItemTemplate({
			name : "Platinum Pic", 
			price : 50000, 
			bonus : 40,
			speed : 120,
			animation: false, 
			img : playerTools.platinumPickaxe,
			use : function(playerArmor) {
				return playerArmor.addPickAxe(this);
			}, 
			recipe: [
				{item: Bar[3].info, quantity: 2}, 
				{item: Wood[3].info, quantity: 20}
			]
		}),
	},
	
]

let DiamondWeapons = [
	{
		info : new ItemTemplate({
			name : "Diamond Mace", 
			price : 2000000, 
			bonus : 115,
			speed : 110,
			animation: false, 
			img : false,
			use : function(playerArmor) {
				return playerArmor.addWeapon(this);
			}, 
			recipe: [
				{item: Bar[4].info, quantity: 50}, 
				{item: Wood[4].info, quantity: 500}
			]
		}),
	},
	{
		info : new ItemTemplate({
			name : "Diamond Sword", 
			price : 2500000, 
			bonus : 140,
			speed : 85,
			animation: false, 
			img : playerWeapons.diamondSword,
			use : function(playerArmor) {
				return playerArmor.addWeapon(this);
			}, 
			recipe: [
				{item: Bar[4].info, quantity: 75}, 
				{item: Wood[4].info, quantity: 700}
			]
		}),
	},
	{
		info : new ItemTemplate({
			name : "Diamond Axe", 
			price : 100000, 
			bonus : 70,
			speed : 110,
			animation: false, 
			img : playerTools.diamondAxe,
			use : function(playerArmor) {
				return playerArmor.addAxe(this);
			}, 
			recipe: [
				{item: Bar[4].info, quantity: 2}, 
				{item: Wood[4].info, quantity: 20}
			]
		}),
	},
	{
		info : new ItemTemplate({
			name : "Diamond Pic", 
			price : 100000, 
			bonus : 70,
			speed : 110,
			animation: false, 
			img : playerTools.diamondPickaxe,
			use : function(playerArmor) {
				return playerArmor.addPickAxe(this);
			}, 
			recipe: [
				{item: Bar[4].info, quantity: 2}, 
				{item: Wood[4].info, quantity: 20}
			]
		}),
	},

]

let rangeWeapons = [
	
	{
		info : new ItemTemplate({
			name : "Oak Bow", 
			price : 10000, 
			bonus : 20,
			speed : 120,
			animation: false, 
			img : playerWeapons.oakBow,
			use : function(playerArmor) {
				return playerArmor.addBow(this);
			}, 
			recipe: [
				{item: Wood[0].info, quantity: 500}
			]
		}),
	},
	{
		info : new ItemTemplate({
			name : "Maple Bow", 
			price : 100000, 
			bonus : 42,
			speed : 110,
			animation: false, 
			img : playerWeapons.mapleBow,
			use : function(playerArmor) {
				return playerArmor.addBow(this);
			}, 
			recipe: [
				{item: Wood[1].info, quantity: 500}
			]
		}),
	},
	{
		info : new ItemTemplate({
			name : "Mahogony Bow", 
			price : 500000, 
			bonus : 65,
			speed : 100,
			animation: false, 
			img : playerWeapons.mahogonyBow,
			use : function(playerArmor) {
				return playerArmor.addBow(this);
			}, 
			recipe: [
				{item: Wood[2].info, quantity: 500}
			]
		}),
	},
	{
		info : new ItemTemplate({
			name : "Magic Bow", 
			price : 1000000, 
			bonus : 88,
			speed : 90,
			animation: false, 
			img : playerWeapons.magicBow,
			use : function(playerArmor) {
				return playerArmor.addBow(this);
			}, 
			recipe: [
				{item: Wood[3].info, quantity: 500}
			]
		}),
	},
	{
		info : new ItemTemplate({
			name : "Super Bow", 
			price : 10000000, 
			bonus : 123,
			speed : 80,
			animation: false, 
			img : playerWeapons.superBow,
			use : function(playerArmor) {
				return playerArmor.addBow(this);
			}, 
			recipe: [
				{item: Wood[4].info, quantity: 500}
			]
		}),
	},

]

let arrows = [
	{
		info : new ItemTemplate({
			name : "Bronze Arrow", 
			price : 200, 
			bonus : 7,
			img : false,
			use : function(playerArmor) {
				return playerArmor.addArrows(this);
			}, 
			recipe: [
				{item: Bar[0].info, quantity: 1}, 
				{item: Wood[0].info, quantity: 1}
			]
		}),
	},
	{
		info : new ItemTemplate({
			name : "Iron Arrow", 
			price : 500, 
			bonus : 17,
			img : false,
			use : function(playerArmor) {
				return playerArmor.addArrows(this);
			}, 
			recipe: [
				{item: Bar[1].info, quantity: 1}, 
				{item: Wood[1].info, quantity: 1}
			]
		}),
	},
	{
		info : new ItemTemplate({
			name : "Gold Arrow", 
			price : 2000, 
			bonus : 31,
			img : false,
			use : function(playerArmor) {
				return playerArmor.addArrows(this);
			}, 
			recipe: [
				{item: Bar[2].info, quantity: 1}, 
				{item: Wood[2].info, quantity: 1}
			]
		}),
	},
	{
		info : new ItemTemplate({
			name : "Platinum Arrow", 
			price : 5000, 
			bonus : 43,
			img : false,
			use : function(playerArmor) {
				return playerArmor.addArrows(this);
			}, 
			recipe: [
				{item: Bar[3].info, quantity: 1}, 
				{item: Wood[3].info, quantity: 1}
			]
		}),
	},
	{
		info : new ItemTemplate({
			name : "Diamond Arrow", 
			price : 10000, 
			bonus : 55,
			img : false,
			use : function(playerArmor) {
				return playerArmor.addArrows(this);
			}, 
			recipe: [
				{item: Bar[4].info, quantity: 1}, 
				{item: Wood[4].info, quantity: 1}
			]
		}),
	},
]
export {
	 BronzeWeapons,
	 IronWeapons,
	 GoldWeapons,
	 PlatinumWeapons,
	 DiamondWeapons,
	 rangeWeapons,
	 arrows
}

