import React from "react"
import RigidBody from "../../Helpers/rigidBody"

export default class RigidBodyTest extends React.Component {
  constructor() {
    super()
    this.test();
  }

  test() {
      let v = new RigidBody(0,0,32,32);
      let v2 = new RigidBody(10,20,32,32);
      console.log("collision: ", v.collide(v2));
      let v3 = new RigidBody(222,2039,32,32);
      let v4 = new RigidBody(10,20,32,32);
      console.log("collision: ", v3.collide(v4));
      v.log();
      if (v.stop) v.stop = false
      while (v.move_to(50,50) === false)
      {
        v.log();
        console.log("moving");
      }
      v.log()
      console.log("MOVED TO TARGET");
      console.log("Move Test COmplete")

  }

  log()
  {
    this.pos.log();
    this.size.log();
  }



}