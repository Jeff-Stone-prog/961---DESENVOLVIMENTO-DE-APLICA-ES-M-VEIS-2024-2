const { useState } = React;

const App = () => {
  const productsData = [
    { id: 1, name: 'Produto A', price: 50 },
    { id: 2, name: 'Produto B', price: 30 },
    { id: 3, name: 'Produto C', price: 20 },
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <div className="product-list">
        <h2>Produtos Disponíveis</h2>
        {productsData.map((product) => (
          <div key={product.id} className="product-item">
            <span>{product.name} - R${product.price.toFixed(2)}</span>
            <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h2>Carrinho de Compras</h2>
        {cart.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>
                {item.name} - R${item.price.toFixed(2)} x{' '}
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                  min="1"
                />
              </span>
              <button onClick={() => removeFromCart(item.id)}>Remover</button>
            </div>
          ))
        )}
        <h3>Total: R${totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
