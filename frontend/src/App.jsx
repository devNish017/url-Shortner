import { useState } from 'react'
import './App.css'
import axios from "axios"

function App() {
  const [url,setUrl]=useState('');
  const [shortUrl,setShortUrl]=useState('');
  const kiss=async()=>{
    try{
 const res= await  axios.post("http://localhost:2000/shorten",{
    originalUrl:url
   })
   setShortUrl(res.data.shortUrl);
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <>
    <div className="h-screen grid place-items-center bg-slate-600">
   
      
        
        <div className="flex flex-col gap-4 items-center">
           <h2 className='text-center font-extrabold text-9xl mb-20 mr-8 text-slate-400'> URL shortner</h2>
          
          <div className="flex gap-2">
            <input 
              type="text" 
              className=" h-10 w-80 bg-slate-100 outline-none rounded-xl  px-2" 
                value={url}
            onChange={(e)=>setUrl(e.target.value)}
              placeholder="enter your url here"
            />
            <button onClick={kiss}
          
             className="bg-white rounded-3xl w-min px-5.5 py-1.5  cursor-pointer">Search</button>
          </div>

          <div>
           {shortUrl && (
    <a
      href={shortUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="-ml-18 mt-3 text-white  rounded-xl w-80 text-center 
                 cursor-pointer transition-all duration-300 ease-in-out 
                 hover:scale-150 hover:underline  block"
    >
      {shortUrl}
    </a>)}
          </div>

        </div>

      </div>
    </>
  )
}

export default App