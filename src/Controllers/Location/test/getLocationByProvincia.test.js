const getLocationByProvincia = require("../getLocationByProvincia");
const { Location, Sequelize } = require("../../../db");

// ! Función para simular una solicitud con parámetros de consulta (query)
const mockRequest = (query = {}) => ({
  query,
});

// ! Función para simular una respuesta HTTP
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// ! Simulación del módulo "db" y sus modelos "Location" y "Sequelize"
jest.mock("../../../db", () => ({
  Location: {
    findAll: jest.fn(),
  },
  Sequelize: {
    Op: {},
  },
}));

// ! Descripción de las pruebas
describe("Pruebas para el controlador getLocationByProvincia", () => {
  // ! Prueba 1: Debería responder con un estado HTTP 200 y la ubicación si se encuentra exactamente
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

    // ! Simulación de la respuesta de Location.findAll
    Location.findAll.mockResolvedValue(ubicacionesMock);

    // ! Llama a la función getLocationByProvincia
    await getLocationByProvincia(req, res);

    // ! Verificar que res.status se haya llamado con el código 200
    expect(res.status).toHaveBeenCalledWith(200);

    // ! Verificar que res.json se haya llamado con las ubicaciones simuladas
    expect(res.json).toHaveBeenCalledWith(ubicacionesMock);
  });

  // ! Prueba 2: Debería responder con un estado HTTP 200 y la ubicación si se encuentra de forma insensible a mayúsculas/minúsculas
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

    // ! Simulación de la respuesta de Location.findAll
    Location.findAll.mockResolvedValue(ubicacionesMock);

    // ! Llama a la función getLocationByProvincia
    await getLocationByProvincia(req, res);

    // ! Verificar que res.status se haya llamado con el código 200
    expect(res.status).toHaveBeenCalledWith(200);

    // ! Verificar que res.json se haya llamado con las ubicaciones simuladas
    expect(res.json).toHaveBeenCalledWith(ubicacionesMock);
  });

  // ! Prueba 3: Debería responder con un estado HTTP 200 y una lista vacía si no se encuentran ubicaciones
  it("debería responder con un estado HTTP 200 y una lista vacía si no se encuentran ubicaciones", async () => {
    const req = mockRequest({ provincia: "ProvinciaX" });
    const res = mockResponse();

    // ! Simulación de la respuesta de Location.findAll para que devuelva una lista vacía
    Location.findAll.mockResolvedValue([]);

    // ! Llama a la función getLocationByProvincia
    await getLocationByProvincia(req, res);

    // ! Verificar que res.status se haya llamado con el código 200
    expect(res.status).toHaveBeenCalledWith(200);

    // ! Verificar que res.json se haya llamado con una lista vacía
    expect(res.json).toHaveBeenCalledWith([]);
  });

  // ! Prueba 4: Debería responder con un estado HTTP 400 y un mensaje de error si ocurre un error
  it("debería responder con un estado HTTP 400 y un mensaje de error si ocurre un error", async () => {
    const req = mockRequest({ provincia: "Provincia1" });
    const res = mockResponse();

    // ! Simulación de un error al buscar ubicaciones
    Location.findAll.mockRejectedValue(new Error("Error simulado"));

    // ! Llama a la función getLocationByProvincia
    await getLocationByProvincia(req, res);

    // ! Verificar que res.status se haya llamado con el código 400
    expect(res.status).toHaveBeenCalledWith(400);

    // ! Verificar que res.json se haya llamado con el mensaje de error correspondiente
    expect(res.json).toHaveBeenCalledWith({
      message: "Error occurred while searching for Location",
    });
  });
});
