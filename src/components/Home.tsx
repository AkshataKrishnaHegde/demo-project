import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios";
import styles from "../styles/Home.module.css"; 
import Notification from "../components/Notification"; 
import img from "./profile-icon-design-free-vector.jpg";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false); 
  const [notificationMessage, setNotificationMessage] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "https://api.freeapi.app/api/v1/public/randomproducts",
          {
            params: { page: page.toString(), limit: "10" },
            headers: { accept: "application/json" },
          }
        );

        console.log("Full API Response:", data);

        if (data && data.data && Array.isArray(data.data.data)) {
          setProducts(data.data.data); 
        } else {
          console.error("Unexpected API response format:", data);
          setProducts([]); 
        }
      } catch (error) {
        console.error("API Fetch Error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
    setNotificationMessage(`${product.title} has been added to your cart!`); 
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price, 0);
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const closeNotification = () => {
    setNotificationMessage(""); 
  };

  return (
    <div className={styles.container}>
      {/* Fixed Profile Section */}
      <div className={styles.profileContainer}>
        <Link to="/profile">
          <img src={img} alt="Profile" className={styles.profileImg} />
        </Link>
        <span className={styles.greetingText}>Hello, {user.displayName}!</span>
      </div>
  
      {/* Scrollable Product List */}
      <h2 className={styles.heading}>Shop Your Favourite Products Now!</h2>
  
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className={styles.productList}>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <img
                  src={product.thumbnail || "https://via.placeholder.com/100"}
                  alt={product.title}
                  className={styles.productImg}
                />
                <h3 className={styles.productTitle}>{product.title}</h3>
                <p className={styles.productPrice}>${product.price}</p>
                <button className={styles.button} onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
  
      {/* Fixed Pagination */}
      <div className={styles.pagination}>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
        <span> Page {page} </span>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
  
      {/* Floating Cart Icon */}
      <div className={styles.cartIcon} onClick={toggleCart}>
        <span>🛒</span>
      </div>
  
      {/* Scrollable Cart Section */}
      <div className={`${styles.cartDetails} ${isCartVisible ? styles.visible : ""}`}>
        <h2>Cart</h2>
        {cart.length > 0 ? (
          <div>
            <ul>
              {cart.map((item, index) => (
                <li key={index} className={styles.cartItem}>
                  <span className={styles.cartItemTitle}>{item.title}</span> - 
                  <span className={styles.cartItemPrice}> ${item.price}</span>
                  <button className={styles.removeButton} onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <p className={styles.cartTotal}>Total: ${calculateTotal()}</p>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
  
      {/* Notification Component */}
      {notificationMessage && (
        <Notification message={notificationMessage} onClose={closeNotification} />
      )}
    </div>
  );
}
  
export default Home;
