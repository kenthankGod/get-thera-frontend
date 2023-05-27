import React, { useEffect, useState } from 'react'
import './Quote.css'
import {FaQuoteRight, FaQuoteLeft } from "react-icons/fa"
import quotedata from './QuoteData'


const Quote = () => {
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [showText, setShowText] = useState(true);
    const [quote,] = useState(quotedata);


      useEffect(() => {
        const interval = setInterval(() => {
          setShowText(false); 
          setTimeout(() => {
            setQuoteIndex((prevIndex) => (prevIndex + 1) % quote.length);
            setShowText(true); 
          }, 1000);
        }, 5000); 
    
        return () => clearInterval(interval);
      }, [quote]);
  
    return (
      <>
        <div className='quote_container'>
            <div className="quote_body">
          <p className={`quote_text ${showText ? 'show' : ''}`}><FaQuoteLeft className='left' /> {quote[quoteIndex].text}</p>
          <p className={`quote_text ${showText ? 'show' : ''}`} >~{quote[quoteIndex].author} <FaQuoteRight className='right' /></p>
            </div>
        </div>
      </>
    );
}

export default Quote
