import React from "react"
// import RigidBodyTest from "../../Test/rigidBodyTest"
// import PlayerTest from "../../Test/Player"
// import SkillsTest from "../../Test/Skills"
// import InventoryTest from "../../Test/Inventory"
// import Euphori from "../../assets/sounds/Euphori.mp3"
import Draw from "../Draw"
// import EntityTest from "../../Test/Entity"

export default class Game extends React.Component {
  
  constructor() {
    super();
    this.state = {


    }
  }

  componentDidMount() {
    //test the rigid body before using
    // new RigidBodyTest();
    // let Player = new PlayerTest();
    // Player.log();
    // let Skills = new SkillsTest();
    // let inventory = new InventoryTest();
    // let playerEntity = new EntityTest();

  }

  render() {
    return (
      <div>
        <Draw />
      </div>
    )
  }



}