import React, { useState, useEffect, useCallback } from 'react';
import styles from './Login.module.css';
import useApiService  from '../../services/ApiService';
import ToastView from '../toast/ToastView';
import { useToast } from '../../utils/toast/ToastContext';
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const url = process.env.REACT_APP_AUTH_BASE_URL
  const navigate = useNavigate();
  const { get, post } = useApiService();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false)
  const { addToast, deleteToast } = useToast();
  const [rolesList, setRolesList] = useState([]);
  const [role, setRole] = useState();

  const getRolesList= useCallback(async(event) =>{
    setShowToast(false);
    const response = await get(`${url}/api/role/roles`,{});
    if (!response.success) {
      addToast(response?.error);
      deleteToast(4000);
    } else {
      setRolesList(response?.data?.data)
    }
    setShowToast(true);
  },[]);

  useEffect(()=>{
    getRolesList();
  },[getRolesList]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowToast(false);
    const reqData = {
      email: email,
      name: name,
      password: password,
      role: role
    }
    const response = await post(`${url}/api/auth/register`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqData)
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
  };

  return (
    <div className={styles.container}>
      {showToast && <ToastView />}
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Register</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              type="text"
              id="name"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
          <label htmlFor="role" className={styles.label}>Role</label>
            <select id='role'
            name = 'role'
            onChange= {(e)=> setRole(e.target.value)}
            className={styles.input} 
            required>
            <option key='' value = ''>Select Role...</option>
              {
                rolesList.map((role)=>{
                  return <option key={role._id} value = {role.id}>{role.role}</option>
                })
              }
            </select>
          </div>
          <button type="submit" className={styles.submitButton}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
