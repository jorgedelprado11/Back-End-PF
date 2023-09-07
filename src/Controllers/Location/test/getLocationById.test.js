const getLocationById = require("../getLocationById");
const { Location } = require("../../../db");

// ! Función para simular una solicitud con parámetros
const mockRequest = (params = {}) => ({
  params,
});

// ! Función para simular una respuesta HTTP
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// ! Simulación del módulo "db" y su clase "Location"
jest.mock("../../../db", () => ({
  Location: {
    findOne: jest.fn(),
  },
}));

// ! Descripción de las pruebas
describe("Pruebas para el controlador getLocationById", () => {
  // ! Prueba 1: Debería responder con un estado HTTP 200 y la ubicación si se encuentra
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

    // ! Verificar que res.status se haya llamado con el código 200
    expect(res.status).toHaveBeenCalledWith(200);

    // ! Verificar que res.json se haya llamado con la ubicación simulada
    expect(res.json).toHaveBeenCalledWith(ubicacionMock);
  });

  // ! Prueba 2: Debería responder con un estado HTTP 404 si la ubicación no se encuentra
  it("debería responder con un estado HTTP 404 si la ubicación no se encuentra", async () => {
    const req = mockRequest({ id_location: 2 });
    const res = mockResponse();

    Location.findOne.mockResolvedValue(null);

    await getLocationById(req, res);

    // ! Verificar que res.status se haya llamado con el código 404
    expect(res.status).toHaveBeenCalledWith(404);
  });

  // ! Prueba 3: Debería responder con un estado HTTP 400 si falta el parámetro id_location
  it("debería responder con un estado HTTP 400 si falta el parámetro id_location", async () => {
    const req = mockRequest();
    const res = mockResponse();

    await getLocationById(req, res);

    // ! Verificar que res.status se haya llamado con el código 400
    expect(res.status).toHaveBeenCalledWith(400);
  });

  // ! Prueba 4: Debería responder con un estado HTTP 500 y un mensaje de error si se produce un error
  it("debería responder con un estado HTTP 500 y un mensaje de error si se produce un error", async () => {
    const req = mockRequest({ id_location: 1 });
    const res = mockResponse();

    Location.findOne.mockRejectedValue(new Error("Error simulado"));

    await getLocationById(req, res);

    // ! Verificar que res.status se haya llamado con el código 500
    expect(res.status).toHaveBeenCalledWith(500);

    // ! Verificar que res.json se haya llamado con un mensaje de error que coincida con el error simulado
    expect(res.json).toHaveBeenCalledWith({ message: "Error simulado" });
  });
});
