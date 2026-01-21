const express = require("express");
const app = express();
const data = require("./data.json");
app.get("/api/persons", (request, response) => {
  response.json(data);
});
const length = data.length;

app.get("/info", (request, response) => {
  response.send(`
    <p>Phonebook has info for ${length} people</p>
    <p>${new Date()}</p>
  `);
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
