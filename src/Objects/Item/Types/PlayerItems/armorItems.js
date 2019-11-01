import ItemTemplate from '../ItemTemplate.js'
import {Bar} from "../ResourceItems/resourceItems"
import {playerArmor} from "../../../Animations/images"

let BronzeArmor = [
	{
		info : new ItemTemplate("Helm (B)", 10000,  false,playerArmor.bronzeHelm,
		function(playerArmor) {
			this.bonus = 12;
			return playerArmor.addHelm(this);	
		}, [{item: Bar[0].info, quantity: 30}])
	},

	{
		info : new ItemTemplate("Chest (B)", 15000, false,playerArmor.bronzeChest,
		function(playerArmor) {
			this.bonus = 18;
			return playerArmor.addChest(this)

		}, [{item: Bar[0].info, quantity: 50}])
	},
	{
		info : new ItemTemplate("Legs (B)", 13000, false,false,
		function(playerArmor) {
			this.bonus = 16;
			return playerArmor.addLegs(this)
			

		}, [{item: Bar[0].info, quantity: 40}])
	},
	{
		info : new ItemTemplate("Boots (B)", 9000, false,false,
		function(playerArmor) {
			this.bonus = 10;
			return playerArmor.addFeet(this);
			

		}, [{item: Bar[0].info, quantity: 20}])
	},
	{
		info : new ItemTemplate("Shield (B)", 13000, false,playerArmor.bronzeShield,
		function(playerArmor) {
			this.bonus = 19;
			return playerArmor.addShield(this);
			

		}, [{item: Bar[0].info, quantity: 30}])
	},

]

let IronArmor = [
	{
		info : new ItemTemplate("Helm (I)", 50000, false,playerArmor.ironHelm,
		function(playerArmor) {
			this.bonus = 27;
			return playerArmor.addHelm(this)

		}, [{item: Bar[1].info, quantity: 50}])
	},

	{
		info : new ItemTemplate("Chest (I)", 65000, false,playerArmor.ironChest,
		function(playerArmor) {
			this.bonus = 34;
			return playerArmor.addChest(this)

		}, [{item: Bar[1].info, quantity: 80}])
	},
	{
		info : new ItemTemplate("Legs (I)", 60000, false,false,
		function(playerArmor) {
			this.bonus = 32;
			return playerArmor.addLegs(this)

		}, [{item: Bar[1].info, quantity: 70}])
	},
	{
		info : new ItemTemplate("Boots (I)", 40000, false,false,
		function(playerArmor) {
			this.bonus = 25;
			return playerArmor.addFeet(this);

		}, [{item: Bar[1].info, quantity: 40}])
	},
	{
		info : new ItemTemplate("Shield (I)", 60000, false,playerArmor.ironShield,
		function(playerArmor) {
			this.bonus = 29;
			return playerArmor.addShield(this)

		}, [{item: Bar[1].info, quantity: 60}])
	},
]


let GoldArmor = [
	{
		info : new ItemTemplate("Helm (G)", 100000, false,playerArmor.goldHelm,
		function(playerArmor) {
			this.bonus = 47;
			return playerArmor.addHelm(this)

		}, [{item: Bar[2].info, quantity: 50}])
	},

	{
		info : new ItemTemplate("Chest (G)", 120000, false,playerArmor.goldChest,
		function(playerArmor) {
			this.bonus = 56;
			return playerArmor.addChest(this)

		}, [{item: Bar[2].info, quantity: 80}])
	},
	{
		info : new ItemTemplate("Legs (G)", 110000, false,false,
		function(playerArmor) {
			this.bonus = 52;
			return playerArmor.addLegs(this)

		}, [{item: Bar[2].info, quantity: 70}])
	},
	{
		info : new ItemTemplate("Boots (G)", 90000, false,false,
		function(playerArmor) {
			this.bonus = 48;
			return playerArmor.addFeet(this);

		}, [{item: Bar[2].info, quantity: 40}])
	},
	{
		info : new ItemTemplate("Shield (G)", 112000, false,playerArmor.goldShield,
		function(playerArmor) {
			this.bonus = 51;
			return playerArmor.addShield(this)

		}, [{item: Bar[2].info, quantity: 60}])
	},

]


let PlatinumArmor = [
	{
		info : new ItemTemplate("Helm (P)", 200000, false, playerArmor.platinumHelm,
		function(playerArmor) {
			this.bonus = 68;
			return playerArmor.addHelm(this)

		}, [{item: Bar[3].info, quantity: 50}])
	},

	{
		info : new ItemTemplate("Chest (P)", 250000, false,playerArmor.platinumChest,
		function(playerArmor) {
			this.bonus = 75;
			return playerArmor.addChest(this)

		}, [{item: Bar[3].info, quantity: 80}])
	},
	{
		info : new ItemTemplate("Legs (P)", 225000, false,false,
		function(playerArmor) {
			this.bonus = 72;
			return playerArmor.addLegs(this)

		}, [{item: Bar[3].info, quantity: 70}])
	},
	{
		info : new ItemTemplate("Boots (P)", 190000, false,false,
		function(playerArmor) {
			this.bonus = 69;
			return playerArmor.addFeet(this);

		}, [{item: Bar[3].info, quantity: 40}])
	},
	{
		info : new ItemTemplate("Shield (P)", 230000, false,playerArmor.platinumShield,
		function(playerArmor) {
			this.bonus = 70;
			return playerArmor.addShield(this)

		}, [{item: Bar[3].info, quantity: 60}])
	},

]

let DiamondArmor = [
	{
		info : new ItemTemplate("Helm (D)", 500000, false, playerArmor.diamondHelm,
		function(playerArmor) {
			this.bonus = 88;
			return playerArmor.addHelm(this)
		}, [{item: Bar[4].info, quantity: 100}])
	},

	{
		info : new ItemTemplate("Chest (D)", 750000, false, playerArmor.diamondChest,
		function(playerArmor) {
			this.bonus = 95;
			return playerArmor.addChest(this)
		}, [{item: Bar[4].info, quantity: 150}])
	},
	{
		info : new ItemTemplate("Legs (D)", 600000, false,false,
		function(playerArmor) {
			this.bonus = 91;
			return playerArmor.addLegs(this)
		}, [{item: Bar[4].info, quantity: 130}])
	},
	{
		info : new ItemTemplate("Boots (D)", 450000, false,false,
		function(playerArmor) {
			this.bonus = 86;
			return playerArmor.addFeet(this);
		}, [{item: Bar[4].info, quantity: 80}])
	},
	{
		info : new ItemTemplate("Shield (D)", 610000, false, playerArmor.diamondShield,
		function(playerArmor) {
			this.bonus = 90;
			return playerArmor.addShield(this)
		}, [{item: Bar[4].info, quantity: 120}])
	},

]

export {
	 BronzeArmor,
	 IronArmor,
	 GoldArmor,
	 PlatinumArmor,
	 DiamondArmor
}

