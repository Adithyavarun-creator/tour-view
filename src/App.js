import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'

function App() {
  const [loading,setloading] = useState(true); 
  const [tours, settours] = useState([]);
  

  const fetchtours = async() =>{
    setloading(true)

    try {
    const response = await fetch(url)
    const tourdetails = await response.json();
    console.log(tourdetails)
    setloading(false)
    settours(tourdetails)
    }catch(error){
      setloading(false)
      //console.log(error)
    }
    
  }

  const removetour = (id) =>{
    const newtours = tours.filter((tour)=> tour.id!==id)
    settours(newtours)
  }


  useEffect(()=>{
    fetchtours()
  },[])

  if(loading){
    return <main>
      <Loading />
    </main>
  }

  if(tours.length===0){
    return <main>
      <div className='title'>
      <h2>No Tours Left</h2>
      <button className="btn" onClick={fetchtours}>Refresh Again</button>
      </div>
    </main>
  }
else{
  return <main>
    <Tours tours= {tours}
    removetourist = {removetour}/>
  </main>
}
}

export default App
