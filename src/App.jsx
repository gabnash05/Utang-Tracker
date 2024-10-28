import { useState } from 'react'
import './styles/App.css'

import { useGraph } from './Hooks/GraphProvider';
import Person from './Components/Person';

function App() {
  const { adjacencyList, addVertex } = useGraph();

  const [currPerson, setCurrPerson] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(currPerson != "" && !Object.keys(adjacencyList).includes(currPerson)) {
      addPerson(currPerson);
      setCurrPerson("");
    }
  }

  const addPerson = (newPerson) => {
    addVertex(newPerson);
  }

  return (
    <>
      <div className='new-person-form'>
        <form onSubmit={handleSubmit}>
          <label>New Person</label>
          <input 
            type='text'
            value={currPerson}
            onChange={(e) => setCurrPerson(e.target.value)}
          />

          <input type='submit'/>
        </form>
      </div>

      {Object.keys(adjacencyList).map((name, index) => (
        <Person key={index} name={name}/>
      ))}


    </>
  )
}

export default App
