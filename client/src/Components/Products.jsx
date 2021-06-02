import React, { useState,useEffect } from 'react';
import Productbox from './Productbox';
import pimage1 from '../images/s1.png';
import pimage2 from '../images/s2.png';
import axios from "axios";
import PropagareLoader from "react-spinners/PropagateLoader";
import { Form, Button, Card, Alert } from "react-bootstrap";

function Products() {
    
    const[items,setItems]=useState([]);
    const [response,setResponse]=useState();
    const[loading,setLoading]=useState(false);
    const [error,setError]=useState('');
 
    //let rows=[];
    const GetItems = (
        
      ) => {
         // console.log("sfmaifanj")
        //console.log(emailRef);
        return axios
          .get("http://localhost:2000/items", 
            )
          .then((response) => {
            if (response.data.message) {
              setResponse(response.data.message);
            } else {
              setResponse(response.data);
              setItems(response.data);
              let res = response.data;
              //console.log(res);
              //console.log(res[4][0]);
              //console.log(res.length);
              
              //console.log(res.length);
              
              return res;
            }
          });
    
        //console.log(passwordRef);
      };
 
      async function handleGetItems(e) {
        //e.preventDefault();
    
        
    
        try {
          setError("");
          //setLoading(true);
          let res=await GetItems(
            
          );
          
          await console.log(res);
          await handleClick();
          //await console.log("dafaj")
          
        } catch {
          setError("Failed at reading te items");
        }
        //setLoading(false);
      }
      const handleClick = () => {
        // force a re-render
        //console.log("fajhfau")
        this.forceUpdate();
      };
    

     useEffect(() => {
        setLoading(true);
        handleGetItems();
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        
      }, []);

      //trebuie sa mai caut
      const AddToCart=(e)=>{
        //console.log(e.target.getAttribute('data-value'));
        if(global.orderId!==undefined && global.orderName!==undefined && global.orderImage!==undefined)
        {
          if(global.orderId.includes(parseInt( e.target.getAttribute('dataid'))))
          {
            global.quantity[global.orderId.indexOf(parseInt( e.target.getAttribute('dataid')))]++;
          }
          else{
            global.orderId.push(parseInt( e.target.getAttribute('dataid')));
            global.orderName.push(e.target.getAttribute('datanume'));
            global.orderImage.push(e.target.getAttribute('dataimage'));
            global.orderPrices.push(parseInt(e.target.getAttribute('dataprice')));
            global.quantity.push(1);
          }
          
          // console.log(global.orderId);
          // console.log(global.orderName);
          // console.log(global.orderImage);

        }
        else {
          <Alert>You Need An Account</Alert>
        }
        
      }

        const itemsP=items.map((data,id)=>{
          return <div key={id} className='a-box' >
                   <div className='a-b-img'>
                       <img src={data[4]} alt=''/>
                   </div>
                   <div className='a-b-text'>
                       <h2>
                           {data[0] +" "+ data[1]}
                           {"\npret: "+data[6]}
                       </h2>
                       <h3>{"id: "+ data[5]}</h3>
                       <button className='productbox-button' onClick={AddToCart} dataid={data[5]} dataimage={data[4]} datanume={data[0]} dataprice={data[6]}>Add to cart</button>
                   </div>
                  
               </div>
        })

        return (
          <div id="products">
            <h1>CHOOSE & ENJOY</h1>
            
            <div className='a-container'>
            
            
              {
                <>
                  {itemsP}
                </>

              }
              
           
          
          </div>
          </div>
        ); 
       
          
          
            
        
      //}
      // else return(<div>
      //     <h1>Reallllllyyyy</h1>

      // </div>)
    
}

export default Products;
