export default class Draw {

	 text(str, x, y, size, ctx) {
      ctx.strokeStyle = "white"
      ctx.font = size+"px Comic Sans MS";
      ctx.strokeText(str, x, y);
    }

    img(img, x,y, width, height, ctx) {
        ctx.drawImage(img.img, 
                      img.pos.x,
                      img.pos.y, 
                      img.pos.width, 
                      img.pos.height,
                      x,
                      y,
                      width,
                      height
                    );
       

    }

    inventoryItemImg(img, x,y, ctx) {
        ctx.drawImage(img.img, 
                      img.pos.x,
                      img.pos.y, 
                      img.pos.width, 
                      img.pos.height,
                      x + 4,
                      y + 3,
                      32,
                      32
                    );
       

    }


    

    craftRecipeImg(img, x,y, ctx) {
        ctx.drawImage(img.img, 
                      img.pos.x,
                      img.pos.y, 
                      img.pos.width, 
                      img.pos.height,
                      x + 4,
                      y + 3,
                      12,
                      12
                    );
       

    }

    rect(obj, ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "white"
      ctx.rect(obj.x, obj.y, obj.width, obj.height);
      ctx.stroke();
    }

    gridRect(obj, ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "white"
      ctx.rect(obj.body.pos.x, obj.body.pos.y, obj.body.size.x, obj.body.size.y);
      ctx.stroke();
    }

     fillRect(obj, color, ctx) {
      ctx.fillStyle = color;
      ctx.fillRect(obj.body.pos.x, obj.body.pos.y, obj.body.size.x, obj.body.size.y);
    }

    button(obj, ctx) {

      ctx.beginPath();
      ctx.strokeStyle = "white"

      ctx.rect(obj.button.body.pos.x, obj.button.body.pos.y, obj.button.body.size.x, obj.button.body.size.y);
      ctx.stroke();
      this.label(obj, ctx);
    }

    label(obj, ctx) {
      ctx.strokeStyle = "white"
      ctx.font = obj.label.fontSize + "px Comic Sans MS";
      let xOffset = 0;
      if (obj.label.label.length) {
        let lines = obj.label.label.split('\n');

        for (var i = 0; i < lines.length; i++) {
          if (lines[i].length > 6) {
            xOffset = -4
          } else {
            xOffset = 0;
          }

          ctx.strokeText(lines[i], obj.label.body.pos.x + xOffset, obj.label.body.pos.y + i*15);
        } 
      }

        if (obj.label2) {
          if (obj.label2.label.length) {
          let lines = obj.label2.label.split('\n');

          for (var i = 0; i < lines.length; i++) {
            ctx.strokeText(lines[i], obj.label2.body.pos.x, obj.label2.body.pos.y + i*15);
          } 
        }
      }




    }
     actionButton(obj, ctx) {

      ctx.beginPath();
      ctx.strokeStyle = "white"

      // ctx.rect(obj.button.body.pos.x, obj.button.body.pos.y, obj.button.body.size.x, obj.button.body.size.y);
      // ctx.stroke();

      ctx.font = obj.label.fontSize + "px Comic Sans MS";
      ctx.strokeText(obj.label.label, obj.label.body.pos.x, obj.label.body.pos.y);

      ctx.font = obj.label2.fontSize + "px Comic Sans MS";
      ctx.strokeText(obj.label2.label, obj.label2.body.pos.x, obj.label2.body.pos.y);

    }

     craftButton(obj, items, ctx) {

      ctx.beginPath();
      ctx.strokeStyle = "white"

      ctx.font = obj.label.fontSize + "px Comic Sans MS";
      ctx.font = obj.label2.fontSize + "px Comic Sans MS";
      ctx.font = obj.label3.fontSize + "px Comic Sans MS";
      ctx.font = obj.label4.fontSize + "px Comic Sans MS";

      ctx.strokeText(obj.label.label, obj.label.body.pos.x, obj.label.body.pos.y - 10);


      if (items.recipe[0].item.img) {
        this.img(items.recipe[0].item.img, obj.label.body.pos.x + 4, obj.label.body.pos.y + 12, 12,12, ctx )
        obj.label2.changeLabel(" x " + items.recipe[0].quantity)
        ctx.font = "8px Comic Sans MS";

        ctx.strokeText(obj.label2.label, obj.label2.body.pos.x + 20, obj.label2.body.pos.y + 10);

      } else {
        obj.label2.changeLabel(items.recipe[0].item.name + " x " + items.recipe[0].quantity)
        ctx.strokeText(obj.label2.label, obj.label2.body.pos.x, obj.label2.body.pos.y);

      }

      if (items.recipe[1]) {
        if (items.recipe[1].item.img) {
          this.img(items.recipe[1].item.img, obj.label3.body.pos.x + 4, obj.label3.body.pos.y - 9, 12,12, ctx )
          obj.label3.changeLabel(" x " + items.recipe[1].quantity)
          ctx.strokeText(obj.label3.label, obj.label3.body.pos.x + 20, obj.label3.body.pos.y);

        } else {
          obj.label3.changeLabel(items.recipe[1].item.name + " x " + items.recipe[1].quantity)
          ctx.strokeText(obj.label2.label, obj.label2.body.pos.x, obj.label2.body.pos.y);

        }
      } else {
        obj.label3.changeLabel("");
      }
    
    
      ctx.strokeText(obj.label4.label, obj.label4.body.pos.x, obj.label4.body.pos.y);
    


    }




}