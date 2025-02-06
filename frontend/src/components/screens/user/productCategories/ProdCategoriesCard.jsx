import {React, useState, useEffect} from 'react';
import styles from './ProdCategoriesCard.module.css';
import useApiService from '../../../../services/ApiService';
import { useToast } from '../../../../utils/toast/ToastContext';
import ToastView from '../../../toast/ToastView';
import { useNavigate } from 'react-router-dom';


const ProdCategoriesCard = () => {
    const [showToast, setShowToast] = useState(false)
    const { addToast, deleteToast } = useToast();
    const { get } = useApiService();
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
      if (process.env.REACT_APP_PRODUCT_BASE_URL) {
        getCards();
      }
    },[])

    const getCards = async() => {
        const url = process.env.REACT_APP_PRODUCT_BASE_URL;
        const cards = await get(`${url}/product/get-category`,
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

    const handleCardItemClick = (categoryId) =>{
      navigate('get-product-by-category', {state : categoryId});
    }

  return (
    <div className={styles.container}>
      {showToast && <ToastView />}
      {cards.map((card) => (
        <div key={card._id} className={styles.card} onClick={()=>handleCardItemClick(card._id)}>
          <img src={`/resources/${card.image}`} alt={card.title} />
          <h3>{card.name}</h3>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProdCategoriesCard;
