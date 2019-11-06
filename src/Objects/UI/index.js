import RigidBody from "../../Helpers/rigidBody"
import Draw from "./draw"
import Grid from "./grid"

import ClickHandler from "../clickhandler"
import {userInterface, magicImages} from "../../Objects/Animations/images"


export default class UI {
	constructor(items, player) {
		this.items = items;
		
    let  menuLabels =  [   
                      "Items",
                      "Armor",
                      "Stats",
                      "Magic",
                  ]


    let menuImages = [
                      userInterface.inventoryIcon,
                      userInterface.armorIcon,
                      userInterface.statsIcon,
                      userInterface.magicIcon
                    ]
    this.menuButtons = new Grid({
                                  x: 365,
                                  y: 440,
                                  width : 4,
                                  height : 1,
                                  cellWidth : 30,
                                  cellHeight: 40,
                                  labelOffsetX : 2,
                                  labelOffsetY : 20,
                                  labelSize : 9,
                                  imgs : menuImages
                                })




    let magicLabels = [ "Home", "+10", "+50",
                        "+5", "+10", "+30",
                        "+5", "+10", "+30",
                        "+5", "+10", "+30",
                        "+5", "+10", "+30",
                        "+5", "+10", "+30",
                        "+5", "+10", "+30",                     
                    
                      ];

     let magicImgs = [  
                        magicImages.teleportStone, magicImages.teleportStone, magicImages.teleportStone,
                        magicImages.rangeStone, magicImages.rangeStone, magicImages.rangeStone,
                        magicImages.defenseStone, magicImages.defenseStone, magicImages.defenseStone,
                        magicImages.attackStone, magicImages.attackStone, magicImages.attackStone,
                        magicImages.miningStone, magicImages.miningStone, magicImages.miningStone,
                        magicImages.woodcutStone, magicImages.woodcutStone, magicImages.woodcutStone,
                        magicImages.huntingStone, magicImages.huntingStone, magicImages.huntingStone,                        
                      ];

    this.magicButtons = new Grid({
                                  x: 365,
                                  y: 140,
                                  width : 3,
                                  height : 7,
                                  cellWidth : 40,
                                  cellHeight: 40,
                                  labelOffsetX : 0,
                                  labelOffsetY : 10,
                                  labelSize : 9,
                                  labels : magicLabels,
                                  imgs : magicImgs,
                                  ySpace : 2,
                                  xSpace : 5,
                                })

		this.actionButtons = [];
    this.actionButtons = [];

		this.armorButtons = [];

		this.bankButtons = {
			background : this.button(32, 32, 300, 430),
			spaces : [],
			controls : [],
			page : 0,
			open : false,
		};

		this.buyMenuButtons = {
			background : this.button(32, 32, 300, 430),
			spaces : [],
			controls : [],
			categories : [],
			subCategories : [],
			page : 0,
			subCategoryPage : 0,
			selectedItem : -1,
			itemLength : 0,
			open : false,
		};

    this.craftMenuButtons = {
      background : this.button(32, 32, 300, 430),
      spaces : [],
      controls : [],
      categories : [],
      subCategories : [],
      page : 0,
      subCategoryPage : 0,
      selectedItem : -1,
      itemLength : 0,
      open : false,
    };


    this.farmButtons = {
        spaces : [],
        controls: [],
        open : true,
    }

    this.waterWellButton = {
      open : false,
      collect : function(player) {
        if (this.open === true) {
          player.home.waterWell.getWater(player.inventory);
        }
      }
    }

    this.rightClickMenu = {

        background : this.button(0, 0, 50, 100),
        index : -1,
        buttons : [],
        open : false,
        menu : "",
        clear : function() {
                  this.menu = "";
                  this.open = false
                  this.index = -1
                  this.buttons = []
        }

    }

   
		this.homeMenuButtons = [];
		this.inventorySpaces = [];
		this.showItems = true;
		this.showArmor = false;
		this.showStats = false;
		this.showMagic = false;
		this.draw = new Draw();
		this.clickHandler = new ClickHandler();
		this.makeInventorySpaces();
		this.makeCharacterActionButtons(player);
		this.makeArmorSpaces();
		this.makeBankButtons();
		this.makeBuyButtons(items);
    this.makeCraftButtons(items);
		this.makeHomeActionButtons(player);
    this.makeFarmButtons(player);

	}



	//map
	drawMap(map, ctx) {

    for (let x = 0; x < map.height; x++) {
      for (let y = 0; y < map.width; y++) {
        let tile = map.tiles[y][x]
        map.animation.drawImageBase(tile.info.terrain, tile.info.type, tile.info.img, tile.body.pos, ctx)
      }
    }

    for (let y = 0; y < map.layer.length; y++) {
        let tile = map.layer[y]
        map.animation.drawImageLayer(tile.info.terrain, tile.info.type, tile.info.img, tile.body.pos, ctx)
      }
  }

// drawing players

  animationAction(player, direction, ctx) {
      if (player.body.action === "fight") {
         player.animation.fight(direction, player,ctx)
      } else if (player.body.action === "archery") {
         player.animation.range(direction, player, ctx)
      } else if (player.body.action === "mine") {
         player.animation.mine(direction, player, ctx)
      } else if (player.body.action === "woodcut") {
         player.animation.woodcut(direction, player, ctx)
      } else if (player.body.action === "stop") {
         player.animation.stop(direction, player, ctx)
      }  else {
        player.animation.walk(direction, player, ctx)
      }
  }



  animationMovement(player, ctx) {
    if (player.status.dead === true) {
        player.armor.animation.death(player,ctx)
        return false
      }

    if (player.body.currentDirection === "north") {
      this.animationAction(player, "up", ctx)
    }
      
    else if (player.body.currentDirection === "east") {
      this.animationAction(player, "right", ctx)
    }

    else if (player.body.currentDirection === "south") {
        this.animationAction(player, "down", ctx)
    }
    else if (player.body.currentDirection === "west") {
      this.animationAction(player, "left", ctx)
    }
  }


  playerAnimationAction(player, direction, ctx) {
    if (player.body.action === "fight") {
         player.armor.animation.fight(direction, player,ctx)
      } else if (player.body.action === "archery") {
         player.armor.animation.range(direction, player, ctx)
      } else if (player.body.action === "mine") {
         player.armor.animation.mine(direction, player, ctx)
      } else if (player.body.action === "woodcut") {
         player.armor.animation.woodcut(direction, player, ctx)
      } else if (player.body.action === "stop") {
         player.armor.animation.stop(direction, player, ctx)
      } else {
          player.armor.animation.walk(direction, player, ctx)
      }
  }

  

  playerAnimationMovement(player, ctx) {
    if (player.status.dead === true) {
        player.armor.animation.death(player,ctx)
        return false
      }

    if (player.body.currentDirection === "north") {
      this.playerAnimationAction(player, "up", ctx)
    }
      
    else if (player.body.currentDirection === "east") {
      this.playerAnimationAction(player, "right", ctx)
    }

    else if (player.body.currentDirection === "south") {
        this.playerAnimationAction(player, "down", ctx)

    }

    else if (player.body.currentDirection === "west") {
      this.playerAnimationAction(player, "left", ctx)
    }
  }



  drawPlayers(player, enemies, ctx) {
    // draws enemies;
    for (let i = 0; i < enemies.length; i++) {
        this.playerAnimationMovement(enemies[i], ctx);
        this.drawHealthBar(enemies[i], ctx);
        // enemies[i].body.followPath();
    }

    for (var i = 0; i < player.range.projectiles.active.length; i++) {
      if (player.range.projectiles.active[i]) {
          this.draw.fillRect(player.range.projectiles.active[i].projectile, "blue", ctx);
      }
    }


    this.playerAnimationMovement(player, ctx)
    this.drawPlayerStatsInCorner(player, ctx);


  }

  drawAnimals(animals, ctx) {
    for (let i = 0; i < animals.length; i++) {
      
        animals[i].body.followPath();

        if (animals[i].body.currentDirection === "north") {
          animals[i].armor.animation.walk("up", animals[i], ctx)
        }
          
        if (animals[i].body.currentDirection === "east") {
          animals[i].armor.animation.walk("right", animals[i], ctx)
        }

        if (animals[i].body.currentDirection === "south") {
          animals[i].armor.animation.walk("down", animals[i], ctx)
        }

        if (animals[i].body.currentDirection === "west") {
          animals[i].armor.animation.walk("left", animals[i], ctx)
        }
        this.drawHealthBar(animals[i], ctx);
    }
  }


  drawResource(resource, ctx) {
    for (let i = 0; i < resource.length; i++) {
        resource[i].armor.animation.drawResource(resource[i], ctx)
        this.drawHealthBar(resource[i], ctx);
    }
  }

  drawMapInventory(inventory, ctx) {
    if (!inventory) {
      return (false);
    }
    for (let i = 0; i < inventory.spaces.length; i++) {
        if (inventory.spaces[i].id !== -1) {
          this.draw.inventoryItemImg(inventory.spaces[i].img, inventory.spaces[i].body.pos.x - 12, inventory.spaces[i].body.pos.y - 12, ctx)
        }
    }
  }

  mapInventoryClick(mouse, inventory, player, canvas) {
    
    let len = inventory.spaces.length
         for (let x = 0; x < len; x++) {
            if (this.clickHandler.click(mouse, inventory.spaces[x], canvas))
            {
              if(player.inventory.addQuantity(inventory.spaces[x], inventory.spaces[x].quantity)) {
                inventory.delete(x);
              }
            }
        }
  }

 // stats

	drawPlayerStats(player, ctx) {
		let xOffset = 370;
		let yOffset = 140;
		let yIncrement = 15
		let yXpIncrement = 10

		let skills = player.skills
		let inventory = player.inventory



		//may need to be drawn somwhere else
		this.draw.text(player.name, 362, 20, "20", ctx);
		//
		
    this.draw.img(userInterface.stats, 360, 0, 120,480, ctx)

    this.draw.text(skills.health.show(), xOffset, yOffset += yIncrement, "10", ctx);
		this.draw.text(skills.health.showXp(), xOffset + 10, yOffset += yXpIncrement, "8", ctx);

		this.draw.text(skills.attack.show(), xOffset, yOffset += yIncrement, "10", ctx);
		this.draw.text(skills.attack.showXp(), xOffset + 10, yOffset += yXpIncrement, "8", ctx);

    this.draw.text(skills.range.show(), xOffset, yOffset += yIncrement, "10", ctx);
    this.draw.text(skills.range.showXp(), xOffset + 10, yOffset += yXpIncrement, "8", ctx);

		this.draw.text(skills.thirst.show(), xOffset, yOffset += yIncrement, "10", ctx);
		this.draw.text(skills.thirst.showXp(), xOffset + 10, yOffset += yXpIncrement, "8", ctx);

		this.draw.text(skills.hunger.show(), xOffset, yOffset += yIncrement, "10", ctx);
		this.draw.text(skills.hunger.showXp(), xOffset + 10, yOffset += yXpIncrement, "8", ctx);

		this.draw.text(skills.mining.show(), xOffset, yOffset += yIncrement, "10", ctx);
		this.draw.text(skills.mining.showXp(), xOffset + 10, yOffset += yXpIncrement, "8", ctx);

		this.draw.text(skills.woodcutting.show(), xOffset, yOffset += yIncrement, "10", ctx);
		this.draw.text(skills.woodcutting.showXp(), xOffset + 10, yOffset += yXpIncrement, "8", ctx);

    this.draw.text(skills.hunting.show(), xOffset, yOffset += yIncrement, "10", ctx);
    this.draw.text(skills.hunting.showXp(), xOffset + 10, yOffset += yXpIncrement, "8", ctx);


		yOffset += 40
		this.draw.text("Gold: " + inventory.gold, xOffset, yOffset += yIncrement, "10", ctx);
		this.draw.text("Level: " + player.status.currLevel, xOffset, yOffset += yIncrement, "10", ctx);
		this.draw.text("Highest Level: " + player.status.highestLevel, xOffset, yOffset += yIncrement, "10", ctx);

  	}

  	scale(value, x1, y1, x2, y2) {
  	 return ((value - x1) * (y2 - x2) / (y1 - x1) + x2)
  	}


    drawHealthBar (obj, ctx)  {
     
        let redHealth = this.button(obj.body.pos.x , obj.body.pos.y, obj.body.size.x, 2);
        let scaledHealth = this.scale(obj.skills.health.getCurrent(), 0, obj.skills.health.get(), 0 , obj.body.size.x)
        let currHealth = this.button(obj.body.pos.x , obj.body.pos.y, scaledHealth, 2) 

        this.draw.fillRect(redHealth, "red", ctx);
        this.draw.fillRect(currHealth, "green", ctx);

    }


  	drawPlayerStatsInCorner(player, ctx) {
      const barHeight = 10;
      const xOffset = 30;

      // draw red part of health bar / underside

      let redHealth = this.button(xOffset, 0, player.body.size.x, barHeight);

      this.draw.fillRect(redHealth, "red", ctx);
      
      redHealth.body.pos.y += 15;
      this.draw.fillRect(redHealth, "red", ctx);

      redHealth.body.pos.y += 15;
      this.draw.fillRect(redHealth, "red", ctx);

      // draw green part of health bar scaled to player width

      let scaledHealth = this.scale(player.skills.health.getCurrent(), 0, player.skills.health.get(), 0 , player.body.size.x)
      let currHealth = this.button(xOffset, 0, scaledHealth, barHeight) 

      this.draw.fillRect(currHealth, "purple", ctx);


      let scaledThirst = this.scale(player.skills.thirst.getCurrent(), 0, player.skills.thirst.get(), 0 , player.body.size.x)
      let currThirst = this.button(xOffset, 15, scaledThirst, barHeight) 
      this.draw.fillRect(currThirst, "blue", ctx);

      let scaledHunger = this.scale(player.skills.hunger.getCurrent(), 0, player.skills.hunger.get(), 0 , player.body.size.x)
	    let currHunger = this.button(xOffset, 30, scaledHunger, barHeight) 
      this.draw.fillRect(currHunger, "orange", ctx);

      this.draw.text("HP", 0, 8, "10", ctx)
      this.draw.text("Thirst", 0, 22, "10", ctx)
      this.draw.text("Food", 0, 38, "10", ctx)
      this.draw.text("Level: " + player.status.currLevel, 0, 54, "10", ctx);

  }

	// inventory


	drawSpacesForInventory(player, ctx) {   
      this.draw.img(userInterface.stats, 360, 0, 120, 480, ctx)
      this.draw.img(userInterface.inventory, 360, 0, 120, 440, ctx)

      for (let i = 0; i < this.inventorySpaces.length; i++) {
          let x = this.inventorySpaces[i].body.pos.x;
          let y = this.inventorySpaces[i].body.pos.y;

          if (player.inventory.spaces[i].id !== -1) {
            if (player.inventory.spaces[i].img) {
              this.draw.img(player.inventory.spaces[i].img, x, y,32,32, ctx)
            } else {
               this.draw.text(player.inventory.spaces[i].name, x, y + 10, "9", ctx);
            }
             this.draw.text(player.inventory.spaces[i].quantity, x + 5, y + 15, "15", ctx);
          }
        }

  }

	drawInventory(player, ctx) {  
		  if (this.showItems) {
		    this.drawSpacesForInventory(player, ctx);
		  } else if (this.showArmor) {
		    this.drawSpacesForArmor(ctx);
		    this.drawPlayerArmor(player,ctx)
		  } else if (this.showStats) {
		    this.drawPlayerStats(player, ctx)
		  } else if (this.showMagic) {
        this.draw.img(userInterface.stats, 360, 0,120,480, ctx)
        this.magicButtons.drawGrid(ctx);
      }

      this.menuButtons.drawGrid(ctx);
		  this.drawActionButtons(ctx);
	}

  drawHomeDesign(player, merchant, ctx) {
      if (player.status.currLevel === 0) {
        for (var i = 0; i < player.home.floor.length; i++) {
          player.home.floorAnimation.drawFloor(player.home.floor[i].index, player.home.floor[i], ctx)
        }

        player.home.wallAnimation.drawWall(ctx);

        this.playerAnimationMovement(merchant, ctx)
        this.drawHomeActionButtons(player, ctx)
      }
  }

	drawHome(player, items, ctx) {
		let home = player.home;
		if (player.status.currLevel === 0) {

			if (this.bankButtons.open === true) {
				this.drawBankButtons(player, ctx);
			}
			if (this.buyMenuButtons.open === true) {
				this.drawBuyButtons(player, items, ctx);
			}
      if (this.craftMenuButtons.open === true) {
        this.drawCraftButtons(player, items, ctx);
      }
      if (this.rightClickMenu.open === true) {
        this.drawDoubleClickButtons(player, ctx);
      }
      this.waterWellButton.collect(player);

		}
      
	}

  drawFarm(player, ctx) {
    if (player.status.destination === "farm" && player.status.currLevel === -1) {
      this.drawFarmButtons(player, ctx);
    }
  }

  drawActionButtons(ctx){
      this.actionButtons.drawGrid(ctx);
  }

  drawHomeActionButtons(player, ctx){
    
      this.draw.img(userInterface.greenButton,this.homeMenuButtons[3].button.body.pos.x - 10,this.homeMenuButtons[3].button.body.pos.y - 13, 85, 30,  ctx);

      this.draw.label(this.homeMenuButtons[3], ctx);
      player.home.bank.animation.drawImage("open", player.home.bank, ctx)
      player.home.waterWell.animation.drawWaterWell(player.home.waterWell, ctx);

      player.home.buyMenu.animation.drawCraftCorner(player.home.buyMenu, ctx)


  }

  

  drawBuyButtons(player, items, ctx){


  	  let page = this.buyMenuButtons.page;
  	  let subCategoryPage = this.buyMenuButtons.subCategoryPage;
      let subItems = this.buyMenuButtons.subCategories[page][subCategoryPage].items;

      this.draw.img(userInterface.buyBackGround, 25, 25, userInterface.buyBackGround.pos.width, userInterface.buyBackGround.pos.height, ctx);
      this.draw.text("Gold: " + player.inventory.gold, 365, 60, "12", ctx);
      let len = subItems.length


      this.buyMenuButtons.itemLength = len;
      for (let i = 0; i < len; i++) {
        this.draw.img(userInterface.itemBorder, this.buyMenuButtons.spaces[i].button.body.pos.x, this.buyMenuButtons.spaces[i].button.body.pos.y, this.buyMenuButtons.spaces[i].button.body.size.x, this.buyMenuButtons.spaces[i].button.body.size.y, ctx)
        if (subItems[i].img) {
            this.draw.inventoryItemImg(subItems[i].img, this.buyMenuButtons.spaces[i].button.body.pos.x, this.buyMenuButtons.spaces[i].button.body.pos.y, ctx)
        }
      	  	this.buyMenuButtons.spaces[i].label.changeLabel(subItems[i].name)
      	  	this.buyMenuButtons.spaces[i].label2.changeLabel(subItems[i].price)
          	this.draw.actionButton(this.buyMenuButtons.spaces[i], ctx);
      }
      this.draw.img(userInterface.greenButton, this.buyMenuButtons.controls[1].button.body.pos.x - 5,this.buyMenuButtons.controls[1].button.body.pos.y - 5, 110, 60,  ctx)
      this.draw.img(userInterface.redButton, this.buyMenuButtons.controls[2].button.body.pos.x - 5,this.buyMenuButtons.controls[2].button.body.pos.y - 5, 110, 60,  ctx)

      len = this.buyMenuButtons.controls.length
      for (let x = 0; x < len; x++) {
          this.draw.label(this.buyMenuButtons.controls[x], ctx);
      }

      len = this.buyMenuButtons.categories.length
      for (let x = 0; x < len; x++) {
         
        if (this.buyMenuButtons.categories[x].category === page) {
            this.draw.img(userInterface.greenButton, this.buyMenuButtons.categories[x].button.body.pos.x - 5,this.buyMenuButtons.categories[x].button.body.pos.y - 5, 70, 35,  ctx)
        } else {
          this.draw.img(userInterface.aquaButton, this.buyMenuButtons.categories[x].button.body.pos.x - 5,this.buyMenuButtons.categories[x].button.body.pos.y - 5, 70, 35,  ctx) 
        }
          
          this.draw.label(this.buyMenuButtons.categories[x], ctx);
      }


      len = this.buyMenuButtons.subCategories[page].length

      for (let x = 0; x < len; x++) {
         if (x === subCategoryPage) {
          this.draw.img(userInterface.greenButton, this.craftMenuButtons.subCategories[page][x].button.body.pos.x - 5,this.craftMenuButtons.subCategories[page][x].button.body.pos.y - 5, 70, 40,  ctx)
        } else {
          this.draw.img(userInterface.blueButton, this.craftMenuButtons.subCategories[page][x].button.body.pos.x - 5,this.craftMenuButtons.subCategories[page][x].button.body.pos.y - 5, 70, 40,  ctx)

        }
          this.draw.label(this.buyMenuButtons.subCategories[page][x], ctx);
      }

  }


  drawCraftButtons(player, items, ctx){



      let page = this.craftMenuButtons.page;
      let subCategoryPage = this.craftMenuButtons.subCategoryPage;
      let subItems = this.craftMenuButtons.subCategories[page][subCategoryPage].items;
      let len = subItems.length
      
      this.draw.img(userInterface.buyBackGround, 25, 25, userInterface.buyBackGround.pos.width, userInterface.buyBackGround.pos.height, ctx);
      this.draw.text("Gold: " + player.inventory.gold, 365, 60, "12", ctx);

      this.craftMenuButtons.itemLength = len;
      for (let i = 0; i < len; i++) {


            this.draw.img(userInterface.itemBorder, this.craftMenuButtons.spaces[i].button.body.pos.x, this.craftMenuButtons.spaces[i].button.body.pos.y, this.craftMenuButtons.spaces[i].button.body.size.x, this.craftMenuButtons.spaces[i].button.body.size.y, ctx)

            this.craftMenuButtons.spaces[i].label.changeLabel(subItems[i].name)
            if (subItems[i].img) {
              this.draw.inventoryItemImg(subItems[i].img, this.craftMenuButtons.spaces[i].button.body.pos.x, this.craftMenuButtons.spaces[i].button.body.pos.y, ctx)
            }

            // add this to this.draw.craftButton...
            if (subItems[i].recipe[2]) {
              this.craftMenuButtons.spaces[i].label4.changeLabel(subItems[i].recipe[2].item.name + " x " + subItems[i].recipe[2].quantity)
            } else {
              this.craftMenuButtons.spaces[i].label4.changeLabel("");
            }

            this.draw.craftButton(this.craftMenuButtons.spaces[i], subItems[i], ctx);
      }


      this.draw.img(userInterface.redButton, this.craftMenuButtons.controls[1].button.body.pos.x - 5,this.craftMenuButtons.controls[1].button.body.pos.y - 5, 110, 60,  ctx)
      this.draw.img(userInterface.greenButton, this.craftMenuButtons.controls[2].button.body.pos.x - 5,this.craftMenuButtons.controls[2].button.body.pos.y - 5, 110, 60,  ctx)
      
      len = this.craftMenuButtons.controls.length
      for (let x = 0; x < len; x++) {

          this.draw.label(this.craftMenuButtons.controls[x], ctx);
      }

      len = this.craftMenuButtons.categories.length
      for (let x = 0; x < len; x++) {
         if (x === page) {
            this.draw.img(userInterface.greenButton, this.craftMenuButtons.categories[x].button.body.pos.x - 5,this.craftMenuButtons.categories[x].button.body.pos.y - 5, 70, 35,  ctx)
          } else {
            this.draw.img(userInterface.aquaButton, this.craftMenuButtons.categories[x].button.body.pos.x - 5,this.craftMenuButtons.categories[x].button.body.pos.y - 5, 70, 35,  ctx)
          }


          this.draw.label(this.craftMenuButtons.categories[x], ctx);
      }


      len = this.craftMenuButtons.subCategories[page].length

      for (let x = 0; x < len; x++) {
        if (x === subCategoryPage) {
          this.draw.img(userInterface.greenButton, this.craftMenuButtons.subCategories[page][x].button.body.pos.x - 5,this.craftMenuButtons.subCategories[page][x].button.body.pos.y - 5, 70, 40,  ctx)
        } else {
          this.draw.img(userInterface.blueButton, this.craftMenuButtons.subCategories[page][x].button.body.pos.x - 5,this.craftMenuButtons.subCategories[page][x].button.body.pos.y - 5, 70, 40,  ctx)
        }
          this.draw.label(this.craftMenuButtons.subCategories[page][x], ctx);
      }

  }

// armor
  drawSpacesForArmor(ctx){
        this.draw.img(userInterface.armor, 360, 0, 120,480, ctx)
  }

  armorDrawCheck(armor, ctx) {
  		if (armor.id === -1) {
  			return false
  		}

      if (armor.img) {
        this.draw.inventoryItemImg(armor.img, armor.body.pos.x, armor.body.pos.y, ctx)
      } else {
    		this.draw.text(armor.name, armor.body.pos.x, armor.body.pos.y + 10, "9", ctx);
      }
  }

  arrowArmorDrawCheck(armor, ctx) {
      if (armor.id === -1) {
        return false
      }
      if (armor.img) {
        this.draw.inventoryItemImg(armor.img, armor.body.pos.x, armor.body.pos.y, ctx)
      } else {
        this.draw.text(armor.quantity, armor.body.pos.x, armor.body.pos.y + 20, "9", ctx);
        this.draw.text(armor.name, armor.body.pos.x, armor.body.pos.y + 10, "9", ctx);
      }


  }

  drawPlayerArmor(player, ctx) {
  	this.armorDrawCheck(player.armor.helm, ctx);
		this.armorDrawCheck(player.armor.chest, ctx);
		this.armorDrawCheck(player.armor.legs, ctx);
		this.armorDrawCheck(player.armor.feet, ctx);
		this.armorDrawCheck(player.armor.weapon, ctx);
		this.armorDrawCheck(player.armor.shield, ctx);
    this.armorDrawCheck(player.armor.pickAxe, ctx);
    this.armorDrawCheck(player.armor.axe, ctx);
    this.armorDrawCheck(player.armor.bow, ctx);
    this.arrowArmorDrawCheck(player.armor.arrows, ctx);



		this.draw.text("Attack Bonus: ", 360, 375, "10", ctx);
    this.draw.text(player.armor.attackBonus, 450, 375, "10", ctx);

    this.draw.text("Speed Bonus: ", 360, 385, "10", ctx);
    this.draw.text(player.armor.attackSpeedBonus, 450, 385, "10", ctx);

		this.draw.text("Defense Bonus: ", 360, 395, "10", ctx);
    this.draw.text(player.armor.defenseBonus, 450, 395, "10", ctx);

    this.draw.text("Mining Bonus: ", 360, 415, "10", ctx);
    this.draw.text(player.armor.miningBonus, 450, 415, "10", ctx);

    this.draw.text("Woodcut Bonus: ", 360, 435, "10", ctx);
    this.draw.text(player.armor.woodCuttingBonus, 450, 435, "10", ctx);



  }

  //toggle and settings

	menuClick(mouse, canvas) {
	
    let click = this.menuButtons.click(mouse, canvas)
        if (click.click)
            {
              if (click.index === 0) {
                this.showItemMenu();
              } else if (click.index === 1) {
                this.showArmorMenu();
              } else if (click.index === 2) {
                this.showStatsMenu();
              } else if (click.index === 3) {
                this.showMagicMenu();
              }
            }

	}

  magicClick(mouse, player, canvas) {
    if (!this.showMagic) {
      return false;
    }
    let click = this.magicButtons.click(mouse, canvas)
      if (click.click)
      {
         switch (click.index) {
          case 0:
            player.magic.teleport.home(player);
            break
          case 1:
            player.magic.teleport.ten(player);
            break
          case 2:
            player.magic.teleport.fifty(player);
            break
          case 3:
            player.magic.archery.five(player);
            break
          case 4:
            player.magic.archery.ten(player);
            break
          case 5:
            player.magic.archery.thirty(player);
            break
          case 6:
            player.magic.defense.five(player);
            break
          case 7:
            player.magic.defense.ten(player);
            break
          case 8:
            player.magic.defense.thirty(player);
            break
          case 9:
            player.magic.attack.five(player);
            break
          case 10:
            player.magic.attack.ten(player);
            break
          case 11:
            player.magic.attack.thirty(player);
            break
          case 12:
            player.magic.mining.five(player);
            break
          case 13:
            player.magic.mining.ten(player);
            break
          case 14:
            player.magic.mining.thirty(player);
            break
          case 15:
            player.magic.woodcutting.five(player);
            break
          case 16:
            player.magic.woodcutting.ten(player);
            break
          case 17:
            player.magic.woodcutting.thirty(player);
            break
          case 18:
            player.magic.hunting.five(player);
            break
          case 19:
            player.magic.hunting.ten(player);
            break
          case 20:
            player.magic.hunting.thirty(player);
            break
          default : 
            break;

         }
      }

  }

  teleportHomeLabel(player) {
         this.actionButtons[3].label.changeLabel("Stop");
  }

  actionToggle(action, index) {
    if (action.state === false) {
       action.start()
    } else {
       action.stop()
    }
    this.actionButtons.changeImg(index, action.button())
    this.actionButtons.changeLabel(index, action.label())

  }

	actionClick(mouse, player, canvas) {
  if (this.bankButtons.open || this.craftMenuButtons.open || this.buyMenuButtons.open) {
    return false
  }

      let click = this.actionButtons.click(mouse, canvas)
		  if (click.click) {
        let keys =  Object.keys(player.status.actions)
        this.actionToggle(player.status.actions[keys[click.index]], click.index);
      }
   
	}

	inventoryClick(mouse, player, canvas) {
		if (!this.showItems) {
			return false
 		} 

      let len = this.rightClickMenu.buttons.length;
        let bank = player.home.bank;
        if (this.rightClickMenu.open === true && this.rightClickMenu.menu === "inventory" && (this.bankButtons.open || this.buyMenuButtons.open)) {
          for (var i = 0; i < len; i++) {
            if (this.clickHandler.click(mouse, this.rightClickMenu.buttons[i].button, canvas)) {
              let quantity = 0;
              if (i === 0) {
                quantity = 10;
              } else if (i === 1) {
                quantity = 50;
              } else if (i === 2) {
                quantity = player.inventory.spaces[this.rightClickMenu.index].quantity
              }

              if (quantity > player.inventory.spaces[this.rightClickMenu.index].quantity) {
                quantity = player.inventory.spaces[this.rightClickMenu.index].quantity;
              }

              if (this.buyMenuButtons.open === true) {
                 if (player.inventory.sell(this.rightClickMenu.index, quantity)) {
                    this.rightClickMenu.clear();
                 }
              } else {
                bank.inventory.addQuantity(player.inventory.spaces[this.rightClickMenu.index], quantity)
                if (player.inventory.deleteQuantity(this.rightClickMenu.index, quantity))
                {
                  this.rightClickMenu.clear();
                }

              }


              return true
            }
          }
          this.rightClickMenu.clear();
          return (true)
        }




		  len = this.inventorySpaces.length
      for (let x = 0; x < len; x++) {
        if (this.clickHandler.click(mouse, this.inventorySpaces[x], canvas))
        {
          if (this.bankButtons.open === true) {
            player.home.bank.inventory.add(player.inventory.spaces[x])
            player.inventory.deleteOne(x);
          } else if (this.buyMenuButtons.open === true) {
            player.inventory.sell(x, 1);
          } else {
            if (player.inventory.spaces[x].wearable) {
              player.inventory.wearItem(player.armor, x)
            } else if (player.inventory.spaces[x].magic) {
            } else {
              player.inventory.useItem(player.skills, x)
          }
        }
      }
    }
	}


  farmInventoryClick(mouse, player, canvas) {
    
      let len = this.inventorySpaces.length
      for (let x = 0; x < len; x++) {
        if (this.clickHandler.click(mouse, this.inventorySpaces[x], canvas))
        {
            if (player.inventory.spaces[x].quantity > 5) {
              if (player.home.farm.add(player.inventory.spaces[x])) {
                player.inventory.deleteQuantity(x,5);
              }
            }
            if (player.home.farm.addWater(player.inventory.spaces[x])) {
                player.inventory.deleteOne(x);
            }
        }
      }
    }




  drawBankButtons(player, ctx){

        // this.draw.fillRect(this.bankButtons.background, "black", ctx)
        this.draw.img(userInterface.bankBackGround, 25, 25, userInterface.bankBackGround.pos.width,userInterface.bankBackGround.pos.height, ctx);
        let page = this.bankButtons.page * 50;
        let len = this.bankButtons.spaces.length
        for (let i = 0; i < len; i++) {
            let x = this.bankButtons.spaces[i].button.body.pos.x;
            let y = this.bankButtons.spaces[i].button.body.pos.y;
            this.draw.img(userInterface.itemBorder, x, y, 40, 40, ctx)

            if (player.home.bank.inventory.spaces[i].id !== -1 && player.home.bank.inventory.spaces[i + page].id !== -1) {
               if (player.home.bank.inventory.spaces[i + page].img) {
                this.draw.inventoryItemImg(player.home.bank.inventory.spaces[i + page].img, x, y, ctx)
               } else {
                this.draw.text(player.home.bank.inventory.spaces[i + page].name, x, y + 10, "9", ctx);
               }

               this.draw.text(player.home.bank.inventory.spaces[i + page].quantity, x, y + 20, "9", ctx);
            }

        }
        this.draw.img(userInterface.upArrow, this.bankButtons.controls[0].button.body.pos.x - 8,this.bankButtons.controls[0].button.body.pos.y - 8, 32, 32,  ctx)
        this.draw.img(userInterface.downArrow, this.bankButtons.controls[1].button.body.pos.x - 8,this.bankButtons.controls[1].button.body.pos.y - 8, 32, 32,  ctx)
        this.draw.button(this.bankButtons.controls[2], ctx);
        this.draw.button(this.bankButtons.controls[3], ctx);

    }

  drawDoubleClickButtons(player, ctx) {

    if (this.rightClickMenu.open === true) {
        this.draw.fillRect(this.rightClickMenu.background, "black", ctx)
        for (var i = this.rightClickMenu.buttons.length - 1; i >= 0; i--) {
          this.draw.img(userInterface.aquaButton, this.rightClickMenu.buttons[i].button.body.pos.x,this.rightClickMenu.buttons[i].button.body.pos.y, 50, 35,  ctx)
          this.draw.label(this.rightClickMenu.buttons[i], ctx)

        }
    }

  }

  bankButtonDoubleClick(mouse, player, canvas) {
      if (this.bankButtons.open === false) {
        return false
      }
        let page = this.bankButtons.page * 50;

        for (let x = 0; x < 50; x++) {
            if (this.clickHandler.click(mouse, this.bankButtons.spaces[x].button, canvas))
            { 
              let coordinate = this.clickHandler.transformedCoordinate(mouse, canvas)
              this.makeRightClickButtons("bank", x + page, coordinate.x, coordinate.y);
            }
        }

  }


   buyButtonDoubleClick(mouse, player, canvas) {
      if (this.buyMenuButtons.open === false) {
        return false
      }
      
        let len = this.buyMenuButtons.itemLength

        for (let x = 0; x < len; x++) {
            if (this.clickHandler.click(mouse, this.buyMenuButtons.spaces[x].button, canvas))
            {
              let coordinate = this.clickHandler.transformedCoordinate(mouse, canvas)
              this.makeRightClickButtons("buy", x, coordinate.x, coordinate.y);
            }
        }
  }

   craftButtonDoubleClick(mouse, player, canvas) {
      if (this.craftMenuButtons.open === false) {
        return false
      }
      
        let len = this.craftMenuButtons.itemLength

        for (let x = 0; x < len; x++) {
            if (this.clickHandler.click(mouse, this.craftMenuButtons.spaces[x].button, canvas))
            {
              let coordinate = this.clickHandler.transformedCoordinate(mouse, canvas)
              this.makeRightClickButtons("craft", x, coordinate.x, coordinate.y);
            }
        }
  }

  inventoryButtonDoubleClick(mouse, player, canvas) {
      if (!this.bankButtons.open && !this.buyMenuButtons.open) {
        return false
      }
        let len = this.inventorySpaces.length
        for (let x = 0; x < len; x++) {
            if (this.clickHandler.click(mouse, this.inventorySpaces[x], canvas))
            { 
              let coordinate = this.clickHandler.transformedCoordinate(mouse, canvas)
              this.makeRightClickButtons("inventory", x, coordinate.x, coordinate.y);
            }
        }
  }


	bankButtonClick(mouse, player, canvas) {
		if (this.bankButtons.open === false) {
			return false
		}
        let page = this.bankButtons.page * 50;
        let len = this.rightClickMenu.buttons.length;
        let bank = player.home.bank;
        if (this.rightClickMenu.open === true && this.rightClickMenu.menu === "bank") {
          let maxAmount = bank.inventory.spaces[this.rightClickMenu.index].quantity
          for (var i = 0; i < len; i++) {
            if (this.clickHandler.click(mouse, this.rightClickMenu.buttons[i].button, canvas)) {
              let quantity = 0;
              if (i === 0) {
                quantity = 10;
              } else if (i === 1) {
                quantity = 50;
              } else if (i === 2) {
                quantity = maxAmount
              }
              if (quantity > maxAmount) {
                quantity = maxAmount
              }

              player.inventory.addQuantity(bank.inventory.spaces[this.rightClickMenu.index], quantity)
              if (bank.inventory.deleteQuantity(this.rightClickMenu.index, quantity))
              {
                this.rightClickMenu.clear();
              }

              return true
            }
          }
          this.rightClickMenu.clear();
          return (true)
        }

        for (let x = 0; x < 50; x++) {
            if (this.clickHandler.click(mouse, this.bankButtons.spaces[x].button, canvas))
            { 
      				if (player.inventory.add(player.home.bank.inventory.spaces[x + page])) {
      				  player.home.bank.inventory.deleteOne(x + page)
              }
            }
        }

        len = this.bankButtons.controls.length
        for (let x = 0; x < len; x++) {
            if (this.clickHandler.click(mouse, this.bankButtons.controls[x].button, canvas))
            {
            	if (x === 0) {
              		this.bankButtons.page--;
              		if (this.bankButtons.page < 0) {
              			this.bankButtons.page = 0
              			return false
              		}
              		this.bankButtons.controls[3].button.body.pos.y -= 60;

              } else if (x === 1) {
            		this.bankButtons.page++;
            		  if (this.bankButtons.page > 4) {
              			this.bankButtons.page = 4
              			return false;
              		}
              		this.bankButtons.controls[3].button.body.pos.y += 60;


              } else if (x === 2) {
              	this.bankButtons.open = false
              }
            }
        }
	}


	buyButtonClick(mouse, player, canvas) {
		if (this.buyMenuButtons.open === false) {
			return false
		}

    this.showItemMenu()
    let len = this.rightClickMenu.buttons.length;

     if (this.rightClickMenu.open === true && this.rightClickMenu.menu === "buy") {
          for (var i = 0; i < len; i++) {
            if (this.clickHandler.click(mouse, this.rightClickMenu.buttons[i].button, canvas)) {
              let quantity = 0;
              let item = this.buyMenuButtons.subCategories[this.buyMenuButtons.page][this.buyMenuButtons.subCategoryPage].items[this.rightClickMenu.index].copy();
              if (player.inventory.gold <= 0 || item.price > player.inventory.gold) {
                  return (false)
              }
              let maxAmount = Math.floor(player.inventory.gold / item.price);
              if (i === 0) {
                quantity = 10;
              } else if (i === 1) {
                quantity = 50;
              } else if (i === 2) {
                 quantity = maxAmount
              }

              if (quantity > maxAmount) {
                  quantity = maxAmount
              }

              player.inventory.buy(item.price, item, quantity)
              return true
            }
          }
          this.rightClickMenu.clear();
          return (true)
        }



		len = this.buyMenuButtons.itemLength
        for (let x = 0; x < len; x++) {
            if (this.clickHandler.click(mouse, this.buyMenuButtons.spaces[x].button, canvas))
            {

              let item = this.buyMenuButtons.subCategories[this.buyMenuButtons.page][this.buyMenuButtons.subCategoryPage].items[x].copy();
              player.inventory.buy(item.price, item, 1)
            }
        }

        len = this.buyMenuButtons.controls.length
        for (let x = 0; x < len; x++) {
            if (this.clickHandler.click(mouse, this.buyMenuButtons.controls[x].button, canvas))
            {
            	if (x === 0) {
              		this.buyMenuButtons.open = false
                  this.craftMenuButtons.open = false
              }
              if (x === 1) {
                this.buyMenuButtons.open = true;
                this.craftMenuButtons.open = false;
              }
              if (x === 2) {
                this.buyMenuButtons.open = false;
                this.craftMenuButtons.open = true;

              }

            }
        }

        len = this.buyMenuButtons.categories.length
        for (let x = 0; x < len; x++) {
            if (this.clickHandler.click(mouse, this.buyMenuButtons.categories[x].button, canvas))
            {
            	this.buyMenuButtons.page = this.buyMenuButtons.categories[x].category;
            	this.buyMenuButtons.subCategoryPage = 0
            }
        }

    		let page = this.buyMenuButtons.page;
    		len = this.buyMenuButtons.subCategories[page].length
        for (let x = 0; x < len; x++) {
            if (this.clickHandler.click(mouse, this.buyMenuButtons.subCategories[page][x].button, canvas))
            {
            	this.buyMenuButtons.subCategoryPage = x;
            }
        }
	}

    craftButtonClick(mouse, player, canvas) {
    if (this.craftMenuButtons.open === false) {
      return false
    }

    this.showItemMenu()

    let len = this.rightClickMenu.buttons.length;

     if (this.rightClickMenu.open === true && this.rightClickMenu.menu === "craft") {
          for (var i = 0; i < len; i++) {
            if (this.clickHandler.click(mouse, this.rightClickMenu.buttons[i].button, canvas)) {
              let quantity = 0;
              let item = this.craftMenuButtons.subCategories[this.craftMenuButtons.page][this.craftMenuButtons.subCategoryPage].items[this.rightClickMenu.index].copy();
              let maxAmount = player.inventory.maxCraft(item);
              if (i === 0) {
                quantity = 10;
              } else if (i === 1) {
                quantity = 50;
              } else if (i === 2) {
                 quantity = maxAmount
              }
              if (quantity > maxAmount) {
                  quantity = maxAmount
              }
              player.inventory.craft(item, quantity)
              this.rightClickMenu.clear();
              return true
            }
          }
          this.rightClickMenu.clear();
          return (true)
        }




      len = this.craftMenuButtons.itemLength
        for (let x = 0; x < len; x++) {
            if (this.clickHandler.click(mouse, this.craftMenuButtons.spaces[x].button, canvas))
            {
              let item = this.craftMenuButtons.subCategories[this.craftMenuButtons.page][this.craftMenuButtons.subCategoryPage].items[x].copy();
              player.inventory.craft(item, 1)
            }
        }

        len = this.craftMenuButtons.controls.length
        for (let x = 0; x < len; x++) {
            if (this.clickHandler.click(mouse, this.craftMenuButtons.controls[x].button, canvas))
            {
             if (x === 0) {
                  this.buyMenuButtons.open = false
                  this.craftMenuButtons.open = false
              }
              if (x === 1) {
                this.buyMenuButtons.open = true;
                this.craftMenuButtons.open = false;
              }
              if (x === 2) {
                this.buyMenuButtons.open = false;
                this.craftMenuButtons.open = true;

              }
            }
        }

        len = this.craftMenuButtons.categories.length
        for (let x = 0; x < len; x++) {
            if (this.clickHandler.click(mouse, this.craftMenuButtons.categories[x].button, canvas))
            {
              this.craftMenuButtons.page = this.craftMenuButtons.categories[x].category;
              this.craftMenuButtons.subCategoryPage = 0
            }
        }

        let page = this.craftMenuButtons.page;
        len = this.craftMenuButtons.subCategories[page].length
        for (let x = 0; x < len; x++) {
            if (this.clickHandler.click(mouse, this.craftMenuButtons.subCategories[page][x].button, canvas))
            {
              this.craftMenuButtons.subCategoryPage = x;
            }
        }
  }




	homeButtonClick(mouse, player, canvas) {
		if (this.bankButtons.open === true) {
			return false
		}
		let len = this.homeMenuButtons.length
        for (let x = 0; x < len; x++) {
            if (this.clickHandler.click(mouse, this.homeMenuButtons[x].button, canvas))
            {

            	if (x === 0) {
                if (this.buyMenuButtons.open === true) {
                  return false;
                }
            		this.bankButtons.open = true;
                this.waterWellButton.open = false
                this.homeMenuButtons[x].label.changeLabel("Water");
            	} else if (x === 1) {
            		this.buyMenuButtons.open = true;
                this.waterWellButton.open = false
                this.homeMenuButtons[x].label.changeLabel("Water");
            	} else if (x === 2) {

                if (this.waterWellButton.open) {
                  this.waterWellButton.open = false
                  this.homeMenuButtons[x].label.changeLabel("Water");
                } else {
                  if (!this.bankButtons.open && !this.craftMenuButtons.open && !this.buyMenuButtons.open) {
                    this.waterWellButton.open = true
                    this.homeMenuButtons[x].label.changeLabel("Stop"); 
                  }
                }
            	} else if (x === 3) {
                  if (!this.bankButtons.open && !this.craftMenuButtons.open && !this.buyMenuButtons.open) {
                    player.home.waterWell.upgrade(player.inventory);
                    this.homeMenuButtons[x].label.changeLabel(player.home.waterWell.upgradeStr());
                  }

            	}
            }
        }
	}


	armorClick(mouse, player, canvas) {
		if (!this.showArmor) {
			return false
		}
		let len = this.armorButtons.length
        for (let x = 0; x < len; x++) {
            if (this.clickHandler.click(mouse, this.armorButtons[x].button, canvas))
            {
                if (x === 0) {
                	player.armor.removeHelm(player.inventory);
                } else if (x === 1){
                	player.armor.removeChest(player.inventory);
                } else if (x === 2){
                	player.armor.removeWeapon(player.inventory);
                } else if (x === 3){
                	player.armor.removeShield(player.inventory);
                } else if (x === 4){
                	player.armor.removeLegs(player.inventory);
                } else if (x === 5){
               		player.armor.removeFeet(player.inventory);	
                } else if (x === 6){
                  player.armor.removePickAxe(player.inventory);  
                } else if (x === 7){
                  player.armor.removeAxe(player.inventory);  
                } else if (x === 8){
                  player.armor.removeArrows(player.inventory);  
                } else if (x === 9){
                  player.armor.removeBow(player.inventory);  
                } 
            }
        }
	}


	showItemMenu() {
		this.showItems = true;
		this.showArmor = false;
		this.showStats = false;
		this.showMagic = false;

	}

	showArmorMenu() {
		this.showItems = false;
		this.showArmor = true;
		this.showStats = false;
		this.showMagic = false;
	}

	showStatsMenu() {
		this.showItems = false;
		this.showArmor = false;
		this.showStats = true;
		this.showMagic = false;
	}

	showMagicMenu() {
		this.showItems = false;
		this.showArmor = false;
		this.showStats = false;
		this.showMagic = true;
	}

	menuButton(button, label) {
		this.menuButtons.push({button: button, label:label})
	}

	armorButton(button, label) {
		this.armorButtons.push({button: button, label:label})
	}

	homeButton(button, label) {
		this.homeMenuButtons.push({button: button, label:label})
	}

	bankButton(button, label) {
		this.bankButtons.spaces.push({button: button, label:label});
	}

	bankControlButton(button, label) {
		this.bankButtons.controls.push({button: button, label:label})
	}

	buyButton(button, label, label2) {
		this.buyMenuButtons.spaces.push({button: button, label:label, label2: label2});
	}

	buyControlButton(button, label) {
		this.buyMenuButtons.controls.push({button: button, label:label})
	}

	buyCategoryButton(button, label, category) {
		this.buyMenuButtons.categories.push({button: button, label:label, category:category})
	}

	buySubCategoryButton(subCategory) {
		this.buyMenuButtons.subCategories.push(subCategory)
	}


  craftButton(button, label, label2, label3, label4) {
    this.craftMenuButtons.spaces.push({
                                       button: button,
                                       label:  label,
                                       label2: label2,
                                       label3 : label3,
                                       label4 : label4
                                     });
  }

  craftControlButton(button, label) {
    this.craftMenuButtons.controls.push({button: button, label:label})
  }

  craftCategoryButton(button, label, category) {
    this.craftMenuButtons.categories.push({button: button, label:label, category:category})
  }

  craftSubCategoryButton(subCategory) {
    this.craftMenuButtons.subCategories.push(subCategory)
  }

  

	button (x, y, width, height) {
		return ({
			body : new RigidBody(x,y,width,height)
		})
	}

	label(label, x, y, fontSize) {
		return ({
			body : new RigidBody(x,y,32,32),
			fontSize: fontSize,
			label: label,

			changeLabel : function(label) {
				this.label = label;
			}

		})
	}

	makeInventorySpaces() {
      for (var y = 120; y <  440; y+= 40) {
        for (var x = 360; x < 480; x+= 40) {
          this.inventorySpaces.push(this.button(x, y, 40, 40 ));
        }
        x = 360;
      }
	}

	makeArmorSpaces() {
          this.armorButton(
    			  this.button(400, 135, 40, 40),
    		  	this.label("Helm", 405, 130, "10")
    		  )

          this.armorButton(
    			  this.button(400, 195, 40, 40),
    			  this.label("Chest", 405, 190, "10")
		      )

          this.armorButton(
    			  this.button(360, 195, 40, 40),
    			  this.label("Weapon", 360, 190, "10")
		      )

          this.armorButton(
    			  this.button(440, 195, 40, 40),
    			  this.label("Shield", 440, 190, "10")
		      )

          this.armorButton(
    			  this.button(400, 255, 40, 40),
    			  this.label("Legs", 405, 250, "10")
		      )

         this.armorButton(
      			this.button(400, 315, 40, 40),
      			this.label("Boots", 405, 310, "10")
		      )
         this.armorButton(
            this.button(360, 15, 40, 40),
            this.label("Pic", 365, 10, "10")
          )
         this.armorButton(
            this.button(360, 70, 40, 40),
            this.label("Axe", 365, 65, "10")
          )

         this.armorButton(
            this.button(440, 15, 40, 40),
            this.label("Arrows", 440, 10, "10")
          )
         this.armorButton(
            this.button(440, 70, 40, 40),
            this.label("Bow", 440, 65, "10")
          )
     
	}

	makeHomeActionButtons(player) {

    let bank = player.home.bank;
    let buy = player.home.buyMenu;
    let waterWell = player.home.waterWell

		this.homeButton(
		  this.button(bank.body.pos.x, bank.body.pos.y, bank.body.size.x, bank.body.size.y),
		  this.label("Bank", bank.body.pos.x + 30, bank.body.pos.y + 25, "15")
		)

		this.homeButton(
		  this.button(buy.body.pos.x, buy.body.pos.y, buy.body.size.x, buy.body.size.y),
		  this.label("Shop", buy.body.pos.x + 10, buy.body.pos.y + 50, "15")

		)

    this.homeButton(
      this.button(waterWell.body.pos.x, waterWell.body.pos.y, waterWell.body.size.x, waterWell.body.size.y),
      this.label("Water", waterWell.body.pos.x + 15, waterWell.body.pos.y + 50, "15")

    )

    this.homeButton(
      this.button(waterWell.body.pos.x, waterWell.body.pos.y + 100, 70, 25),
      this.label(waterWell.upgradeStr(), waterWell.body.pos.x + 5, waterWell.body.pos.y + 110, "9")

    )
	}


	makeCharacterActionButtons(player) {


   let keys =  Object.keys(player.status.actions)
   let imgs = [];
   let labels = [];
   for (var i = 0; i < keys.length; i++) {
        imgs.push(player.status.actions[keys[i]].button());
        labels.push(player.status.actions[keys[i]].label())
   }
   this.actionButtons = new Grid({
                                  x: 0,
                                  y: 440,
                                  width : keys.length,
                                  height : 1,
                                  cellWidth : 60,
                                  cellHeight: 50,
                                  labelOffsetX : 5,
                                  labelOffsetY : 5,
                                  labelSize : 10,
                                  imgs : imgs,
                                  labels :labels,
                                  background : userInterface.actionButtonBackGround
                                })
	}

	makeBankButtons() {

		for (let y = 1; y < 11; y++) {
			for (let x = 1; x < 6; x++) {
				this.bankButton(
					this.button(x * 45, y * 40, 45, 40),
					this.label("", 0, 0, "0")
				)
			}
		}

		this.bankControlButton(
								this.button(292, 390, 16, 16),
							    this.label("/\\", 297, 400, "10")
							  )
		this.bankControlButton(
								this.button(292, 416, 16, 16),
							    this.label("\\/", 297, 427, "10")
							  )
		this.bankControlButton(
								this.button(292, 45, 16, 16),
							    this.label("X", 297, 56, "10")
							  )
		this.bankControlButton(
								this.button(292, 70, 16, 60),
							    this.label("", 297, 56, "10")
							  )
	}

	makeBuyButtons(items) {

		for (let y = 1; y < 6; y++) {
			for (let x = 1; x < 5; x++) {
				this.buyButton(
					this.button(x * 60, y * 80, 50, 40),
					this.label("name", x*60, y*90, "9"),
					this.label("price", x*65, y*100, "10")
				)
			}
		}

		// could do in one loop but easier to read logic in 3, and it only runs 1 time
		// create category buttons

		let categoryCount = items.categories.length
		let xOffset = 50;
		for (let x = 0; x < categoryCount; x++) {
      let categorySettings = items.returnCategorySettings(x)
      if (categorySettings.buyable) {
  			this.buyCategoryButton(
  							this.button(xOffset, 350, 60, 25),
                this.label(items.categories[x].name, xOffset, 370, "9"),
                x
  						  )
  			xOffset += 68;

      }

		}

		//create subCategoryButtons
		for (let x = 0; x < categoryCount; x++) {
			xOffset = 50;
			let yOffset = 280;

			let subCategoryButtons = [];


			let subCategories = items.returnSubCategories(x);

			let subCategoryLength = subCategories.length

			for (let y = 0; y < subCategoryLength; y++) {

        let subCategorySettings = items.returnSubCategorySettings(x,y);

        if (subCategorySettings.buyable) {
  				let nameXOffset = 10;

          // too long of name
  				if (subCategories[y].name.length > 9) {
  					nameXOffset = 4;
  				}

  				if (y > 0  && y % 4 === 0) {
  					xOffset = 50;
  					yOffset += 30;
  				}

  				subCategoryButtons.push({
  							  button: this.button(xOffset, yOffset, 60, 25),
  						    label: this.label(subCategories[y].name, xOffset + nameXOffset, yOffset + 20, "9"),
  						    items: items.returnItems(x,y)
                })
  				xOffset += 68;

        }
			}
			this.buySubCategoryButton(subCategoryButtons);
		}


		this.buyControlButton(
								  this.button(295, 39, 16, 16),
							    this.label("X", 300, 50, "10")
							  )
    this.buyControlButton(
                  this.button(50, 400, 100, 50),
                  this.label("Buy", 80, 430, "16")
                )

    this.buyControlButton(
                this.button(220, 400, 100, 50),
                this.label("Craft", 250, 430, "16")
              )

    this.buyControlButton(
                this.button(380, 80, 0, 0),
                this.label("Click Item To Sell", 365, 110, "14")
              )

	  }


    makeCraftButtons(items) {
      for (let y = 1; y < 6; y++) {
        for (let x = 1; x < 5; x++) {
          this.craftButton(
            this.button(x * 65, y * 70, 60, 60),
            this.label("name", x*65, y*70 + 20, "9"),
            this.label("price", x*65, y*70 + 30, "9"),
            this.label("price", x*65, y*70 + 50, "9"),
            this.label("price", x*65, y*70 + 70, "9"),
          )
        }
      }

    // could do in one loop but easier to read logic in 3, and it only runs 1 time
    // create category buttons

    let categoryCount = items.categories.length
    let xOffset = 50;
    for (let x = 0; x < categoryCount; x++) {
      let categorySettings = items.returnCategorySettings(x)
      if (categorySettings.craftable) {
        this.craftCategoryButton(
                this.button(xOffset, 350, 60, 25),
                this.label(items.categories[x].name, xOffset, 370, "9"),
                x
        )
        xOffset += 68;

      }

    }

    //create subCategoryButtons
    for (let x = 0; x < categoryCount; x++) {
      xOffset = 50;
      let yOffset = 280;

      let craftingButtons = [];

      let subCategories = items.returnSubCategories(x);

      let subCategoryLength = subCategories.length

      for (let y = 0; y < subCategoryLength; y++) {

        let subCategorySettings = items.returnSubCategorySettings(x,y);

        if (subCategorySettings.craftable) {
          let nameXOffset = 10;

          // too long of name
          if (subCategories[y].name.length > 9) {
            nameXOffset = 4;
          }

          if (y > 0  && y % 4 === 0) {
            xOffset = 50;
            yOffset += 30;

          }

          craftingButtons.push({
                  button: this.button(xOffset, yOffset, 60, 25),
                  label: this.label(subCategories[y].name, xOffset + nameXOffset, yOffset + 20, "9"),
                  items: items.returnItems(x,y)
                })
          xOffset += 68;

        }
      }
      this.craftSubCategoryButton(craftingButtons);
    }

    this.craftControlButton(
                  this.button(295, 39, 16, 16),
                  this.label("X", 300, 50, "10")
                )
    this.craftControlButton(
                  this.button(50, 400, 100, 50),
                  this.label("Buy", 80, 430, "16")
                )
    this.craftControlButton(
                this.button(220, 400, 100, 50),
                this.label("Craft", 250, 430, "16")
              )
    }

    makeRightClickButtons(menu, index, x, y) {
      
      let yOffset = 10;

      let xNameOffset = 10;
      let yNameOffset = 20;

      x = x - 30;
      y = y - 20;

      this.rightClickMenu.clear();
      this.rightClickMenu.open = true;
      this.rightClickMenu.index = index
      this.rightClickMenu.menu = menu;
      this.rightClickMenu.background = this.button(x,y, 50,120)

      this.rightClickMenu.buttons.push({
                                      button: this.button(x, y, 50, 40),
                                      label: this.label("10", x + xNameOffset, y + yNameOffset, "10")
                                  })
      yOffset += 30;
      yNameOffset += 40;

      this.rightClickMenu.buttons.push({
                                  button: this.button(x, y + yOffset, 50, 40),
                                  label: this.label("50", x + xNameOffset, y + yNameOffset, "10")
                                  })
      yOffset += 40;
      yNameOffset += 40

       this.rightClickMenu.buttons.push({
                                  button: this.button(x, y + yOffset, 50, 40),
                                  label: this.label("All", x + xNameOffset, y + yNameOffset, "10")
                                  })

    }

    makeFarmButton(button, label) {
      this.farmButtons.spaces.push({button: button, label:label})
    }

    farmControlButton(button, label) {
      this.farmButtons.controls.push({button: button, label:label})
    }

    makeFarmButtons(player) {
        let farm = player.home.farm;

        for (let i = 0; i < farm.spaces.length; i++) {
            this.makeFarmButton(this.button(farm.spaces[i].body.pos.x, 
                                            farm.spaces[i].body.pos.y, 
                                            32, 
                                            32),
            this.label("", 0, 0, "0")
            )
        }

        this.farmControlButton(this.button(50,250,100,50),
                                this.label(farm.waterLevel, 75, 275, "20")
                              )
    }

    drawFarmButtons(player, ctx) {
      console.log("drawingFARM")
      player.home.farm.plot.drawFarmPlot(player.home.farm, ctx)
      for (let i = 0; i < this.farmButtons.spaces.length; i++) {

        if (player.home.farm.spaces[i].seed) {
          player.home.farm.spaces[i].seed.animation.drawPlants(player.home.farm.spaces[i], player.home.farm.spaces[i].level, ctx)
        }
      }

      this.draw.button({button: this.button(50,125,0,0),
                          label: this.label("Water:", 55, 100, "15")
                          }, ctx
                        );

      this.draw.button({button: this.button(50,75,100,50),
                          label: this.label(player.home.farm.waterLevelStr(), 55, 120, "15")
                        }, ctx
                      );
      

    }


    farmButtonClick(mouse, player, canvas) {
      let len = this.farmButtons.spaces.length
         for (let x = 0; x < len; x++) {        
            if (this.clickHandler.click(mouse, this.farmButtons.spaces[x].button, canvas))
            {
                player.home.farm.harvest(x, player.inventory)
            }
        }
      }
}