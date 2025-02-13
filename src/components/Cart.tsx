const Cart = ({ cart }: { cart: any[] }) => {
    const total = cart.reduce((acc, product) => acc + product.price, 0);
  
    return (
      <div>
        <h2>Cart</h2>
        {cart.length === 0 ? <p>Cart is empty</p> : (
          <>
            {cart.map((product, index) => (
              <div key={index}>
                <p>{product.title} - ${product.price}</p>
              </div>
            ))}
            <h3>Total: ${total}</h3>
          </>
        )}
      </div>
    );
  };
  
  export default Cart;
  