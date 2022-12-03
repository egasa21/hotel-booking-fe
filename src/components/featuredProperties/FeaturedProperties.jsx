import React, { useState, useEffect } from "react";
import './featuredProperties.css'
// import fetch from ''
import useFetch from '../../hooks/useFetch';
import axios from "axios";

const FeaturedProperties = () => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const fetch = useFetch();
    // const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");
    // console.log(data)
    useEffect(() => {
        getData();
    }, []);
    const getData = () => {
        try {
            const response = axios.get(`/hotels?featured=true&limit=4"`);
            setData(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='fp'>

            {loading ? ('Loading') : (<>
                {data && data.map((item) => (
                    <div className="fpItem" key={item._id}>
                        <img src={item.photos[0]}
                            alt=""
                            className="fpImg" />
                        <span className="fpName">{item.name}</span>
                        <span className="fpCity">{item.city}</span>
                        <span className="fpPrice">Starting from {item.cheapestPrice}</span>
                        {item.rating && <div className="fpRating">
                            <button>{item.rating}</button>
                            <span>Excellent</span>
                        </div>}
                    </div>
                ))}
            </>
            )}
        </div>
    );
};

export default FeaturedProperties;