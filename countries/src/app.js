import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Countries from './countries'

const App = () => 
{
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const hook = () => {
        console.log('effect')
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            console.log('promise fulfilled')
            console.log(response.data)
            setCountries(response.data)
        })
    }

    useEffect(hook, [])

    const filteredCountries = search.length > 0 ? countries.filter(c => c.name.toLowerCase().includes(search.toLowerCase())) : countries


    return (<div>
        <h1>Countries</h1>
        <p>Find countries</p>
        <input type="text" onChange={handleSearchChange} value={search}/>
        <div>
            <Countries countries={filteredCountries} />
        </div>
    </div>)
}

export default App