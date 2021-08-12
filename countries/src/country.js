import React from 'react'
import { useState } from 'react'
import Weather from './weather'

const Country = ({country}) => {
    const [show, setShow] = useState(false)
    
    if (!show) {
        return (<div>{country.name} <button onClick={() => setShow(true)}>Show</button></div>)
    }

    return (<div>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Languages</h3>
        <ul>
            {country.languages.map(l => <li key={l.iso639_1}>{l.name}</li>)}
        </ul>
        <img alt={country.name} width="100" height="100" src={country.flag} />
        <Weather city={country.capital} />
    </div>)
}

export default Country