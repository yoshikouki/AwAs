import app from "./app";

const port = parseInt(process.env.PORT || "8889", 10);

app.listen(port, () => {
  console.log("Express server started on port: " + port.toString());
})
