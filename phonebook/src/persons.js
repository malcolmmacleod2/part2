import React from 'react'
import Person from './person'

const Persons = ({filteredPersons, deletePerson}) => {

    return (
       <div>{filteredPersons.map(person => {
            return <Person key={person.id} person={person} deletePerson={deletePerson}/>
            }
        )}</div> 
    )
}

export default Persons