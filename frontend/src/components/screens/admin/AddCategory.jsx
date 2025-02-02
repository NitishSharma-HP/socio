import React, { useState, useEffect } from 'react';
import styles from './AddCategory.module.css';
import useApiService  from '../../../services/ApiService';
import { useToast } from '../../../utils/toast/ToastContext';
import ToastView from '../../toast/ToastView';
import { useNavigate } from 'react-router-dom';

const FormComponent = () => {
    const navigate = useNavigate();
    const { get, post } = useApiService();
    const [showToast, setShowToast] = useState(false)
    const { addToast, deleteToast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null,
        productsCount: '',
        isActive: 1,
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    //handle file Change
    const handleFileChange = (e) =>{
        const {name, files} = e.target;
        setFormData((prevData)=> ({...prevData, [name]:files[0]}))
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        //if want to send file, use form data. It automatically set content type to 'multipart/form-data'
        let newFormData = new FormData();
        newFormData.append('name', formData.name);
        newFormData.append('description', formData.description);
        newFormData.append('image', formData.image);
        newFormData.append('isActive', formData.isActive);
        
        const url = process.env.REACT_APP_PRODUCT_BASE_URL;
        try {
            const response = await post(`${url}/product/add-category`, {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                body: newFormData,
            })
            if (!response.success) {
                addToast(response?.error);
                deleteToast(4000);
            } else {
                addToast(response?.data?.message);
                deleteToast(4000);
                setTimeout(()=>{
                    navigate(-1);
                },2000);
            }
            setShowToast(true)
        } catch (error) {
            alert('Error occurred while submitting the form');
            console.error(error);
        }
    };

    return (
        <div>
            {showToast && <ToastView />}
            <button className={styles.backBtn} onClick={()=>navigate(-1)}>Back</button>
            <form onSubmit={handleSubmit} className={styles.formContainer} encType='multipart/form-data'>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept='image/*'
                        onChange={handleFileChange}
                    />
                </div>

                <div>
                <label htmlFor="isActive">Is Active:</label>
                    <input
                        type='radio'
                        id="isActive"
                        name="isActive"
                        value="1"
                        required
                        onChange={handleChange}
                    />
                    Yes
                    <input
                        type='radio'
                        id="isActive"
                        name="isActive"
                        value="0"
                        onChange={handleChange}
                    />
                    No
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FormComponent;
