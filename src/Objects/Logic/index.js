import Player from "../Player"
import Enemies from "../Enemy"

import Items from "../Item"

import MapLogic from "../Map"
import UI from "../UI"
import ClickHandler from "../clickhandler"
import Resources from "../Resources"
import Npc from "../Npc"

import Entity from "../Entity"
import ActionHandler from "../ActionHandler"
import {randomInt, timer} from "../../Helpers/functions"

export default class Logic {

   constructor() {
      // this.testPlayers = new EntityTest();

   		this.clickHandler = new ClickHandler();
   		this.items = new Items();
      this.oreItems = this.items.returnItems(1,0);
      this.woodItems = this.items.returnItems(1,1);
	   	
      this.map = new MapLogic(this.items);
      this.actionHandler = new ActionHandler();
      this.Enemies = new Enemies(this.items);
      this.players = new Player()
      this.resources = new Resources(this.items);
      this.npcs = new Npc(this.items);
      
      this.merchant = this.players.merchant(this.items);
      
      this.timer = timer(5000);


      this.player = this.players.player("Emszy", this.items);

	   	this.map.create_base(this.player.status.currLevel);

   		this.UI = new UI(this.items, this.player);

   		this.enemies = []
   		this.player.target = this.enemies[0];

      this.animals = [];
      this.ore = [];
      this.trees = [];       


   }

  targetSelectLogic(arr) {
      if (arr[0].status.dead) {
        arr.splice(0,1);
      }
      if (arr.length) {
        this.player.target = arr[0];
      }
  }

	selectTarget() {

  let playerStatus = this.player.status;
    if (playerStatus.destination === "home") {
        if (playerStatus.location === "home") {
          this.player.target = this.map.middle;
        } else if (this.player.status.location === "farm") {
          this.player.target = this.map.end;
        } else if (playerStatus.location == "wild" && playerStatus.currLevel > 0) {
          this.player.target = this.map.start;
        }
    }
    else if (playerStatus.destination === "farm") {
        if (playerStatus.location === "farm") {
          this.player.target = this.map.middle;
        } else {
          this.player.target = this.map.start;
        }
    } 
    else if (playerStatus.destination === "wild") {
      if (playerStatus.location === "farm") {
        this.player.target = this.map.end;
      }
      else if (playerStatus.location === "home") {
        this.player.target = this.map.end;
      } 

      if (this.player.status.action === "fighting" && this.enemies.length) {
          this.targetSelectLogic(this.enemies);
      }   
      else if (this.player.status.action === "mining" && this.ore.length)
      {
        this.targetSelectLogic(this.ore);

      } 
      else if (this.player.status.action === "woodCutting" && this.trees.length)
      {
        this.targetSelectLogic(this.trees);
      } 
      else if (this.player.status.action === "hunting" && this.animals.length)
      {
        this.targetSelectLogic(this.animals);
      } else {
          this.player.target = this.map.end;
      }
    }
    else if (playerStatus.location === "lost"){
        this.player.target = this.map.end;
    }
	}



   fight() {

        if (this.player.armor.arrows.id !== -1 && this.player.armor.bow.id !== -1) {

        } else {


       		if (this.player.body.at_destination(this.player.target.body.pos.x, this.player.target.body.pos.y)) {

                this.player.setAnimationAction();
                
                let enemyDrop = this.actionHandler.fight(this.player, this.player.target);

                if (this.actionHandler.isDead(this.player.target)) {
                    this.actionHandler.xp(this.player, this.player.target)
                    this.player.body.action = "walk"
                }

           			if (enemyDrop) {
                    this.map.inventory[this.player.status.currLevel - 1].addInventoryToMap(enemyDrop, this.player.target)
                    this.player.inventory.addGold(enemyDrop.gold)
           			}
       		} else {
                this.player.body.action = "walk"
          }
        }
   }


   enemyFight() {
     this.player.target.body.action = "walk"
     if (this.player.target.body.at_destination(this.player.body.pos.x, this.player.body.pos.y)) {
        this.actionHandler.fight(this.player.target, this.player);
        this.player.target.body.action = "fight"
     }

   }

   
   recreateTargets() {
            if (this.player.status.currLevel > 0) {
                this.map.create_base(this.player.status.currLevel);
            }
            this.enemies = this.Enemies.basic(this.player.status.currLevel);
            for (var i = this.enemies.length - 1; i >= 0; i--) {
              this.enemies[i].target = this.player
            }
            this.player.target = this.enemies[0];
            this.ore = this.resources.newResource(this.player.status.currLevel, this.oreItems, this.resources.createOres)
            this.trees = this.resources.newResource(this.player.status.currLevel, this.woodItems, this.resources.createWood)
            this.animals = this.npcs.animals(this.player.status.currLevel);
            this.player.range.projectiles.clearActive();

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
  clearResources() {
        this.ore = [];
        this.trees = [];
        this.animals = [];
        this.enemies = [];
   }

   moveToEnd() {
    if (this.player.body.at_destination(this.player.target.body.pos.x, this.player.target.body.pos.y)) {
      this.player.newLevel(this.map.start.body.pos.x, this.map.start.body.pos.y, this.map);
      if (this.player.status.currLevel > 0) {
          this.recreateTargets()
      } else {
          this.clearResources()
      }
    }
   }

   moveToBeginning() {
    if (this.player.body.at_destination(this.player.target.body.pos.x, this.player.target.body.pos.y)) {
      this.player.prevLevel(this.map.end.body.pos.x, this.map.end.body.pos.y);
      if (this.player.status.currLevel > 0) {
          this.recreateTargets()
      } else {
          this.clearResources()
      }
    }
   }

   moveThroughLevel() {
      if (this.player.target.name === "beginning") {
        this.player.body.action = "walk"
        this.moveToBeginning()
      } else if (this.player.target.name === "middle") {
          if (this.player.body.at_destination(this.player.target.body.pos.x, this.player.target.body.pos.y)) {
              this.player.body.action = "stop"
          }
      } else if (this.player.target.name === "end") {
        this.player.body.action = "walk"
        this.moveToEnd();
      }
   }

   enemyFightOnWalkHome() {
      if (this.player.status.location == "wild") {
          if (this.enemies.length) {
            this.enemyFight();
          }
      }
   }

   goToWild() {
    let playerStatus = this.player.status;
    this.moveThroughLevel();
    if (playerStatus.location === "wild" && this.enemies.length && playerStatus.action === "fighting") {
        if (this.player.target.status.dead === false) {
          this.fight();
          this.enemyFight();
        }
    } else {
      this.fight();
    }
   }

    goToBase() {
      let playerStatus = this.player.status;
      this.moveThroughLevel()
      this.enemyFightOnWalkHome()

   }

   restart() {
        this.map.inventory[this.player.status.currLevel - 1].addInventoryToMap(this.player.inventory, this.player)
        this.actionHandler.revive(this.player);
        this.recreateTargets();

   }

   play() {
        
        this.player.setLocation();
        this.player.setDestination();
        this.player.setAction(this.enemies, this.ore, this.trees, this.animals);

        this.selectTarget();
        let playerStatus = this.player.status;
          if (playerStatus.dead === true) {
              if (this.player.armor.animation.deathTimer.done) {
                  this.restart();
              }
              return this
          }

          if (playerStatus.destination === "home" || playerStatus.destination === "farm") {
            this.goToBase();
          } else if (playerStatus.destination === "wild") {
            this.goToWild()
          } else if (playerStatus.location === "lost"){
            console.log("SPOOFEM");
          } 

        // this.player.range.moveFiredArrows();
        this.actionHandler.skillDecay(this.player);
        this.player.home.farm.timer();
        this.timer.check()
        // this.player.range.checkCollision(this.enemies);

   		return this
   }


}