const getCommentById = require("../getCommentById");
const { Comments } = require("../../../db");

// ! Función para simular una solicitud con parámetros
const mockRequest = (params = {}) => ({
  params,
});

// !Función para simular una respuesta HTTP
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// ! Simulación del módulo "db" y su clase "Comments"
jest.mock("../../../db", () => ({
  Comments: {
    findOne: jest.fn(),
  },
}));

// ! Descripción de las pruebas
describe("Pruebas para el controlador getCommentById", () => {
  // ! Prueba 1: Debería responder con un estado HTTP 200 y el comentario si se encuentra
  it("debería responder con un estado HTTP 200 y el comentario si se encuentra", async () => {
    const req = mockRequest({ id_comment: 1 });
    const res = mockResponse();

    const comentarioMock = {
      id_comment: 1,
      contenido: "Este es un comentario de ejemplo",
      usuario: "usuario1",
    };

    Comments.findOne.mockResolvedValue(comentarioMock);

    await getCommentById(req, res);

    // ! Verificar que res.status se haya llamado con el código 200
    expect(res.status).toHaveBeenCalledWith(200);

    // ! Verificar que res.json se haya llamado con el comentario simulado
    expect(res.json).toHaveBeenCalledWith(comentarioMock);
  });

  // ! Prueba 2: Debería responder con un estado HTTP 404 si el comentario no se encuentra
  it("debería responder con un estado HTTP 404 si el comentario no se encuentra", async () => {
    const req = mockRequest({ id_comment: 2 });
    const res = mockResponse();

    Comments.findOne.mockResolvedValue(null);

    await getCommentById(req, res);

    // ! Verificar que res.status se haya llamado con el código 404
    expect(res.status).toHaveBeenCalledWith(404);
  });

  // ! Prueba 3: Debería responder con un estado HTTP 400 si falta el parámetro id_comment
  it("debería responder con un estado HTTP 400 si falta el parámetro id_comment", async () => {
    const req = mockRequest();
    const res = mockResponse();

    await getCommentById(req, res);

    // ! Verificar que res.status se haya llamado con el código 400
    expect(res.status).toHaveBeenCalledWith(400);
  });

  // ! Prueba 4: Debería responder con un estado HTTP 500 y un mensaje de error si se produce un error
  it("debería responder con un estado HTTP 500 y un mensaje de error si se produce un error", async () => {
    const req = mockRequest({ id_comment: 1 });
    const res = mockResponse();

    Comments.findOne.mockRejectedValue(new Error("Error simulado"));

    await getCommentById(req, res);

    // ! Verificar que res.status se haya llamado con el código 500
    expect(res.status).toHaveBeenCalledWith(500);

    // ! Verificar que res.json se haya llamado con un mensaje de error que coincida con el error simulado
    expect(res.json).toHaveBeenCalledWith({ message: "Error simulado" });
  });
});
