const ListCountry = ({ countries }) => {
  return (
    <div>
      {countries.map((country) => (
        <p key={country.cca2}>{country.name.common}</p>
      ))}
    </div>
  );
};

export default ListCountry;
