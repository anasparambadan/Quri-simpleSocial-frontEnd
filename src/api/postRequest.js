import axios from 'axios'

const API = axios.create({baseURL:process.env.REACT_APP_BASE_URL})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('user')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }
    return req;
})

export const uploadImage = (image)=> API.post('/upload',image)
export const uploadPost = (data)=> API.post('/post',data)
export const editPost = (data,id)=> API.put(`/post/${id}`,data)
export const getAllPosts = (id)=> API.get(`/post/${id}/allPosts`)
export const deletePost = (postId,userId) => API.post(`/post/${postId}`,{userId})