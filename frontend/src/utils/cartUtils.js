export const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = (state) => {
    // computing product price
    const itemsPrice = addDecimal(
        state.cartItems.reduce((acc,item) => acc + item.price * item.qty, 0)
    )
    state.itemsPrice  = itemsPrice    
    
    // computing shipping price(if order price is over 100, charge fee; or charge 10)
    const shippingPrice = addDecimal(itemsPrice > 100 ? 0 : 10)
    state.shippingPrice = shippingPrice

    // computing tax price (15%)
    const taxPrice = addDecimal(Number(0.15 * itemsPrice).toFixed(2))
    state.taxPrice = taxPrice

    // computing total price
    const totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
    ).toFixed(2)
    state.totalPrice = totalPrice

    localStorage.setItem('cart',JSON.stringify(state))
    
    return state
}
