import { useState } from 'react'


function App() {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ]

  const [addedProducts, setAddedProducts] = useState([])

  const addToCart = (product) => {
    setAddedProducts(curr => {
      const exists = curr.find(p => p.name === product.name);
      if (exists) return curr;

      const productToAdd = {
        name: product.name,
        price: product.price,
        quantity: 1
      };
      return [...curr, productToAdd];
    });
  }

  return (
    <>
      <h1>Lista della spesa</h1>
      <ul>
        {products.map((product, i) => (
          <li key={i}>
            <p>Prodotto: {product.name} Prezzo: {product.price}€</p>
            <button onClick={() => addToCart(product)}>Aggiungi al carrello</button>
          </li>
        ))}
      </ul>


      {addedProducts.length > 0 && (
        <div>
          <h2>Carrello</h2>
          <ul>
            {addedProducts.map((product, i) => (
              <li key={i}>
                <p>Prodotto: {product.name} Prezzo: {product.price}€ Quantità: {product.quantity}</p>
              </li>

            ))}
          </ul>
        </div>
      )}

    </>

  )
}

export default App
