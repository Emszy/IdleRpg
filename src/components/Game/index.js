import React from "react"
// import RigidBodyTest from "../../Test/rigidBodyTest"
// import PlayerTest from "../../Test/Player"
// import SkillsTest from "../../Test/Skills"
// import InventoryTest from "../../Test/Inventory"
// import Euphori from "../../assets/sounds/Euphori.mp3"
// import EntityTest from "../../Test/Entity"
import Draw from "../Draw"

export default class Game extends React.Component {
  
 
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
      <span style ={{width: 480, height: 480}}>
        <Draw />
      </span>
    )
  }



}