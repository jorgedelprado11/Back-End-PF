// ! El código comienza importando algunas funciones y objetos necesarios: getAllLocations se importa desde un archivo llamado "getAllLocations.js", y Location se importa desde un módulo llamado "db"

const getAllLocations = require("../getAllLocations");
const { Location } = require("../../../db");

// ! Estas funciones se utilizan para simular solicitudes y respuestas HTTP que se recibirían al llamar a la función getAllLocations

const mockRequest = () => ({});
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// ! Se utiliza jest.mock para "simular" (mockear) el comportamiento de algunos módulos. En particular, Se está simulando el comportamiento de la clase Location del módulo "db" para que tenga una función llamada findAll que sea controlable durante las pruebas

jest.mock("../../../db", () => ({
  Location: {
    findAll: jest.fn(),
  },
}));

// ! PRUEBAS
// ! A continuación, se describe una serie de pruebas que se ejecutarán para verificar el funcionamiento de getAllLocations

describe("Pruebas para el controlador getAllLocations", () => {
  // ! PRUEBAS UNITARIAS

  // ! Verifica que, cuando se llama a getAllLocations, debe responder con un estado HTTP 200 (éxito) y una lista de todas las ubicaciones

  it("cuando se llama a getAllLocations debería responder con un estado HTTP 200 (éxito) y una lista de todas las ubicaciones", async () => {
    const req = mockRequest();
    const res = mockResponse();

    // ! Se define un conjunto de datos simulados llamado ubicacionesMock que representa una lista de ubicaciones
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

    // ! Configuración del comportamiento de la función findAll de Sequelize
    Location.findAll.mockResolvedValue(ubicacionesMock);

    // ! Se crea una solicitud ficticia a getAllLocations
    await getAllLocations(req, res);

    // ! Verificar que se haya llamado res.status con el código 200
    expect(res.status).toHaveBeenCalledWith(200);

    // ! Verificar que se haya llamado res.json con las ubicaciones simuladas
    expect(res.json).toHaveBeenCalledWith(ubicacionesMock);
  });

  // ! Verifica que, si no se encuentran ubicaciones (Location.findAll devuelve una lista vacía), la función debe responder con un estado HTTP 500 (error) y un mensaje de error

  it("debería responder con un estado HTTP 404 y un mensaje de error si no se encuentran ubicaciones", async () => {
    const req = mockRequest();
    const res = mockResponse();

    // ! Se configura el comportamiento simulado de Location.findAll para que devuelva una lista vacía
    Location.findAll.mockResolvedValue([]);

    // ! Se crea una solicitud ficticia a getAllLocations
    await getAllLocations(req, res);

    // ! Se verifica que res.status se llamó con el código 500 y que res.json se llamó con un mensaje de error
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Locations Not Found" });
  });

  // ! Verifica que, si ocurre un error al buscar ubicaciones, la función debe responder con un estado HTTP 500 y un mensaje de error que coincida con el error simulado
  it("debería responder con un estado HTTP 500 y un mensaje de error si se produce un error", async () => {
    const req = mockRequest();
    const res = mockResponse();

    // ! Se configura el comportamiento simulado de Location.findAll para que lance un error simulado
    Location.findAll.mockRejectedValue(new Error("Error simulado"));

    // ! Se crea una solicitud ficticia a getAllLocations
    await getAllLocations(req, res);

    // ! Verifica que res.status se llamó con el código 500 y que res.json se llamó con un mensaje de error que coincide con el error simulado
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Error simulado" });
  });
});
/*
! Este archivo de prueba cubre tres escenarios

* Cuando se encuentran ubicaciones, verifica que el controlador responda con un estado HTTP 200 y las ubicaciones simuladas
* Cuando se produce un error en la búsqueda de ubicaciones, verifica que el controlador responda con un estado HTTP 404 y un mensaje de error: "Locations Not Found"
* Cuando no se encuentran ubicaciones, verifica que el controlador responda con un estado HTTP 500 y un mensaje de error: "Error simulado"
*/
