import React, { useEffect, useState } from 'react'
import './Product.scss';
import {FaClock,FaLocationArrow} from 'react-icons/fa'
import {AiOutlineHeart} from 'react-icons/ai'
import Loading from './Loading';
import { useDispatch,useSelector } from 'react-redux';
import { addItem } from './Redux/cart_slice';
import { change_toast_state } from './Redux/toast_slice';
import { addError } from './Redux/Error_slice';

import Axios from 'axios'

const products = require('./product.json')
export const Product = () => {

   
    const {auth}=useSelector(state=>state.auth)

   
    const [data, setData] = useState([]);
    const [loading,setLoading]=useState(false)
    const [selected,setSelected]=useState();
    const dispatch=useDispatch()
  
 
    useEffect(() => {
        setLoading(false)
        Axios.get('http://mi-linux.wlv.ac.uk/~2039106/k/index.php/api/weathers')
        .then(resp => resp.data).then(resp => setData(resp))

      
       

    }, [])

    const addToCart=(name,product)=>{
       
       if(auth!=null){
        setLoading(true)
        setSelected(name)
        dispatch(addItem(product))
        
       setTimeout(()=>{
       
        setLoading(false)
        dispatch(change_toast_state(true))
        dispatch(addError('success'))
      
       
       },3000)
       }
       else{
       
        dispatch(change_toast_state(true))
        dispatch(addError('sign in to continue'))
        
       }
       
      
    }
    

    return (
        <div className='body'>
          
            {
                data.map((product, index) => {
                    return <div key={index} className='body-card'>
                         {loading===true? selected===product.name? <div className='loading'><Loading/></div>:null:null}
                        <div className='body-card-circle'>
                        <AiOutlineHeart  className='body-card-circle-heart' onClick={()=>{
                            addToCart(product.name,product)
                            
                           
                        }}/>
                            </div>
                        <img className='body-card-img' src={product.url} alt='img'>
                        </img>
                        <div className='body-card-details'>
                            <h3 className='body-card-details-desc'>{product.description.substring(0, 40)}..</h3>
                            <p className='body-card-details-price'>Nprs. {product.price}</p>
                            
                           <p className='body-card-details-date'>
                           <FaClock className='body-card-details-date-icon'></FaClock>{product.post_date.substring(0,15)}</p>
                          
                        </div>
                    </div>
                })
            }

           
        </div>
    )
}
