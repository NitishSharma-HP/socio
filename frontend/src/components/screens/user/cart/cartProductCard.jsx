import { React, useState, useEffect } from 'react';
import styles from './cartProductCard.module.css';
import useApiService from '../../../../services/ApiService';
import { useToast } from '../../../../utils/toast/ToastContext';
import ToastView from '../../../toast/ToastView';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../../utils/session/UserContext'
import Loader from '../../../loader/Loader';

const CartProductCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { get } = useApiService();
  const [showToast, setShowToast] = useState(false)
  const { addToast, deleteToast } = useToast();
  const [cards, setCards] = useState([]);
  const { userDetails } = useUserContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      getCartProducts();
  }, [location, userDetails])

  const getCartProducts = async () => {
    setLoading(true);
    const url = process.env.REACT_APP_GATEWAY_BASE_URL || "";
    const cards = await get(`${url}/api/user/get-cart/${userDetails.id}`,
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
    setLoading(false);
    setShowToast(true)
  }

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <>
    <Loader loading={loading}/>
      <button className={styles.btnBack} onClick={handleBack}>Back</button>
      <div className={styles.container}>
        {showToast && <ToastView />}
        {cards.map((card) => (
          <div key={card._id} className={styles.card}>
                <img src={`/resources/${card.product.image}`} alt={card.product.title} />
                <h3>{card?.product?.name}</h3>
                <p>{card?.product?.description}</p>
                <p>{card?.product?.price}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default CartProductCard;
