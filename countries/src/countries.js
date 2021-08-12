import React from 'react'
import Country from './country'

const Countries = ({countries}) => {
    if (countries.length > 10) {
        return (<p>Too many matches, specifiy another filter</p>)
    } else if (countries.length === 1 ) {
        return (<Country country={countries[0]} />)
    } else {
        return (
            <div>
                {countries.map(c => <Country key={c.numericCode} country={c} />)}
            </div>
        )
    }
}

export default Countries