const NameOfCountry = ({ country }) => {
  return (
    <div>
      <p>{country.name.common}</p>
      <ul>
        <li>capital {country.capital[0]}</li>
        <li>area {country.area}</li>
      </ul>
      <p>languages:</p>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={`the flag of the counry`} width="200" />
    </div>
  );
};

export default NameOfCountry;
