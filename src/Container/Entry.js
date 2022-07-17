import '../App.scss';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Product } from './Product';
import Login from './Auth/Login';
import React, { useEffect, useState } from 'react';
import { Filter } from './Filter';
import { AiFillMinusCircle, AiFillSetting } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { addAllItem, deleteFromCart } from './Redux/cart_slice';
import { addUser, deleteUser } from './Redux/authentication_slice';
import { Toast } from './Toast/Toast';
import { AdminPage } from './AdminPage';
import { addError } from './Redux/Error_slice';
import { change_toast_state } from './Redux/toast_slice';




const Entry = () => {

  const { cart } = useSelector(state => state.cart)
  const { auth } = useSelector(state => state.auth)

  const [initialState, setInitialState] = useState('home')
  const dispatch = useDispatch();
  const json = localStorage.getItem('cart')
  const value = JSON.parse(json)

  const [setting, setSetting] = useState(false)
  const [openCart, setOpenCart] = useState(false)

  //authentication
  const json2 = localStorage.getItem('user')
  const value2 = JSON.parse(json2)

  const { toast } = useSelector(state => state.toast)

  const [cartClass,setCartClass]=useState('header-left-cart')
  const [cartClass2,setCartClass2]=useState('header-left-cart2')

  useEffect(() => {
    dispatch(addAllItem(value))
    dispatch(addUser(value2))
    console.log(value)

  }, [])
  return (

    <>
      {toast === true ? <Toast /> : null}
      <div className='header'>

        <h2 className='header-title'>EasyBuy</h2>
        <div className='header-left'>

         
          <AiOutlineShoppingCart className={cart.length>0? cartClass2:cartClass} onMouseLeave={() => setOpenCart(false)} onMouseEnter={() => setOpenCart(true)} ></AiOutlineShoppingCart>

          {openCart === true ?
            <div className='header-left-items' onMouseLeave={() => setOpenCart(false)} onMouseEnter={() => setOpenCart(true)} >
              {cart.length > 0 ?
                cart.map((c, i) => {
                  return (
                    <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }} >
                      <AiFillMinusCircle size={20} onClick={() => dispatch(deleteFromCart(c.id))} />
                      <p style={{ marginLeft: 20, fontSize: 15 }}>{c.name}</p>
                    </div>
                  )
                })
                :
                <div  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }} >  <p>cart is empty</p>
                </div>}
            </div> : null}

          <AiFillSetting className='header-left-setting' onMouseLeave={() => setSetting(false)} onMouseEnter={() => setSetting(true)} />
          {setting === true ?
            <div className='header-left-user' onMouseLeave={() => setSetting(false)} onMouseEnter={() => setSetting(true)} >
              {auth ? auth.authenticated === true ? <p>{auth.email}</p> : <p>sign in</p> : <p onClick={() => setInitialState('login')}>sign in</p>}
              {auth && auth.authenticated === true ? <p className='header-left-user-logout' onClick={() => {
                dispatch(deleteUser())
                dispatch(change_toast_state(true))
                dispatch(addError('success'))


              }}>logout</p> : null}
            </div> : null}

        </div>

      </div>
      <Filter setInitialState={setInitialState} />
      {initialState === 'home' ? <Product /> : initialState === 'admin' ? <AdminPage /> : <Login setInitialState={setInitialState} />}
    </>

  )
}

export default Entry;
