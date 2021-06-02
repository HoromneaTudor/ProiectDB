import React from 'react'

function Productbox(props) {
    
    return (


      

            <div className='a-box'>
            <div className='a-b-img'>
                <img src={props[4]} alt=''/>
            </div>
            <div className='a-b-text'>
                <h2>
                    {props[0]}
                </h2>
                <button className='productbox-button'>Add to cart</button>
            </div>
            
        </div>
            

        
    )
}

export default Productbox
