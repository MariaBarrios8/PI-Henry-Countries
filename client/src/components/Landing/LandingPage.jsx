import React from "react";
import { Link } from "react-router-dom";
import './Landing.css'


export default function LandingPage() {
    return (
        <div className="landingbody">
            <h1 className="tittle">Welcome to the Trip Advisor ripOff</h1>
            <Link to='/home'>
                <button className="startbutton">EXPLORE!</button>
            </Link>
        </div>
    )
}