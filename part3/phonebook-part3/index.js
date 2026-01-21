const express = require("express");
const app = express();
let data = require("./data.json");
app.get("/api/persons", (request, response) => {
  response.json(data);
});

app.get("/info", (request, response) => {
  response.send(`
    <p>Phonebook has info for ${data.length} people</p>
    <p>${new Date()}</p>
  `);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const datamain = data.find((data) => data.id === id);
  if (datamain) {
    response.json(datamain);
  } else {
    response.status(404).end();
  }
});
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  data = data.filter((data) => data.id !== id);
  response.status(204).end();
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
