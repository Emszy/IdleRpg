import React from "react"
import Skills from "../../Helpers/Skills"

export default class SkillsTest extends React.Component {
  constructor() {
    super()
    this.test();
  }

  levelUpEverything() {
    this.skills.attack.levelUp();
    this.skills.health.levelUp();
    this.skills.attackSpeed.levelUp();
    this.skills.thirst.levelUp();
    this.skills.hunger.levelUp();

  }

  levelDownEverything() {
    this.skills.attack.take(5);
    this.skills.health.take(5);
    this.skills.attackSpeed.take(5);
    this.skills.thirst.take(5);
    this.skills.hunger.take(5);

  }

  showSkills() {
    this.skills.attack.log();
    this.skills.health.log();
    this.skills.attackSpeed.log();
    this.skills.thirst.log();
    this.skills.hunger.log();

  }

  skillLessThanZero() {
    this.skills.attack.take(50);
    this.skills.attack.log();
  }

  death() {
    this.skills.health.take(50);
    this.skills.isDead() ? console.warn("DEAD") : console.warn("Alive");
  }

  alive() {
    this.skills.health.giveLimit(50);
    this.skills.health.log();
    this.skills.isDead() ? console.warn("DEAD") : console.warn("Alive");
  }

  equalizeSkill() {
      this.skills.health.levelUp();
      this.skills.health.levelUp();
      this.skills.health.levelUp();
      this.skills.health.levelUp();
      this.skills.health.levelUp();
      this.skills.health.log();
      this.skills.health.equalize();
      this.skills.health.log();

  }

  test() {
    this.skills = new Skills();
    this.skills.test();
    this.levelUpEverything();
    this.showSkills();
    this.levelDownEverything();
    this.showSkills();
    this.skillLessThanZero();
    this.death();
    this.alive();

    this.equalizeSkill();



  }


}