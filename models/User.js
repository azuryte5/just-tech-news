const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


// create our User model
class User extends Model {
  checkPassword(loginPw) {
  return bcrypt.compareSync(loginPw, this.password);
}}

// define table columns and configuration
User.init(
  {
    // TABLE COLUMN DEFINITIONS GO HERE
    //define an id column
    id: {
        //use the soecial sequelize DataTypes object provide what type of data it is
        type: DataTypes.INTEGER,
        //this allows NOT NULL option to be 
        allowNull: false,
        // instruct that this is the PRimpar Key
        primaryKey:true,
        //turn on or off tauot incraement
        autoIncrement:true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type:DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type:DataTypes.STRING,
        allowNull:false,
        validate: {
            // this means the password must be length x
            len: [4]
        }
    }
  },
  {
    //New 13.2
    hooks: {
    // set up beforeCreate lifecycle "hook" functionality
    // this is too slow. will have to change it to async in 13.2
    // beforeCreate(userData) {
    //   return bcrypt.hash(userData.password, 10).then(newUserData => {
    //     return newUserData
    //   });
    // }  
  
    async beforeCreate(newUserData) {
      newUserData.password = await bcrypt.hash(newUserData.password, 10);
      return newUserData;
    },
    // set up beforeUpdate lifecycle "hook" functionality
  async beforeUpdate(updatedUserData) {
    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
    return updatedUserData;
  }  
    
  },
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user'
  }
);

module.exports = User;