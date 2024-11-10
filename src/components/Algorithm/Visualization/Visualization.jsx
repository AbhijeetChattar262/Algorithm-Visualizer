import React, { useState, useEffect } from 'react';
import './Visualization.css';

const Visualization = () => {
    const size = 20;
    const [array, setArray] = useState([]);
    const [animations, setAnimations] = useState([]);
    const [isSorting, setIsSorting] = useState(false);
    const [animationSpeed, setAnimationSpeed] = useState(200);

    const generateArray = () => {
        const newArray = Array.from({ length: size }, () => (Math.random() * 100) + 1);
        setArray(newArray);
        setAnimations([]);
        setIsSorting(false);
    };

    useEffect(() => {
        generateArray();
    }, []);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms || animationSpeed));

    const bubbleSort = (arr) => {
        const moves = [];
        const arrayCopy = [...arr];
        let swapped;
        
        do {
            swapped = false;
            for (let i = 1; i < arrayCopy.length; i++) {
                moves.push({ indices: [i - 1, i], type: 'compare' });
                if (arrayCopy[i - 1] > arrayCopy[i]) {
                    [arrayCopy[i - 1], arrayCopy[i]] = [arrayCopy[i], arrayCopy[i - 1]];
                    swapped = true;
                    moves.push({ indices: [i - 1, i], type: 'swap' });
                }
            }
        } while (swapped);
        return moves;
    };

    const animate = async () => {
        for (let i = 0; i < animations.length; i++) {
            const { indices, type } = animations[i];
            const arrayBars = document.getElementsByClassName('array-bar');
            
            if (type === 'compare') {
                arrayBars[indices[0]].style.backgroundColor = 'blue';
                arrayBars[indices[1]].style.backgroundColor = 'blue';
                await delay(animationSpeed);
            } else if (type === 'swap') {
                arrayBars[indices[0]].style.backgroundColor = 'red';
                arrayBars[indices[1]].style.backgroundColor = 'red';
                
                arrayBars[indices[0]].classList.add('swapAnimation');
                arrayBars[indices[1]].classList.add('swapAnimation');

                const tempHeight = arrayBars[indices[0]].style.height;
                arrayBars[indices[0]].style.height = arrayBars[indices[1]].style.height;
                arrayBars[indices[1]].style.height = tempHeight;

                await delay(animationSpeed);
                
                arrayBars[indices[0]].classList.remove('swapAnimation');
                arrayBars[indices[1]].classList.remove('swapAnimation');
            }

            arrayBars[indices[0]].style.backgroundColor = 'turquoise';
            arrayBars[indices[1]].style.backgroundColor = 'turquoise';
        }
        setIsSorting(false);
    };

    const handleSort = () => {
        setIsSorting(true);
        const moves = bubbleSort(array);
        setAnimations(moves); // Trigger useEffect when animations are set
    };

    useEffect(() => {
        if (isSorting && animations.length > 0) {
            animate(); // Start animation only after animations are set
        }
    }, [animations, isSorting]);

    return (
        <div className='visualization'>
            <div className='array-container'>
                {array.map((value, idx) => (
                    <div
                        className='array-bar'
                        key={idx}
                        style={{
                            height: `${value}%`,
                            backgroundColor: 'turquoise',
                        }}
                    ></div>
                ))}
            </div>
            <div className="controls">
                <button onClick={generateArray} disabled={isSorting}>Generate New Array</button>
                <button onClick={handleSort} disabled={isSorting}>Bubble Sort</button>
                <div className="speed-control">
                    <label>Speed:</label>
                    <span>Fast</span>
                    <input
                        type="range"
                        min="300"
                        max="1000"
                        step="50"
                        value={animationSpeed}
                        onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                        disabled={isSorting}
                    />
                    <span>Slow</span>
                </div>
            </div>
        </div>
    );
};

export default Visualization;
