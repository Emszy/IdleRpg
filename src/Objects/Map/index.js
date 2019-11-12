import RigidBody from "../../Helpers/rigidBody"
import Inventory from "../../Objects/Inventory"
import {mapAtlas} from "../Animations/images"
import MapAnimation from "../Animations/mapAnimation"
import {randomInt} from "../../Helpers/functions"


export default class MapLogic {
	
  constructor(items) {
    this.end = {
            name : "end",
            body: new RigidBody(32 * 5,400, 1,1)
          }
    
    this.start = {
            name: "beginning",
            body: new RigidBody(32 * 5, 0, 1, 1)
          }
    
    this.middle = { 
          name: "middle",
          body: new RigidBody(5 * 32, 7 * 32, 1, 1)
        }

    this.inventory = [];
    this.items = items;
    this.inventory.push(new Inventory(this.items, 250))
    this.animation = new MapAnimation(mapAtlas)
    this.width = 15;
    this.height = 15;
    this.tiles = [];
    this.layer = [];


  }

  addInventories(player) {
    let mapInventories = player.currLevel - player.highestLevel
    if (mapInventories > 0) {
      for (var i = 0; i <= mapInventories; i++) {
        this.addInventory();
      }
    }    
  }

  addInventory() {
    this.inventory.push(new Inventory(this.items, 250))
  }

  randomGrassTerrain() {
    let type = ["light"];
    let imgs = ["hole", "specks", "main"];

    return ({
      terrain : "dirt",
      type: type[0],
      img : imgs[randomInt(0, imgs.length - 1)]
    })
  }

  layerType(terrain) {
    let type = Object.keys(mapAtlas.terrain[terrain])
    return (type[randomInt(0, type.length - 1)])
  }

  terrainBase(terrain, type) {
        let img = Object.keys(mapAtlas.terrain[terrain][type].base)
        img = img[randomInt(0,img.length - 1)]

        return ({
          terrain : terrain,
          type: type,
          img : img
        })

  }

   terrainLayer(terrain, type) {
        let img = Object.keys(mapAtlas.terrain[terrain][type])
        img = img[randomInt(0,img.length - 1)]
        return ({
          terrain : terrain,
          type: type,
          img : img
        })

  }

  selectTerrain(level) {
    let terrain = ["home", 'grass', "dirt", "sand", "lava"];
    let index = 1;
    if (level > 0 && level < 20){
        index = 1;
    }  else if (level >= 20 && level < 40){
        index = 2;
    } else if (level >= 40 && level < 60){
        index = 3;
    } else if (level >= 60 && level < 80){
        index = 4;
    } else {
      index = 4;
    }


    return (terrain[index]);
  }
  
	create_base(level) {
		let tiles = []
    let terrain = this.selectTerrain(level);
    console.log(terrain);
    let layerType = this.layerType(terrain);
		for (let y = 0; y < this.height; y++) {
			tiles[y] = [];
        	for (let x = 0; x < this.width; x++) {
        		let tile = {
        			body : new RigidBody(x * 32, y * 32, 32 ,32),
              info : this.terrainBase(terrain, layerType)
        	}
        	tiles[y][x] = tile;
      	  }
      	}
        this.tiles = tiles;

    this.create_layer(terrain, layerType)

	}

  create_layer(terrain, type) {
    let tiles = []
          let layerAmount = randomInt(5, 10);
          for (let x = 0; x < layerAmount; x++) {
            let info = this.terrainLayer(terrain, type);

            if (info.img !== "base") {
              let tile = {
                body : new RigidBody(randomInt(0, 15) * 32, randomInt(0, 15) * 32, 32 ,32 ),
                info : info
              }
              tiles.push(tile);
            }
            
        }
        this.layer = tiles;
  }
}