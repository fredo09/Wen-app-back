/**
 *   Configuracion mongoose
 **/

const mongoose = require("mongoose");
const app = require("./app");

const { PORTDB, PORT, API_VERSION } = require("./config");

mongoose.set("useFindAndModify", false);

//Conexion a mongodb
mongoose.connect(
  `mongodb://localhost:${PORTDB}/web-app`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      throw new Error(err);
    } else {
      console.log("La conexion a la BD fue exitosa");

      app.listen(PORT, () => {
        console.log("####################");
        console.log("##### API-REST #####");
        console.log("####################");
        console.log("--------------------");
        console.log(
          `Servidor levantado en http://localhost:${PORT}/api/${API_VERSION}/ 🚀 `
        );
      });
    }
  }
);
