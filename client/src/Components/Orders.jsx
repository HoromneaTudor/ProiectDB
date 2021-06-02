import React, { useState,useEffect } from 'react';
import Productbox from './Productbox';
import pimage1 from '../images/s1.png';
import pimage2 from '../images/s2.png';
import axios from "axios";
import PropagareLoader from "react-spinners/PropagateLoader";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useHistory } from 'react-router';

function Orders() {
    
    const[orders,setItems]=useState([]);
    const [response,setResponse]=useState();
    const[loading,setLoading]=useState(false);
    const [error,setError]=useState('');
    const history=useHistory();
 
    //let rows=[];
    const GetOrders = (
        
      ) => {
         // console.log("sfmaifanj")
        //console.log(emailRef);
        return axios
          .post("http://localhost:2000/orders",{id:global.user[0][5]}, 
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

    //   const GetItemOfOrder=(e)=>{
    //       let id=parseInt( e.target.getAttribute('dataid'));
    //     return axios
    //       .post("http://localhost:2000/OrderItems",{orderId:id}, 
    //         )
    //       .then((response) => {
    //         if (response.data.message) {
    //           setResponse(response.data.message);
    //         } else {
    //           setResponse(response.data);
    //           setItems(response.data);
    //           let res = response.data;
    //           //console.log(res);
    //           //console.log(res[4][0]);
    //           //console.log(res.length);
              
    //           //console.log(res.length);
              
    //           return res;
    //         }
    //       });
    //   }
 

      const OrderDetails=(e)=>{
        //console.log(e.target.getAttribute('dataOrderId'));
        let id=parseInt( e.target.getAttribute('dataOrderId'));
        //console.log(id);
        history.push({ pathname: "/orderDetail", state: id });
      }
      async function handleGetItems(e) {
        //e.preventDefault();
    
        
    
        try {
          setError("");
          //setLoading(true);
          let res=await GetOrders(
            
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
    //   const AddToCart=(e)=>{
    //     //console.log(e.target.getAttribute('data-value'));
    //     if(global.orderId!==undefined && global.orderName!==undefined && global.orderImage!==undefined)
    //     {
    //       if(global.orderId.includes(parseInt( e.target.getAttribute('dataid'))))
    //       {
    //         global.quantity[global.orderId.indexOf(parseInt( e.target.getAttribute('dataid')))]++;
    //       }
    //       else{
    //         global.orderId.push(parseInt( e.target.getAttribute('dataid')));
    //         global.orderName.push(e.target.getAttribute('datanume'));
    //         global.orderImage.push(e.target.getAttribute('dataimage'));
    //         global.orderPrices.push(parseInt(e.target.getAttribute('dataprice')));
    //         global.quantity.push(1);
    //       }
          
    //       // console.log(global.orderId);
    //       // console.log(global.orderName);
    //       // console.log(global.orderImage);

    //     }
    //     else {
    //       <Alert>You Need An Account</Alert>
    //     }
        
    //   }

        const ordersP=orders.map((data,id)=>{
          return <div key={id} className='o-box' >
                   
                   <div className='o-b-text'>
                       <h2>
                           {"ID order: "+data[0]}
                           {"\nTotal : "+data[1]}
                           {"\nPurchaseDate: "+data[2]}
                       </h2>
                       
                       <button className='productbox-button' onClick={OrderDetails}  dataOrderId={data[0]}>Details</button>
                   </div>
                  
               </div>
        })

        return (
          <div id="products">
            <h1>Your Orders</h1>
            <div className='a-container'>
            
            
              {
                <>
                  {ordersP}
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

export default Orders;
