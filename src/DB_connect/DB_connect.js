const {
  Products,
  Categories,
  Seccion,
  MacroCategory,
  Specification,
  Images,
} = require("../db");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const DB_connect = async () => {
  try {
    const productFilePath = path.join(__dirname, "../../dataProducts.json");
    const productRawData = fs.readFileSync(productFilePath);
    const productData = JSON.parse(productRawData);

    const categoryFilePath = path.join(__dirname, "../../dataCategories.json");
    const categoryRawData = fs.readFileSync(categoryFilePath);
    const categoryData = JSON.parse(categoryRawData);

    const macroCategoryFilePath = path.join(
      __dirname,
      "../../dataAgrupador.json"
    );
    const macroCategoryRawData = fs.readFileSync(macroCategoryFilePath);
    const macroCategoryData = JSON.parse(macroCategoryRawData);

    const seccionFilePath = path.join(__dirname, "../../dataSeccion.json");
    const seccionRawData = fs.readFileSync(seccionFilePath);
    const seccionData = JSON.parse(seccionRawData);

    if (!productData.results || !categoryData) {
      console.log("No results found in the data.");
      return;
    }

    const uniqueProducts = new Set();
    const uniqueCategories = new Set();
    for (const categoryItem of categoryData) {
      const { id_categoria, nombre, id_agrupador } = categoryItem;

      if (!uniqueCategories.has(nombre)) {
        uniqueCategories.add(nombre);

        await Categories.findOrCreate({
          where: { id_categoria: id_categoria },
          defaults: {
            nombre,
            id_agrupador,
          },
        });
      }
    }

    for (const item of productData.results) {
      const nombre = item.nombre;
      let specs = new Array();
      //   console.log(typeof product.caracteristicas);
      //   console.log(product.nombre, " ", product.caracteristicas);
      if (item.caracteristicas) {
        for (const caracteristica in item.caracteristicas) {
          const [newSpec, created] = await Specification.findOrCreate({
            where: {
              name: caracteristica,
              value: item.caracteristicas[caracteristica],
            },
          });
          specs.push(newSpec.id);
        }
      }
      if (!uniqueProducts.has(nombre)) {
        uniqueProducts.add(nombre);
        const id_categoria = item.id_categoria;
        const productData = {
          id_producto: item.id_producto,
          nombre: item.nombre,
          calificacion: item.destacado || null,
          precio: item.precio || null,
          descuento: 0,
          vendible: item.vendible || false,
          stock: item.stock || null,
          garantia: item.garantia || null,
          iva: item.iva || null,
          id_categoria,
        };

        const [product, created] = await Products.findOrCreate({
          where: { nombre },
          defaults: productData,
        });
        for (const image of item.imagenes) {
          //*Lógica para crear registro de imagenes
          const imageData = { url: image.ruta, id_product: item.id_producto };
          await Images.create(imageData);
        }
        if (created) {
          await product.addSpecifications(specs);
        }
      }
    }

    for (const macroCategoryItem of macroCategoryData) {
      const { id_agrupador, nombre } = macroCategoryItem;

      await MacroCategory.findOrCreate({
        where: { id_agrupador },
        defaults: {
          nombre: nombre,
        },
      });
    }

    for (const seccionItem of seccionData) {
      const { id_seccion, nombre } = seccionItem;

      await Seccion.findOrCreate({
        where: { id_seccion },
        defaults: {
          nombre: nombre,
        },
      });
    }

    await Products.sync();
    await Categories.sync();
    await Seccion.sync();
    await MacroCategory.sync();

    console.log("♥ Database Created... ♥");
  } catch (error) {
    console.log("An error occurred:", error.message);
  }
};

module.exports = DB_connect;
