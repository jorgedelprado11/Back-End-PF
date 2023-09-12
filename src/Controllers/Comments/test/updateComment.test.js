const updateComment = require("../updateComment");
const { Comments } = require("../../../db");

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
describe("Pruebas para el controlador updateComment", () => {
  // ! Prueba 1: Debería responder con un estado HTTP 404 si el comentario no se encuentra
  it("debería responder con un estado HTTP 404 si el comentario no se encuentra", async () => {
    const req = mockRequest(
      { id_comment: 2 },
      { description: "Nueva descripción" }
    );
    const res = mockResponse();

    // ! Simulación del espía findByPk para que devuelva null, indicando que el comentario no se encontró
    const findByPkSpy = jest.spyOn(Comments, "findByPk");
    findByPkSpy.mockReturnValue(null);

    // ! Llama a la función updateComment
    await updateComment(req, res);

    // ! Verificar que res.status se haya llamado con el código 404
    expect(res.status).toHaveBeenCalledWith(404);

    // ! Verificar que res.json se haya llamado con un mensaje de error
    expect(res.json).toHaveBeenCalledWith({
      message: "Comment not found",
    });

    // ! Restaurar el espía después de la prueba
    findByPkSpy.mockRestore();
  });

  // ! Prueba 2: Debería responder con un estado HTTP 200 y el comentario actualizado si todo está correcto
  it("debería responder con un estado HTTP 200 y el comentario actualizado si todo está correcto", async () => {
    const req = mockRequest(
      { id_comment: 1 },
      { description: "Nueva descripción" }
    );
    const res = mockResponse();

    const comentarioMock = {
      id_comment: 1,
      description: "Descripción original",
    };

    // ! Simulación del espía findByPk para que devuelva el comentario original
    const findByPkSpy = jest.spyOn(Comments, "findByPk");
    findByPkSpy.mockReturnValue(comentarioMock);

    // ! Simulación del espía save para que funcione correctamente al actualizar
    const saveSpy = jest.spyOn(comentarioMock, "save");
    saveSpy.mockResolvedValue(comentarioMock);

    // ! Llama a la función updateComment
    await updateComment(req, res);

    // ! Verificar que res.status se haya llamado con el código 200
    expect(res.status).toHaveBeenCalledWith(200);

    // ! Verificar que res.json se haya llamado con el comentario actualizado
    expect(res.json).toHaveBeenCalledWith(comentarioMock);

    // ! Restaurar los espías después de la prueba
    findByPkSpy.mockRestore();
    saveSpy.mockRestore();
  });

  // ! Prueba 3: Debería responder con un estado HTTP 500 y un mensaje de error si ocurre un error al actualizar
  it("debería responder con un estado HTTP 500 y un mensaje de error si ocurre un error al actualizar", async () => {
    const req = mockRequest(
      { id_comment: 1 },
      { description: "Nueva descripción" }
    );
    const res = mockResponse();

    const comentarioMock = {
      id_comment: 1,
      description: "Descripción original",
    };

    // ! Simulación del espía findByPk para que devuelva el comentario original
    const findByPkSpy = jest.spyOn(Comments, "findByPk");
    findByPkSpy.mockReturnValue(comentarioMock);

    // ! Simulación del espía save para que lance un error simulado al actualizar
    const saveSpy = jest.spyOn(comentarioMock, "save");
    saveSpy.mockRejectedValue(new Error("Error simulado"));

    // ! Llama a la función updateComment
    await updateComment(req, res);

    // ! Verificar que res.status se haya llamado con el código 500
    expect(res.status).toHaveBeenCalledWith(500);

    // ! Verificar que res.json se haya llamado con un mensaje de error
    expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });

    // ! Restaurar los espías después de la prueba
    findByPkSpy.mockRestore();
    saveSpy.mockRestore();
  });
});
