import AddPost from './AddPost'
import Posts from './Posts'




const Home = () => {
  
  return (
    <div className='w-full mx-4 sm:w-3/5 flex flex-col h-screen overflow-auto scrollbar-hide '>

     <AddPost />
      <Posts/> 
     
     
    </div>
  )
}

export default Home