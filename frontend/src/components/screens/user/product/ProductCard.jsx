import { React, useState, useEffect } from 'react';
import styles from './ProductCard.module.css';
import useApiService from '../../../../services/ApiService';
import { useToast } from '../../../../utils/toast/ToastContext';
import ToastView from '../../../toast/ToastView';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../../utils/session/UserContext'

const ProductCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { get, post } = useApiService();
  const [showToast, setShowToast] = useState(false)
  const { addToast, deleteToast } = useToast();
  const [cards, setCards] = useState([]);
  const { userDetails } = useUserContext();

  useEffect(() => {
    if (location.pathname === '/get-cart') {
      getCartProducts();
    } else {
      getCardsByCategory();
    }
    // getCards();
  }, [location, userDetails])

  // not using yet,
  const getCartProducts = async () => {
    const url = process.env.REACT_APP_GATEWAY_BASE_URL || "http://localhost:4004";
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
    setShowToast(true)
  }

  // getCardsByCategory of products
  const getCardsByCategory = async () => {
    const url = process.env.REACT_APP_PRODUCT_BASE_URL;
    const id = await location.state;
    let endpoint = 'product/get-product-by-category';
    if (id) endpoint = `product/get-product-by-category/${id}`
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

  const handleBack = () => {
    navigate(-1);
  }
  const handleWishlist = (prod) => {
  }
  const handleSaveToCart = async (prod) => {
    const url = process.env.REACT_APP_GATEWAY_BASE_URL || "http://localhost:4004";
    let endpoint = 'api/user/cart/save-to-cart';
    const res = await post(`${url}/${endpoint}`, {
      body: JSON.stringify({
        userId: userDetails?.id,
        products: {
          productId: prod._id,
          quantity: 1,
        }
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!res.success) {
      addToast(res?.error);
      deleteToast(4000);
    } else {
      addToast(res?.data?.message)
      deleteToast(4000);
    }
  }

  return (
    <>
      <button className={styles.btnBack} onClick={handleBack}>Back</button>
      <div className={styles.container}>
        {showToast && <ToastView />}
        {cards.map((card) => (
          <div key={card._id} className={styles.card}>
            {!(location.pathname === '/get-cart') ?
              <>
                <div className={styles.buttonGroup}>
                  <button className={styles.btnWishlist} onClick={() => handleWishlist(card)}>Wishlist</button>
                  <button className={styles.btnCart} onClick={() => handleSaveToCart(card)}>Add to Cart</button>
                </div>
                <img src={`/resources/${card.image}`} alt={card.title} />
                <h3>{card.name}</h3>
                <p>{card.description}</p>
                <p>{card.price}</p>
              </>
              :
              <>
                <img src={`/resources/${card.product.image}`} alt={card.product.title} />
                <h3>{card?.product?.name}</h3>
                <p>{card?.product?.description}</p>
                <p>{card?.product?.price}</p>
              </>
            }
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductCard;
