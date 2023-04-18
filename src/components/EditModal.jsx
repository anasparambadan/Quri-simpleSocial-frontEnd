import React, { useRef, useState } from 'react'
import { FcRemoveImage } from 'react-icons/fc'
import { FcEditImage } from 'react-icons/fc'
import { editPost, uploadImage } from '../redux/actions/postActions'
import { useDispatch, useSelector } from 'react-redux'



const EditModal = (props) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authReducer.authData)
    const [postData, setPostData] = useState(props.data)
    const postId = postData._id
    const [image, setImage] = useState(props.data.image)
    const [images, setImages] = useState(null)
    const imageRef = useRef()
    const [captioin, setCaptioin] = useState(postData.caption)
  
    const imageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setImages(img)

        }
    }
    const handleChange = (e) => {
        setCaptioin(e.target.value)
    }
    const handleImages =()=>{
        setImage(null)
        setImages(null)
    }
    const reset = () => {
        props.modalState()
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }

    
const handleSubmit = async (e) => {
    e.preventDefault()

    const newPost = {
        userId: user._id,
        caption: captioin,
        image:image
    }
    if (images) {
        try {
            const base64 = await convertBase64(images);
            const imgUrl = await dispatch(uploadImage({ image: base64 }))
            newPost.image = imgUrl
        } catch (error) {
            console.log(error)
        }
    }
   
    dispatch(editPost(newPost,postId))
    reset()
}
 


    return (
        <div> <div>
            <div className="relative z-40 " aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-blue-200 px-4 pb-4 pt-5 sm:p-6 max-h-fit sm:pb-4 " >
                                <div className="sm:flex sm:items-start">

                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Edit Post</h3>
                                        <div className="mt-2 flex flex-col  gap-2 ">
                                            <label htmlFor="caption" className='ml-2'>Caption :</label>
                                            
                                            <input type="text" onChange={handleChange} value={captioin} name='caption' className=  'border-b-orange-500 rounded-md p-2 mx-2 ' />
                                            <div className='relative '>
                                                <FcRemoveImage className='absolute right-1 cursor-pointer mt-2 bg-gray-600 rounded-2xl p-1' size={30} onClick={handleImages} />
                                                
                                                <FcEditImage className='absolute right-10 bg-gray-600 cursor-pointer  mt-2 rounded-2xl p-1' size={30} onClick={() => imageRef.current.click()} />
                                                
                                                <div className='hidden'>
                                                    <input type="file" name='postImage' ref={imageRef} onChange={imageChange} />
                                                </div>

                                                <div className='p-2 underline'>
                                                <h6>Image: </h6>
                                                {images ? <img src={URL.createObjectURL(images)} alt="" />:<img src={props.data.image ? image : ""} alt="" />}

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={handleSubmit}>Update</button>
                                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={props.modalState} >Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div></div>
    )
}

export default EditModal