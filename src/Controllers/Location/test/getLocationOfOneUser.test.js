const getLocationOfOneUser = require("../getLocationOfOneUser");
const { Users, Location } = require("../../../db");

// Mock de Express para simular solicitudes y respuestas
const mockRequest = (params = {}) => ({
  params,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Mock de Sequelize para simular el modelo Users y Location
jest.mock("../../../db", () => ({
  Users: {
    findByPk: jest.fn(),
  },
  Location: {
    findOne: jest.fn(),
  },
}));

describe("Pruebas para el controlador getLocationOfOneUser", () => {
  it("debería responder con un estado HTTP 200 y la ubicación si el usuario y la ubicación se encuentran", async () => {
    const req = mockRequest({ id: 1 });
    const res = mockResponse();

    const usuarioMock = {
      id: 1,
      // ! completar otros campos del usuario
    };

    const ubicacionMock = {
      id_location: 1,
      provincia: "Provincia1",
      ciudad: "Ciudad 1",
      calle: "Calle 1",
      codigo_postal: "12345",
    };

    Users.findByPk.mockResolvedValue(usuarioMock);
    Location.findOne.mockResolvedValue(ubicacionMock);

    await getLocationOfOneUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(ubicacionMock);
  });

  it("debería responder con un estado HTTP 500 y un mensaje de error si el usuario no se encuentra", async () => {
    const req = mockRequest({ id: 2 });
    const res = mockResponse();

    Users.findByPk.mockResolvedValue(null);

    await getLocationOfOneUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "User Not Found" });
  });

  it("debería responder con un estado HTTP 500 y un mensaje de error si la ubicación no se encuentra para el usuario", async () => {
    const req = mockRequest({ id: 1 });
    const res = mockResponse();

    const usuarioMock = {
      id: 1,
      // ! COMPLETAR CAMPOS
    };

    Users.findByPk.mockResolvedValue(usuarioMock);
    Location.findOne.mockResolvedValue(null);

    await getLocationOfOneUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Location Not Found for this User",
    });
  });

  it("debería responder con un estado HTTP 500 y un mensaje de error si se produce un error", async () => {
    const req = mockRequest({ id: 1 });
    const res = mockResponse();

    Users.findByPk.mockRejectedValue(new Error("Error simulado"));

    await getLocationOfOneUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Error simulado" });
  });
});
