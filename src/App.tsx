import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ItemCard from './components/ItemCard'
import { findAllCombinations, findCombinationsForOneOrder } from './lib/recursiveGenerators'

function App() {
  const obj = {
    findAllCombinations,
    findCombinationsForOneOrder,
    pyramid: []
  }
  obj.findAllCombinations(["1", "2", "3"])
  return <ItemCard position={1} item="Zee" isPivot={true} />
}

export default App
