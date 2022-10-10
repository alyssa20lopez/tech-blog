const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Member extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Member.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    member_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  // {
  //   hooks: {
  //     beforeCreate: async (newMemberData) => {
  //       newMemberData.password = await bcrypt.hash(newMemberData.password, 8);
  //       return newMemberData;
  //     },
  //     beforeUpdate: async (updatedMemberData) => {
  //       updatedMemberData.password = await bcrypt.hash(updatedMemberData.password, 8);
  //       return updatedMemberData;
  //     },
  //   },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "member",
  }
);

module.exports = Member;
