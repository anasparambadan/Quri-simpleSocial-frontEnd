import React, { useState } from 'react'
import AddPost from './AddPost'
import SinglePost from './SinglePost'
import Posts from './Posts'




const Home = () => {
  
  return (
    <div className='w-3/5 flex flex-col h-screen overflow-auto scrollbar-hide '>

     <AddPost />
      <Posts/> 
     
     
    </div>
  )
}

export default Home