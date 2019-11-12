
import Inventory from "../Inventory"
import {settings} from "../../Helpers/settings"
export default class ActionHandler {


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
                player.skills.attack.addXp(target.skills.health.get() * 4)
                player.skills.attackSpeed.addXp(target.skills.health.get() * 2)
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

	fight(player, target) {
		let skill = false;
		// let speedBonus = false;
		let attackBonus = false;
		let damage = 0;
		switch (target.status.type) {
          case "enemy" :
		        skill = player.skills.attack;
				// speedBonus = player.armor.attackSpeedBonus;
				attackBonus = player.armor.attackBonus;
                break;
          case "ore" :
          		skill = player.skills.mining;
				// speedBonus = player.armor.attackSpeedBonus;
				attackBonus = player.armor.miningBonus;
                break;
          case "tree" : 
          		skill = player.skills.woodcutting;
				// speedBonus = player.armor.attackSpeedBonus;
				attackBonus = player.armor.woodCuttingBonus;
                break;
          case "animal" : 
          		skill = player.skills.hunting;
				// speedBonus = player.armor.attackSpeedBonus;
				attackBonus = player.armor.attackBonus;
                break;
          default : 
                break
        }

        if (player.armor.animation.swingTimer.done && skill) {
          	player.armor.animation.swingTimer.done = false;
          	damage = skill.hitDamage()
			damage = damage + attackBonus
        }

		
		return(this.takeDamage(target, damage));
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
		if (player.status.currLevel > 0) {
			this.decayLogic(player, player.skills.thirst, settings.player.thirstHealthDecay);
			this.decayLogic(player, player.skills.hunger, settings.player.hungerHealthDecay);

		}
	}

	decayLogic(player, skill, healthDecayRate) {
		let isTime = skill.decayTimer(skill.get());
		if (isTime) {
			if (skill.isZero()) {
				this.takeDamage(player, healthDecayRate);
			}
		}
		
	}
}