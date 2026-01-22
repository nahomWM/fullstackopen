const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
app.use(cors());
app.use(express.json());
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);
app.use(express.static(path.join(__dirname, "dist")));
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
  const id = Number(request.params.id);
  const person = data.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  data = data.filter((p) => p.id !== id);
  response.status(204).end();
});
app.post("/api/persons", (request, response) => {
  console.log("POST body:", request.body);
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }
  const nameExists = data.some(
    (person) => person.name.toLowerCase() === body.name.toLowerCase(),
  );
  if (nameExists) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }
  const person = {
    id: Math.floor(Math.random() * 1000000),
    name: body.name,
    number: body.number,
  };
  data = data.concat(person);
  response.json(person);
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
