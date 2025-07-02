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
    const exists = addedProducts.find(p => p.name === product.name);

    if (exists) {
      updateProductQuantity(product);
    } else {
      const productToAdd = {
        name: product.name,
        price: product.price,
        quantity: 1
      };
      setAddedProducts(curr => [...curr, productToAdd]);
    }
  };



  const updateProductQuantity = product => {
    setAddedProducts(curr =>
      curr.map(p =>
        p.name === product.name
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )
    )
  }

  const removeFromCart = (i) => {
    setAddedProducts(curr => curr.filter((p, index) => {
      return index !== i
    }))
  }

  const total = addedProducts.reduce((acc, product) => {
    return acc + product.price * product.quantity
  }, 0)

  return (
    <>
      <h1>Lista della spesa</h1>
      <ul>
        {products.map((product, i) => (
          <li key={i}>
            <p>Prodotto: {product.name} Prezzo unitario: {product.price}€</p>
            <button onClick={() => addToCart(product)}>Aggiungi al carrello</button>
          </li>
        ))}
      </ul>


      {addedProducts.length > 0 && (
        <>

          <div>
            <h2>Carrello</h2>
            <ul>
              {addedProducts.map((product, i) => (
                <li key={i}>
                  <p>Prodotto: {product.name} Quantità: {product.quantity} Prezzo unitario: {product.price}€ </p>
                  <button onClick={() => removeFromCart(i)}>Rimuovi dal carrello</button>
                </li>

              ))}
            </ul>
          </div>

          <p> Totale carrello: {total.toFixed(2)} </p>
        </>
      )}


    </>

  )
}

export default App
