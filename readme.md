# ProShop v2 - MERN全栈电商平台

> 基于MERN技术栈和Redux Toolkit构建的现代化全功能电商平台

<img src="./frontend/public/images/screens.png" alt="ProShop界面预览" style="width: 100%; max-width: 800px;">

## 📋 项目简介

ProShop v2 是一个功能完整的电商平台，使用现代化的MERN技术栈开发。这是一个包含完整购物车、PayPal支付集成、用户认证、管理员面板等功能的生产级应用。

本项目基于Brad Traversy的MERN课程，并进行了大量的优化和功能扩展。

## ✨ 主要特性

### 🛍️ 用户功能
- ✅ **用户认证系统** - 用户注册、登录、登出
- ✅ **产品浏览** - 产品列表、详情页面、搜索功能
- ✅ **评分评论** - 用户可以对产品进行评分和评论
- ✅ **购物车管理** - 添加、删除、修改商品数量
- ✅ **完整结账流程** - 配送地址、支付方式、订单确认
- ✅ **支付集成** - PayPal和信用卡支付
- ✅ **订单管理** - 订单历史、订单详情、支付状态
- ✅ **个人资料** - 用户信息管理、密码修改
- ✅ **产品轮播** - 热门产品展示
- ✅ **分页功能** - 产品列表分页浏览

### 👨‍💼 管理员功能
- ✅ **产品管理** - 创建、编辑、删除产品
- ✅ **用户管理** - 查看、编辑、删除用户
- ✅ **订单管理** - 查看所有订单、更新订单状态
- ✅ **文件上传** - 产品图片上传和管理
- ✅ **权限控制** - 管理员权限验证
- ✅ **数据统计** - 订单状态统计

### 🎨 技术特性
- ✅ **响应式设计** - 支持桌面端和移动端
- ✅ **现代化UI** - 基于Bootstrap的美观界面
- ✅ **性能优化** - 懒加载、代码分割
- ✅ **错误处理** - 全局错误边界和友好错误提示
- ✅ **SEO优化** - React Helmet集成
- ✅ **安全性** - JWT认证、密码加密、CORS配置

## 🛠️ 技术栈

### 后端技术
- **Node.js** - 服务器运行环境
- **Express.js** - Web应用框架
- **MongoDB** - NoSQL数据库
- **Mongoose** - MongoDB对象模型工具
- **JWT** - JSON Web Token认证
- **bcryptjs** - 密码加密
- **Multer** - 文件上传中间件
- **Colors** - 控制台颜色输出

### 前端技术
- **React 18** - 用户界面库
- **Redux Toolkit** - 状态管理
- **RTK Query** - 数据获取和缓存
- **React Router v6** - 前端路由
- **React Bootstrap** - UI组件库
- **React Helmet Async** - SEO优化
- **React Toastify** - 消息通知
- **PayPal React SDK** - 支付集成
- **Axios** - HTTP客户端

## 📦 安装和运行

### 环境要求
- Node.js (版本 16.0 或更高)
- MongoDB (版本 4.4 或更高)
- npm 或 yarn 包管理器

### 快速开始

1. **克隆项目**
   ```bash
   git clone https://github.com/yourusername/proshop-v2.git
   cd proshop-v2
   ```

2. **安装后端依赖**
   ```bash
   npm install
   ```

3. **安装前端依赖**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **配置环境变量**
   
   在项目根目录创建 `.env` 文件：
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/proshop
   JWT_SECRET=your_super_secret_jwt_key_here
   PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
   PAGINATION_LIMIT=8
   ```

5. **启动MongoDB服务**
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo service mongod start
   ```

6. **导入测试数据**
   ```bash
   # 导入种子数据（包含测试用户和产品）
   npm run data:import
   
   # 如需重置数据库
   npm run data:destroy
   ```

7. **启动应用**
   ```bash
   # 同时启动前后端开发服务器
   npm run dev
   
   # 或者分别启动
   npm run server    # 后端服务器 (端口 5000)
   npm run client    # 前端开发服务器 (端口 3000)
   ```

8. **访问应用**
   - 前端地址：http://localhost:3000
   - 后端API：http://localhost:5000

## 🔐 测试账户

系统预置了以下测试账户：

### 管理员账户
```
邮箱：admin@email.com
密码：123456
权限：管理员（可访问管理面板）
```

### 普通用户账户
```
用户1:
邮箱：john@email.com
密码：123456

用户2:
邮箱：jane@email.com
密码：123456
```

## 📝 可用脚本

在项目根目录中，你可以运行以下命令：

### 开发相关
- `npm run dev` - 同时启动前后端开发服务器
- `npm run server` - 仅启动后端服务器
- `npm run client` - 仅启动前端开发服务器

### 数据管理
- `npm run data:import` - 导入种子数据到数据库
- `npm run data:destroy` - 清空数据库中的所有数据

### 生产构建
- `npm run build` - 构建前端生产版本
- `npm start` - 启动生产服务器

### 文档生成
- `npm run generate-toc` - 生成README目录

## 🌐 API接口文档

### 产品相关接口

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| GET | `/api/products` | 获取产品列表（支持搜索和分页） | 公开 |
| GET | `/api/products/:id` | 获取单个产品详情 | 公开 |
| GET | `/api/products/top` | 获取热门产品（评分最高的3个） | 公开 |
| POST | `/api/products` | 创建新产品 | 管理员 |
| PUT | `/api/products/:id` | 更新产品信息 | 管理员 |
| DELETE | `/api/products/:id` | 删除产品 | 管理员 |
| POST | `/api/products/:id/reviews` | 添加产品评论 | 已登录用户 |

### 用户相关接口

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| POST | `/api/users/auth` | 用户登录 | 公开 |
| POST | `/api/users` | 用户注册 | 公开 |
| POST | `/api/users/logout` | 用户登出 | 已登录用户 |
| GET | `/api/users/profile` | 获取用户资料 | 已登录用户 |
| PUT | `/api/users/profile` | 更新用户资料 | 已登录用户 |
| GET | `/api/users` | 获取所有用户列表 | 管理员 |
| GET | `/api/users/:id` | 获取指定用户信息 | 管理员 |
| PUT | `/api/users/:id` | 更新指定用户信息 | 管理员 |
| DELETE | `/api/users/:id` | 删除指定用户 | 管理员 |

### 订单相关接口

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| POST | `/api/orders` | 创建新订单 | 已登录用户 |
| GET | `/api/orders/myorders` | 获取当前用户的订单列表 | 已登录用户 |
| GET | `/api/orders/:id` | 获取订单详情 | 已登录用户 |
| PUT | `/api/orders/:id/pay` | 更新订单支付状态 | 已登录用户 |
| GET | `/api/orders` | 获取所有订单列表 | 管理员 |
| PUT | `/api/orders/:id/deliver` | 标记订单为已发货 | 管理员 |

### 其他接口

| 方法 | 路径 | 描述 | 权限 |
|------|------|------|------|
| POST | `/api/upload` | 上传图片文件 | 管理员 |
| GET | `/api/config/paypal` | 获取PayPal客户端ID | 公开 |

## 📂 项目结构

```
proshop-v2/
├── backend/                    # 后端源码
│   ├── config/                # 配置文件
│   │   └── db.js             # 数据库连接配置
│   ├── controllers/           # 控制器
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── data/                  # 种子数据
│   │   ├── products.js
│   │   └── users.js
│   ├── middleware/            # 中间件
│   │   ├── asyncHandler.js
│   │   ├── authMiddleware.js
│   │   ├── checkObjectId.js
│   │   └── errorMiddleware.js
│   ├── models/               # 数据模型
│   │   ├── orderModel.js
│   │   ├── productModel.js
│   │   └── userModel.js
│   ├── routes/               # 路由定义
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   ├── uploadRoutes.js
│   │   └── userRoutes.js
│   ├── utils/                # 工具函数
│   │   ├── calcPrices.js
│   │   └── generateToken.js
│   ├── seeder.js             # 数据库种子脚本
│   └── server.js             # 服务器入口文件
├── frontend/                  # 前端源码
│   ├── public/               # 静态资源
│   │   ├── images/           # 产品图片
│   │   └── index.html
│   ├── src/
│   │   ├── assets/           # 资源文件
│   │   │   └── styles/       # 样式文件
│   │   ├── components/       # 通用组件
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── CheckoutSteps.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── FormContainer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Message.jsx
│   │   │   ├── Meta.jsx
│   │   │   ├── Paginate.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── Product.jsx
│   │   │   ├── ProductCarousel.jsx
│   │   │   ├── Rating.jsx
│   │   │   └── SearchBox.jsx
│   │   ├── screens/          # 页面组件
│   │   │   ├── admin/        # 管理员页面
│   │   │   ├── CartScreen.jsx
│   │   │   ├── HomeScreen.jsx
│   │   │   ├── LoginScreen.jsx
│   │   │   ├── OrderScreen.jsx
│   │   │   ├── PaymentScreen.jsx
│   │   │   ├── PlaceOrderScreen.jsx
│   │   │   ├── ProductScreen.jsx
│   │   │   ├── ProfileScreen.jsx
│   │   │   ├── RegisterScreen.jsx
│   │   │   └── ShippingScreen.jsx
│   │   ├── slices/           # Redux状态切片
│   │   │   ├── apiSlice.js
│   │   │   ├── authSlice.js
│   │   │   ├── cartSlice.js
│   │   │   ├── ordersApiSlice.js
│   │   │   ├── productsApiSlice.js
│   │   │   └── usersApiSlice.js
│   │   ├── utils/            # 工具函数
│   │   │   └── cartUtils.js
│   │   ├── App.js            # 主应用组件
│   │   ├── constants.js      # 常量定义
│   │   ├── index.js          # 应用入口
│   │   └── store.js          # Redux store配置
│   └── package.json          # 前端依赖
├── uploads/                   # 文件上传目录
├── .env                      # 环境变量（需自行创建）
├── .gitignore               # Git忽略文件
├── package.json             # 后端依赖和脚本
└── README.md               # 项目说明文档
```

## 🚀 部署指南

### 生产环境构建

1. **创建生产环境配置**
   ```env
   NODE_ENV=production
   PORT=5000
   MONGO_URI=your_production_mongodb_uri
   JWT_SECRET=your_very_secure_jwt_secret
   PAYPAL_CLIENT_ID=your_production_paypal_client_id
   PAGINATION_LIMIT=8
   ```

2. **构建前端**
   ```bash
   npm run build
   ```

3. **启动生产服务器**
   ```bash
   npm start
   ```

### 部署到云平台

#### Heroku部署
1. 安装Heroku CLI
2. 创建Heroku应用
3. 设置环境变量
4. 推送代码到Heroku

#### Vercel/Netlify部署
1. 连接GitHub仓库
2. 配置构建设置
3. 设置环境变量
4. 自动部署

## 🛡️ 安全特性

- **JWT认证** - 安全的用户认证机制
- **密码加密** - 使用bcrypt加密用户密码
- **路由保护** - 前后端双重权限验证
- **CORS配置** - 跨域请求安全控制
- **文件上传验证** - 文件类型和大小限制
- **输入验证** - 防止SQL注入和XSS攻击
- **HTTPS支持** - 生产环境强制使用HTTPS

## 🐛 常见问题

### Q: MongoDB连接失败怎么办？
A: 确保MongoDB服务正在运行，并检查MONGO_URI配置是否正确。

### Q: PayPal支付按钮不显示？
A: 检查PAYPAL_CLIENT_ID是否正确配置，确保使用的是沙盒环境的Client ID。

### Q: 文件上传失败？
A: 确保uploads目录存在且有写入权限，检查文件大小是否超过5MB限制。

### Q: 前端页面空白？
A: 检查控制台错误信息，确保后端API正常运行。

### Q: 种子数据导入失败？
A: 确保MongoDB连接正常，先运行`npm run data:destroy`清空数据库再导入。

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 许可证

本项目基于 [MIT许可证](LICENSE) 开源。

## 👨‍💻 作者信息

- **原始教程**: [Brad Traversy](https://github.com/bradtraversy)
- **项目优化**: 基于原教程进行了大量优化和功能扩展

## 🙏 致谢

- Brad Traversy 提供的优秀MERN教程
- React、Redux、Express、MongoDB等开源社区
- 所有贡献者和测试用户

## 📞 支持

如果你在使用过程中遇到问题，可以通过以下方式获取帮助：

- 创建Issue报告Bug
- 查看文档和常见问题
- 参考原始教程视频

---

⭐ 如果这个项目对你有帮助，请给它一个星标！

**Happy Coding! 🚀**