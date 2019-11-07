
import Inventory from "../Inventory"
import {settings} from "../../Helpers/settings"
export default class ActionHandler {

	constructor() {
		
	}

	takeDamage(player, damage) {
		if (damage === 0) {
			return 0
		}

		let bonus = player.armor.defenseBonus;
		if (damage - bonus <= 0) {
			damage = 1;
		} else {
			damage = damage - bonus;
		}

		player.skills.health.take(damage);
		if (this.isDead(player)){
			return (player.inventory);
		}
	}


	fight(player, target) {
		let damage = player.skills.attack.timer(player.armor.attackSpeedBonus)
		if (damage > 0) {
			 damage = damage + player.armor.attackBonus
		}
		return(this.takeDamage(target, damage));
	}

	isDead(player) {
		if (player.skills.health.isZero() === true) {
			player.armor.animation.deathTimer.done = false;
			player.status.dead = true;
			player.status.deaths++;
			return (true)
		}
	}

	xp(player, target) {
		switch (target.status.type) {
          case "enemy" :
                player.skills.attack.addXp(target.skills.health.get() * 15)
                player.skills.health.addXp(target.skills.health.get() * 40)
                break;
          case "ore" :
                player.skills.mining.addXp(target.skills.health.get() * 15)
                break;
          case "tree" : 
                player.skills.woodcutting.addXp(target.skills.health.get() * 15)
                break;
          case "animal" : 
                player.skills.hunting.addXp(target.skills.health.get() * 15)
                break;
          default : 
                break
        }
	}

	revive(player) {
		player.status.dead = false;
		player.body.setPos(32 * 5, -32)
		player.skills.health.equalize();
		player.skills.thirst.equalize();
		player.skills.hunger.equalize();
		player.armor.addBonus()
		let gold = player.inventory.gold

		player.inventory = new Inventory(player.items);
		player.inventory.addGold(gold);

		player.status.currLevel = 1;

	}

	mine(player) {
		let damage = player.skills.mining.timer(player.armor.attackSpeedBonus)
		if (damage > 0) {
			 damage = damage + player.armor.miningBonus
		}
		return(damage)
	}

	woodCut(player) {
		let damage = player.skills.woodcutting.timer(player.armor.attackSpeedBonus)
		if (damage > 0) {
			 damage = damage + player.armor.woodCuttingBonus
		}
		return(damage)
	}

	hunt(player) {
		let damage = player.skills.hunting.timer(player.armor.attackSpeedBonus)
		if (damage > 0) {
			 damage = damage + player.armor.attackBonus
		}
		return(damage)
	}

	skillDecay(player) {
		this.thirsty(player);
		this.hungry(player);
	}

	thirsty(player) {
		let isTime = player.skills.thirst.decayTimer(player.skills.thirst.get());
		if (isTime) {
			if (player.skills.thirst.isZero()) {
				this.takeDamage(player, settings.player.thirstHealthDecay);
			}
		}
		
	}

	hungry(player) {

		let isTime  = player.skills.hunger.decayTimer(player.skills.hunger.get());
		if (isTime) {
			if (player.skills.hunger.isZero()) {
				this.takeDamage(player, settings.player.hungerHealthDecay);
			}
		}
	}


}