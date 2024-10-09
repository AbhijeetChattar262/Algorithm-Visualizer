import React from 'react'
import Background from '../../components/Background/Background'
import Heading from '../../components/Heading/Heading'
import Main from '../../components/Categories/Main/Main'

export default function Categories() {
    return (
        <Background>
            <div className="categories-wrapper">
                <Heading />
                <Main />
            </div>
        </Background>
    )
}
