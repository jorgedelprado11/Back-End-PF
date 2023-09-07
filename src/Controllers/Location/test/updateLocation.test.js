const updateLocation = require("../updateLocation");
const { Location } = require("../../../db");

// ! Función para simular una solicitud con parámetros y cuerpo (params y body)
const mockRequest = (params = {}, body = {}) => ({
  params,
  body,
});

// ! Función para simular una respuesta HTTP
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// ! Descripción de las pruebas
describe("Pruebas para el controlador updateLocation", () => {
  // ! Prueba 1: Debería responder con un estado HTTP 404 si la ubicación no se encuentra
  it("debería responder con un estado HTTP 404 si la ubicación no se encuentra", async () => {
    const req = mockRequest({ id_location: 2 }, {});
    const res = mockResponse();

    // ! Simulación del espía findByPk para que devuelva null, indicando que la ubicación no se encontró
    const findByPkSpy = jest.spyOn(Location, "findByPk");
    findByPkSpy.mockReturnValue(null);

    // ! Llama a la función updateLocation
    await updateLocation(req, res);

    // ! Verificar que res.status se haya llamado con el código 404
    expect(res.status).toHaveBeenCalledWith(404);

    // ! Verificar que res.json se haya llamado con un mensaje de error
    expect(res.json).toHaveBeenCalledWith({
      message: "Location no encontrada",
    });

    // ! Restaurar el espía después de la prueba
    findByPkSpy.mockRestore();
  });

  // ! Prueba 2: Debería responder con un estado HTTP 400 si ocurre un error al actualizar
  it("debería responder con un estado HTTP 400 si ocurre un error al actualizar", async () => {
    const req = mockRequest(
      { id_location: 1 },
      {
        provincia: "Nueva Provincia",
        ciudad: "Nueva Ciudad",
        calle: "Nueva Calle",
        codigo_postal: "54321",
      }
    );
    const res = mockResponse();

    const ubicacionMock = {
      id_location: 1,
      provincia: "Provincia Original",
      ciudad: "Ciudad Original",
      calle: "Calle Original",
      codigo_postal: "12345",
    };

    // ! Simulación del espía findByPk para que devuelva la ubicación original
    const findByPkSpy = jest.spyOn(Location, "findByPk");
    findByPkSpy.mockReturnValue(ubicacionMock);

    // ! Simulación del espía save para que lance un error simulado al actualizar
    const saveSpy = jest.spyOn(Location.prototype, "save");
    saveSpy.mockRejectedValue(new Error("Error simulado"));

    // ! Llama a la función updateLocation
    await updateLocation(req, res);

    // ! Verificar que res.status se haya llamado con el código 400
    expect(res.status).toHaveBeenCalledWith(400);

    // ! Verificar que res.json se haya llamado con el mensaje de error simulado
    expect(res.json).toHaveBeenCalledWith("Error simulado");

    // ! Restaurar los espías después de la prueba
    findByPkSpy.mockRestore();
    saveSpy.mockRestore();
  });
});
