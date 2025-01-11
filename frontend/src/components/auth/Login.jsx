import React, { useState } from 'react';
import styles from './Login.module.css';
import { ApiService } from '../../services/ApiService';
import ToastView from '../toast/ToastView';
import { useToast } from '../../utils/toast/ToastContext';
import {useNavigate} from 'react-router-dom'
// import {setToken, setSessionUser} from '../../utils/auth';
import { useUserContext } from '../../utils/session/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false)
  const { addToast, deleteToast } = useToast();
  const {setUserToken, setUserDetails} = useUserContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowToast(false);
    const reqData = {
      email: email,
      password: password
    }
    const service = new ApiService();
    const response = await service.post('api/auth/login',
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
      setUserToken(response?.data?.data?.token);
      setUserDetails(response?.data?.data?.userDetails?.name, response?.data?.data?.userDetails?.email, response?.data?.data?.userDetails?.id);
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
        <h1 className={styles.title}>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
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

          <button type="submit" className={styles.submitButton}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
