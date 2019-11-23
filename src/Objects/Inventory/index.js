import {settings} from "../../Helpers/settings"

export default class Inventory {

   constructor(items, max = 24) {
      this.max = max
   		this.spaces = new Array(this.max); 
   		this.gold = 0;
   		this.items = items; 		
   		for (let i = 0; i < this.max; i++){
   			this.spaces[i] = items.none();
		   }
   }

   find(item) {
      for (let x = 0; x < this.max; x++) {
            if (this.spaces[x].id === item.id) {
                return ({found: true, index : x});
            }
      }
      return ({found: false, index : -1});
   }

   findSpace() {
       for (let x = 0; x < this.max; x++) {
            if (this.spaces[x].id === -1) {
                return (true);
            }
      }
      return (false);
   }

   craftFind(item, quantity, amount) {
      for (let x = 0; x < this.max; x++) {
            if (this.spaces[x].id === item.id) {
                if (quantity * amount <= this.spaces[x].quantity) {
                  return (true);
                }
            }
      }
      return (false);
   }

  

   craftBuy(item, quantity, amount) {
      for (let x = 0; x < this.max; x++) {
            if (this.spaces[x].id === item.id) {
               this.spaces[x].quantity -= quantity * amount;
               if (this.spaces[x].quantity < 1) {
                  this.delete(x);
               }
                
            }
         }
      }



   addToMap(item, player) {

      for (let x = 0; x < this.max; x++) {
            if (this.spaces[x].id === -1) {
                this.spaces[x] = item.copy();
                this.spaces[x].setPos(player.body.pos.x, player.body.pos.y)
                this.spaces[x].quantity = item.quantity;
                return (true);
            }
         }
         return (false);
   }

   addInventoryToMap(newInventory, player) {
         for (let y = 0; y < newInventory.spaces.length; y++) {
            if (newInventory.spaces[y].id !== -1) {
                for (let x = 0; x < this.max; x++) {
                      if (this.addToMap(newInventory.spaces[y], player)) {
                        break;
                      }
               }
            }
         }
   }


   add(item) {
         if (item.id === -1) {
            return false
         }
         let foundItem = this.find(item)
         if (foundItem.found) {
            this.spaces[foundItem.index].quantity += 1;
            return (true);
         }

   		for (let x = 0; x < this.max; x++) {
   			if (this.spaces[x].id === -1) {
   				 this.spaces[x] = item.copy();
   				 return (true);
   			}
   		}
   		return (false);

   }

   addQuantity(item, quantity) {

      let foundItem = this.find(item)
         if (foundItem.found) {
            this.spaces[foundItem.index].quantity += quantity;
            return (true);
         }

         for (let x = 0; x < this.max; x++) {
            if (this.spaces[x].id === -1) {
                this.spaces[x] = item.copy();
                this.spaces[x].quantity = quantity
                return (true);
            }
         }
         return (false);
   }

   buy (item, quantity) {
      let price = item.price * quantity;
      if (price <= this.gold) {
         if (this.addQuantity(item, quantity)) {
            this.gold -= price;
         }
      }
   }

   addRandomItem(level, howMany) {
      for (let i = 0; i <= howMany; i++) {
         let newItem = this.items.randomItemDrop(level);
         this.add(newItem);
      }
   }

   addInventory(newInventory) {
   		this.addGold(newInventory.gold);
   		for (let y = 0; y < this.max; y++) {
   			if (newInventory.spaces[y].id !== -1) {
   				 for (let x = 0; x < this.max; x++) {
		   			    if (this.add(newInventory.spaces[y])) {
                        break;
                      }
   				}
   			}
   		}		
   }

  maxCraftFind(item, quantity) {
      for (let x = 0; x < this.max; x++) {
            if (this.spaces[x].id === item.id) {
              if (quantity > 0) {
               return (this.spaces[x].quantity / quantity)
              }
            }
      }
      return (false);
   }

   maxCraft(item) {
      let maxAmount = [];

      for (var i = item.recipe.length - 1; i >= 0; i--) {
         maxAmount.push(this.maxCraftFind(item.recipe[i].item, item.recipe[i].quantity))
      }

      let min = Math.min(...maxAmount)
      return (Math.floor(min));
   }

   craft(item, amount) {

      //check to see if we have to craft cost in inventory
      for (var i = item.recipe.length - 1; i >= 0; i--) {
         let canCraft = this.craftFind(item.recipe[i].item, item.recipe[i].quantity, amount)
         if (canCraft === false) {
            return (false)
         }
      }

      //subtract the craft cost from inventory

      for (i = item.recipe.length - 1; i >= 0; i--) {
         this.craftBuy(item.recipe[i].item, item.recipe[i].quantity, amount)         
      }

      this.addQuantity(item, amount);

      return (true)

   }


   addGold(gold) {
   		this.gold += gold
   }

   useGold(gold) {
   		if (this.gold - gold >= 0) {
   			this.gold -= gold
   			return (true)
   		}
   		return (false);
   }

   sell(index, amount) {
     let price = (this.spaces[index].price * settings.inventory.sellPrice) * amount;
     this.addGold(price);
     return (this.deleteQuantity(index, amount));
   }

   delete(index) {
   		this.spaces.splice(index, 1, this.items.none());
   }

   deleteOne(index) {
         if (this.spaces[index].quantity > 1) {
            this.spaces[index].quantity--;
         } else {
            this.delete(index);
         } 
   }

   deleteQuantity(index, quantity) {
         if (this.spaces[index].quantity - quantity > 0) {
            this.spaces[index].quantity =  this.spaces[index].quantity - quantity;
         } else {
            this.delete(index);
            return true
         } 
   }


   useItem(skills, index) {
      if (this.spaces[index].use) {
        let item = this.spaces[index].use(skills)
        
        if (item.used === false) {
          return (false)
        }

         if (this.spaces[index].quantity > 1) {
            this.spaces[index].quantity--;
         } else {
            this.delete(index);
         }
      }
   }

   wearItem(armor, index) {
      if (this.spaces[index].use) {
         let tmpItem = this.spaces[index].use(armor)
         if (this.spaces[index].quantity > 1) {
            this.spaces[index].quantity--;
            if (tmpItem) {
               this.add(tmpItem)
            }
         } else {
            this.delete(index);
            if (tmpItem) {
               this.add(tmpItem)
            }

         }
      }
   }

   swap(index1, index2) {
      let temp = this.spaces[index1]
      this.spaces[index1] = this.spaces[index2]
      this.spaces[index2] = temp;
   }

}