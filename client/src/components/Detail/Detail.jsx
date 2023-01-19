import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetail, setDetailCountry } from "../../actions";
import { Link, useParams } from 'react-router-dom'
import './detail.css'


export default function Detail() {
    const { id } = useParams()
    const dispatch = useDispatch()

    const country = useSelector((state) => state.detail);

    useEffect(() => {
        dispatch(getCountryDetail(id))
        return () => {dispatch(setDetailCountry())}
    }, [dispatch, id])

    return (
        <div className="bigBox">
            <div className="infoBox">
                <div className="dataBox">
                    <h1>{country.length ? country[0].name : 'Loading...'} </h1>
                    <img src={country.length ? country[0].flag : 'Loading...'} />
                    <h3>ID: {country.length ? country[0].id: 'Loading...'} </h3>
                    <h3>Capital: {country.length ? country[0].capital : 'Loading...'} </h3>
                    <h3>Subregion: {country.length ? country[0].subregion : 'Loading...'} </h3>
                    <h3>Area of: {country.length ? country[0].area : 'Loading...'} km2</h3>
                    <h3>Population of: {country.length ? country[0].population : 'Loading...'} habitants</h3>
                    <div>
                    {/*<h3>ACTIVITIES </h3>*/}
                    </div>
                </div>
            </div>
            <div>
                <Link to='/home'>
                    <button className="backHome">Back to home</button>
                </Link>
            </div>
        </div>
    )
}