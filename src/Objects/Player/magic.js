export default class Magic {
	constructor(items) {
		this.items = items.returnItems(4,0);
		this.teleport = this.makeTeleport(this.items[0]);
		this.defense = this.makeSpell(this.items[1]);
		this.attack = this.makeSpell(this.items[2]);
		this.archery = this.makeSpell(this.items[3]);
		this.mining = this.makeSpell(this.items[4]);
		this.hunting = this.makeSpell(this.items[5]);
		this.woodcutting = this.makeSpell(this.items[6]);
		this.thirst = this.makeSpell(this.items[7]);
		this.hunger = this.makeSpell(this.items[8]);


	}

	makeSpell(stone) {
		return({
			stone: stone,
			
			pushSpells(spellArr) {
				spellArr.push(this.five, this.ten, this.thirty, this.fifty)
			},

			spell : function(player, quantity, level) {
				let find = player.inventory.find(this.stone)

				if (find.found) {
					if (player.inventory.spaces[find.index].quantity >= quantity) {
						this.stone.use(player, level);
						player.inventory.deleteQuantity(find.index, quantity);
					}
				}
			},

			five : function(player) {
				this.spell(player, 5, 5)
			},

			ten : function(player) {
				this.spell(player, 20, 10)

			},

			thirty : function(player) {
				this.spell(player, 50, 30)

			},

			fifty : function(player) {
				this.spell(player, 100, 50)
			},

		})
	}

	makeTeleport (teleport_stone) {
		return({
			stone : teleport_stone,

			pushSpells(spellArr) {
				spellArr.push(this.home, this.ten, this.fifty, this.oneHundred)
			}, 

			teleport : function(player, quantity, level) {
				let find = player.inventory.find(this.stone)
				if (player.highestLevel < player.currLevel + level && level !== 0) {
					return false
				}

				if (find.found) {
					if (player.inventory.spaces[find.index].quantity >= quantity) {
						this.stone.use(player, level);
						player.inventory.deleteQuantity(find.index, quantity);

					}
				}
			},

			home : function(player) {
				this.teleport(player, 5, 0);
			},

			ten : function(player) {
				this.teleport(player, 10, 10);
			},

			fifty : function(player) {
				this.teleport(player, 50, 50);
			},

			oneHundred : function(player) {
				this.teleport(player, 50, 100);
			},

		})
	}




}