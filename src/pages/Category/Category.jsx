import React from 'react'
import './Category.css'
import List from '../../components/Category/List/List'
import Background from '../../components/Background/Background'
import Heading from '../../components/Heading/Heading'

export default function Category({ subCategory }) {
    return (
        <Background>
            <Heading />
            <List subCategory={subCategory} />
        </Background>
    )
}