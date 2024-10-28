import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const GraphContext = createContext();

export const GraphProvider = ({ children }) => {
  const [adjacencyList, setAdjacencyList] = useState({});
  const addVertex = (vertex) => {
    setAdjacencyList(prevList => ({
      ...prevList, [vertex]: [],
    }))
  }
      
  const addEdge = (vertex1, vertex2, amount, details) => { 
    const id = uuidv4();
    setAdjacencyList(prevList => ({
      ...prevList,
      [vertex1]: [...prevList[vertex1], { id, name: vertex2, amount, details }],
    }))
  }

  const deleteVertex = (vertex) => {
    setAdjacencyList(prevList => {
      const{[vertex]: _, ...newList} = prevList;
      return Object.fromEntries(
        Object.entries(newList).map(([key, edges]) => [
          key,
          edges.filter(edge => edge.name !== vertex),
        ])
      );
    })
  }

  const deleteDebtEntry = (vertex, utangId) => {
    setAdjacencyList((prevList) => {
      console.log(vertex, utangId)

      const newList = { ...prevList };
      if(newList[vertex]) {
        newList[vertex] = newList[vertex].filter((utang) => utang.id !== utangId);
      }

      return newList;
    });
  }

  return (
    <GraphContext.Provider value={{ adjacencyList, addVertex, addEdge, deleteVertex, deleteDebtEntry }}>
      {children}
    </GraphContext.Provider>
  )
}

export const useGraph = () => {
  return useContext(GraphContext);
};


