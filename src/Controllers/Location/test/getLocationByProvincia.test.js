const getLocationByProvincia = require("../getLocationByProvincia");
const { Location, Sequelize } = require("../../../db");

const mockRequest = (query = {}) => ({
  query,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock("../../../db", () => ({
  Location: {
    findAll: jest.fn(),
  },
  Sequelize: {
    Op: {},
  },
}));

describe("Pruebas para el controlador getLocationByProvincia", () => {
  it("debería responder con un estado HTTP 200 y la ubicación si se encuentra exactamente", async () => {
    const req = mockRequest({ provincia: "Provincia1" });
    const res = mockResponse();

    const ubicacionesMock = [
      {
        id_location: 1,
        provincia: "Provincia1",
        ciudad: "Ciudad 1",
        calle: "Calle 1",
        codigo_postal: "12345",
      },
    ];

    Location.findAll.mockResolvedValue(ubicacionesMock);

    await getLocationByProvincia(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(ubicacionesMock);
  });

  it("debería responder con un estado HTTP 200 y la ubicación si se encuentra de forma insensible a mayúsculas/minúsculas", async () => {
    const req = mockRequest({ provincia: "provincia1" });
    const res = mockResponse();

    const ubicacionesMock = [
      {
        id_location: 1,
        provincia: "Provincia1",
        ciudad: "Ciudad 1",
        calle: "Calle 1",
        codigo_postal: "12345",
      },
    ];

    Location.findAll.mockResolvedValue(ubicacionesMock);

    await getLocationByProvincia(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(ubicacionesMock);
  });

  it("debería responder con un estado HTTP 200 y una lista vacía si no se encuentran ubicaciones", async () => {
    const req = mockRequest({ provincia: "ProvinciaX" });
    const res = mockResponse();

    Location.findAll.mockResolvedValue([]);

    await getLocationByProvincia(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it("debería responder con un estado HTTP 400 y un mensaje de error si ocurre un error", async () => {
    const req = mockRequest({ provincia: "Provincia1" });
    const res = mockResponse();

    Location.findAll.mockRejectedValue(new Error("Error simulado"));

    await getLocationByProvincia(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error occurred while searching for Location",
    });
  });
});
