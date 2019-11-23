import {randomInt} from "../../../Helpers/functions"

// skills have a value which is there level, and a current which is what
// it is before and after boosts.

export default class Skills {
	
	constructor(settings) {
		let skill_id = 0;
		this.health = this.createSkill(settings.health, "Health", skill_id++);
		this.attack = this.createSkill(settings.attack, "Attack", skill_id++);
		this.defense = this.createSkill(settings.defense,"Defense", skill_id++)
		this.attackSpeed = this.createSkill(settings.attackSpeed, "Attack Speed", skill_id++);
		this.range = this.createSkill(settings.range, "Range", skill_id++);
		this.magic = this.createSkill(settings.magic, "Magic", skill_id++);
		this.thirst = this.createSkill(settings.thirst, "Thirst", skill_id++);
		this.hunger = this.createSkill(settings.hunger, "Hunger", skill_id++);
		this.mining = this.createSkill(settings.mining, "Mining", skill_id++);
		this.woodcutting = this.createSkill(settings.woodcutting, "Woodcutting", skill_id++);
		this.hunting = this.createSkill(settings.hunting, "Hunting", skill_id++);

		this.thirst.setDecayValue(settings.thirstDecay || 100); 
		this.hunger.setDecayValue(settings.hungerDecay || 100);
	}

	boostDecay() {
		this.health.boostTimer();
		this.attack.boostTimer();
		this.defense.boostTimer();
		this.attackSpeed.boostTimer();
		this.range.boostTimer();
		this.thirst.boostTimer();
		this.hunger.boostTimer();
		this.mining.boostTimer();
		this.woodcutting.boostTimer();
		this.hunting.boostTimer();
	}

	createSkill(value, name, id) {
		return ({
			skill_id : id,
			value: value,
			time: 0,
			boostTime: 0,
			current : value,
			name: name,
			boost : 0,
			decayValue: 300,
			xp : 0,
			threshold : Math.round(1.1 * (Math.pow(value, 3.4))),

			boostTimer : function() {
				if (this.boost <= 0) {
					return false
				}

				this.boostTime++;

				if (this.boostTime > 200) {
					this.boostTime = 0
					this.boost -= 1;
				
					if (this.boost <= 0) {
						this.boost = 0;
					}
				}
			},

			enemyTimer: function(boost) {
				this.time++;
				if (this.time > 50 - boost) {
					this.time = 0;
					return(randomInt(0, this.get()));
				}
				return (0);
			},

			timer: function(boost) {
				this.time++;
				let accuracy = 5;
				if (this.time > 50 - boost) {
					this.time = 0;
					return(randomInt(this.get(), this.get() + accuracy + this.boost));
				}
				return (0);
			},


			hitDamage: function() {
				let accuracy = 5;
				return(randomInt(this.get(), this.get() + accuracy + this.boost));
			},

			decayTimer: function(boost) {
				this.time++;
				if (this.time > this.decayValue + (boost * 10) + this.boost) {
					this.time = 0;
					this.take(1);
					return(true)
				}
				return (0);
			},

			setDecayValue: function(value) {
				this.decayValue = value;
			},

			addXp(xp) {
				this.xp += xp;
				let threshold = Math.round(1.1 * (Math.pow(this.value, 3.4)))
				while (this.xp > threshold) {
					this.levelUp();
					this.equalize();
					threshold = Math.round(1.1 * (Math.pow(this.value, 3.4)))

				}
				this.threshold = threshold
			},

			set: function(lvl) {
				this.value = lvl;
				this.equalize();
			},

			setupLvl(mapLvl, exponent, base) {
				let lvl = Math.round(base * (Math.pow(mapLvl, exponent)))
				this.value = lvl + this.value
				this.equalize();
			},

			get: function() {
				return this.value;
			},

			getCurrent : function() {
				return this.current + this.boost;
			},

			getName: function() {
				return this.name;
			},

			take: function(damage) {
				this.current = this.current - damage;
				
				if (this.isZero()) {
					this.current = 0;
				}
			},

			give: function(boost) {
				this.current += boost;
			},

			giveLimit: function(boost) {
				this.current += boost;
				if (this.isGreater()) {
					this.equalize();
				}
			},

			giveBoost : function(boost) {
				this.boost = boost
			},

			levelUp: function() {
				this.value++;
			},

			levelUpBy: function (level) {
				this.value += level
			},

			levelDown: function() {
				if (this.isZero()) {
					return (false);
				}

				this.current--;
			},

			equalize() {
				this.current = this.value;
			},

			isZero: function () {
				if (this.current <= 0) {
					return (true);
				}
				return (false);
			},

			isGreater : function() {
				if (this.current > this.value) {
					return (true);
				}
				return (false);
			},

			log : function() {
				console.log(this.getName(), ":", this.getCurrent(), "/" ,this.get());
			},

			show() {
				return(this.getName() + " : " + this.getCurrent() + "/" + this.get());
			},

			showXp() {
				return("xp: " + this.xp + " / " + this.threshold);
			}

		})
	}

	isDead() {
		if (this.health.isZero()) {
			this.dead = true;
			return (true);

		}
		this.dead= false;
		return (false);
	}

	test() {
		this.log();
	}


	log() {
		console.log('|----------|');
		console.log(	this 	  );
		console.log('|----------|');
	}

}
