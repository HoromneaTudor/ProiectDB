import React, { useState,useEffect } from 'react';
import Productbox from './Productbox';
import pimage1 from '../images/s1.png';
import pimage2 from '../images/s2.png';
import axios from "axios";
import PropagareLoader from "react-spinners/PropagateLoader";

function Cart() {
    
    const[items,setItems]=useState([]);
    const [response,setResponse]=useState();
    const[loading,setLoading]=useState(false);
    const [error,setError]=useState('');

    
 
    let valueId=global.orderId;
    let valueImage=global.orderImage;
    let valueName=global.orderName;
    let valueQuantity=global.quantity;
    let valuePret=global.orderPrices;
    var totalPrice=parseInt("0");
    let value=[];

    for(let i=0;i<valueId.length;i++)
    {
        value.push([
            valueId[i],
            valueName[i],
            valueImage[i],
            valueQuantity[i],
            valuePret[i]

        ]
        )
        totalPrice=valuePret[i]*valueQuantity[i]+totalPrice;
    }
    //console.log(global.user[0][5]);

    const handleClick = () => {
        // force a re-render
        //console.log("fajhfau")
        this.forceUpdate();
        console.log("am facut dar....");
      };

    const PlaceOrder=()=>{
        
            axios.post("http://localhost:2000/placeOrder",{name:valueName,
        itemId:valueId,
        image:valueImage,
        clientId:global.user[0][5],
        quantity:valueQuantity,
        totalPrice:totalPrice
        
        
}).then((response) => {
        if (response.data.message) {
          setResponse(response.data.message);
        } else {
          setResponse("Registration was successfull");
          
        
           
        }
        
      });
        
        
    }

    async function handlePlaceOrder(){
        await PlaceOrder();
        //await handleClick();
         global.orderImage=[];
            global.orderId=[];
            global.orderName=[];
            global.quantity=[];
    }
   


        const itemsP=value.map((data,id)=>{
            //console.log("fasnjfka");
          return <div key={id} className='a-box' >
                   <div className='a-b-img'>
                       <img src={data[2]} alt=''/>
                   </div>
                   <div className='a-b-text'>
                       <h2>
                           {data[1]+"quantity: "+data[3]}
                           {"\npret: "+data[4]}
                       </h2>
                       <h3>{"id: "+ data[0]}</h3>
                      
                   </div>
                  
               </div>
        })

        return (
          <div id="products">
            <h1>Your Cart</h1>
            <div className='a-container'>
            
            
              {
                <>
                  {itemsP}
                </>

              }
              
              <button className='productbox-button' onClick={handlePlaceOrder}>Place Order</button>
           
          
          </div>
          </div>
        ); 
       
          
          
            
        
      //}
      // else return(<div>
      //     <h1>Reallllllyyyy</h1>

      // </div>)
    
}

export default Cart;
