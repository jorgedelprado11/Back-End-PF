const { DataTypes } = require("sequelize");
const Crud = require("./Crud");

class Rating extends Crud {
  constructor(sequelize) {
    super(
      sequelize.define(
        "Rating",
        {
          id_rating: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          value: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          // * Probando si hacen falta, creo que no

          // id_producto: {
          //   type: DataTypes.INTEGER,
          //   allowNull: false,
          // },
          // id_user: {
          //   type: DataTypes.INTEGER,
          //   allowNull: false,
          // },
        },

        {
          timestamps: false,
        }
      )
    );
  }
}

module.exports = Rating;
