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
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const datamain = data.find((data) => data.id === id);
  if (datamain) {
    response.json(datamain);
  } else {
    response.status(404).end();
  }
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
