import RigidBody from '../../../Helpers/rigidBody'

export default class ItemTemplate {
   constructor(info) {
         return (
            {
               name: info.name,
               body: new RigidBody(0, 0, 20 ,40),
               id: 0,
               item_index : -1,
               category_id : -1,
               subCategory_id : -1,
               quantity: 1,
               maxStack: 99,
               bonus : info.bonus || 0,
               speed : info.speed || 0,
               price: info.price || 0,
               wearable: false,
               magic: false,
               use : info.use,
               recipe : info.recipe || false,
               animation : info.animation || false,
               img: info.img || false,
               info: info.name,

               setId(id) {
                  this.id = id;
               },

               addRecipe(recipe) {
                  for (var i = recipe.length - 1; i >= 0; i--) {
                     this.recipe.push(recipe[i])
                  }
               },

               setPos(x, y) {
                  this.body.pos.x = x
                  this.body.pos.y = y
               },

               setSize(width, height) {
                  this.body.size.x = width;
                  this.body.size.y = height;
               },
               setVelocity(x,y) {
                  this.body.velocity.x = x;
                  this.body.velocity.y = y;
               },

               isWearable : function() {
                  this.wearable = true;
               },

               copy : function(x = 0, y = 0, width = 20, height = 20) {
                 return ({
                     name: this.name,
                     body: new RigidBody(x, y, width ,height),
                     id: this.id,
                     item_index : this.item_index,
                     category_id : this.category_id,
                     subCategory_id : this.subCategory_id,
                     animation : this.animation,
                     img : this.img,
                     quantity: 1,
                     bonus : this.bonus,
                     speed : this.speed,
                     maxStack: this.maxStack,
                     price: this.price,
                     wearable: this.wearable,
                     magic : this.magic,
                     use : this.use,
                     recipe : this.recipe,
                     setPos : this.setPos,
                     setSize : this.setSize,
                     isWearable : this.isWearable,
                     setVelocity : this.setVelocity,
                     info : this.info,
                     copy : this.copy
                  })
               }
            }
         )
      }
   }
