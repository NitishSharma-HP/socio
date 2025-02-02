import React, { useState } from "react";
import styles from "./Roles.module.css";
import useApiService  from '../../services/ApiService';
import ToastView from '../toast/ToastView';
import { useToast } from '../../utils/toast/ToastContext';
import { useNavigate } from 'react-router-dom'

const FormComponent = () => {
    const navigate = useNavigate();
    const { get, post } = useApiService();
    const [showToast, setShowToast] = useState(false)
    const { addToast, deleteToast } = useToast();
    const [formData, setFormData] = useState({
        id: "",
        role: "",
        permissions: {
            view: false,
            add: false,
            edit: false,
            delete: false,
        },
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormData((prevData) => ({
                ...prevData,
                permissions: {
                    ...prevData.permissions,
                    [name]: checked,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowToast(false);
        try {
            const url = process.env.REACT_APP_AUTH_BASE_URL;
            const response = await post(`${url}/api/role/roles`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }
            )
            if (!response.success) {
                addToast(response?.error);
                deleteToast(4000);
            } else {
                addToast(response?.data?.message);
                deleteToast(3000);
                setTimeout(() => {
                    navigate('/')
                }, 3000)
            }
            setShowToast(true)
        } catch (error) {
            console.error("There was an error submitting the form:", error);
        }
    };

    return (
        <>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>Back</button>
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
                <label htmlFor="id">ID:</label>
                <input
                    type="number"
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="role">Role:</label>
                <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>

            <div className={styles.inputGroup}>
                <label>Permissions:</label>
                <div className={styles.checkboxGroup}>
                    <label>
                        <input
                            type="checkbox"
                            name="view"
                            checked={formData.permissions.view}
                            onChange={handleChange}
                        />
                        View
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="add"
                            checked={formData.permissions.add}
                            onChange={handleChange}
                        />
                        Add
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="edit"
                            checked={formData.permissions.edit}
                            onChange={handleChange}
                        />
                        Edit
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="delete"
                            checked={formData.permissions.delete}
                            onChange={handleChange}
                        />
                        Delete
                    </label>
                </div>
            </div>

            <button type="submit" className={styles.submitButton}>
                Submit
            </button>
        </form>
        </>
    );
};

export default FormComponent;
