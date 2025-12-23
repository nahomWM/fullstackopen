import { useState, useEffect } from "react";
import ShowNames from "./components/ShowNames";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import phoneService from "./services/phonebooks";
import Notification from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    phoneService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notiMessage, setNotiMessage] = useState({ message: null, type: null });

  const addPerson = function (event) {
    event.preventDefault();
    const exists = persons.find((p) => p.name === newName);
    if (exists) {
      if (exists.number === newNumber) {
        setNotiMessage({
          message: `${newName} already added to phonebook`,
          type: "error",
        });
        setTimeout(() => {
          setNotiMessage({ message: null, type: null });
        }, 5000);
        return;
      }
      const confirmReplace = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );
      if (confirmReplace) {
        const updatedPerson = {
          ...exists,
          number: newNumber,
        };

        phoneService
          .update(exists.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons((prevPersons) =>
              prevPersons.map((p) => (p.id !== exists.id ? p : returnedPerson))
            );
            setNewName("");
            setNewNumber("");
            setNotiMessage({
              message: `Updated ${returnedPerson.name}'s number`,
              type: "success",
            });
            setTimeout(() => {
              setNotiMessage({ message: null, type: null });
            }, 5000);
          })
          .catch(() => {
            setNotiMessage({
              message: `the note '${exists.name}' was already deleted from server`,
              type: "error",
            });
            setTimeout(() => {
              setNotiMessage({ message: null, type: null });
            }, 5000);
            setPersons(persons.filter((p) => p.id !== exists.id));
          });
      }
      return;
    }
    const newperson = { name: newName, number: newNumber };
    phoneService
      .create(newperson)
      .then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
        setNotiMessage({
          message: `Added ${response.name}`,
          type: "success",
        });
        setTimeout(() => {
          setNotiMessage({ message: null, type: null });
        }, 5000);
      })
      .catch(() => {
        setNotiMessage({
          message: `Failed to add ${newName}`,
          type: "error",
        });
        setTimeout(() => {
          setNotiMessage({ message: null, type: null });
        }, 5000);
      });
  };

  const showOnInput = function (event) {
    setNewName(event.target.value);
  };

  const showOnNumber = function (event) {
    setNewNumber(event.target.value);
  };

  const addToFilter = function (event) {
    setFilter(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phoneService
        .deleteSingle(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotiMessage({
            message: `Deleted ${name}`,
            type: "success",
          });
          setTimeout(() => {
            setNotiMessage({ message: null, type: null });
          }, 5000);
        })
        .catch(() => {
          setNotiMessage({
            message: `the note '${name}' was already deleted from server`,
            type: "error",
          });
          setTimeout(() => {
            setNotiMessage({ message: null, type: null });
          }, 5000);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notiMessage.message} type={notiMessage.type} />
      <Filter filter={filter} addToFilter={addToFilter} />

      <h2>Add a new</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        showOnInput={showOnInput}
        newNumber={newNumber}
        showOnNumber={showOnNumber}
      />

      <h2>Numbers</h2>

      <ShowNames persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
