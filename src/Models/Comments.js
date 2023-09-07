const { DataTypes } = require("sequelize");
const Crud = require("./Crud");

class Comments extends Crud {
  constructor(sequelize) {
    super(
      sequelize.define(
        "Comments",
        {
          id_comment: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
        },
        {
          timestamps: false,
        }
      )
    );
  }
}

module.exports = Comments;
