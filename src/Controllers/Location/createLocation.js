const { Location } = require("../../db.js");
const createLocation = async ({ provincia, ciudad, calle, codigo_postal }) => {
  const [location, created] = await Location.findOrCreate({
    where: { calle, codigo_postal },
    defaults: { provincia, ciudad },
  });
  return location;
};
module.exports = createLocation;
