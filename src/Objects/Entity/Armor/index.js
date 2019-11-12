export default class Armor {

	constructor(items, animation) {
		this.items = items;
		this.helm = this.items.none()
		this.chest = this.items.none()
		this.legs = this.items.none()
		this.feet = this.items.none()
		this.weapon = this.items.none()
		this.shield = this.items.none()
		this.bow = this.items.none()
		this.arrows = this.items.none()

		this.pickAxe = this.items.none();
		this.axe = this.items.none();
		this.attackBonus = 0;
		this.defenseBonus = 0;
		this.attackSpeedBonus = 0;
		this.rangeBonus = 0;
		this.miningBonus = 0;
		this.woodCuttingBonus = 0;
		
		if (animation.singleImg) {
			this.animation = animation.singleImg;
		}

		if (animation.body) {
			this.animation = animation.body
			this.animation.addShirt(animation.shirt)
			this.animation.addPants(animation.pants)
			this.animation.addHair(animation.hair)
		}
	}

	logBonus() {
		console.log(this.helm.bonus,
					this.chest.bonus,
					this.legs.bonus,
					this.feet.bonus,
					this.shield.bonus)
	}

	getAttack() {
		return (this.attackBonus)
	}

	getDefense() {
		return (this.defenseBonus)
	}

	addBonus() {
		let defense = 0;
		let attack = 0;
		let attackSpeed = 200;
		defense += this.helm.bonus
		defense += this.chest.bonus
		defense += this.legs.bonus
		defense += this.feet.bonus
		defense += this.shield.bonus

		attack += this.weapon.bonus
		if (this.weapon.id === -1) {
			this.animation.swingTimer.defaultExpiration();
		} else {
			attackSpeed = this.weapon.speed;
			this.animation.swingTimer.setExpiration(attackSpeed);
		}
		this.attackBonus = attack;
		this.defenseBonus = defense;
		this.attackSpeedBonus = attackSpeed;
		this.rangeBonus = this.bow.bonus;
		this.miningBonus = this.pickAxe.bonus;
		this.woodCuttingBonus = this.axe.bonus;

	}

	removeHelm(inventory) {
		if (inventory.add(this.helm)) {
			this.helm = this.items.none();
			this.animation.remove("helm")
		}
		this.addBonus();
	}

	removeChest(inventory) {
		if (inventory.add(this.chest)) {
			this.chest = this.items.none();
			this.animation.remove("chest")

		} 
		this.addBonus();
	}

	removeLegs(inventory) {
		if (inventory.add(this.legs)) {
			this.legs = this.items.none();
			this.animation.remove("legs")

		}
		this.addBonus();
	}

	removeFeet(inventory) {
		if (inventory.add(this.feet)) {
			this.feet = this.items.none();
			this.animation.remove("feet")

		}
		this.addBonus();
	}

	removeWeapon(inventory) {
		if (inventory.add(this.weapon)) {
			this.weapon = this.items.none();
			this.animation.remove("weapon")
		}
		this.addBonus();
	}

	removeShield(inventory) {
		if (inventory.add(this.shield)) {
			this.shield = this.items.none();
			this.animation.remove("shield")

		}
		this.addBonus();
	}

	removePickAxe(inventory) {
		if (inventory.add(this.pickAxe)) {
			this.pickAxe = this.items.none();
			this.animation.remove("pickaxe")

		}
		this.addBonus();
	}

	removeAxe(inventory) {
		if (inventory.add(this.axe)) {
			this.axe = this.items.none();
			this.animation.remove("axe")

		}
		this.addBonus();
	}

	removeBow(inventory) {
		if (inventory.add(this.bow)) {
			this.bow = this.items.none();
			this.animation.remove("bow")

		}
		this.addBonus();
	}

	removeArrows(inventory) {
		if (inventory.addQuantity(this.arrows, this.arrows.quantity)) {
			this.arrows = this.items.none();
			this.animation.remove("arrows")

		}
		this.addBonus();
	}

	addHelm(helm) {
		let tmp = this.helm.copy()
		this.animation.add("helm", helm.img)

		helm.setPos(400, 140);
		this.helm = helm;
		this.addBonus();
		
		if (tmp.id !== -1 ) {
			return (tmp);
		} else {
			return false
		}
	}

	addChest(chest) {
		let tmp = this.chest.copy()
		this.animation.add("chest", chest.img)

		chest.setPos(400, 200);
		this.chest = chest;
		this.addBonus();
		if (tmp.id !== -1 ) {
			return (tmp);
		} else {
			return false
		}

	}

	addLegs(legs) {
		let tmp = this.legs.copy()

		legs.setPos(400, 260);
		this.legs = legs;
		this.addBonus();
		if (tmp.id !== -1 ) {
			return (tmp);
		} else {
			return false
		}

	}

	addFeet(feet) {
		let tmp = this.feet.copy()

		feet.setPos(400, 320);
		this.feet = feet;
		this.addBonus();
		if (tmp.id !== -1 ) {
			return (tmp);
		} else {
			return false
		}

	}

	addWeapon(weapon) {
		let tmp = this.weapon.copy()
		this.animation.add("weapon", weapon.img)

		weapon.setPos(360, 200);
		this.weapon = weapon;
		this.addBonus();
		if (tmp.id !== -1 ) {
			return (tmp);
		} else {
			return false
		}

	}

	addShield(shield) {
		let tmp = this.shield.copy()
		this.animation.add("shield", shield.img)

		shield.setPos(440, 200)
		this.shield = shield;
		this.addBonus();
		if (tmp.id !== -1 ) {
			return (tmp);
		} else {
			return false
		}

	}


	addArrows(arrows) {
		let tmp = this.arrows.copy()
		let addQuantity = false
		if (arrows.id === this.arrows.id) {
			this.arrows.quantity ++;
			addQuantity = true
		} else {
			let newArrow = arrows.copy()
			newArrow.setPos(440, 15);
			this.arrows = newArrow;
		}
		
		this.addBonus();
		if (tmp.id !== -1 && !addQuantity) {
			return (tmp);
		} else {
			return false
		}

	}


	addBow(bow) {
		let tmp = this.bow.copy()
		this.animation.add("bow", bow.img)

		bow.setPos(440, 70)
		this.bow = bow;
		this.addBonus();
		if (tmp.id !== -1 ) {
			return (tmp);
		} else {
			return false
		}

	}



	addPickAxe(pickAxe) {
		let tmp = this.pickAxe.copy()
		this.animation.add("pickaxe", pickAxe.img)

		pickAxe.setPos(360, 15)
		this.pickAxe = pickAxe;
		this.addBonus();
		if (tmp.id !== -1 ) {
			return (tmp);
		} else {
			return false
		}

	}

	addAxe(axe) {
		let tmp = this.axe.copy()
		this.animation.add("axe", axe.img)

		axe.setPos(360, 70)
		this.axe = axe;
		this.addBonus();
		if (tmp.id !== -1 ) {
			return (tmp);
		} else {
			return false
		}

	}


}