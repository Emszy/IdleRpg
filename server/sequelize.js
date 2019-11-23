const Sequelize = require('sequelize')
const uuidv4 = require('uuid/v4');
const {seed} = require("./seed");

const sequelize = new Sequelize('idle_forest', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./models/user.js')(sequelize, Sequelize);
db.inventoryItems = require('./models/inventory.js')(sequelize, Sequelize);
db.skills = require('./models/skills.js')(sequelize, Sequelize);
db.bankItems = require('./models/bank.js')(sequelize, Sequelize);


db.inventoryItems.belongsTo(db.users);
db.skills.belongsTo(db.users);
db.bankItems.belongsTo(db.users);

db.users.hasMany(db.inventoryItems);
db.users.hasMany(db.skills);
db.users.hasMany(db.bankItems);


sequelize.sync({
    // force: true
})

.then(() => {
  // seed(db)
  // .then(() => {
      db.users.findOne({
      where : {id:1},
      include: [
        {
          model: db.inventoryItems,
        },
        {
          model: db.skills,
        }
      ]
    }).then(users => {
      console.log(users)
    });
      console.log(`Database & tables created!`)
  // })

})





module.exports = {
  db
}