import React ,{useState} from 'react';
//import {Link} from "react-scroll";
//import {Redirect} from "react-router-dom";
import {Link,useHistory} from"react-router-dom";
//o sa trebuiasca inlocuit Linkul de mai sus
//important este ca merge

import logo from "../images/logo2.png";
//import '../App.css';

function Navbar() {

    const [nav,setNav]=useState(false);
    const history=useHistory();

    const changeBackground=()=>{
        if(window.scrollY >=50)
        {
            setNav(true);
        }
        else{
            setNav(false);
        }
    }

    const logOut=()=>{
        global.user=undefined;
        global.order=undefined;
    }
    const GoToOrders=()=>{
        history.push({ pathname: "/orders"})
    }
    

    window.addEventListener('scroll',changeBackground);

    return (
        <nav className= {nav ? "nav active" :"nav"}>
            <Link to='/' className='logo' smooth={true} duration={1000}>
                <img src={logo} alt=''/>
            </Link>
            <input className='menu-btn' type='checkbox' id='menu-btn'/>
            <label className='menu-icon' for='menu-btn'>
                <span className='nav-icon'>

                </span>
            </label>
            <ul className='menu'>
                <li>
                    <Link to="/"  smooth={true} duration={1000}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/ShowAllItems"  smooth={true} duration={1000}>
                        Products
                    </Link>
                </li>
                {/* <li>
                    <Link to="about"  smooth={true} duration={1000}>
                        About
                    </Link>
                </li> */}
                
                {
                global.user==undefined ? 
                (
                    <>
                    <li>
                    <Link to="/signup">
                        SignUp
                    </Link>
                </li>
                <li>
                <Link to="/Login">
                    Login
                </Link>
                </li>
                </>
                ):
                (
                    <>
                    <li>
                    <Link to="/yourCart"  smooth={true} duration={1000}>
                        YourCart
                    </Link>
                </li>
                    <li>
                        <Link to="/orders" onClick={GoToOrders}>
                            yourOrders
                        </Link>
                    </li>
                    <li>
                        <Link to="/" onClick={logOut}>
                        Logout
                    </Link>
                    </li>

                    
                    </>
                )
                
            
            
            }
            {global.user!==undefined && global.user[0][6]!==null?
            (
                    <li>
                        <Link to="/addItem" onClick={GoToOrders}>
                            AdminPriveleges
                        </Link>
                    </li>
            )
            :
            (
                <>
                </>

            )
            }
            

                
            </ul>


        </nav>
    )
}

export default Navbar
