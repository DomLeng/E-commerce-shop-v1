const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)

const calcPrices = (orderItems) => {
    // calculate product prices
    const itemsPrice = addDecimals(
        orderItems.reduce((acc, item) => {
            return acc + (item.price *100 * item.qty) / 100
        },0)
    )

    // calculate shipping prices(if roder price is over 100, charge free; or charge 10 )
    const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10)

    // calculate tax price(15%)
    const taxPrice = addDecimals(Number(0.15 * itemsPrice).toFixed(2))

    // calculate total price
    const totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
    ).toFixed(2)

    return {
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    }
}

export default calcPrices