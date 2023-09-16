const { Router } = require("express");
const locationRouter = Router();
const getAllLocations = require("../../Controllers/Location/getAllLocations");
const getLocationById = require("../../Controllers/Location/getLocationById");
const getLocationByProvincia = require("../../Controllers/Location/getLocationByProvincia");
const getLocationOfOneUser = require("../../Controllers/Location/getLocationOfOneUser");
const updateLocation = require("../../Controllers/Location/updateLocation");
const asignLocation = require("../../Handlers/Location/asignLocation");
const verifyToken = require("../../Assessments/verifyToken");

locationRouter.get("/", (req, res) => {
  const { provincia } = req.query;
  !provincia ? getAllLocations(req, res) : getLocationByProvincia(req, res);
});
locationRouter.get("/:id_location", getLocationById);
locationRouter.get("/:id/user", getLocationOfOneUser);
locationRouter.put("/:id_location", updateLocation);
locationRouter.post("/createLocation", verifyToken, asignLocation);

module.exports = locationRouter;
