const updateComment = require("../updateComment");
const { Comments } = require("../../../db");

// Función para simular una solicitud con parámetros y cuerpo (params y body)
const mockRequest = (params = {}, body = {}) => ({
  params,
  body,
});

// Función para simular una respuesta HTTP
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Descripción de las pruebas
describe("Pruebas para el controlador updateComment", () => {
  // Prueba 1: Debería responder con un estado HTTP 404 si no se encuentra el comentario
  it("debería responder con un estado HTTP 404 si no se encuentra el comentario", async () => {
    const req = mockRequest(
      { id_comment: 1 },
      { description: "Nueva descripción" }
    );
    const res = mockResponse();

    // Simulación de Comments.findByPk para que no encuentre el comentario
    jest.spyOn(Comments, "findByPk").mockResolvedValue(null);

    // Llama a la función updateComment
    await updateComment(req, res);

    // Verifica que res.status se haya llamado con el código 404
    expect(res.status).toHaveBeenCalledWith(404);

    // Verifica que res.json se haya llamado con el mensaje de error
    expect(res.json).toHaveBeenCalledWith({ message: "Comment not found" });
  });

  // Prueba 2: Debería responder con un estado HTTP 200 y el comentario actualizado si todo está correcto
  // it("debería responder con un estado HTTP 200 y el comentario actualizado si todo está correcto", async () => {
  //   const req = mockRequest(
  //     { id_comment: 1 },
  //     { description: "Nueva descripción" }
  //   );
  //   const res = mockResponse();

  //   const comentarioMock = {
  //     id_comment: 1,
  //     description: "Descripción original",
  //     save: jest.fn().mockResolvedValue({
  //       id_comment: 1,
  //       description: "Nueva descripción",
  //     }),
  //   };

  //   // Simulación de Comments.findByPk para que encuentre el comentario
  //   jest.spyOn(Comments, "findByPk").mockResolvedValue(comentarioMock);

  //   // Llama a la función updateComment
  //   await updateComment(req, res);

  //   // Verifica que res.status se haya llamado con el código 200
  //   expect(res.status).toHaveBeenCalledWith(200);

  //   // Verifica que res.json se haya llamado con el comentario actualizado
  //   expect(res.json).toHaveBeenCalledWith({
  //     id_comment: 1,
  //     description: "Nueva descripción",
  //   });

  //   // Verifica que la función "save" se haya llamado en el modelo de comentario
  //   expect(comentarioMock.save).toHaveBeenCalled();
  // });

  // // Prueba 3: Debería responder con un estado HTTP 500 y un mensaje de error si ocurre un error al actualizar
  // it("debería responder con un estado HTTP 500 y un mensaje de error si ocurre un error al actualizar", async () => {
  //   const req = mockRequest(
  //     { id_comment: 1 },
  //     { description: "Nueva descripción" }
  //   );
  //   const res = mockResponse();

  //   // Simulación de Comments.findByPk para que encuentre el comentario
  //   jest.spyOn(Comments, "findByPk").mockImplementation(() => {
  //     throw new Error("Error simulado");
  //   });

  //   // Llama a la función updateComment
  //   await updateComment(req, res);

  //   // Verifica que res.status se haya llamado con el código 500
  //   expect(res.status).toHaveBeenCalledWith(500);

  //   // Verifica que res.json se haya llamado con un mensaje de error
  //   expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
  // });

  // Restaurar los espías después de cada prueba
  afterEach(() => {
    jest.restoreAllMocks();
  });
});
