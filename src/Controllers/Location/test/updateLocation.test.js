const updateLocation = require("../updateLocation");
const { Location } = require("../../../db");

const mockRequest = (params = {}, body = {}) => ({
  params,
  body,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Pruebas para el controlador updateLocation", () => {
  it("debería responder con un estado HTTP 404 si la ubicación no se encuentra", async () => {
    const req = mockRequest({ id_location: 2 }, {});
    const res = mockResponse();

    const findByPkSpy = jest.spyOn(Location, "findByPk");
    findByPkSpy.mockReturnValue(null);

    await updateLocation(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Location no encontrada",
    });

    findByPkSpy.mockRestore();
  });


  // ! COMPLETAR
  // it("debería actualizar la ubicación y responder con un estado HTTP 200", async () => {
  //   const req = mockRequest(
  //     { id_location: 1 },
  //     {
  //       provincia: "Nueva Provincia",
  //       ciudad: "Nueva Ciudad",
  //       calle: "Nueva Calle",
  //       codigo_postal: "54321",
  //     }
  //   );
  //   const res = mockResponse();

  //   const ubicacionMock = {
  //     id_location: 1,
  //     provincia: "Provincia Original",
  //     ciudad: "Ciudad Original",
  //     calle: "Calle Original",
  //     codigo_postal: "12345",
  //   };

  //   const findByPkSpy = jest.spyOn(Location, "findByPk");
  //   findByPkSpy.mockReturnValue(ubicacionMock);

  //   const saveSpy = jest.spyOn(ubicacionMock, "save");
  //   saveSpy.mockResolvedValue(ubicacionMock); // Simula una actualización exitosa

  //   // Llama a la función updateLocation
  //   await updateLocation(req, res);

  //   // Ahora, realiza las expectativas después de que updateLocation haya completado
  //   expect(res.status).toHaveBeenCalledWith(200);
  //   expect(res.json).toHaveBeenCalledWith({
  //     message: "Ubicación actualizada correctamente",
  //     location: {
  //       id_location: 1,
  //       provincia: "Nueva Provincia",
  //       ciudad: "Nueva Ciudad",
  //       calle: "Nueva Calle",
  //       codigo_postal: "54321",
  //     },
  //   });

  //   // Restaurar los espías después de la prueba
  //   findByPkSpy.mockRestore();
  //   saveSpy.mockRestore();
  // });

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

    const findByPkSpy = jest.spyOn(Location, "findByPk");
    findByPkSpy.mockReturnValue(ubicacionMock);

    const saveSpy = jest.spyOn(Location.prototype, "save");
    saveSpy.mockRejectedValue(new Error("Error simulado"));

    await updateLocation(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith("Error simulado");

    findByPkSpy.mockRestore();
    saveSpy.mockRestore();
  });
});
