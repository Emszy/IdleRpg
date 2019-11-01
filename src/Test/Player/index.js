import React from "react"
import Player from "../../Objects/Player"
import SkillsTest from "../../Test/Skills"
import Item from "../../Objects/Item"

export default class PlayerTest extends React.Component {
  constructor() {
    super()
    this.test();
  }

  checkNoCollision() {
    // moves player2 far away from player 1 and checks collision
    while (this.player2.body.move_to(0,230) === false) {
        console.log(this.player2.getName())
        this.player.body.log();
    }
     console.warn("COLLISION:", this.player.body.collide(this.player2.body));
  }


  checkYesCollision() {
    // moves both players to same coordinate and check collision

      while (this.player.body.move_to(50,50) === false) {
          console.log(this.player.getName())

          this.player.body.log();
      }

      while (this.player2.body.move_to(50,50) === false) {
        console.log(this.player2.getName())
        this.player.body.log();
     }

     console.warn("COLLISION:", this.player.body.collide(this.player2.body));


  }

  testSkills() {
    console.log(this.player.getName());
    this.player.skills = new SkillsTest();

    console.log(this.player2.getName());
    this.player2.skills = new SkillsTest();

  }

  testCollision() {
     this.checkNoCollision();
     this.checkYesCollision();
  }

  testItems(items) {

     this.player2 = new Player(0,0,32,32);
     this.player2.inventory.add(items.healthLevel());
     this.player2.inventory.useItem(this.player2.skills, 0)
      this.player2.inventory.add(items.healthLevel());
     this.player2.inventory.useItem(this.player2.skills, 0)
      this.player2.inventory.add(items.healthLevel());
     this.player2.inventory.useItem(this.player2.skills, 0)
      this.player2.inventory.add(items.healthLevel());
     this.player2.inventory.useItem(this.player2.skills, 0)
     this.player2.setName("player two");

     console.log(this.player2.inventory)
     console.log(this.player2.skills)

     if (this.player2.skills.health.get() === 14) {
      console.log("SKILL VALUE MATCHED")
     } else {
      console.warn("SKILL VALUE DOWSNT MATCH");
     }

  }

  testGold() {
    this.player.inventory.addGold(200);

    if (this.player.inventory.gold === 200) {
          console.log("gold Check GOOD");
    } else {
      console.warn("GOLD CHECK BAD");
    }

    if (this.player.inventory.useGold(300) === false) {
      console.log("Pass gold use test")
    }

    this.player.inventory.useGold(100)

    if (this.player.inventory.gold === 100) {
          console.log("gold Check GOOD");
    } else {
      console.warn("GOLD CHECK BAD");
    }

    console.log("GOLD" + this.player.inventory.gold)

  }

  testAddWholeInventory() {
    
    let items = new Item();

    let testPlayer = new Player(0,0,32,32)
    let testPlayer2= new Player(0,0,32,32)


    testPlayer.setName("TESTPLAYER 1");

     testPlayer.inventory.add(items.smallPotion());
     testPlayer.inventory.add(items.smallPotion());
     testPlayer.inventory.add(items.smallPotion());
     testPlayer.inventory.add(items.smallPotion());
     testPlayer.inventory.add(items.smallPotion());

     testPlayer2.inventory.addGold(1000);
     testPlayer2.inventory.add(items.smallWater());
     testPlayer2.inventory.add(items.smallWater());
     testPlayer2.inventory.add(items.smallWater());
     testPlayer2.inventory.add(items.smallWater());
     testPlayer2.inventory.add(items.smallWater());

     testPlayer2.inventory.add(items.megaWater());
     testPlayer2.inventory.add(items.megaWater());
     testPlayer2.inventory.add(items.megaWater());
     testPlayer2.inventory.add(items.megaWater());
     testPlayer2.inventory.add(items.megaWater());



     testPlayer2.inventory.add(items.smallWater());
     testPlayer2.inventory.add(items.smallWater());
     testPlayer2.inventory.add(items.smallWater());
     testPlayer2.inventory.add(items.smallWater());
     testPlayer2.inventory.add(items.smallWater());

     testPlayer2.inventory.add(items.megaWater());
     testPlayer2.inventory.add(items.megaWater());
     testPlayer2.inventory.add(items.megaWater());
     testPlayer2.inventory.add(items.megaWater());
     testPlayer2.inventory.add(items.megaWater());

     testPlayer2.inventory.add(items.smallWater());
     testPlayer2.inventory.add(items.smallWater());
     testPlayer2.inventory.add(items.smallWater());
     testPlayer2.inventory.add(items.smallWater());
     testPlayer2.inventory.add(items.smallWater());

     testPlayer2.inventory.add(items.megaWater());
     testPlayer2.inventory.add(items.megaWater());
     testPlayer2.inventory.add(items.megaWater());
     testPlayer2.inventory.add(items.megaWater());
     testPlayer2.inventory.add(items.megaWater());




     testPlayer.inventory.addInventory(testPlayer2.inventory);


     console.log(testPlayer)







  }

  test() {

     let items = new Item();

     this.player = new Player(0,0,32,32);
     // this.player.setName("player one");
     // this.player.inventory.add(items.smallPotion());
     // console.log(this.player.inventory)

     // this.testItems(items);

     // this.testGold();
     // this.testCollision();
     // this.testSkills()
     this.testAddWholeInventory();
    

  }

  log()
  {
    this.player.log();
  }



}