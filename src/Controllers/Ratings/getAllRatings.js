const { Rating } = require("../../db");

const getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll();

    // console.log(ratings);

    if (!ratings) throw Error("Ratings Not Found");

    return res.status(200).json(ratings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getAllRatings;
