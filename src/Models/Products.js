const { DataTypes } = require("sequelize");
const Crud = require("./Crud");

class Product extends Crud {
  constructor(sequelize) {
    super(
      sequelize.define(
        "Products",
        {
          id_producto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
          },
  
          nombre: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          calificacion: {
            type: DataTypes.FLOAT,
            validate: {
              max: 5,
              min: 1,
            },
          },
          precio: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },
          descuento: {
            type: DataTypes.FLOAT,
            validate: {
              max: 100,
              min: 0,
            },
          },
          stock: {
            type: DataTypes.INTEGER,
          },
          garantia: {
            type: DataTypes.INTEGER,
          },
          iva: {
            type: DataTypes.FLOAT,
          },
          id_categoria: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
        },
        {
          paranoid: true,
        }
      )
    );
  }
}
module.exports = Product;
