import { enemyImages, playerShirts, playerPants, playerHair} from "../Animations/images"

import Animation from "../../Objects/Animations"
import {randomInt} from "../../Helpers/functions"
import Entity from '../Entity'
import {settings} from "../../Helpers/settings"

export default class Enemies {
	constructor(items) {
		this.items = items
	}

	basic(level) {
		let arr = [];
		for (var i = 0; i < randomInt(8,10); i++) {
				let enemy = new Entity({
					name : this.randomName(),
					x : randomInt(0, 250),
					y : randomInt(0, 250),
					width : 64,
					height : 64,
					startingGold : this.getGold(level),
					info: this.name,
					status : {
						dead : false,
						deaths : 0,
						currLevel : 1,
						highestLevel : 0,
						teleported : false,
						type: "enemy",
					},
					
					skills : {
						attack : this.getLevel(settings.enemies.attack.base, level, settings.enemies.attack.exponent),
						health : this.getLevel(settings.enemies.health.base, level, settings.enemies.health.exponent),
						defense : 1,
						attackSpeed : 1,
						range : 1,
						magic : 1,
						thirst : 1,
						hunger : 1,
						mining : 1,
						woodcutting : 1,
						hunting : 1,
						hungerDecay : 1000,
						thirstDecay : 800,
					},
					animation : { 
									body: this.randomEnemy(level),
									shirt : playerShirts.black,
									pants :	playerPants.black,
									hair : playerHair.black,
								},
					items : this.items
				})
				enemy = this.addItems(enemy, level);

			arr.push(enemy)
		}
		return (arr);
	}

	getLevel(base, level, exponent) {
		let lvl = Math.round(base * (Math.pow(level + 3, exponent)))
		return lvl
	}

	getGold(level) {
		let goldMultiplierStart = level + 1 * (Math.pow(level, settings.enemies.baseGoldRange.exponent.start));
		let goldMultiplierEnd = level + 1 * (Math.pow(level, settings.enemies.baseGoldRange.exponent.end));
		let baseGoldRange = randomInt(settings.enemies.baseGoldRange.start, settings.enemies.baseGoldRange.end)
		let gold = randomInt(goldMultiplierStart + baseGoldRange, goldMultiplierEnd + baseGoldRange);
		return gold
	}

	addItems(enemy, level) {
		let itemCount = randomInt(1,4);

		for (var i = 0; i < itemCount; i++) {
			enemy.inventory.add(this.items.randomItemDrop(level))
		}
		return enemy;
	}

	randomEnemy(level) {

			let animation = new Animation(enemyImages.lightDrake)
			let chance = randomInt(1,100);

			if (level >= 0 && level < 20) {
				chance < 50 ? animation = this.blueDrake() : animation = this.skeleton(); 
			}
			else if (level >= 20 && level < 40) {
				chance < 50 ? animation = this.blueDrake() : animation = this.skeleton(); 
			}

			else if (level >= 40 && level < 60) {
				chance < 50 ? animation = this.lightDrake() : animation = this.skeleton(); 
			}

		    else if (level >= 60 && level < 80) {
				chance < 50 ? animation = this.maleor() : animation = this.skeleton(); 
			}

		    else if (level >= 80 && level < 100) {
				animation = this.lightDrake();
			}
		    else {
				animation = this.lightDrake();
			}
			// animation.addWeapon(weapon.img);
			return animation
		}

		lightDrake() {
			let animation = new Animation(enemyImages.lightDrake)
			animation.add("shirt", enemyImages.lightDrakeTail);
			animation.add("pants", enemyImages.lightDrakeWings);
			return animation
		}

		blueDrake() {
			let animation = new Animation(enemyImages.blueDrake)
			animation.add("shirt", enemyImages.blueDrakeTail);
			animation.add("pants", enemyImages.blueDrakeWings);
			animation.add("hair", enemyImages.blueDrakeWingsFront);
			animation.add("boots", enemyImages.blueDrakeTailFront);
			return animation
		}
		skeleton() {
			let animation = new Animation(enemyImages.skeleton)
			return animation
		}
		maleor() {
			let animation = new Animation(enemyImages.maleor)
			return animation
		}

		blueImp() {
			let animation = new Animation(enemyImages.blueImp)
			return animation
		}

		randomName() {
			let adjectives = ["adamant", "adroit", "amatory", "animistic", "antic", "arcadian", "baleful", "bellicose", "bilious", "boorish", "calamitous", "caustic", "cerulean", "comely", "concomitant", "contumacious", "corpulent", "crapulous", "defamatory", "didactic", "dilatory", "dowdy", "efficacious", "effulgent", "egregious", "endemic", "equanimous", "execrable", "fastidious", "feckless", "fecund", "friable", "fulsome", "garrulous", "guileless", "gustatory", "heuristic", "histrionic", "hubristic", "incendiary", "insidious", "insolent", "intransigent", "inveterate", "invidious", "irksome", "jejune", "jocular", "judicious", "lachrymose", "limpid", "loquacious", "luminous", "mannered", "mendacious", "meretricious", "minatory", "mordant", "munificent", "nefarious", "noxious", "obtuse", "parsimonious", "pendulous", "pernicious", "pervasive", "petulant", "platitudinous", "precipitate", "propitious", "puckish", "querulous", "quiescent", "rebarbative", "recalcitant", "redolent", "rhadamanthine", "risible", "ruminative", "sagacious", "salubrious", "sartorial", "sclerotic", "serpentine", "spasmodic", "strident", "taciturn", "tenacious", "tremulous", "trenchant", "turbulent", "turgid", "ubiquitous", "uxorious", "verdant", "voluble", "voracious", "wheedling", "withering", "zealous"];
			let nouns = ["ninja", "chair", "pancake", "statue", "unicorn", "rainbows", "laser", "senor", "bunny", "captain", "nibblets", "cupcake", "carrot", "gnomes", "glitter", "potato", "salad", "toejam", "curtains", "beets", "toilet", "exorcism", "stick figures", "mermaid eggs", "sea barnacles", "dragons", "jellybeans", "snakes", "dolls", "bushes", "cookies", "apples", "ice cream", "ukulele", "kazoo", "banjo", "opera singer", "circus", "trampoline", "carousel", "carnival", "locomotive", "hot air balloon", "praying mantis", "animator", "artisan", "artist", "colorist", "inker", "coppersmith", "director", "designer", "flatter", "stylist", "leadman", "limner", "make-up artist", "model", "musician", "penciller", "producer", "scenographer", "set decorator", "silversmith", "teacher", "auto mechanic", "beader", "bobbin boy", "clerk of the chapel", "filling station attendant", "foreman", "maintenance engineering", "mechanic", "miller", "moldmaker", "panel beater", "patternmaker", "plant operator", "plumber", "sawfiler", "shop foreman", "soaper", "stationary engineer", "wheelwright", "woodworkers"];

	    	let i = randomInt(0, adjectives.length);
	    	let j = randomInt(0, nouns.length);
	    	return (adjectives[i] + " " + nouns[j]);
		}

}
