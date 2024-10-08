import React from 'react'
import './Category.css'
import { subCategories } from '../../constants'
import Background from '../../components/Background/Background'

export default function Category({ subCategory }) {
    return (
        <Background>
            <ul>
                {subCategories[subCategory].map((sub, index) => (
                    <li key={index}>{sub}</li>
                ))}
            </ul>
        </Background>
    )
}