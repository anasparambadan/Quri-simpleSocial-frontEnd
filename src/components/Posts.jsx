import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SinglePost from './SinglePost'
import { getAllPosts } from '../redux/actions/postActions'


const Posts = () => {
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.authReducer.authData)
  const {posts} = useSelector((state)=>state.postReducer)

  
  const getUserPosts = ()=>{
    dispatch(getAllPosts(user._id))
  }
  useEffect(() => {
    getUserPosts()
 
  }, [])
  
  
  return (
    <div className='flex flex-col gap-8 mt-2'>
      {posts.map((post)=>{
        return <SinglePost data = {post} key={post._id} />
      })}
    </div>
  )
}

export default Posts