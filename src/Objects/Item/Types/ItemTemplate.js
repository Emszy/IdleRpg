import RigidBody from '../../../Helpers/rigidBody'


export default class ItemTemplate {
      constructor(name, price, animation, img, use, recipe = []) {
         return (
            {
               name: name,
               body: new RigidBody(0, 0, 20 ,40),
               id: 0,
               quantity: 1,
               maxStack: 99,
               bonus : 0,
               price: price,
               wearable: false,
               magic: false,
               use : use,
               recipe : recipe,
               animation : animation,
               img: img,

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
                     animation : this.animation,
                     img : this.img,
                     quantity: 1,
                     bonus : this.bonus,
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
                     copy : this.copy
                  })
               }
            }
         )
      }
 
   }