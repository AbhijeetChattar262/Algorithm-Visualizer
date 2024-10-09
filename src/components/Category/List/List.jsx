import React from 'react'
import './List.css'
import { subCategories } from '../../../constants'
import { useNavigate } from 'react-router'

export default function List({ subCategory }) {

    const navigate = useNavigate()

    return (
        <div className="list-wrapper">
            <ul>
                {subCategories[subCategory].map((sub, index) => (
                    <li key={index} onClick={() => navigate(`/categories/${subCategory}/${sub.split(" ").join("_").toLowerCase()}`)}>{sub}</li>
                ))}
            </ul>
        </div>
    )
}
