import Player from "../Player"
import Enemies from "../Enemy"

import Items from "../Item"

import MapLogic from "../Map"
import UI from "../UI"
import ClickHandler from "../clickhandler"
import Resources from "../Resources/resources"
import Entity from "../Entity"
import ActionHandler from "../ActionHandler"

export default class Logic {

   constructor() {
      // this.testPlayers = new EntityTest();

   		this.clickHandler = new ClickHandler();
   		this.items = new Items();
	   	this.map = new MapLogic(this.items);
      this.actionHandler = new ActionHandler();
      this.Enemies = new Enemies(this.items);
      this.players = new Player()
      // this.merchant = new Player(10,170, 32,32,this.items)
      // this.merchant.body.action = "stop";
      // this.merchant.body.currentDirection = "east";


   		// this.player = new Player(this.map.start.pos.x,this.map.start.pos.y,32,32, this.items)
   		// this.player.setName("Emszy");

      this.player = this.players.main("Emszy", this.items);
	   	this.map.create_base(this.player.status.currLevel);

   		this.UI = new UI(this.items, this.player);

   		this.enemies = []
   		this.target = this.enemies[0];

      this.animals = [];
      this.ore = [];
      this.trees = [];
        // this.animals = new Enemies();
        // this.animals.createAnimals(this.player.currLevel, this.player.skills, this.items);
        // this.animalTarget = this.animals.arr[this.animals.target];


        // this.ore = new Resources(this.items, this.player.currLevel);
        // this.ore.createOres(this.player.currLevel);
        // this.miningTarget = this.ore.arr[this.ore.target];


        // this.trees = new Resources(this.items, this.player.currLevel);
        // this.trees.createWood(this.player.currLevel);
        // this.woodCuttingTarget = this.trees.arr[this.trees.target];


       


   }

	randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	selectTarget() {

		if (this.enemies.length && this.enemies[0].status.dead) {
			this.enemies.splice(0,1);
      if (this.enemies.length) {
        this.target = this.enemies[0];
      }
		} else {
        // if (this.ore.arr[this.ore.target].dead)
        // {
        //     this.ore.choose_target();
        //     this.miningTarget = this.ore.arr[this.ore.target];
        // }

        // if (this.trees.arr[this.trees.target].dead)
        // {
        //     this.trees.choose_target();
        //     this.woodCuttingTarget = this.trees.arr[this.trees.target];
        // }

        // if (this.animals.arr[this.animals.target].dead)
        // {
        //     this.animals.choose_target();
        //     this.animalTarget = this.animals.arr[this.animals.target];
        // }
    }
	}


  // archerFight() {
  //   this.player.body.action = "archery"

  //   if (this.player.currLevel % 2 === 0) {
  //      this.player.body.move_to(this.map.middle.pos.x + 100, this.map.middle.pos.y - 100);
  //   } else {
  //     this.player.body.move_to(this.map.middle.pos.x + 100, this.map.middle.pos.y - 100);
  //   }


  //   this.player.fireArrow(this.target);
  //   let hit = this.player.arrowCollision();

  //      if (hit.hit) {
          
  //         let enemyDrop = this.target.takeDamage(this.player.skills.range.get() + hit.damage);
  //         this.player.skills.range.addXp(hit.damage * 4)
          
  //         if (this.target.isDead()) {
  //             this.player.skills.health.addXp(this.target.skills.health.get() * 15)
  //             this.player.body.action = "walk"
  //         }

  //         if (enemyDrop) {
  //             this.map.inventory[this.player.currLevel - 1].addInventoryToMap(enemyDrop, this.target)
  //             this.player.inventory.addGold(enemyDrop.gold)
  //         }


  //      }
  // }


   fight() {


       this.target.body.action = "walk"

        if (this.player.armor.arrows.id !== -1 && this.player.armor.bow.id !== -1) {
             
           // this.archerFight();

        } else {

       		let playerFight = this.player.body.move_to(this.target.body.pos.x,
       		 						 			this.target.body.pos.y);
       		if (playerFight) {
          
            this.player.body.action = "fight";

       			let enemyDrop = this.actionHandler.takeDamage(this.target, this.actionHandler.fight(this.player));
                if (this.actionHandler.isDead(this.target)) {
                    this.player.skills.attack.addXp(this.target.skills.health.get() * 15)
                    this.player.skills.health.addXp(this.target.skills.health.get() * 40)
                    this.player.body.action = "walk"
                }

       			if (enemyDrop) {
                this.map.inventory[this.player.status.currLevel - 1].addInventoryToMap(enemyDrop, this.target)
                this.player.inventory.addGold(enemyDrop.gold)
       			}
       		} else {
                this.player.body.action = "walk"
          }
        }
   }

   enemyFight() {
     let enemyFight = this.target.body.move_to(this.player.body.pos.x,
                                               this.player.body.pos.y);

     if (enemyFight) {
        this.actionHandler.takeDamage(this.player, this.actionHandler.fight(this.target));
        this.target.body.action = "fight"
     }

   }

    // mine() {
    //     let playerMine = this.player.body.move_to(this.miningTarget.body.pos.x,
    //                                             this.miningTarget.body.pos.y);    
    //     if (playerMine) {
    //         this.player.body.action = "mine";

    //         let resourceDrop = this.miningTarget.takeDamage(this.player.mine());
    //         if (this.miningTarget.isDead()) {
    //             this.player.skills.mining.addXp(this.miningTarget.skills.health.get() * 4)
    //             this.player.body.action = "walk";
    //         }

    //         if (resourceDrop) {
    //            this.player.inventory.addInventory(resourceDrop)
    //         }
    //     }
    // }

    // WoodCut() {
    //     let playerWoodCut = this.player.body.move_to(this.woodCuttingTarget.body.pos.x,
    //                                                  this.woodCuttingTarget.body.pos.y);    
    //     if (playerWoodCut) {
    //         this.player.body.action = "woodcut";

    //         let resourceDrop = this.woodCuttingTarget.takeDamage(this.player.woodCut());
    //         if (this.woodCuttingTarget.isDead()) {
    //             this.player.skills.woodcutting.addXp(this.woodCuttingTarget.skills.health.get() * 4)
    //             this.player.body.action = "walk";

    //         }

    //         if (resourceDrop) {
    //            this.player.inventory.addInventory(resourceDrop)

    //         }
    //     }
    // }

    //  hunt() {
    //     let hunt = this.player.body.move_to(this.animalTarget.body.pos.x,
    //                                                  this.animalTarget.body.pos.y);    
    //     if (hunt) {
    //         this.player.body.action = "fight";
    //         let resourceDrop = this.animalTarget.takeDamage(this.player.hunt());
    //         if (this.animalTarget.isDead()) {
    //             this.player.skills.hunting.addXp(this.animalTarget.skills.health.get() * 4)
    //             this.player.body.action = "walk";
    //         }

    //         if (resourceDrop) {
    //            this.player.inventory.addInventory(resourceDrop)

    //         }
    //     }
    // }


   nextLevel() {
        if (this.player.status.actions.destination === "home") {
           
        } else if (this.player.status.actions.destination === "farm") {
            this.player.prevLevel(this.map.end.pos.x, this.map.end.pos.y);
        } 

        this.player.newLevel(this.map.start.pos.x, this.map.start.pos.y, this.map);

        if (this.player.status.currLevel > 0) {
            this.recreateTargets()
        } else {
            this.clearResources()
        }
   }
     

   restart() {
        this.map.inventory[this.player.status.currLevel - 1].addInventoryToMap(this.actionHandler.dropInventory(this.player), this.player)  
        this.actionHandler.revive(this.player);
        this.recreateTargets();

   }

   clearResources() {
        this.ore = [];
        this.tree = [];
        this.animal = [];
        this.enemies = [];



   }

   recreateTargets() {
            if (this.player.currLevel > 0) {
                this.map.create_base(this.player.currLevel);
            }
            this.enemies = this.Enemies.basic("SOMEONE", this.player.status.currLevel);
            this.target = this.enemies[0];
            
            // this.ore = new Resources(this.items, this.player.currLevel);
            // this.ore.createOres(this.player.currLevel);
            // this.miningTarget = this.ore.arr[this.ore.target];
            
            // this.trees = new Resources(this.items, this.player.currLevel);
            // this.trees.createWood(this.player.currLevel);
            // this.woodCuttingTarget = this.trees.arr[this.trees.target];

            // this.animals = new Enemies();
            // this.animals.createAnimals(this.player.currLevel, this.player.skills, this.items);
            // this.animalTarget = this.animals.arr[this.animals.target];

            this.player.range.projectiles.clearActive();



   }

   moveLogic() {

      if (this.enemies.length) {
        if (this.target.status.dead === false) {
          this.fight();
          this.enemyFight();
        }
      }



      // else if (this.player.body.stopMining === false && this.enemies.complete && this.ore.complete === false)
      // {
      //   this.mine();
      // }
      //  else if (this.player.body.stopWoodCutting === false && this.enemies.complete && (this.ore.complete || this.player.body.stopMining) && this.trees.complete === false)
      // {
      //   this.WoodCut();
      // }

      // else if (this.player.body.stopHunting === false && this.animals.complete === false && this.enemies.complete && (this.ore.complete || this.player.body.stopMining) && (this.trees.complete || this.player.body.stopWoodCutting))
      // {
      //   this.hunt();
      // }

      else {
        this.moveToNextLevel();
      }
   }

   moveToNextLevel() {
        let atEnd = false

        if (this.player.status.actions.destination === "farm") {
            atEnd = this.player.body.move_to(this.map.start.pos.x, this.map.start.pos.y);
            if (atEnd) {
                this.nextLevel();
            }
        }  else if (this.player.status.actions.destination === "home") {
            atEnd = this.player.body.move_to(this.map.start.pos.x, this.map.start.pos.y);
            if (atEnd) {
                this.nextLevel();
            }
        }  else {
            atEnd = this.player.body.move_to(this.map.end.pos.x, this.map.end.pos.y);
            if (atEnd) {
                this.nextLevel();
            }
        }
        
   }

   skillDecay() {
        this.actionHandler.thirsty(this.player);
        this.actionHandler.hungry(this.player);
   }

   atHome() {
    // let atDestination = false
    //         if (this.UI.bankButtons.open === true) {
    //              atDestination = this.player.body.move_to(this.player.home.bank.body.pos.x, this.player.home.bank.body.pos.y)
    //         } else if (this.UI.buyMenuButtons.open || this.UI.craftMenuButtons.open) {
    //              atDestination = this.player.body.move_to(this.player.home.buyMenu.body.pos.x, this.player.home.buyMenu.body.pos.y)

    //         } else if (this.UI.waterWellButton.open) {
    //              atDestination = this.player.body.move_to(this.player.home.waterWell.body.pos.x, this.player.home.waterWell.body.pos.y + 40)
    //         } else {
    //              atDestination = this.player.body.move_to(this.map.middle.pos.x, this.map.middle.pos.y);
    //     }
    //     if (atDestination) {
    //         this.player.body.action = "stop"
    //     } else {
    //         this.player.body.action = "walk"
    //     }
   }

   teleported() {
        // if (this.player.teleported === true && this.player.currLevel === 0) {
        //     this.clearResources()
        //     this.player.teleported = false
        //     this.player.body.goHome = true;
        //     this.UI.teleportHomeLabel(this.player)
        // } else if (this.player.teleported === true) {
        //     this.clearResources()
        //     this.recreateTargets()
        //     this.map.addInventories(this.player);
        //     this.player.teleLevel();
        //     this.player.teleported = false
        // }
   }

   moveToEnd() {
    let atEnd = this.player.body.move_to(this.map.end.pos.x, this.map.end.pos.y);
    if (atEnd) {
      this.player.nextLevel(this.map.start.pos.x, this.map.start.pos.y);
      if (this.player.status.currLevel > 0) {
          this.recreateTargets()
      } else {
          this.clearResources()
      }
    }
   }

   moveToBeginning() {
    let atEnd = this.player.body.move_to(this.map.start.pos.x, this.map.start.pos.y);
    if (atEnd) {
      this.player.prevLevel(this.map.end.pos.x, this.map.end.pos.y);
      if (this.player.status.currLevel > 0) {
          this.recreateTargets()
      } else {
          this.clearResources()
      }
    }
   }

   moveToMiddle() {
        this.player.body.move_to(150,250);
   }

   goHome() {
    let playerStatus = this.player.status;
      if (playerStatus.location === "home") {
        this.moveToMiddle();
        return this
      } else if (this.player.status.location === "farm") {
          this.moveToEnd();
      } else if (playerStatus.location == "wild" && playerStatus.currLevel > 0) {
          this.moveToBeginning();
          this.enemyFight();

      }

   }

   goFarm() {
    let playerStatus = this.player.status;

    if (playerStatus.location === "farm") {
        this.moveToMiddle();
        return this;
      } else {
        this.moveToBeginning();
        this.enemyFight();

      }
   }

   goToWild() {
    let playerStatus = this.player.status;

    if (playerStatus.location === "wild" && this.enemies.length) {
        if (this.target.status.dead === false) {
          this.fight();
          this.enemyFight();
        }
    }
    else {
      let atEnd = this.player.body.move_to(this.map.end.pos.x, this.map.end.pos.y);
      if (atEnd) {
        this.player.newLevel(this.map.start.pos.x, this.map.start.pos.y, this.map);
        if (this.player.status.currLevel > 0) {
            this.recreateTargets()
        } else {
            this.clearResources()
        }
      }

    }
   }

   play() {
        

        this.player.setLocation();
        this.player.setDestination();
        this.player.setAction(this.enemies, this.ore, this.trees, this.animals)

        let playerStatus = this.player.status;

        if (playerStatus.dead === true) {
            if (this.player.armor.animation.deathTimer.done) {
                this.restart();
            }
            return this
        }

          if (playerStatus.actions.destination === "home") {
            this.goHome();
          } else if (playerStatus.actions.destination === "farm") {
            this.goFarm();
          } else if (playerStatus.actions.destination === "wild") {
            this.goToWild()
          } else if (playerStatus.location === "lost"){
            console.log("SPOOFEM");
          } else {

          }

        this.selectTarget();
        // this.player.range.moveFiredArrows();
        this.skillDecay();
        // this.player.home.farm.timer();

        // this.player.range.checkCollision(this.enemies);

   		return this
   }


}