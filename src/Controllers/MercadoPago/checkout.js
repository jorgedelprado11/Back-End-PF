const mercadopago = require("mercadopago");
require("dotenv").config();
const { PROD_ACCESS_TOKEN } = process.env;

mercadopago.configure({
  sandbox: true,
  access_token: PROD_ACCESS_TOKEN,
});

const checkoutController = async (products) => {
  const preference = {
    items: products.map((product) => {
      return {
        title: product.name,
        unit_price: product.price,
        quantity: product.quantity,
        description: product.description,
      };
    }),
    back_urls: {
      success:
        "https://gifdb.com/images/high/nice-meme-thumbs-up-approve-bcb1a1c8hqxfycq6.gif",
      failure:
        "https://gifdb.com/images/high/gladiator-thumbs-down-joaquin-phoenix-not-approved-m2beej2tfn1c39md.gif",
      pending: "",
    },
    auto_return: "approved",
    binary_mode: true,
    // payment_methods: {
    //   excluded_payment_type: [
    //     {
    //       id: "ticket",
    //     },
    //   ],
    // },
  };
  const response = await mercadopago.preferences.create(preference);
  return response.body.init_point;
};
module.exports = checkoutController;
