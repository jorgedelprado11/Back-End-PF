const getLocationOfOneUser = require("../getLocationOfOneUser");
const { Users, Location } = require("../../../db");

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

// ! Simulación del módulo "db" y sus modelos "Users" y "Location"
jest.mock("../../../db", () => ({
  Users: {
    findByPk: jest.fn(),
  },
  Location: {
    findOne: jest.fn(),
  },
}));

// ! Descripción de las pruebas
describe("Pruebas para el controlador getLocationOfOneUser", () => {
  // ! Prueba 1: Debería responder con un estado HTTP 200 y la ubicación si el usuario y la ubicación se encuentran
  it("debería responder con un estado HTTP 200 y la ubicación si el usuario y la ubicación se encuentran", async () => {
    const req = mockRequest({ id: 1 });
    const res = mockResponse();

    const usuarioMock = {
      id: 1,
      // ! Completar otros campos del usuario
    };

    const ubicacionMock = {
      id_location: 1,
      provincia: "Provincia1",
      ciudad: "Ciudad 1",
      calle: "Calle 1",
      codigo_postal: "12345",
    };

    // ! Simulación de la respuesta de findByPk y findOne
    Users.findByPk.mockResolvedValue(usuarioMock);
    Location.findOne.mockResolvedValue(ubicacionMock);

    // ! Llama a la función getLocationOfOneUser
    await getLocationOfOneUser(req, res);

    // ! Verificar que res.status se haya llamado con el código 200
    expect(res.status).toHaveBeenCalledWith(200);

    // ! Verificar que res.json se haya llamado con la ubicación simulada
    expect(res.json).toHaveBeenCalledWith(ubicacionMock);
  });

  // ! Prueba 2: Debería responder con un estado HTTP 500 y un mensaje de error si el usuario no se encuentra
  it("debería responder con un estado HTTP 500 y un mensaje de error si el usuario no se encuentra", async () => {
    const req = mockRequest({ id: 2 });
    const res = mockResponse();

    // ! Simulación de la respuesta de findByPk para que devuelva null, indicando que el usuario no se encontró
    Users.findByPk.mockResolvedValue(null);

    // ! Llama a la función getLocationOfOneUser
    await getLocationOfOneUser(req, res);

    // ! Verificar que res.status se haya llamado con el código 500
    expect(res.status).toHaveBeenCalledWith(500);

    // ! Verificar que res.json se haya llamado con el mensaje de error correspondiente
    expect(res.json).toHaveBeenCalledWith({ message: "User Not Found" });
  });

  // ! Prueba 3: Debería responder con un estado HTTP 500 y un mensaje de error si la ubicación no se encuentra para el usuario
  it("debería responder con un estado HTTP 500 y un mensaje de error si la ubicación no se encuentra para el usuario", async () => {
    const req = mockRequest({ id: 1 });
    const res = mockResponse();

    const usuarioMock = {
      id: 1,
      // ! COMPLETAR CAMPOS DEL USUARIO
    };

    // ! Simulación de la respuesta de findByPk para que devuelva el usuario
    Users.findByPk.mockResolvedValue(usuarioMock);

    // ! Simulación de la respuesta de findOne para que devuelva null, indicando que la ubicación no se encontró
    Location.findOne.mockResolvedValue(null);

    // ! Llama a la función getLocationOfOneUser
    await getLocationOfOneUser(req, res);

    // ! Verificar que res.status se haya llamado con el código 500
    expect(res.status).toHaveBeenCalledWith(500);

    // ! Verificar que res.json se haya llamado con el mensaje de error correspondiente
    expect(res.json).toHaveBeenCalledWith({
      message: "Location Not Found for this User",
    });
  });

  // ! Prueba 4: Debería responder con un estado HTTP 500 y un mensaje de error si se produce un error
  it("debería responder con un estado HTTP 500 y un mensaje de error si se produce un error", async () => {
    const req = mockRequest({ id: 1 });
    const res = mockResponse();

    // ! Simulación de un error al buscar el usuario
    Users.findByPk.mockRejectedValue(new Error("Error simulado"));

    // ! Llama a la función getLocationOfOneUser
    await getLocationOfOneUser(req, res);

    // ! Verificar que res.status se haya llamado con el código 500
    expect(res.status).toHaveBeenCalledWith(500);

    // ! Verificar que res.json se haya llamado con el mensaje de error correspondiente
    expect(res.json).toHaveBeenCalledWith({ message: "Error simulado" });
  });
});
