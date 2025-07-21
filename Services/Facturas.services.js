const { Request, TYPES } = require("tedious");
const connection = require("../bd/bd"); //conexion con la base de datos
//NOTAS PERSONALES
// resolve: se llama si todo va bien
// reject: se llama si hay error
class FacturasService {
  constructor() {}

  async FindOne(idempresaV, NroFactura) {
    return new Promise((resolve, reject) => {
      const request = new Request(
        `SELECT [Id Factura]  FROM Factura  WHERE [Id EmpresaV] = @idempresaV AND [No Factura] = @NroFactura`,
        (err) => {
          if (err) {
            return reject(
              new Error(`Error al ejecutar la consulta ${err.message || err}`)
            );
          }
        }
      );

      request.addParameter('idempresaV', TYPES.Int, idempresaV);
      request.addParameter('NroFactura', TYPES.Int , NroFactura);

      const resultados = [];

      request.on('row', (Columns) => {
        let facturas = {
            idfactura: Columns[0].value
        };
        resultados.push(facturas);
      });

      request.on('requestCompleted', () => {
        resolve(resultados);
      });

      request.on('error', (err) => {
        reject(new Error(`Error al ejecutar la consulta bro ${err.message || err}`));
      });

      connection.execSql(request);

    });

    
  }

   async Find() {
    return new Promise((resolve, reject) => {
      const request = new Request(
        `SELECT TOP (1) [Id Factura], [No Factura]  FROM Factura  `,
        (err) => {
          if (err) {
            return reject(
              new Error(`Error al ejecutar la consulta ${err.message || err}`)
            );
          }
        }
      );


      const resultados = [];

      request.on('row', (Columns) => {
        let facturas = {
            idfactura: Columns[0].value,
            NroFactura: Columns[1].value
        };
        resultados.push(facturas);
      });

      request.on('requestCompleted', () => {
        resolve(resultados);
      });

      request.on('error', (err) => {
        reject(new Error(`Error al ejecutar la consulta bro ${err.message || err}`));
      });

      connection.execSql(request);

    });

    
  }
}

module.exports = FacturasService;
