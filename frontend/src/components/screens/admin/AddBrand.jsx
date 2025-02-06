import React, { useState, useEffect } from 'react';
import styles from './AddBrand.module.css';
import { useToast } from '../../../utils/toast/ToastContext';
import useApiService  from '../../../services/ApiService';
import ToastView from '../../toast/ToastView';
import { useNavigate } from 'react-router-dom';

const FormComponent = () => {
    const url = process.env.REACT_APP_PRODUCT_BASE_URL;
    const navigate = useNavigate();
    const { get, post } = useApiService();
    const [showToast, setShowToast] = useState(false)
    const { addToast, deleteToast } = useToast();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null,
        prodCategoryId: '',
        isActive: 1,
    });

        useEffect(()=>{
            getCategoriesList();
        },[]);
    
        //get categories for dropdown
        const getCategoriesList = async () => {
            const response = await get(`${url}/product/get-category`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            )
            if (!response.success) {
                addToast(response?.error);
                deleteToast(4000);
            } else {
                setCategories(response?.data?.data)
            }
        }

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
        newFormData.append('prodCategoryId', formData.prodCategoryId);
        newFormData.append('image', formData.image);
        newFormData.append('isActive', formData.isActive);

        try {
            const response = await post(`${url}/product/add-brand`, {
                method: 'POST',
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
                    <label htmlFor="image">Brand Logo:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept='image/*'
                        onChange={handleFileChange}
                    />
                </div>

                <div> 
                    <label htmlFor="prodCategoryId"> Category:</label>
                    <select id="prodCategoryId" name="prodCategoryId" onChange={handleChange} required>
                    <option value="">Select a category</option>
                        {categories.map((item)=>{
                            return <option key = {item._id} value={item._id}>{item.name}</option>  
                        })}
                    </select>
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
