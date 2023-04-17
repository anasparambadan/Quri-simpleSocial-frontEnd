import React, { useState } from 'react'
import loginImg from '../assets/loginImg.jpg'
import { BsEye } from 'react-icons/bs'
import {signup } from '../redux/actions/authActions'
import { useFormik } from "formik"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signUpSchema = Yup.object({
        firstName: Yup.string().min(2).max(25).required("Please enter your First name"),
        lastName: Yup.string().min(1).max(25).required("Please enter your Last name"),
        email: Yup.string().email().required("Please enter your Email"),
        password: Yup.string().min(3).required("Please enter your Password"),
        confirmpass: Yup.string().required().oneOf([Yup.ref('password'), null], "Password Must match")
    })

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmpass: '',
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema,
        onSubmit: (values, action) => {

           
            dispatch(signup(values))

            action.resetForm()
        },
        onClick: (action) => {
            action.resetForm()
        }
    })
    const handleLogin = () => {
        navigate('/login')
    }



    return (
        <div>
            <section className=' min-h-screen flex items-center justify-center'>
                <div className='bg-gray-100 flex rounded-2xl shadow-lg max-w-2xl p-5 items-center'>

                    <div className='md:w-1/2 px-8'>
                        <h2 className='font-bold text-2xl'>Sign Up</h2>
                        <form action="" className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
                            <input type="text"
                                placeholder='Firstname'
                                name='firstName'
                                 className='p-2 border rounded-xl mt-8 errorText'
                                 value={values.firstName}
                                 onChange={handleChange}
                                 onBlur={handleBlur}/>

                                 {errors.firstName && touched.firstName ? (
                                    <span className="form-error">{errors.firstName}</span>) : null}

                            <input type="text"
                                placeholder='Lastname'
                                name='lastName'
                                className='p-2 border rounded-xl errorText'
                                value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                            />
                             {errors.lastName && touched.lastName ? (
                                    <span className="form-error">{errors.lastName}</span>) : null}
                             <input type="text"
                                placeholder='Email'
                                name="email"
                                id='email'
                                className=' p-2 border rounded-xl errorText '
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                             {errors.email && touched.email ? (
                                <span className="form-error">{errors.email}</span>) : null}

                            <div className='relative'>
                                <input type="password"
                                    placeholder='Password'
                                    id='password'
                                    name="password"
                                    className='p-2 border rounded-xl w-full errorText '
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <BsEye className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer" />
                                
                            </div>
                            {errors.password && touched.password ? (
                                <span className="form-error">{errors.password}</span>) : null}

                            <div className='relative'>
                                <input type="password"
                                    placeholder='Confirm password'
                                    id='confirmpass'
                                    name="confirmpass"
                                    className='p-2 border rounded-xl errorText w-full '
                                    value={values.confirmpass}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <BsEye className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer" />
                                
                            </div>
                            {errors.confirmpass && touched.confirmpass ? (
                                <span className="form-error">{errors.confirmpass}</span>) : null}

                        
                            <button className='bg-gray-800 rounded-xl text-white py-2 ' type='submit'>Sign Up</button>
                        </form>
                        <div className='mt-3 '><hr /></div>
                        <div className='text-sm flex items-center justify-around mt-3'>
                            <p className='text-sm'>Already have an account?</p>
                            <button className='py-2 px-5 bg-gray-200 border rounded-xl' onClick={handleLogin}>Login</button>
                        </div>
                    </div>

                    <div className='w-1/2 md:block hidden  '>
                        <img src={loginImg} alt="" className='rounded-2xl ' />
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Signup