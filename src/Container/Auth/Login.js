import React, { useEffect, useState } from 'react'
import './Auth.scss';
import { FcGoogle } from 'react-icons/fc'
import { useDispatch } from 'react-redux';
import { change_toast_state } from '../Redux/toast_slice';
import { addError } from '../Redux/Error_slice';
import { addUser } from '../Redux/authentication_slice';
import Axios from 'axios';

const Login = (props) => {


    const dispatch = useDispatch()
    const [selected, setSelected] = useState('login')
    const [classN, setClassN] = useState('main-option-login')
    const [classN2, setClassN2] = useState('main-option-register')

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const checkLogin = () => {

        let formData = new FormData();
        formData.append('email', email)
        formData.append('password', password)


        if (email.trim() === '' || password.trim() === '') {
            dispatch(change_toast_state(true))
            dispatch(addError('all field required'))
        }
        else {

            Axios.post(`http://mi-linux.wlv.ac.uk/~2039106/k/index.php/api/login`,formData)
                .then(resp => resp.data).then(resp => {

                    if(resp==='login failed'){
                        
                        dispatch(change_toast_state(true))
                        dispatch(addError('failed to login'))
                    }else{
                        dispatch(change_toast_state(true))
                        dispatch(addError('success'))
                        props.setInitialState('home')
                        dispatch(addUser({email:email,password:password,authenticated:true}))
                    }
                  
                })

           
          
        }
    }

    const registerUser=()=>{

        let formData = new FormData();
        formData.append('email', email)
        formData.append('password', password)

        if (email.trim() === '' || password.trim() === '') {
            dispatch(change_toast_state(true))
            dispatch(addError('all field required'))
        }
        else {
        Axios.post(`http://mi-linux.wlv.ac.uk/~2039106/k/index.php/api/register`,formData)
        .then(resp => resp.data).then(resp => {

           
            if(resp==='successfully registered'){
                dispatch(change_toast_state(true))
                dispatch(addError('success'))
                
            }else{
                dispatch(change_toast_state(true))
                dispatch(addError('user already exist'))
            }
          
        })
    }
    }

    return (
        <div className='main'>
            <div className='main-option'>
                <div className={classN} >
                    <p className={`${classN}-p`} onClick={() => {
                        setSelected('login')
                        setClassN('main-option-login')
                        setClassN2('main-option-register')
                    }}>login</p>
                </div>

                <div className={classN2}>
                    <p  className={`${classN2}-p`} onClick={() => {
                        setSelected('register')
                        setClassN('main-option-login2')
                        setClassN2('main-option-register2')
                    }}>register</p>
                </div>

            </div>


            {selected === 'login' ?
                <div className='main-second'>
                    <div className='main-second-gmail'>
                        <FcGoogle className='main-second-gmail-icon'></FcGoogle>
                        <p className='main-second-gmail-text'>login with gmail</p>
                    </div>
                    <div className='main-second-mid'>
                        <p className='main-second-mid-text'>or</p>
                    </div>
                    <input placeholder='email' value={email} onChange={(text) => setEmail(text.target.value)} className='main-second-email'></input>
                    <input placeholder='password' className='main-second-password' value={password} onChange={(text) => setPassword(text.target.value)} />
                    <button className='main-second-btn' onClick={() => checkLogin()}>login</button>
                </div> :
                <div className='main-second'>
                    <div className='main-second-gmail'>
                        <FcGoogle className='main-second-gmail-icon'></FcGoogle>
                        <p className='main-second-gmail-text'>Sign up with gmail</p>
                    </div>
                    <div className='main-second-mid'>
                        <p className='main-second-mid-text'>or</p>
                    </div>
                    <input onChange={(text)=>setEmail(text.target.value)} placeholder='email' className='main-second-email'></input>
                    <input onChange={(text)=>setPassword(text.target.value)} placeholder='password' className='main-second-password' />
                    <button className='main-second-btn' onClick={()=>registerUser()}>Sign up</button>
                </div>}
        </div>
    )
}


export default Login;