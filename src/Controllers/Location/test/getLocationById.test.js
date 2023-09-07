const getLocationById = require("../getLocationById");
const { Location } = require("../../../db");

const mockRequest = (params = {}) => ({
  params,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock("../../../db", () => ({
  Location: {
    findOne: jest.fn(),
  },
}));

describe("Pruebas para el controlador getLocationById", () => {
  it("debería responder con un estado HTTP 200 y la ubicación si se encuentra", async () => {
    const req = mockRequest({ id_location: 1 });
    const res = mockResponse();

    const ubicacionMock = {
      id_location: 1,
      provincia: "Provincia1",
      ciudad: "Ciudad 1",
      calle: "Calle 1",
      codigo_postal: "12345",
    };

    Location.findOne.mockResolvedValue(ubicacionMock);

    await getLocationById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(ubicacionMock);
  });

  it("debería responder con un estado HTTP 404 si la ubicación no se encuentra", async () => {
    const req = mockRequest({ id_location: 2 });
    const res = mockResponse();

    Location.findOne.mockResolvedValue(null);

    await getLocationById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("debería responder con un estado HTTP 400 si falta el parámetro id_location", async () => {
    const req = mockRequest();
    const res = mockResponse();

    await getLocationById(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("debería responder con un estado HTTP 500 y un mensaje de error si se produce un error", async () => {
    const req = mockRequest({ id_location: 1 });
    const res = mockResponse();

    Location.findOne.mockRejectedValue(new Error("Error simulado"));

    await getLocationById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Error simulado" });
  });
});
