import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// add route
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal',(req,res) => 
    res.send({clientId: process.env.PAYPAL_CLIENT_ID})
)

// 数据导入API端点 - 访问 /api/seed 导入初始数据
app.get('/api/seed', async (req,res) => {
    try {
        // 动态导入模块
        const { default: users } = await import('./data/users.js')
        const { default: products } = await import('./data/products.js')
        const { default: User } = await import('./models/userModel.js')
        const { default: Product } = await import('./models/productModel.js')
        const { default: Order } = await import('./models/orderModel.js')

        // 清空现有数据
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        // 导入用户数据
        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id

        // 导入产品数据并关联管理员用户
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser }
        })
        await Product.insertMany(sampleProducts)

        res.json({ 
            success: true,
            message: '🎉 数据导入成功！',
            data: {
                users: createdUsers.length,
                products: sampleProducts.length,
                adminUser: createdUsers[0].email
            }
        })
    } catch (error) {
        console.error('数据导入失败:', error)
        res.status(500).json({ 
            success: false,
            message: '❌ 数据导入失败', 
            error: error.message 
        })
    }
})

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get(/.*/, (req,res) => 
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req,res) => 
        res.send('API is running ....')
    )
}


app.use(notFound)
app.use(errorHandler)

app.listen(port,()=> {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
})


