const getAllLocations = require("../getAllLocations");
const { Location } = require("../../../db");

const mockRequest = () => ({});
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
}));

describe("Pruebas para el controlador getAllLocations", () => {
  it("cuando se llama a getAllLocations debería responder con un estado HTTP 200 (éxito) y una lista de todas las ubicaciones", async () => {
    const req = mockRequest();
    const res = mockResponse();

    // ! DATOS QUE SE DEVERÍAN DEVOLVER
    const ubicacionesMock = [
      {
        id_location: 1,
        provincia: "Provincia1",
        ciudad: "Ciudad 1",
        calle: "Calle 1",
        codigo_postal: "12345",
      },
      {
        id_location: 2,
        provincia: "Provincia2",
        ciudad: "Ciudad 2",
        calle: "Calle 2",
        codigo_postal: "54321",
      },
    ];

    // Configuración del comportamiento de la función findAll de Sequelize
    Location.findAll.mockResolvedValue(ubicacionesMock);

    await getAllLocations(req, res);

    // Verificar que se haya llamado res.status con el código 200
    expect(res.status).toHaveBeenCalledWith(200);

    // *  Verificar que se haya llamado res.json con las ubicaciones simuladas
    expect(res.json).toHaveBeenCalledWith(ubicacionesMock);
  });

  it("debería responder con un estado HTTP 500 y un mensaje de error si no se encuentran ubicaciones", async () => {
    const req = mockRequest();
    const res = mockResponse();

    Location.findAll.mockResolvedValue([]);

    await getAllLocations(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Locations Not Found" });
  });

  it("debería responder con un estado HTTP 500 y un mensaje de error si se produce un error", async () => {
    const req = mockRequest();
    const res = mockResponse();

    Location.findAll.mockRejectedValue(new Error("Error simulado"));

    await getAllLocations(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Error simulado" });
  });
});
/*
! Este archivo de prueba cubre tres escenarios

* Cuando se encuentran ubicaciones, verifica que el controlador responda con un estado HTTP 200 y las ubicaciones simuladas
* Cuando no se encuentran ubicaciones, verifica que el controlador responda con un estado HTTP 500 y un mensaje de error
* Cuando se produce un error en la búsqueda de ubicaciones, verifica que el controlador responda con un estado HTTP 500 y un mensaje de error

*/
