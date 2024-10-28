import { useState } from 'react'
import '../styles/App.css'
import '../styles/Person.css'

import { useGraph } from '../Hooks/GraphProvider';

export default function Person({ name }) {
  const { adjacencyList, addEdge, deleteVertex, deleteDebtEntry } = useGraph();

  const [utangValue, setUtangValue] = useState(0);
  const [utangDetails, setUtangDetails] = useState("");
  const [selectedPerson, setSelectedPerson] = useState("");
  const [creatingUtang, setCreatingUtang] = useState(false);

  const debtsYouOwe = adjacencyList[name] || [];
  const debtsOwedToYou = Object.entries(adjacencyList).flatMap(([person, debts]) =>
    debts
      .filter(utang => utang.name === name)
      .map(utang => ({ ...utang, person }))
  );      

  const handleSubmit = (e) => {
    e.preventDefault();     

    if(utangValue > 0 && selectedPerson !== "") {
      addEdge(name, selectedPerson, utangValue, utangDetails);
      setSelectedPerson("");
      setUtangValue(0);
      setCreatingUtang(false);
      setUtangDetails("");
    }
  }

  const handleSelectedPerson = (e) => {
    setSelectedPerson(e.target.value);
  }

  const handleCreateUtang = (e) => {
    e.preventDefault();
    setCreatingUtang(!creatingUtang);
  }

  const deletePerson = (e) => {
    deleteVertex(name);
  }

  const handleDeleteUtang = (utang) => {
    deleteDebtEntry(utang.person, utang.id);
  }

  return (
    <>
      <form className='person-interface' onSubmit={handleSubmit}>

        <button className='exit-button' onClick={deletePerson}>x</button>

        <h2>{name}</h2>

        <div className='owe-list you-owe'>
          <ul>
            {debtsYouOwe.map((utang, index) => (
              <li key={index}>
                <div>{utang.amount}</div>
                <div>owed to </div>
                <div>{utang.name}</div>
                <div><span className='utang-details'>{utang.details}</span></div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className='owe-list owed-to-you'>
          <ul>
            {debtsOwedToYou.map((utang, index) => (
              <li key={index}>
                <div>{utang.amount}</div> 
                <div>owed by </div>
                <div>{utang.person}</div> 
                <div><span className='utang-details'>{utang.details}</span></div>
                <input type='checkbox' onChange={() => handleDeleteUtang(utang)}/>
              </li>
            ))}
          </ul>
        </div>

        <button onClick={handleCreateUtang}>Add Utang</button>

        {creatingUtang && (
          <div className='add-utang-interface'>
            <h3>New Utang</h3>

            <label>To who:</label>
            <div className="person-selection">
              <select 
                value={selectedPerson}
                onChange={handleSelectedPerson}
              >
                <option value="" disabled>Select a Person</option>

                {Object.keys(adjacencyList).map((person, index) => 
                  person !== name && (
                    <option key={index} value={person}>
                      {person}
                    </option>
                  )
                )}
              </select>
            </div>

            <label>Amount:</label>
            <input
              type="number"
              value={utangValue}
              onChange={(e) => setUtangValue(e.target.value)}
              placeholder="Enter amount"
            />

            <label>Details:</label>
            <input
              type="text"
              value={utangDetails}
              onChange={(e) => setUtangDetails(e.target.value)}
            />

            <button type="submit">Submit</button>
          </div>
        )}
            
      </form>
    </>
  )
}