import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoMdOptions } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../redux/actions/postActions';
import EditModal from './EditModal';


const SinglePost = ({ data }) => {

  const [showModal, setShowModal] = useState(false)

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  const [postData, setPostData] = useState(null)


  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);

  };

  const postDelete = (e) => {

    e.preventDefault()
    dispatch(deletePost(data._id, user._id))


    setAnchorEl(null);
  }
  const postEdit = () => {
    setPostData(data)
    setShowModal((prev) => !prev)

    //  dispatch (editPost(data._id,user._id))
    setAnchorEl(null);
  }
  const handleModal = () => setShowModal((prev) => !prev)


  return (


    <div className=" flex flex-col p-4 bg-gradient-to-t from-gray-100 to-gray-300 rounded-lg gap-4 ">

      {showModal && <EditModal data={postData} modalState={handleModal} />}


      <div className='top'>
        <div className='flex justify-end'>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <IoMdOptions size={25}/>
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {data.userId === user._id && <MenuItem onClick={postDelete}>Delete</MenuItem>}
            {data.userId === user._id && <MenuItem onClick={postEdit}>Edit</MenuItem>}

          </Menu>
        </div>

      </div>




      <img className=' max-h-96 object-contain  rounded-md'
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />
      <div className="detail flex justify-start">
        <span>{data.caption}</span>
      </div>
    </div>
  )
}

export default SinglePost