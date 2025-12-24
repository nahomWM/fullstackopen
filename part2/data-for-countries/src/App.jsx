import { useEffect, useState } from "react";
import countriesMain from "./services/countries";
import ListCountry from "./components/ListCountry";
import NameOfCountry from "./components/NameOfCountry";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    countriesMain.getAll().then((data) => {
      setCountries(data);
      setLoading(false);
    });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const handleShowClick = (country) => {
    setSelectedCountry(country);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setSelectedCountry(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (filteredCountries.length > 10) {
    return (
      <div>
        <div>
          find countries
          <input value={filter} onChange={handleFilterChange} />
        </div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return (
      <div>
        <div>
          find countries
          <input value={filter} onChange={handleFilterChange} />
        </div>
        <ListCountry
          countries={filteredCountries}
          onShowClick={handleShowClick}
        />
        {selectedCountry && <NameOfCountry country={selectedCountry} />}
      </div>
    );
  } else if (filteredCountries.length === 1) {
    return (
      <div>
        <div>
          find countries
          <input value={filter} onChange={handleFilterChange} />
        </div>
        <NameOfCountry country={filteredCountries[0]} />
      </div>
    );
  } else {
    return (
      <div>
        <div>
          find countries
          <input value={filter} onChange={handleFilterChange} />
        </div>
        <p>No countries found</p>
      </div>
    );
  }
};

export default App;
