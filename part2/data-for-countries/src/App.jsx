import { useEffect, useState } from "react";
import countriesMain from "./services/countries";
import ListCountry from "./components/ListCountry";
import NameOfCountry from "./components/NameOfCountry";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    countriesMain.getAll().then((data) => {
      setCountries(data);
    });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredCountries.length > 10) {
    return (
      <div>
        <div>
          find countries
          <input value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return (
      <div>
        <div>
          find countries
          <input value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
        <ListCountry countries={filteredCountries} />
      </div>
    );
  } else if (filteredCountries.length === 1) {
    return (
      <div>
        <div>
          find countries
          <input value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
        <NameOfCountry country={filteredCountries[0]} />
      </div>
    );
  } else {
    return (
      <div>
        <div>
          find countries
          <input value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
        <p>No countries found</p>
      </div>
    );
  }
};

export default App;
