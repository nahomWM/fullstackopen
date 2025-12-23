const ListCountry = ({ countries, onShowClick }) => {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.cca2}>
          {country.name.common}
          <button onClick={() => onShowClick(country)}>show</button>
        </div>
      ))}
    </div>
  );
};

export default ListCountry;
