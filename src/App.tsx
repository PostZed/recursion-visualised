import { useEffect, useMemo, useState, type ReactNode } from 'react'

import { findAllCombinations, findCombinationsForOneOrder, getCurrentPivot } from './lib/recursion'
import ItemContainer from './components/ItemContainer'


function App() {
  const items = ["Zee", "Monsty", "Darcy"];
  let [allNodes, setAllNodes] = useState<ReactNode[]>([]);
  const [stopInterval, setStopInterval] = useState(false)
  const pyramid = useMemo(() => {
    const pyramid: Array<Array<string>> = []
    findAllCombinations(items, pyramid);
    return pyramid;
  }, []);


  let [index, setIndex] = useState(0);
  //  const [currentPivot, setCurrentPivot] = useState(() => {
  //    pyramid[0][0];
  //   })

  useEffect(() => {
    let interval;
    if (stopInterval === false) {
      interval = setInterval(() => {
        const step = pyramid[index];
        const myPivot = getCurrentPivot(index, pyramid);
        const node = <ItemContainer items={step} pivot={myPivot} key={index} />
        allNodes = [...allNodes, node]
        setAllNodes(allNodes);
        if (index < pyramid.length - 1) {
          index++
          setIndex(index);
        }
        else {
          setStopInterval(true)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [stopInterval])

  return <div>
    {allNodes}
  </div>
}

export default App
