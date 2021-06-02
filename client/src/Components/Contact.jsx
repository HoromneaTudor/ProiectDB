import React from 'react'

function Contact() {
    return (
        <div id='contact'>
            <h1>Book your table</h1>
            <form>
                <input type='text' placeholder='Full Name'/>
                <input type='email' placeholder='Type your email'/>
                <textarea placeholder='Write here.....'></textarea>
                <input type='submit' value='BOOK'></input>
            </form>
            
        </div>
    )
}

export default Contact
