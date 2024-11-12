import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import algorithms from '../../../algorithms/sorting';
import './Visualization.css';
 
const Visualization = (algorithm) => {
    const size = 20;
    const [array, setArray] = useState([]);
    const [animations, setAnimations] = useState([]);
    const [isSorting, setIsSorting] = useState(false);
    const [animationSpeed, setAnimationSpeed] = useState(200);
    const [comparing, setComparing] = useState([]);
    const [swapping, setSwapping] = useState([]);
 
    const generateArray = () => {
        const newArray = Array.from({ length: size }, (_, idx) => ({
            value: Math.floor(Math.random() * 100) + 1,
            id: idx
        }));
        setArray(newArray);
        setAnimations([]);
        setIsSorting(false);
        setComparing([]);
        setSwapping([]);
    };
 
    useEffect(() => {
        generateArray();
    }, []);
 
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
 
    const animate = async () => {
        const newArray = [...array];
       
        for (let i = 0; i < animations.length; i++) {
            const { indices, type } = animations[i];
           
            if (type === 'compare') {
                setComparing(indices);
                await delay(animationSpeed); // Higher slider value = lower delay

            } else if (type === 'swap') {
                setSwapping(indices);
                [newArray[indices[0]], newArray[indices[1]]] =
                [newArray[indices[1]], newArray[indices[0]]];
                setArray([...newArray]);
                await delay(animationSpeed); // Higher slider value = lower delay

                setSwapping([]);
            }
            setComparing([]);
        }
        setIsSorting(false);
    };
 
    const handleSort = () => {
        setIsSorting(true);
        const sortingAlgorithm = algorithms[algorithm.algorithm];
        const moves = sortingAlgorithm(array);
        setAnimations(moves);
    };
 
    useEffect(() => {
        if (isSorting && animations.length > 0) {
            animate();
        }
    }, [animations, isSorting]);
 
    const spring = {
        type: "spring",
        damping: 20,
        stiffness: 300
    };
 
    const getBarColor = (idx) => {
        if (comparing.includes(idx)) return 'blue';
        if (swapping.includes(idx)) return 'red';
        return 'turquoise';
    };
 
    return (
        <div className='visualization'>
            <div className='array-container'>
                {array.map((item, idx) => (
                    <motion.div
                        className='array-bar'
                        key={item.id}
                        layout
                        transition={spring}
                        style={{
                            height: `${item.value}%`,
                            backgroundColor: getBarColor(idx),
                        }}
                    ></motion.div>
                ))}
            </div>
            <div className="controls">
                <button onClick={generateArray} disabled={isSorting}>Generate New Array</button>
                <button onClick={handleSort} disabled={isSorting}>Start Sort</button>
                <div className="speed-control">
    <label>Speed:</label>
    <span>Slow</span>
    <input
        type="range"
        min="150" // Minimum value for the slowest speed
        max="1500" // Maximum value for the fastest speed
        step="50"
        value={1500 - animationSpeed} // Invert the logic here
        onChange={(e) => setAnimationSpeed(1500 - Number(e.target.value))}
        disabled={isSorting}
    />
    <span>Fast</span>
</div>

            </div>
        </div>
    );
};
 
export default Visualization;