import app from "./app";
import config from "./configs/index"

app.listen(config.port, () => {
  console.log("Express server started on port: " + config.port.toString());
});
