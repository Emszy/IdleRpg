import ItemTemplate from '../ItemTemplate.js'
import {Bar} from "../ResourceItems/resourceItems"
import {playerArmor} from "../../../Animations/images"

let BronzeArmor = [
	{
		info : new ItemTemplate({
		name: "Bronze Helm", 
		price: 10000, 
		animation: false,
		img: playerArmor.bronzeHelm,
		use : function(playerArmor) {
			this.bonus = 12;
			return playerArmor.addHelm(this);	
		}, 
		recipe : [
					{item: Bar[0].info, quantity: 30}
				]
		})
	},

	{
		info : new ItemTemplate({
		name: "Bronze Chest", 
		price: 15000, 
		animation: false,
		img: playerArmor.bronzeChest,
		use : function(playerArmor) {
			this.bonus = 18;
			return playerArmor.addChest(this)

		}, 
		recipe : [
					{item: Bar[0].info, quantity: 50}
				]
		})
	},
	{
		info : new ItemTemplate({
		name: "Bronze Legs", 
		price: 13000, 
		animation: false,
		img: false,
		use : function(playerArmor) {
			this.bonus = 16;
			return playerArmor.addLegs(this)
			

		}, 
		recipe : [
					{item: Bar[0].info, quantity: 40}
				]
		})
	},
	{
		info : new ItemTemplate({
		name: "Bronze Boots", 
		price: 9000, 
		animation: false,
		img: false,
		use : function(playerArmor) {
			this.bonus = 10;
			return playerArmor.addFeet(this);
			

		}, 
		recipe : [
					{item: Bar[0].info, quantity: 20}
				]
		})
	},
	{
		info : new ItemTemplate({
		name: "Bronze Shield", 
		price: 13000, 
		animation: false,
		img: playerArmor.bronzeShield,
		use : function(playerArmor) {
			this.bonus = 19;
			return playerArmor.addShield(this);
			

		}, 
		recipe : [
					{item: Bar[0].info, quantity: 30}
				]
		})
	},

]

let IronArmor = [
	{
		info : new ItemTemplate({
		name: "Iron Helm", 
		price: 50000, 
		animation: false,
		img: playerArmor.ironHelm,
		use : function(playerArmor) {
			this.bonus = 27;
			return playerArmor.addHelm(this)

		}, 
		recipe : [
					{item: Bar[1].info, quantity: 50}
				]
		})
	},

	{
		info : new ItemTemplate({
		name: "Iron Chest", 
		price: 65000, 
		animation: false,
		img: playerArmor.ironChest,
		use : function(playerArmor) {
			this.bonus = 34;
			return playerArmor.addChest(this)

		}, 
		recipe : [
					{item: Bar[1].info, quantity: 80}
				]
		})
	},
	{
		info : new ItemTemplate({
		name: "Iron Legs", 
		price: 60000, 
		animation: false,
		img: false,
		use : function(playerArmor) {
			this.bonus = 32;
			return playerArmor.addLegs(this)

		}, 
		recipe : [
					{item: Bar[1].info, quantity: 70}
				]
		})
	},
	{
		info : new ItemTemplate({
		name: "Iron Boots", 
		price: 40000, 
		animation: false,
		img: false,
		use : function(playerArmor) {
			this.bonus = 25;
			return playerArmor.addFeet(this);

		}, 
		recipe : [
					{item: Bar[1].info, quantity: 40}
				]
		})
	},
	{
		info : new ItemTemplate({
		name: "Iron Shield", 
		price: 60000, 
		animation: false,
		img: playerArmor.ironShield,
		use : function(playerArmor) {
			this.bonus = 29;
			return playerArmor.addShield(this)

		}, 
		recipe : [
					{item: Bar[1].info, quantity: 60}
				]
		})
	},
]


let GoldArmor = [
	{
		info : new ItemTemplate({
		name: "Gold Helm", 
		price: 100000, 
		animation: false,
		img: playerArmor.goldHelm,
		use : function(playerArmor) {
			this.bonus = 47;
			return playerArmor.addHelm(this)

		}, 
		recipe : [
					{item: Bar[2].info, quantity: 50}
				]
		})
	},

	{
		info : new ItemTemplate({
		name: "Gold Chest", 
		price: 120000, 
		animation: false,
		img: playerArmor.goldChest,
		use : function(playerArmor) {
			this.bonus = 56;
			return playerArmor.addChest(this)

		}, 
		recipe : [
					{item: Bar[2].info, quantity: 80}
				]
		})
	},
	{
		info : new ItemTemplate({
		name: "Gold Legs", 
		price: 110000, 
		animation: false,
		img: false,
		use : function(playerArmor) {
			this.bonus = 52;
			return playerArmor.addLegs(this)

		}, 
		recipe : [
					{item: Bar[2].info, quantity: 70}
				]
		})
	},
	{
		info : new ItemTemplate({
		name: "Gold Boots", 
		price: 90000, 
		animation: false,
		img: false,
		use : function(playerArmor) {
			this.bonus = 48;
			return playerArmor.addFeet(this);

		}, 
		recipe : [
					{item: Bar[2].info, quantity: 40}
				]
		})
	},
	{
		info : new ItemTemplate({
		name: "Gold Shield", 
		price: 112000, 
		animation: false,
		img: playerArmor.goldShield,
		use : function(playerArmor) {
			this.bonus = 51;
			return playerArmor.addShield(this)

		}, 
		recipe : [
					{item: Bar[2].info, quantity: 60}
				]
		})
	},

]


let PlatinumArmor = [
	{
		info : new ItemTemplate({
		name: "Platinum Helm", 
		price: 200000, 
		animation: false,
		img: playerArmor.platinumHelm,
		use : function(playerArmor) {
			this.bonus = 68;
			return playerArmor.addHelm(this)

		}, 
		recipe : [
					{item: Bar[3].info, quantity: 50}
				]
		})
	},

	{
		info : new ItemTemplate({
		name: "Platinum Chest", 
		price: 250000, 
		animation: false,
		img: playerArmor.platinumChest,
		use : function(playerArmor) {
			this.bonus = 75;
			return playerArmor.addChest(this)

		}, 
		recipe : [
					{item: Bar[3].info, quantity: 80}
				]
		})
	},
	{
		info : new ItemTemplate({
		name: "Platinum Legs", 
		price: 225000, 
		animation: false,
		img: false,
		use : function(playerArmor) {
			this.bonus = 72;
			return playerArmor.addLegs(this)

		}, 
		recipe : [
					{item: Bar[3].info, quantity: 70}
				]
		})
	},
	{
		info : new ItemTemplate({
		name: "Platinum Boots", 
		price: 190000, 
		animation: false,
		img: false,
		use : function(playerArmor) {
			this.bonus = 69;
			return playerArmor.addFeet(this);

		}, 
		recipe : [
					{item: Bar[3].info, quantity: 40}
				]
		})
	},
	{
		info : new ItemTemplate({
			name: "Platinum Shield", 
			price: 230000, 
			animation: false,
			img: playerArmor.platinumShield,
			use : function(playerArmor) {
				this.bonus = 70;
				return playerArmor.addShield(this)

			}, 
			recipe : [
						{item: Bar[3].info, quantity: 60}
					]
			})
	},

]

let DiamondArmor = [
	{
		info : new ItemTemplate({
			name: "Diamond Helm", 
			price: 500000, 
			animation: false,
			img: playerArmor.diamondHelm,
			use : function(playerArmor) {
				this.bonus = 88;
				return playerArmor.addHelm(this)
			}, 
			recipe : [
						{item: Bar[4].info, quantity: 100}
					]
			})
	},

	{
		info : new ItemTemplate({
			name: "Diamond Chest", 
			price: 750000, 
			animation: false,
			img: playerArmor.diamondChest,
			use : function(playerArmor) {
				this.bonus = 95;
				return playerArmor.addChest(this)
			}, 
			recipe : [
						{item: Bar[4].info, quantity: 150}
					]
		})
	},
	{
		info : new ItemTemplate({
			name: "Diamond Legs", 
			price: 600000, 
			animation: false,
			img: false,
			use : function(playerArmor) {
				this.bonus = 91;
				return playerArmor.addLegs(this)
			}, 
			recipe : [
						{item: Bar[4].info, quantity: 130}
					]
		})
	},
	{
		info : new ItemTemplate({
			name: "Diamond Boots", 
			price: 450000, 
			animation: false,
			img: false,
			use : function(playerArmor) {
				this.bonus = 86;
				return playerArmor.addFeet(this);
			}, 
			recipe : [
						{item: Bar[4].info, quantity: 80}
					]
		})
	},
	{
		info : new ItemTemplate({
			name: "Diamond Shield", 
			price: 610000, 
			animation: false,
			img: playerArmor.diamondShield,
			use : function(playerArmor) {
				this.bonus = 90;
				return playerArmor.addShield(this)
			}, 
			recipe : [
						{item: Bar[4].info, quantity: 120}
					]
		})
	},

]

export {
	 BronzeArmor,
	 IronArmor,
	 GoldArmor,
	 PlatinumArmor,
	 DiamondArmor
}

