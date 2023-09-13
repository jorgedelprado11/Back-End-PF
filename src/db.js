/* 
! ESTE ARCHIVO CONFIGURA UNA CONEXIÓN A UNA BASE DE DATOS POSTGRESQL UTILIZANDO SEQUELIZE, DEFINE MODELOS DE DATOS, ESTABLECE RELACIONES ENTRE ELLOS Y EXPORTA LOS MODELOS Y LA CONEXIÓN PARA SU USO EN OTRAS PARTES DE LA APLICACIÓN.

* Importaciones  
? Carga de variables de entorno utilizando la biblioteca dotenv
? Importa sequelize de la biblioteca Sequelize para crear una instanci de base de datos
? Importo fs para trabajar con sistema de archivos
? Importo path para trabajar con rutas de archivos y directorios
? Desestructuro las variables de entorno desde process.env */

require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DEPLOY } = process.env;

/*
* Creo la instancia de la clase Sequelize para utilizar opciones como loggin false que se utiliza para desactivar el registro de consultas
? Deshabilito el uso de la extensión nativa de PostgreSQL con native: false
? path __filename: la variable basename contendrá el nombre del archivo sin la ruta del directorio, es decir, solo el nombre del archivo en sí. Esto puede ser útil en escenarios donde necesitas referenciar el nombre del archivo actual sin la ruta completa*/

//*mySQL
// const sequelize = new Sequelize(
//   `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
//   { logging: false, native: false, host: "localhost", dialect: "mysql" }
// );
//*Postgress
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

//*Postgress Deploy
// const sequelize = new Sequelize(DB_DEPLOY, {
//   logging: false,
//   native: false,
// });
const basename = path.basename(__filename);

/*
? Carga las definiciones de modelos encontrados en el set modelDefiners en lugar de un array */
const modelDefiners = new Set();
const modelInstances = new Object();

/*
? Leo el archivo /models y filtro los archivos que no empiezan con "." y que sí finalizan con la extensión "".js"*/

fs.readdirSync(path.join(__dirname, "/Models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const modelName = file.replace(".js", "").toLowerCase() + "Model";
    const Model = require(path.join(__dirname, "/Models", file));
    modelInstances[modelName] = new Model(sequelize);
  });
//*{userModel, }
/*
? Itero sobre los modelos y las asocia a la instancia de Sequelize para asociar el modelo a la base de datos */
// modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

/*
 * Se desestructuran los modelos creados en Sequelize para utilizarlo en la definición de la asociaciones */
const {
  Users,
  Role,
  Products,
  Categories,
  MacroCategory,
  Specification,
  SpecificationValue,
  Images,
  Favoritos,
  Location,
  Order,
  OrderProduct,
  Comments,
  Rating,
} = sequelize.models;

Rating.belongsTo(Products, { foreignKey: "id_producto" });
Products.hasMany(Rating, { foreignKey: "id_producto" });

Rating.belongsTo(Users, { foreignKey: "id_user" });
Users.hasMany(Rating, { foreignKey: "id_user" });

Categories.hasMany(Products, { foreignKey: "id_categoria" });
Products.belongsTo(Categories, { foreignKey: "id_categoria" });

Products.hasMany(Images, { foreignKey: "id_product" });
Images.belongsTo(Products, { foreignKey: "id_product" });

Products.belongsToMany(SpecificationValue, {
  through: "product-specificationValue",
  timestamps: false,
});
SpecificationValue.belongsToMany(Products, {
  through: "product-specificationValue",
  timestamps: false,
});

Specification.hasMany(SpecificationValue, {
  foreignKey: "id_specification",
});
SpecificationValue.belongsTo(Specification, {
  foreignKey: "id_specification",
});

Products.belongsToMany(Users, { through: Favoritos });
Favoritos.belongsTo(Products);

Products.belongsToMany(Order, { through: OrderProduct });
Order.belongsToMany(Products, { through: OrderProduct });

Users.hasMany(Favoritos);
Favoritos.belongsTo(Users);

Role.hasMany(Users, { foreignKey: "id_role" });
Users.belongsTo(Role, { foreignKey: "id_role" });

//*Relación MacroCategory-Categories

MacroCategory.hasMany(Categories, { foreignKey: "id_macroCategory" });
Categories.belongsTo(MacroCategory, { foreignKey: "id_macroCategory" });

Categories.belongsToMany(Specification, {
  through: "category-specification",
  timestamps: false,
});
Specification.belongsToMany(Categories, {
  through: "category-specification",
  timestamps: false,
});

Users.belongsTo(Location, { foreignKey: "id_location" });
Location.hasOne(Users, { foreignKey: "id_location" });

Order.belongsTo(Users, { foreignKey: "id_user" });
Users.hasOne(Order, { foreignKey: "id_user" });

Users.hasMany(Comments, { foreignKey: "id_user" });
Comments.belongsTo(Users, { foreignKey: "id_user" });

Products.hasMany(Comments, { foreignKey: "id_producto" });
Comments.belongsTo(Products, { foreignKey: "id_producto" });

/*
! Exporto los modelos para que puedan ser utilizados en otros archivos de la aplicación */
module.exports = {
  ...modelInstances,
  ...sequelize.models,
  conn: sequelize,
};
