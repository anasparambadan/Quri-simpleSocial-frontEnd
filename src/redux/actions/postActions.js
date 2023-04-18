import * as postApi from '../../api/postRequest'

export const uploadImage = (image)=> async(dispatch)=>{
    dispatch({type:"UPLOAD_START"})
    try {
      const imgUrl =   await postApi.uploadImage(image)
      dispatch({type:"IMG_UPLOAD"})
      return imgUrl.data
    } catch (error) {
        console.log(error)
    }
}

export const uploadPost = (data)=> async(dispatch)=>{
    dispatch({type:"UPLOAD_START"})
    try {
       
        const newPost = await postApi.uploadPost(data)
        dispatch({type:"UPLOAD_SUCCESS",data:newPost.data})
    } catch (error) {
        console.log(error)
        dispatch({type:"UPLOAD_FAIL"})
    }
}
export const editPost = (data,id)=> async(dispatch)=>{
    dispatch({type:"EDIT_START"})
    try {
        const newPost = await postApi.editPost(data,id)
        dispatch({type:"EDIT_SUCCESS", new:newPost.data.posts})
    } catch (error) {
        console.log(error)
        dispatch({type:"EDIT_FAIL"})
    }
}

export const getAllPosts = (id)=> async(dispatch)=>{
    dispatch({type:"RETREIVING_START"});
    try {
        const {data} = await postApi.getAllPosts(id);
        dispatch({type:"RETREIVING_SUCCESS", data:data});
    } catch (error) {
        dispatch({type:"RETREIVING_FAIL"})
        console.log(error)
        
    }
}


export const deletePost = (postId,userId)=>async(dispatch)=>{

    dispatch({type:"DELETE_START"});
    try {
        const newPosts = await postApi.deletePost(postId,userId);
        dispatch({type:"DELETE_SUCCESS",new:newPosts.data.posts});
    } catch (error) {
        dispatch({type:"DELETE_FAIL"})
        console.log(error)
        
    }
}

