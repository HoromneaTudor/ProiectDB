import React from 'react';

function Header() {
    console.log(global.user);
    return (
        <div id='main'>
            <div className='header-heading'>
                <h3>It's a great time to shop online</h3>
                <h1><span>MAO</span> FOR <br/> EVERYTHING </h1>
                <p className='details'>If you need something and dont want to go outside, dont worry our services are fast and convinient </p>
                <div>
                    <a href='/ShowAllItems' className='header-btn' to="/ShowAllItems">Order</a>
                </div>
            
            </div>
            
        </div>
    )
}

export default Header
