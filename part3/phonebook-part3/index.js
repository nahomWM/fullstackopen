const express = require("express");
const app = express();
const data = require("./data.json");
app.get("/api/persons", (request, response) => {
  response.json(data);
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
