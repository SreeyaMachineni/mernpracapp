import { useState,useEffect } from "react"
import {FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import Spinner from "../components/Spinner"

const Register = () => {

    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })

    const {name,email,password,password2} = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state)=>state.auth)

    
    useEffect(()=>{
        if(isError){
            toast.error(message)
        }  
        if(isSuccess || user){
            navigate('/')
        }

        dispatch(reset())
    },[user,isError,isLoading,isSuccess,message,dispatch,navigate])
    
    const onChange = (e) => {
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        // console.log(formData)
        if(password !== password2){
            toast.error('passwords dont match')
        }else{
            const userData = {name,email,password}
            dispatch(register(userData))
        }
    }

    if(isLoading){
        return (<Spinner/>)
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser/> Register
                </h1>
                <p>Please create an account</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" 
                            id="name" name="name" value={name} onChange={onChange}
                            placeholder="Enter name"/>
                    </div>
                    
                    <div className="form-group">
                        <input type="email" className="form-control" 
                            id="email" name="email" value={email} onChange={onChange}
                                placeholder="Enter email"/>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" 
                            id="password" name="password" value={password} onChange={onChange}
                                placeholder="Enter password"/>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" 
                            id="password2" name="password2" value={password2} onChange={onChange}
                                placeholder="Confirm Password"/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Register</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register