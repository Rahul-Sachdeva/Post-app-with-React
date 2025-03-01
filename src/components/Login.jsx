import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {login as authLogin, logout} from '../store/authSlice.js'
import {Button, Input, Logo} from "./index.js"
import authService from '../appwrite/auth.js'
import {useForm} from 'react-hook-form';
import { useDispatch } from 'react-redux'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) =>{
        setError("")
        try{
            const session = await authService.login(data)
            if(session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData))
                console.log(userData)
                navigate("/")
            }
        }
        catch(error){
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center w-full'>
        <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width="100%"/>
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to Your Account</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                Dont&apos;t have any account?$nbsp:
                <Link 
                to='./signup'
                className='font-medium text-primary'
                transition: underline>
                    Sign Up
                </Link>
            </p>
            {error && <p className='test-red-600 mt-8 text-center'>{error}</p>}
            {/* // handleSubmit is used for giving a function to be used on submit
            //using register we need not manage the states for the values used while handleSubmit  */}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                    label="Email: "
                    placeholder="Enter Your Email"
                    type="email"
                    {...register("email", {
                        required: true, 
                        validate: {
                            matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                            // This is regular Expression for more, you may consult regexr.com or chatgpt
                        }
                    })}
                />
                <Input 
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password",{
                    required: true
                })}
                />
                <Button type='submit' className='w-full'>Sign in</Button>
                </div>
            </form> 
        </div>
    </div>
  )
}

export default Login
