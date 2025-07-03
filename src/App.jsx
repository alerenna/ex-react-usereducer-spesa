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



  const updateProductQuantity = (name, quantity) => {
    if (quantity < 1 || isNaN(quantity)) {
      return
    }
    setAddedProducts(curr =>
      curr.map(p =>
        p.name === name
          ? { ...p, quantity: quantity }
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

                  <p>
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={e => updateProductQuantity(product.name, parseInt(e.target.value))} />
                    <span> Prodotto: {product.name} Prezzo unitario: {product.price}€</span>
                  </p>
                  <button onClick={() => removeFromCart(i)}>Rimuovi dal carrello</button>
                </li>

              ))}
            </ul>
          </div>

          <h2> Totale carrello: {total.toFixed(2)} </h2>
        </>
      )}


    </>

  )
}

export default App
