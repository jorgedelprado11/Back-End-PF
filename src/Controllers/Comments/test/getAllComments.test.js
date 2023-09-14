const getAllComments = require("../getAllComments");
const { Comments } = require("../../../db");

// ! Función para simular una solicitud sin parámetros
const mockRequest = () => ({});

// ! Función para simular una respuesta HTTP
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// ! Simulación del módulo "db" y su clase "Comments"
jest.mock("../../../db", () => ({
  Comments: {
    findAll: jest.fn(),
  },
}));

// ! Descripción de las pruebas
describe("Pruebas para el controlador getAllComments", () => {
  // ! Prueba 1: Debería responder con un estado HTTP 200 y la lista de comentarios si se encuentran comentarios
  it("debería responder con un estado HTTP 200 y la lista de comentarios si se encuentran comentarios", async () => {
    const req = mockRequest();
    const res = mockResponse();

    // ! Define un conjunto de datos simulados llamado comentariosMock que representa una lista de comentarios
    const comentariosMock = [
      {
        id_comment: 1,
        contenido: "Comentario 1",
        usuario: "Usuario1",
      },
      {
        id_comment: 2,
        contenido: "Comentario 2",
        usuario: "Usuario2",
      },
    ];

    // ! Configuración del comportamiento simulado de la función findAll de Sequelize
    Comments.findAll.mockResolvedValue(comentariosMock);

    // ! Crea una solicitud ficticia a getAllComments
    await getAllComments(req, res);

    // ! Verifica que se haya llamado res.status con el código 200
    expect(res.status).toHaveBeenCalledWith(200);

    // ! Verifica que se haya llamado res.json con la lista de comentarios simulados
    expect(res.json).toHaveBeenCalledWith(comentariosMock);
  });

  // ! Prueba 2: Debería responder con un estado HTTP 404 y un mensaje de error si no se encuentran comentarios
  it("debería responder con un estado HTTP 404 y un mensaje de error si no se encuentran comentarios", async () => {
    const req = mockRequest();
    const res = mockResponse();

    // ! Configura el comportamiento simulado de Comments.findAll para que devuelva una lista vacía
    Comments.findAll.mockResolvedValue([]);

    // ! Crea una solicitud ficticia a getAllComments
    await getAllComments(req, res);

    // ! Verifica que res.status se haya llamado con el código 404
    expect(res.status).toHaveBeenCalledWith(404);

    // ! Verifica que res.json se haya llamado con un mensaje de error
    expect(res.json).toHaveBeenCalledWith({ message: "Comments Not Found" });
  });

  // ! Prueba 3: Debería responder con un estado HTTP 500 y un mensaje de error si se produce un error
  it("debería responder con un estado HTTP 500 y un mensaje de error si se produce un error", async () => {
    const req = mockRequest();
    const res = mockResponse();

    // ! Configura el comportamiento simulado de Comments.findAll para que lance un error simulado
    Comments.findAll.mockRejectedValue(new Error("Error simulado"));

    // ! Crea una solicitud ficticia a getAllComments
    await getAllComments(req, res);

    // ! Verifica que res.status se haya llamado con el código 500
    expect(res.status).toHaveBeenCalledWith(500);

    // ! Verifica que res.json se haya llamado con un mensaje de error que coincida con el error simulado
    expect(res.json).toHaveBeenCalledWith({ message: "Error simulado" });
  });
});
