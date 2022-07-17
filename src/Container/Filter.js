import React from 'react'
import './Filter.scss'
import { useSelector, useDispatch } from 'react-redux';
import { change_toast_state } from './Redux/toast_slice';
import { addError } from './Redux/Error_slice';

export const Filter = (props) => {

  const { auth } = useSelector(state => state.auth)
  const dispatch = useDispatch()




  const logoutToContinue = () => {

    dispatch(change_toast_state(true))
    dispatch(addError('sign out client account'))

  }

  return (
    <div className='filter'>
      <p className='filter-1' onClick={() => props.setInitialState('home')}>electronic items</p>
      <p className='filter-1' onClick={() => props.setInitialState('home')}>pets</p>
      <p className='filter-1' onClick={() => props.setInitialState('home')}>kitchen items</p>
      <p className='filter-1' onClick={() => {

        {
          auth != null ?
          logoutToContinue() : props.setInitialState('admin')
        }

      }}>Admin?</p>

      {auth != null ?
        null : <p className='filter-1' onClick={() => props.setInitialState('login')}>Login/Register</p>}



    </div>
  )
}
