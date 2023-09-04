const { DataTypes } = require("sequelize");
const Crud = require("./Crud");

class OrderProduct extends Crud {
  constructor(sequelize) {
    super(
      sequelize.define("OrderProduct", {
        id_orderProduct: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      })
    );
  }
}
module.exports = OrderProduct;
