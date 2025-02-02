import React, { useEffect, useState } from 'react';
import styles from './AddProd.module.css';
import useApiService  from '../../../services/ApiService';
import { useToast } from '../../../utils/toast/ToastContext';
import ToastView from '../../toast/ToastView';
import { useNavigate } from 'react-router-dom';

const FormComponent = () => {
    const url = process.env.REACT_APP_PRODUCT_BASE_URL;
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false)
    const { addToast, deleteToast } = useToast();
    const { get, post } = useApiService();
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        prodCategoryId: '',
        image: '',
        brandId: '',
        isActive: 1,
        discount: '',
        price: '',
    });
    
    useEffect(()=>{
        getCategoriesList();
        getBrandsList();
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
            setErrors((prev)=>setErrors(...prev,response.error));
        } else {
            setCategories(response?.data?.data)
        }
    }

    //get brands for dropdown
    const getBrandsList = async () => {
        const response = await get(`${url}/product/get-brand`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        if (!response.success) {
            setErrors((prev)=>setErrors(...prev,response.error));
        } else {
            setBrands(response?.data?.data)
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

    //handle file upload
    const handleFileChange = (e) =>{
        const {name, files} = e.target;
        setFormData((prevData)=> ({...prevData, [name]: files[0]}))
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        let newFormData = new FormData();
        newFormData.append('name', formData.name);
        newFormData.append('description', formData.description);
        newFormData.append('image', formData.image);
        newFormData.append('isActive', formData.isActive);
        newFormData.append('brandId', formData.brandId);
        newFormData.append('prodCategoryId', formData.prodCategoryId);
        newFormData.append('price', formData.price);
        try {
            const response = await post(`${url}/product/add-product`, {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                body: newFormData,
            });
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
            console.log(error)
        }
    };

    return (
        <div>
            {showToast && <ToastView />}
            <button className={styles.backBtn} onClick={() => navigate(-1)}>Back</button>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
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
                        required
                    />
                </div>

                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        accept='image/*'
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                    />
                </div>

                <div> 
                    <label htmlFor="prodCategoryId"> Category:</label>
                    <select id="prodCategoryId" name="prodCategoryId"  onChange={handleChange} required>
                    <option value="">Select a category</option>
                        {categories.map((item)=>{
                            return <option key = {item._id} value={item._id}>{item.name}</option>  
                        })}
                    </select>
                </div>

                <div> 
                    <label htmlFor="brandId"> Brand:</label>
                    <select id="brandId" name="brandId"  onChange={handleChange} required>
                    <option value="">Select a brand</option>
                        {brands.map((item)=>{
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
