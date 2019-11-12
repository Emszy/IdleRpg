import Draw from "./draw"
import {scale} from "../../Helpers/functions"
import {userInterface} from "../../Objects/Animations/images"

export default class DrawEntity {

	constructor() {
		this.draw = new Draw();
	}

	handler (objList, ctx) {
		this.player(objList.player, ctx)
		this.enemies(objList.enemies, ctx);
		this.animals(objList.animals, ctx);
		this.resources(objList.trees, ctx);
		this.resources(objList.ore, ctx);

		if (objList.player.status.currLevel === 0) {
			this.character(objList.merchant, ctx)
		}
	}

	animationAction(player, direction, ctx) {

	    if (player.body.action === "fight") {
	        player.armor.animation.fight(direction, player, ctx)
	      } else if (player.body.action === "archery") {
	        player.armor.animation.range(direction, player, ctx)
	      } else if (player.body.action === "mine") {
	        player.armor.animation.mine(direction, player, ctx)
	      } else if (player.body.action === "woodcut") {
	        player.armor.animation.woodcut(direction, player, ctx)
	      } else if (player.body.action === "stop") {
	        player.armor.animation.stop(direction, player, ctx)
	      } else {
			if (player.target && player.armor.animation.walk(direction, player, ctx)) {
			    player.body.move_to(player.target.body.pos.x, player.target.body.pos.y)
			}
	      }
	  }

  

  playerAnimationMovement(player, ctx) {
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


	enemies(enemies, ctx) {
		for (let i = 0; i < enemies.length; i++) {
	        this.playerAnimationMovement(enemies[i], ctx);
	        this.drawHealthBar(enemies[i], ctx);
    	}
	}

	player(player, ctx) {

    for (var i = 0; i < player.range.projectiles.active.length; i++) {
      if (player.range.projectiles.active[i]) {
          this.draw.fillRect(player.range.projectiles.active[i].projectile, "blue", ctx);
      }
    }

    this.playerAnimationMovement(player, ctx)
    this.drawPlayerStatsInCorner(player, ctx);
  }

   animals(animals, ctx) {
    for (let i = 0; i < animals.length; i++) {
      
        let move = false;
        if (animals[i].body.currentDirection === "north") {
          move = animals[i].armor.animation.walk("up", animals[i], ctx)
        }
          
        else if (animals[i].body.currentDirection === "east") {
          move = animals[i].armor.animation.walk("right", animals[i], ctx)
        }

        else if (animals[i].body.currentDirection === "south") {
          move = animals[i].armor.animation.walk("down", animals[i], ctx)
        }

        else if (animals[i].body.currentDirection === "west") {
          move = animals[i].armor.animation.walk("left", animals[i], ctx)
        }
        
        if (move) {
        	animals[i].body.followPath();
        }


        this.drawHealthBar(animals[i], ctx);
    }
  }


	resources(resource, ctx) {
		for (let i = 0; i < resource.length; i++) {
		    resource[i].armor.animation.drawResource(resource[i], ctx)
		    this.drawHealthBar(resource[i], ctx);
		}
	}

	character(character, ctx) {
		this.playerAnimationMovement(character, ctx)
	}


	drawHealthBar (obj, ctx)  {
	  	this.draw.img(userInterface.emptyBar, obj.body.pos.x, obj.body.pos.y, obj.body.size.x, 5, ctx);
	 	let scaledHealth = scale(obj.skills.health.getCurrent(), 0, obj.skills.health.get(), 0 , obj.body.size.x)
	  	this.draw.img(userInterface.healthBar, obj.body.pos.x, obj.body.pos.y, scaledHealth, 5, ctx);
	}



  drawPlayerStatsInCorner(player, ctx) {
      const xOffset = 35;

      this.draw.img(userInterface.emptyBar, xOffset, 0, 50, 15, ctx);
      this.draw.img(userInterface.emptyBar, xOffset, 15, 50, 15, ctx);
      this.draw.img(userInterface.emptyBar, xOffset, 30, 50, 15, ctx);

      let scaledHealth = scale(player.skills.health.getCurrent(), 0, player.skills.health.get(), 0 , 50)
      this.draw.img(userInterface.healthBar, xOffset, 0, scaledHealth, 15, ctx);

      let scaledThirst = scale(player.skills.thirst.getCurrent(), 0, player.skills.thirst.get(), 0 , 50)
      this.draw.img(userInterface.thirstBar, xOffset, 15, scaledThirst, 15, ctx);

      let scaledHunger = scale(player.skills.hunger.getCurrent(), 0, player.skills.hunger.get(), 0 , 50)
	  this.draw.img(userInterface.hungerBar, xOffset, 30, scaledHunger, 15, ctx);

      this.draw.text("HP:", 0, 8, "8", ctx, "purple")
      this.draw.text("Thirst:", 0, 24, "8", ctx, "purple")
      this.draw.text("Hunger:", 0, 40, "8", ctx, "purple")
      this.draw.text("Level: " + player.status.currLevel, 0, 54, "7", ctx, "purple");

  }
}