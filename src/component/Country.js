import React, { useState } from 'react'
import axios from 'axios'


const CountryInfoButton = ({country}) => {
  const [showInfo, setShowInfo] = useState(false)

  const getCountryInfo = () => setShowInfo(!showInfo)

  return (
    <li>
      {country.name}
      <button onClick={() => getCountryInfo()}>
        {showInfo ? 'Hide' : 'Show'}
      </button>
      {showInfo && <CountryInfoSingle country={country} />}
    </li>
  )
}

const CountryInfoList = ({country}) => {
  return (
    <div>
      Found countries:
      <ul>
        {country.map(c =>
          <CountryInfoButton key={c.alpha2Code} country={c} />
        )}
      </ul>
    </div>
  )
}

const CountryInfoSingle = ({country}) => {
  console.log('fes', country);
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(c => <li key={c.iso639_1}>{c.name}</li>)}
      </ul>
    </div>
  )
}

const CountryInfo = ({country}) => {
  let cL = country.length
  if (cL < 10 && cL > 1){ return ( <CountryInfoList country={country} /> ) }
  else if (cL === 1){ return ( <CountryInfoSingle country={country[0]} /> )}
  else return (<div> No results yet </div>)
}

const Country = () => {
  const [country, setCountry] = useState([])
  const [search, setSearch] = useState([])
  const [error, setError] = useState([])

  const searchCountry = () => {
    axios
    .get(`https://restcountries.eu/rest/v2/name/${search}`)
      .then(response => {
        console.log('promise fulfilled');
        console.log('resp', response);
        setCountry(response.data)
        setError('')
      })
      .catch(error => {
        console.log(error.response.data.message)
        setCountry([])
        setError(error.response.data.message)
      })
    //console.log('render', country.map(c =>(c.name)), 'notes');
  }

  // When content of form is changed
  const handleSearchChange = (event) => {
    searchCountry();
    setError('')
    setSearch(event.target.value);
  }

  return (
    <div>
      <h1>Search</h1>
      <form>
        <div> Search for a country: <input value={search} onChange={handleSearchChange} /> </div>
      </form>
      <p>Countrylist or country info for search term "{search}": {error}</p>
      <CountryInfo country={country}/>
    </div>
  )
}

export default Country