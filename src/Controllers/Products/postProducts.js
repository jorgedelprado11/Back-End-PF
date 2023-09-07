const { Products, Images, Specification, SpecificationValue } = require("../../db");

const postProducts = async (req, res) => {
  try {
    const {
      nombre,
      calificacion,
      precio,
      descuento,
      stock,
      id_categoria,
      imagen,
      SpecificationValues
    } = req.body;

    if (
      !nombre ||
      !calificacion ||
      !precio ||
      !descuento ||
      !stock ||
      !id_categoria ||
      !imagen
    )
      return res.status(400).send("Falta informacion");
    const newProduct = await Products.create({
      nombre,
      calificacion,
      precio,
      descuento,
      stock,
      garantia: 12,
      iva: 10.5,
      id_categoria,
    });

    if (SpecificationValues && Array.isArray(SpecificationValues)) {
      for (const spec of SpecificationValues) {
        const specification = await Specification.findOne({
          where: {
            name: spec.Specification.name
          }
        })
        if (specification) {
          const specificationValue = await SpecificationValue.findOne({
            where: {
              value: spec.value,
              id: specification.id_specification
            }
          })
        if (specificationValue) {
          await newProduct.addSpecificationValue(specificationValue)
        }
        }
      }
    }

    await Images.findOrCreate({
      where: {
        url: imagen,
        id_product: newProduct.id_producto,
      },
    });

    return res.status(201).json({ message: "Producto creado exitosamente" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = postProducts;









// {
//   "nombre": "Nuevo Monitor",
//   "calificacion": 4,
//   "precio": 148100,
//   "descuento": 10,
//   "stock": 5,
//   "id_categoria": 1,
//   "imagen": "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_37106_Monitor_Gamer_Samsung_24__G50_Curvo_144Hz_Full_HD_VA_FreeSync_f473d83a-grn.jpg",
//   "SpecificationValues": [
//     {
//       "value": "true",
//       "Specification": {
//         "name": "curvo"
//       }
//     },
//     {
//       "value": "32",
//       "Specification": {
//         "name": "consumo"
//       }
//     },
//     {
//       "value": "24",
//       "Specification": {
//         "name": "pulgadas"
//       }
//     },
//     {
//       "value": "HDMI",
//       "Specification": {
//         "name": "cables_incluidos"
//       }
//     },
//     {
//       "value": "false",
//       "Specification": {
//         "name": "control_remoto"
//       }
//     },
//     {
//       "value": "2",
//       "Specification": {
//         "name": "entrada_hdmi"
//       }
//     }
//   ]
// }






















// const { Products, Images } = require("../../db");

// const postProducts = async (req, res) => {
//   try {
//     const {
//       nombre,
//       calificacion,
//       precio,
//       descuento,
//       stock,
//       id_categoria,
//       imagen,
//     } = req.body;

//     if (
//       !nombre ||
//       !calificacion ||
//       !precio ||
//       !descuento ||
//       !stock ||
//       !id_categoria ||
//       !imagen
//     )
//       return res.status(400).send("Falta informacion");
//     const newProduct = await Products.create({
//       nombre,
//       calificacion,
//       precio,
//       descuento,
//       stock,
//       garantia: 12,
//       iva: 10.5,
//       id_categoria,
//     });

//     await Images.findOrCreate({
//       where: {
//         url: imagen,
//         id_product: newProduct.id_producto,
//       },
//     });

//     return res.status(201).json({ message: "Producto creado exitosamente" });
//   } catch (error) {
//     return res.status(500).json({ message: error });
//   }
// };

// module.exports = postProducts;
