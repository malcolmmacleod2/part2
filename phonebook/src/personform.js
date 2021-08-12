import React from 'react'

const PersonForm = ({name, number, handleSave, handleNameChange, handleNumberChange}) => {
    
    return (
        <form onSubmit={handleSave}>
        <div>
          name: <input onChange={handleNameChange} value={name}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={number}/>
        </div>
        <div>
          <button>add</button>
        </div>
      </form>
    )
}

export default PersonForm