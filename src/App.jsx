import { useReducer, useState } from 'react'

function cartReducer(addedProducts, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      // Logica per aggiungere un prodotto
      const exists = addedProducts.find(p => p.name === action.payload.name);
      if (exists) {
        action.payload.quantity = exists.quantity + 1
      } else {
        return [...addedProducts, {
          ...action.payload,
          quantity: 1
        }]
      };

    case 'UPDATE_QUANTITY':
      // Logica per aggiornare la quantità
      if (action.payload.quantity < 1 || isNaN(action.payload.quantity)) {
        return addedProducts
      }
      return addedProducts.map(p =>
        p.name === action.payload.name
          ? { ...p, quantity: action.payload.quantity }
          : p
      )

    case 'REMOVE_ITEM':
      // Logica per rimuovere un prodotto
      return addedProducts.filter(p => p.name !== action.payload)
    default:
      return state;
  }
}


function App() {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ]

  const [addedProducts, dispatchCart] = useReducer(cartReducer, [])

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
            <button onClick={() => dispatchCart({ type: "ADD_ITEM", payload: product })}>Aggiungi al carrello</button>
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
                      onChange={
                        e => dispatchCart({
                          type: "UPDATE_QUANTITY",
                          payload: { name: product.name, quantity: parseInt(e.target.value) }
                        })
                      } />
                    <span> Prodotto: {product.name} Prezzo unitario: {product.price}€</span>
                  </p>
                  <button onClick={() => dispatchCart({ type: "REMOVE_ITEM", payload: product.name })}>Rimuovi dal carrello</button>
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
