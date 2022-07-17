import React,{useEffect} from 'react'
import './Toast.scss'
import {TiWarning} from 'react-icons/ti'
import { change_toast_state } from '../Redux/toast_slice'
import { useDispatch,useSelector } from 'react-redux';

export const Toast = () => {

  const {error}=useSelector(state=>state.error)
  const dis=useDispatch()
  useEffect(()=>{

     setTimeout(()=>{
      dis(change_toast_state(false))
     },1000)

  },[])
  return (
    <div className='toast'>
        <TiWarning className='toast-icon' style={{color:error==='success'?'green':'red'}}/>
        <p className='toast-message'>{error}</p>
    </div>
  )
}
