import React, { useRef } from 'react'
import { useState } from 'react'
import { RiImageAddFill } from 'react-icons/ri'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage, uploadPost } from '../redux/actions/postActions'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { logout } from '../redux/actions/authActions'


const AddPost = () => {
    const [image, setImage] = useState(null)
    const imageRef = useRef()
    const { user } = useSelector((state) => state.authReducer.authData)
    const dispatch = useDispatch()
    const desc = useRef()

    const imageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setImage(img)

        }
    }

    const reset = () => {
        setImage(null)
        desc.current.value = ""
    }
    const handleSubmit = (e) => {
        e.preventDefault()


        const newPost = {
            userId: user._id,
            caption: desc.current.value
        }
        if (image) {
            const data = new FormData();
            const fileName = Date.now() + image.name;
            data.append("name", fileName)
            data.append("file", image)
            newPost.image = fileName
            try {

                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error)
            }
        }
    

        dispatch(uploadPost(newPost))
        reset()
    }

    const handleLogout = ()=>{
        dispatch(logout())
    }
    return (

        <div className=' rounded-xl mt-2 p-3 backdrop-blur-md bg-white/30  fixed w-3/5 py-5 z-30 '>
            <div className='flex items-center justify-between gap-2'>
                <RiLogoutCircleRLine size={30} className='text-white cursor-pointer hover:text-red-500' onClick={handleLogout} />
                <div className='relative w-4/5'>
                    <input type="text" ref={desc} placeholder='What is in your mind' className='rounded-md  outline-none w-full p-2' required />
                    <RiImageAddFill className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer' size={30} onClick={() => imageRef.current.click()} />
                    <div className='hidden'>

                        <input type="file" name='postImage' ref={imageRef} onChange={imageChange} />
                    </div>

                </div>
                <button className='bg-gray-50 px-3 py-2 bg-gradient-to-bl from-yellow-600 to-red-600 rounded-md text-white' onClick={handleSubmit}>Post</button>

            </div>

            {image &&
                <div className="previwImage relative" >
                    <AiOutlineCloseCircle size={30} onClick={() => setImage(null)} className='cursor-pointer absolute right-3 top-7' />
                    <img src={URL.createObjectURL(image)} alt="" className='w-2/5  object-scale-down pt-5 rounded-md mx-auto' />
                </div>}

        </div>
    )
}

export default AddPost