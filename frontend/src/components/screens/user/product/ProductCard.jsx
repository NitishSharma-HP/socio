import {React, useState, useEffect} from 'react';
import styles from './ProductCard.module.css';
import useApiService from '../../../../services/ApiService';
import { useToast } from '../../../../utils/toast/ToastContext';
import ToastView from '../../../toast/ToastView';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductCard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { get, post } = useApiService();
    const [showToast, setShowToast] = useState(false)
    const { addToast, deleteToast } = useToast();
    const [cards, setCards] = useState([]);

    useEffect(()=>{
        // getCards();
        getCardsByCategory();
    },[])

    // not using yet,
    const getCards = async() => {
        const url = process.env.REACT_APP_PRODUCT_BASE_URL;
        const id = await location.state;
        const cards = await get(`${url}/product/get-product`,
            {
            headers: {
                'Content-Type': 'application/json'
            },
            }
        )
        if (!cards.success) {
            addToast(cards?.error);
            deleteToast(4000);
        } else {
            setCards(cards?.data?.data)
        }
        setShowToast(true)
    }

    // getCardsByCategory of products
    const getCardsByCategory = async() => {
      const url = process.env.REACT_APP_PRODUCT_BASE_URL;
      const id = await location.state;
      let endpoint = 'product/get-product-by-category';
      if(id) endpoint = `product/get-product-by-category/${id}`
      const cards = await get(`${url}/${endpoint}`,
          {
          headers: {
              'Content-Type': 'application/json'
          },
          }
      )
      if (!cards.success) {
          addToast(cards?.error);
          deleteToast(4000);
      } else {
          setCards(cards?.data?.data)
      }
      setShowToast(true)
  }

  const hanldeBack = ()=>{
    navigate(-1);
  }

  return (
    <>
      <button className = {styles.btnBack} onClick={hanldeBack}>Back</button>
      <div className={styles.container}>
      {showToast && <ToastView />}
      {cards.map((card) => (
        <div key={card._id} className={styles.card}>
          <img src={`/resources/${card.image}`} alt={card.title} />
          <h3>{card.name}</h3>
          <p>{card.description}</p>
          <p>{card.price}</p>
        </div>
      ))}
    </div>
    </>
  );
};

export default ProductCard;
