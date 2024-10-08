import React from 'react'
import { useNavigate } from 'react-router';
import { algorithmCategories } from '../../../constants';
import Card from '../Card/Card';
import './Main.css';




export default function Main() {

    const navigate = useNavigate();

    return (
        <div className="card-container">
            {algorithmCategories.map((category, index) => (
                <Card key={index} title={category.title} image={category.image} onClick={() => navigate(`/categories/${category.title.split(" ")[0]}`)} />
            ))}
        </div>
    );
};
