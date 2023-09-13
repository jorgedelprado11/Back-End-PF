const {
  Users,
  Role,
  Products,
  Categories,
  Seccion,
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
} = require("../db");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const { where } = require("sequelize");
const { type } = require("os");

const DB_connect = async () => {
  try {
    // Load data from JSON files

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

    const usersFilePath = path.join(__dirname, "../../dataUsers.json");
    const usersRawData = fs.readFileSync(usersFilePath);
    const usersData = JSON.parse(usersRawData);

    const locationFilePath = path.join(__dirname, "../../dataLocation.json");
    const locationRawData = fs.readFileSync(locationFilePath);
    const locationData = JSON.parse(locationRawData);

    const orderFilePath = path.join(__dirname, "../../dataOrder.json");
    const orderRawData = fs.readFileSync(orderFilePath);
    const orderData = JSON.parse(orderRawData);

    const commentsFilePath = path.join(__dirname, "../../dataComments.json");
    const commentsRawData = fs.readFileSync(commentsFilePath);
    const commentsData = JSON.parse(commentsRawData);

    const ratingsFilePath = path.join(__dirname, "../../dataRatings.json");
    const ratingsRawData = fs.readFileSync(ratingsFilePath);
    const ratingsData = JSON.parse(ratingsRawData);

    if (!productData.results || !categoryData) {
      console.log("No results found in the data.");
      return;
    }

    // Create or find ratings
    for (const ratingItem of ratingsData) {
      const { id_rating, value, id_producto, id_user } = ratingItem;

      await Rating.findOrCreate({
        where: { id_rating },
        defaults: {
          id_producto,
          id_user,
          value,
        },
      });
      // console.log(id_rating);
      // console.log(value);
      // console.log(id_producto);
      // console.log(id_user);
    }

    // Create or find macro categories
    for (const macroCategoryItem of macroCategoryData) {
      const { id_agrupador, nombre } = macroCategoryItem;
      await MacroCategory.findOrCreate({
        where: { id_agrupador },
        defaults: {
          nombre: nombre,
        },
      });
    }

    // Create or find categories
    const uniqueCategories = new Set();
    for (const categoryItem of categoryData) {
      const { id_categoria, nombre, id_agrupador } = categoryItem;

      if (!uniqueCategories.has(nombre)) {
        uniqueCategories.add(nombre);

        await Categories.findOrCreate({
          where: { id_categoria },
          defaults: {
            nombre,
            id_macroCategory: id_agrupador,
          },
        });
      }
    }

    // Create or find products
    const uniqueProducts = new Set();
    for (const item of productData.results) {
      const nombre = item.nombre;
      let specs = new Array();
      let specsValues = new Array();

      if (item.caracteristicas) {
        for (const caracteristica in item.caracteristicas) {
          const [newSpec, created] = await Specification.findOrCreate({
            where: {
              name: caracteristica,
            },
          });

          specs.push(newSpec.id_specification);

          const [newSpecValue, valueCreated] =
            await SpecificationValue.findOrCreate({
              where: {
                id_specification: newSpec.id_specification,
                value: item.caracteristicas[caracteristica].toString(),
              },
            });

          specsValues.push(newSpecValue.id);
        }
      }

      if (!uniqueProducts.has(nombre)) {
        uniqueProducts.add(nombre);
        const id_categoria = item.id_categoria;
        const productData = {
          nombre: item.nombre,
          calificacion: item.destacado || null,
          precio: item.precio || null,
          descuento: 0,
          stock: item.stock || null,
          garantia: item.garantia || null,
          iva: item.iva || null,
          id_categoria,
        };

        const [product, created] = await Products.findOrCreate({
          where: { nombre },
          defaults: productData,
        });

        await Categories.findOne({ where: { id_categoria } }).then(
          (category) => {
            category.addSpecification(specs);
          }
        );

        for (const image of item.imagenes) {
          const imageData = {
            url: image.ruta,
            id_product: product.id_producto,
          };
          await Images.create(imageData);
        }

        if (created) {
          await product.addSpecificationValues(specsValues);
        }
      }
    }

    // for (const seccionItem of seccionData) {
    //   const { id_seccion, nombre } = seccionItem;

    //   await Seccion.findOrCreate({
    //     where: { id_seccion },
    //     defaults: {
    //       nombre: nombre,
    //     },
    //   });
    // }
    for (const locationItem of locationData) {
      const { id_location, provincia, ciudad, calle, codigo_postal } =
        locationItem;

      const [location, created] = await Location.findOrCreate({
        where: { id_location },
        defaults: {
          provincia,
          ciudad,
          calle,
          codigo_postal,
        },
      });
    }

    // Create or find roles and users
    for (const usersItem of usersData) {
      const { role } = usersItem.role;
      const [newRole, roleCreated] = await Role.findOrCreate({
        where: { description: role },
      });

      const {
        username,
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        id_location,
      } = usersItem;

      const [newUser, created] = await Users.findOrCreate({
        where: { email, username },
        defaults: {
          password,
          firstName,
          lastName,
          phoneNumber,
          id_role: newRole.id,
          id_location,
        },
      });

      if (created) {
        await newUser.setLocation(id_location);
      }
    }

    // Create or find orders
    for (const orderItem of orderData) {
      let price = 0;
      const { id_order, status, package, id_user } = orderItem;
      try {
        const [createdOrder, created] = await Order.findOrCreate({
          where: { id_order },
          defaults: {
            status,
            price,
            id_user,
          },
        });

        if (created) {
          for (const product of package.items) {
            let { id_producto, cantidad } = product;
            id_producto = Number(id_producto);
            const productData = await Products.findOne({
              where: { id_producto },
            });
            const [createdOrderProduct, created] =
              await OrderProduct.findOrCreate({
                where: {
                  OrderIdOrder: id_order,
                  ProductIdProducto: id_producto,
                },
                defaults: {
                  price: productData.precio * cantidad,
                  quantity: cantidad,
                },
              });
            price = price + productData.precio * cantidad;
          }
          createdOrder.price = price;
          await createdOrder.save();
        }

        // if (created) {
        //   console.log(`Order ${id_order} created successfully.`);
        // } else {
        //   console.log(`Order ${id_order} already exists.`);
        // }
      } catch (error) {
        console.error(`Error inserting order ${id_order}:`, error);
      }
    }
    for (const commentsItem of commentsData) {
      const { id_comment, description, id_producto, id_user } = commentsItem;

      const [createdComment, created] = await Comments.findOrCreate({
        where: { id_comment },
        defaults: {
          description,
          id_user,
          id_producto,
        },
      });
    }

    console.log("♥ Database Created... ♥");
  } catch (error) {
    console.error("Error populating the database:", error);
  }
};

module.exports = DB_connect;
