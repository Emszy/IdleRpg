import ItemTemplate from '../ItemTemplate.js'
import {playerWeapons, playerTools} from "../../../Animations/images"

import {Bar, Wood} from "../ResourceItems/resourceItems"
//take in inventory, move item to armor/weapon slot
//return a bonus whenever needed
let BronzeWeapons = [

	{
		info : new ItemTemplate("Mace (B)", 10000, false, false,
		function(playerArmor) {
			this.bonus = 8
			this.speed = 150;	
			return playerArmor.addWeapon(this);
		}, [{item: Bar[0].info, quantity: 10}, {item: Wood[0].info, quantity: 500}]),
	},

	{
		info : new ItemTemplate("Sword (B)", 30000, false, playerWeapons.bronzeSword,
		function(playerArmor) {
			this.bonus = 12	
			this.speed = 125;	

			return playerArmor.addWeapon(this);
		}, [{item: Bar[0].info, quantity: 20}, {item: Wood[0].info, quantity: 700}]),
	},
	

	{
		info : new ItemTemplate("Axe (B)", 50, false, playerTools.bronzeAxe,
		function(playerArmor) {
			this.bonus = 2	
			this.speed = 150;	

			return playerArmor.addAxe(this);
		}, [{item: Bar[0].info, quantity: 2}, {item: Wood[0].info, quantity: 20}]),
	},

	{
		info : new ItemTemplate("Pickaxe (B)", 50, false, playerTools.bronzePickaxe,
		function(playerArmor) {
			this.bonus = 2
			this.speed = 150;	

			return playerArmor.addPickAxe(this);
		}, [{item: Bar[0].info, quantity: 2}, {item: Wood[0].info, quantity: 20}]),
	},
]

let IronWeapons = [
	{
		info : new ItemTemplate("Mace (I)", 100000, false, false,
		function(playerArmor) {
			this.bonus = 20	
			this.speed = 140;	

			return playerArmor.addWeapon(this);
		}, [{item: Bar[1].info, quantity: 10}, {item: Wood[1].info, quantity: 500}]),
	},

	{
		info : new ItemTemplate("Sword (I)", 115000, false, playerWeapons.ironSword,
		function(playerArmor) {
			this.bonus = 26	
			this.speed = 115;	
	
			return playerArmor.addWeapon(this);
		}, [{item: Bar[1].info, quantity: 20}, {item: Wood[1].info, quantity: 700}]),
	},
	
	
	{
		info : new ItemTemplate("Axe (I)", 500, false, playerTools.ironAxe,
		function(playerArmor) {
			this.bonus = 10	

			return playerArmor.addAxe(this);
		}, [{item: Bar[1].info, quantity: 2}, {item: Wood[1].info, quantity: 20}]),
	},

	{
		info : new ItemTemplate("Pickaxe (I)", 500, false, playerTools.ironPickaxe,
		function(playerArmor) {
			this.bonus = 10

			return playerArmor.addPickAxe(this);
		}, [{item: Bar[1].info, quantity: 2}, {item: Wood[1].info, quantity: 20}]),
	},
]


let GoldWeapons = [
	{
		info : new ItemTemplate("Mace (G)", 300000, false, false,
		function(playerArmor) {
			this.bonus = 40
			this.speed = 130;	
			return playerArmor.addWeapon(this);
					
		}, [{item: Bar[2].info, quantity: 10}, {item: Wood[2].info, quantity: 500}]),
	},

	{
		info : new ItemTemplate("Sword (G)", 350000, false, playerWeapons.goldSword,
		function(playerArmor) {
			this.bonus = 50
			this.speed = 105;	

			return playerArmor.addWeapon(this);
				
		}, [{item: Bar[2].info, quantity: 20}, {item: Wood[2].info, quantity: 700}]),
	},
	
	{
		info : new ItemTemplate("Axe (G)", 20000, false, playerTools.goldAxe,
		function(playerArmor) {
			this.bonus = 20	
			this.speed = 130;	

			return playerArmor.addAxe(this);
		}, [{item: Bar[2].info, quantity: 2}, {item: Wood[2].info, quantity: 20}]),
	},

	{
		info : new ItemTemplate("Pickaxe (G)", 20000, false, playerTools.goldPickaxe,
		function(playerArmor) {
			this.bonus = 20
			this.speed = 130;	

			return playerArmor.addPickAxe(this);
		}, [{item: Bar[2].info, quantity: 2}, {item: Wood[2].info, quantity: 20}]),
	},
]


let PlatinumWeapons = [
	{
		info : new ItemTemplate("Mace (P)", 800000, false, false,
		function(playerArmor) {
			this.bonus = 70
			this.speed = 120;	

			return playerArmor.addWeapon(this);
			
		}, [{item: Bar[3].info, quantity: 20}, {item: Wood[3].info, quantity: 500}]),
	},

	{
		info : new ItemTemplate("Sword (P)", 900000, false, playerWeapons.platinumSword,
		function(playerArmor) {
			this.bonus = 85
			this.speed = 95;	

			return playerArmor.addWeapon(this);
					
		}, [{item: Bar[3].info, quantity: 30}, {item: Wood[3].info, quantity: 700}]),
	},
	
	{
		info : new ItemTemplate("Axe (P)", 50000, false, playerTools.platinumAxe,
		function(playerArmor) {
			this.bonus = 40	
			this.speed = 120;	

			return playerArmor.addAxe(this);
		}, [{item: Bar[3].info, quantity: 2}, {item: Wood[3].info, quantity: 20}]),
	},

	{
		info : new ItemTemplate("Pickaxe (P)", 50000, false, playerTools.platinumPickaxe,
		function(playerArmor) {
			this.bonus = 40
			this.speed = 120;	

			return playerArmor.addPickAxe(this);
		}, [{item: Bar[3].info, quantity: 2}, {item: Wood[3].info, quantity: 20}]),
	},
]

let DiamondWeapons = [
	{
		info : new ItemTemplate("Mace (D)", 2000000, false, false,
		function(playerArmor) {
			this.bonus = 115
			this.speed = 110;	

			return playerArmor.addWeapon(this);	
		},[{item: Bar[4].info, quantity: 50}, {item: Wood[4].info, quantity: 500}]),
	},
	{
		info : new ItemTemplate("Sword (D)", 2500000, false, playerWeapons.diamondSword,
		function(playerArmor) {
			this.bonus = 140;
			this.speed = 85;	
			return playerArmor.addWeapon(this);
					
		}, [{item: Bar[4].info, quantity: 75}, {item: Wood[4].info, quantity: 700}]),
	},
	
	{
		info : new ItemTemplate("Axe (D)", 100000, false, playerTools.diamondAxe,
		function(playerArmor) {
			this.bonus = 70	
			this.speed = 110;	

			return playerArmor.addAxe(this);
		}, [{item: Bar[4].info, quantity: 2}, {item: Wood[4].info, quantity: 20}]),
	},

	{
		info : new ItemTemplate("Pickaxe (D)", 100000, false, playerTools.diamondPickaxe,
		function(playerArmor) {
			this.bonus = 70
			this.speed = 110;	

			return playerArmor.addPickAxe(this);
		}, [{item: Bar[4].info, quantity: 2}, {item: Wood[4].info, quantity: 20}]),
	},

]


let rangeWeapons = [
	{
		info : new ItemTemplate("Oak Bow", 10000, false, playerWeapons.oakBow,
		function(playerArmor) {
			this.bonus = 20	
			this.speed = 120;	

			return playerArmor.addBow(this);
		}, [{item: Wood[0].info, quantity: 500}]),
	},

	{
		info : new ItemTemplate("Maple Bow", 100000, false, playerWeapons.mapleBow,
		function(playerArmor) {
			this.bonus = 42	
			this.speed = 110;	

			return playerArmor.addBow(this);
		}, [{item: Wood[1].info, quantity: 500}]),
	},
	{
		info : new ItemTemplate("Mahogony Bow", 500000, false, playerWeapons.mahogonyBow,
		function(playerArmor) {
			this.bonus = 65	
			this.speed = 100;	

			return playerArmor.addBow(this);
		}, [{item: Wood[2].info, quantity: 500}]),
	},
	{
		info : new ItemTemplate("Magic Bow", 1000000, false, playerWeapons.magicBow,
		function(playerArmor) {
			this.bonus = 88	
			this.speed = 90;	

			return playerArmor.addBow(this);
		}, [{item: Wood[3].info, quantity: 500}]),
	},
	{
		info : new ItemTemplate("Super Bow", 10000000, false, playerWeapons.superBow,
		function(playerArmor) {
			this.bonus = 123
			this.speed = 80;	

			return playerArmor.addBow(this);
		}, [{item: Wood[4].info, quantity: 500}]),
	},

]

let arrows = [
	{
		info : new ItemTemplate("Arrow (B)", 200, false, false,
		function(playerArmor) {
			this.bonus = 7
			return playerArmor.addArrows(this);
		}, [{item: Bar[0].info, quantity: 1}, {item: Wood[0].info, quantity: 1}]),
	},
	{
		info : new ItemTemplate("Arrow (I)", 500, false, false,
		function(playerArmor) {
			this.bonus = 17
			return playerArmor.addArrows(this);
		}, [{item: Bar[1].info, quantity: 1}, {item: Wood[1].info, quantity: 1}]),
	},
	{
		info : new ItemTemplate("Arrow (G)", 2000, false, false,
		function(playerArmor) {
			this.bonus = 31
			return playerArmor.addArrows(this);
		}, [{item: Bar[2].info, quantity: 1}, {item: Wood[2].info, quantity: 1}]),
	},
	{
		info : new ItemTemplate("Arrow (P)", 5000, false, false,
		function(playerArmor) {
			this.bonus = 43
			return playerArmor.addArrows(this);
		}, [{item: Bar[3].info, quantity: 1}, {item: Wood[3].info, quantity: 1}]),
	},
	{
		info : new ItemTemplate("Arrow (D)", 10000, false, false,
		function(playerArmor) {
			this.bonus = 55
			return playerArmor.addArrows(this);
		}, [{item: Bar[4].info, quantity: 1}, {item: Wood[4].info, quantity: 1}]),
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

