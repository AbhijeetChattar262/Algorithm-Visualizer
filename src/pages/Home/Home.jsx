import React from 'react'
import Algorithm from '../Algorithm/Algorithm'
import DefaultPage from '../DefaultPage/DefaultPage'
import Sidebar from '../../components/Sidebar/Sidebar'
import { algorithmCategories } from '../../constants'
import './Home.css'
import SearchingVisualizer from '../../components/SearchingVisualizer/SearchingVisualizer'

const Home = () => {

    const [selectedAlgorithm, setSelectedAlgorithm] = React.useState(null);

  return (
    <div className='home'>
        <Sidebar setSelectedAlgorithm={setSelectedAlgorithm} />
        {selectedAlgorithm ? (
          <Algorithm algorithm={selectedAlgorithm} />
        ) : (
          <DefaultPage />
        )}
    </div>
  )
}

export default Home
