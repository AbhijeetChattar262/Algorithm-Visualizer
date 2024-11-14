import React from 'react'
import Algorithm from '../Algorithm/Algorithm'
import DefaultPage from '../DefaultPage/DefaultPage'
import Sidebar from '../Test/Test'
import './Home.css'
import { algorithmCategories, subCategories } from '../../constants'
import SearchVisualization from '../Search/Search'

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
        {/* <SearchVisualization/> */}
    </div>
  )
}

export default Home
