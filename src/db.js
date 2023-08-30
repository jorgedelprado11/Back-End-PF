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
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

/*
* Creo la instancia de la clase Sequelize para utilizar opciones como loggin false que se utiliza para desactivar el registro de consultas
? Deshabilito el uso de la extensión nativa de PostgreSQL con native: false
? path __filename: la variable basename contendrá el nombre del archivo sin la ruta del directorio, es decir, solo el nombre del archivo en sí. Esto puede ser útil en escenarios donde necesitas referenciar el nombre del archivo actual sin la ruta completa*/

//*mySQL
const sequelize = new Sequelize(
  `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  { logging: false, native: false, host: "localhost", dialect: "mysql" }
);
//*Postgress
// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
//   {
//     logging: false,
//     native: false,
//   }
// );

const basename = path.basename(__filename);

/*
? Carga las definiciones de modelos encontrados en el set modelDefiners en lugar de un array */
const modelDefiners = new Set();
const modelInstances = new Object();

/*
? Leo el archivo /models y filtro los archivos que no empiezan con "." y que sí finalizan con la extensión "".js"*/

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const modelName = file.replace(".js", "") + "Model";
    const Model = require(path.join(__dirname, "/models", file));
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
  Products,
  Categories,
  Seccion,
  MacroCategory,
  Specification,
  Images,
} = sequelize.models;

Categories.hasMany(Products, { foreignKey: "id_categoria" });
Products.belongsTo(Categories, { foreignKey: "id_categoria" });

Products.hasMany(Images, { foreignKey: "id_product" });
Images.belongsTo(Products, { foreignKey: "id_product" });

// Products.belongsTo(Seccion, { foreignKey: "SeccionIdSeccion" });
// Seccion.hasMany(Products);

Products.belongsToMany(Specification, {
  through: "product-specification",
  timestamps: false,
});
Specification.belongsToMany(Products, {
  through: "product-specification",
  timestamps: false,
});

// Products.belongsTo(Agrupador, { foreignKey: "AgrupadorIdAgrupador" });
// Agrupador.hasMany(Products);

/*
! Exporto los modelos para que puedan ser utilizados en otros archivos de la aplicación */
module.exports = {
  ...modelInstances,
  ...sequelize.models,
  conn: sequelize,
};
