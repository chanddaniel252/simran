import React, { useEffect, useState } from 'react'
import './Product.scss';
import { AiFillDelete } from 'react-icons/ai'
import { IoMdAddCircle,IoMdArrowBack } from 'react-icons/io'
import { useDispatch } from 'react-redux';

import { change_toast_state } from './Redux/toast_slice';
import { addError } from './Redux/Error_slice';
import Axios from 'axios';



const products = require('./product.json')
export const AdminPage = () => {


    const adminName = 'admin';
    const adminPassword = 'admin';


    const [authenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [data, setData] = useState([]);
    const dispatch = useDispatch()
    const value = localStorage.getItem('admin');
    const [addProduct, setAddProduct] = useState(false)
    const [editProduct, setEditProduct] = useState(false)
    const [productId,setProductId]=useState()


    //product details
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [url, setUrl] = useState()
    useEffect(() => {

        if (value === 'authenticated') {
            setAuthenticated(true)
        }
        Axios.get('http://mi-linux.wlv.ac.uk/~2039106/k/index.php/api/weathers')
            .then(resp => resp.data).then(resp => setData(resp))
           

            localStorage.removeItem('admin')

    }, [])


    const addNewProduct = () => {
        let formData = new FormData();
        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('url', url)
        const date= new Date();
        formData.append('post_date',date)

        Axios.post('http://mi-linux.wlv.ac.uk/~2039106/k/index.php/api/add/weather', formData)
            .then(() => {

                Axios.get('http://mi-linux.wlv.ac.uk/~2039106/k/index.php/api/weathers')
                    .then(resp => resp.data).then(resp => setData(resp))
                dispatch(change_toast_state(true))
                dispatch(addError('success'))
                setAddProduct(false)

            })
            .catch(er => console.log(er))

    }

    
    const updateProduct = () => {
        let formData = new FormData();
        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('url', url)
        const date= new Date();
        formData.append('post_date', date)

        

      Axios.post(`http://mi-linux.wlv.ac.uk/~2039106/k/index.php/api/update/weather/${productId}`,formData)
            .then(() => {

                Axios.get('http://mi-linux.wlv.ac.uk/~2039106/k/index.php/api/weathers')
                    .then(resp => resp.data).then(resp => setData(resp))
                dispatch(change_toast_state(true))
                dispatch(addError('success'))
                setEditProduct(false)

            })
            .catch(er => console.log(er))

    }

    const deleteFromCart = (id) => {




        Axios.get(`http://mi-linux.wlv.ac.uk/~2039106/k/index.php/api/delete/weather/${id}`)
            .then(() => {

                dispatch(change_toast_state(true))
                dispatch(addError('success'))
                Axios.get('http://mi-linux.wlv.ac.uk/~2039106/k/index.php/api/weathers')
                    .then(resp => resp.data).then(resp => setData(resp))

            })


    }

    const verifyAdmin = () => {
        if (username === adminName) {
            if (password === adminPassword) {
                dispatch(change_toast_state(true))
                dispatch(addError('success'))
                setAuthenticated(true)

                localStorage.setItem('admin', 'authenticated')
            } else {
                dispatch(change_toast_state(true))
                dispatch(addError('failed to login'))
            }
        } else {
            dispatch(change_toast_state(true))
            dispatch(addError('failed to login'))
        }
    }

    return (


        authenticated === true ?
          
            addProduct === true ?
             
            <div className='main'>
            <div className='main-option'>

             <IoMdArrowBack className='main-option-back' onClick={()=>setAddProduct(false)}/>
            </div>

            <div className='main-second'>

                <input value={name} placeholder='product name' className='main-second-email' onChange={(text) => setName(text.target.value)}></input>
                <input value={price} placeholder='price' className='main-second-password' onChange={(text) => setPrice(text.target.value)} />
                <input value={description} placeholder='description' className='main-second-email' onChange={(text) => setDescription(text.target.value)}></input>
                <input value={url} placeholder='image url' className='main-second-password' onChange={(text) => setUrl(text.target.value)} />
                <button className='main-second-btn' onClick={() => addNewProduct()}>Add</button>
            </div>

        </div> :  editProduct===true?  <div className='main'>
        <div className='main-option'>
        <IoMdArrowBack className='main-option-back' onClick={()=>setEditProduct(false)}/>
        </div>
        <div className='main-second'>

            <input value={name} placeholder='product name' className='main-second-email' onChange={(text) => setName(text.target.value)}></input>
            <input value={price} placeholder='price' className='main-second-password' onChange={(text) => setPrice(text.target.value)} />
            <input value={description} placeholder='description' className='main-second-email' onChange={(text) => setDescription(text.target.value)}></input>
            <input value={url} placeholder='image url' className='main-second-password' onChange={(text) => setUrl(text.target.value)} />
            <button className='main-second-btn' onClick={() => updateProduct()}>Edit</button>
        </div>

    </div>:
                <div className='body'>

                    <IoMdAddCircle className='body-add' onClick={() => 
                    {
                    setAddProduct(true)
                    
                    setProductId('')
                    setDescription('')
                    setPrice('')
                    setUrl('')
                    setName('')
                    }
                    }  style={{zIndex:1}}/>
                    {data.map((product, index) => {
                        return <div key={index} className='body-card'>

                            <div className='body-card-circle'>
                                <AiFillDelete className='body-card-circle-heart' onClick={() => {
                                    deleteFromCart(product.id)
                                   


                                }} />
                            </div>
                            <img className='body-card-img' src={product.url} alt='img'>
                            </img>
                            <div className='body-card-details'>
                                <h3 className='body-card-details-desc'>{product.description.substring(0, 40)}..</h3>
                                <p className='body-card-details-price'>{product.price}£</p>
                              
                                    <p className='body-card-details-edit' onClick={()=>{
                                        setEditProduct(true)
                                        setProductId(product.id)
                                        setDescription(product.description)
                                        setPrice(product.price)
                                        setUrl(product.url)
                                        setName(product.name)
                                        
                                    }}>Edit</p>

                            </div>

                        </div>
                    })}
                </div>

            :
            <div className='admin'>
                <input placeholder='username' onChange={(text) => setUsername(text.target.value)} className='admin-input'></input>
                <input placeholder='password' onChange={(text) => setPassword(text.target.value)} className='admin-input'></input>
                <button className='admin-button' onClick={() => verifyAdmin()}>Verify</button>
            </div>



    )
}
