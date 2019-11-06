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
import {randomInt} from "../../Helpers/functions"

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
      
      this.merchant = this.players.main("Merchant", this.items);
      this.merchant.body.action = "stop";
      this.merchant.body.currentDirection = "east";

      this.player = this.players.main("Emszy", this.items);

	   	this.map.create_base(this.player.status.currLevel);

   		this.UI = new UI(this.items, this.player);

   		this.enemies = []
   		this.target = this.enemies[0];

      this.animals = [];
      this.ore = [];
      this.trees = [];       


   }

  targetSelectLogic(arr) {
      if (arr[0].status.dead) {
        arr.splice(0,1);
      }
      if (arr.length) {
        this.target = arr[0];
      }
  }

	selectTarget() {
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
    }
	}


   fight() {


       this.target.body.action = "walk"

        if (this.player.armor.arrows.id !== -1 && this.player.armor.bow.id !== -1) {
             
           // this.archerFight();

        } else {

       		let playerFight = this.player.body.move_to(this.target.body.pos.x,
       		 						 			this.target.body.pos.y);
       		if (playerFight) {

                this.player.body.action = "fight";
                let enemyDrop = this.actionHandler.fight(this.player, this.target);

                if (this.actionHandler.isDead(this.target)) {
                    this.actionHandler.xp(this.player, this.target)
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
        let enemyDrop = this.actionHandler.fight(this.target, this.player);
        this.target.body.action = "fight"
     }

   }


   restart() {
        this.map.inventory[this.player.status.currLevel - 1].addInventoryToMap(this.player.inventory, this.player)  
        this.actionHandler.revive(this.player);
        this.recreateTargets();

   }

   clearResources() {
        this.ore = [];
        this.trees = [];
        this.animals = [];
        this.enemies = [];
   }

   recreateTargets() {
            if (this.player.status.currLevel > 0) {
                this.map.create_base(this.player.status.currLevel);
            }
            this.enemies = this.Enemies.basic(this.player.status.currLevel);
            this.target = this.enemies[0];
            this.ore = this.resources.newResource(this.player.status.currLevel, this.oreItems, this.resources.createOres)
            this.trees = this.resources.newResource(this.player.status.currLevel, this.woodItems, this.resources.createWood)
            this.animals = this.npcs.animals(this.player.status.currLevel);
            this.player.range.projectiles.clearActive();



   }   

   skillDecay() {
        this.actionHandler.thirsty(this.player);
        this.actionHandler.hungry(this.player);
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
      this.player.newLevel(this.map.start.pos.x, this.map.start.pos.y, this.map);
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
          if (this.enemies.length) {
            this.enemyFight();
          }

      }

   }

   goFarm() {
    let playerStatus = this.player.status;

    if (playerStatus.location === "farm") {
        this.moveToMiddle();
        return this;
      } else {
        this.moveToBeginning();
        if (this.enemies.length) {
          this.enemyFight();  
        }

      }
   }

   goToWild() {
    let playerStatus = this.player.status;

    if (playerStatus.action === "walk") {
      this.moveToEnd();
    } else {
      this.fight();
    }
    if (playerStatus.location === "wild" && this.enemies.length && playerStatus.action === "fighting") {
        if (this.target.status.dead === false) {
          this.enemyFight();
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

          if (playerStatus.destination === "home") {
            this.goHome();
          } else if (playerStatus.destination === "farm") {
            this.goFarm();
          } else if (playerStatus.destination === "wild") {
            this.goToWild()
          } else if (playerStatus.location === "lost"){
            console.log("SPOOFEM");
          } 

        this.selectTarget();
        // this.player.range.moveFiredArrows();
        this.skillDecay();
        this.player.home.farm.timer();

        // this.player.range.checkCollision(this.enemies);

   		return this
   }


}