import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js"
import Product from "../models/productModel.js"
import calcPrices from "../utils/calcPrices.js"

// @desc    create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req,res) => {
    const { orderItems, shippingAddress, paymentMethod }  = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        // get order product from database
        const itemsFromDB = await Product.find({
            _id:{$in: orderItems.map((x) => x._id)}
        })

        // mapping order product to DB product

        const dbOrderItems = orderItems.map((itemsFromClient) => {
            const matchingItemFromDB = itemsFromDB.find(
                (itemFromDB) => itemFromDB._id.toString() === itemsFromClient._id
            )
            return {
                ...itemsFromClient,
                product: itemsFromClient._id,
                price :matchingItemFromDB.price,
                _id:undefined
            }
        })

        // computing price
        const {itemsPrice, taxPrice, shippingPrice, totalPrice} = calcPrices(dbOrderItems)
        
        const order = new Order({
            orderItems: dbOrderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })


        const createOrder = await order.save()

        res.status(201).json(createOrder)
    }
})

// @desc    get user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req,res) => {
    console.log("req: ",req);
    const orders = await Order.find({user:req.user._id})
    res.json(orders)
})

// @desc    get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    )
    
    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc    update order status to "paid"
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address: req.body.payer.email_address,
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)
        
    } else {
        res.status(404);
        throw new Error('Order not found');
        
    }
})

// @desc    update order status to "deliverd"
const updateOrderToDelivered = asyncHandler(async (req,res) =>{
    console.log(req.params);
    const order = await Order.findById(req.params.id)


    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)
        
    } else {
        res.status(404);
       throw new Error('Order not found');
    }
})

// @desc    get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req,res) => {
    const orders = await Order.find({}).populate('user','id name')
    res.json(orders)
})

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};




