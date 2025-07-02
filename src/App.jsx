import { useState } from 'react'


function App() {


  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ]

  return (
    <>
      <h1>Lista della spesa</h1>
      <ul>
        {products.map((product, i) => (
          <li key={i}>
            <p>Prodotto: {product.name} Prezzo: {product.price}€</p>
          </li>
        ))}
      </ul>

    </>



  )
}

export default App
