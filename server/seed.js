const seed = (db) => {
  return Promise.all([
     
    // db.users.create({
    //     name: "NEW USER", password: "123456789"
    // }).then((user) => console.log(user)),
    
    // db.users.create({
    //     name: "another one", password: "123456789"
    // }).then((user) => console.log(user)),


      db.inventoryItems.bulkCreate([
        {name: 'INV ITEM1', user_id: 1},
        {name: 'INV ITEM2', user_id: 1},
        {name: 'INVITEM 3', user_id: 1}
      ]),
    
      db.skills.bulkCreate([
            {
                      value: 2,
                      current : 2,
                      name: "Attack",
                      boost : 2,
                      xp : 2,
                      threshold : 2, 
                      user_id: 1,
            },
            {
                      value: 2,
                      current : 2,
                      name: "Speed",
                      boost : 2,
                      xp : 2,
                      threshold : 2, 
                      user_id: 1,
            },


        ])

    ])

  .catch(error => console.log(error));
};

module.exports = {
  seed
}