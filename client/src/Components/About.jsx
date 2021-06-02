import React from 'react'
import aboutimage from '../images/about.png'

function About() {
    return (
        <div id='about'>
            <div className='about-text'>
                <h1>Upcoming events</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi facilis autem esse. Eveniet recusandae, magni, quis officiis fugiat consequatur veniam eos doloribus nobis harum similique, possimus consequuntur in hic illum.</p>
                <button>Read More</button>
            </div>
            <div className='about-image'>
                <img src={aboutimage} alt=''/>

            </div>
            
        </div>
    )
}

export default About
