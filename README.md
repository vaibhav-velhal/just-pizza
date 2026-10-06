# JustPizza - Full-Stack Pizza Web Application

JustPizza is a full-stack Pizza E-Commerce web application built using the MERN stack. The application allows users to register and log in, browse pizza products, manage their shopping cart, place orders, and complete payments using Razorpay Test/Sandbox mode.

The project includes a React-based frontend, a Node.js and Express backend, MongoDB database integration using Mongoose, JWT-based authentication, REST APIs, and Razorpay payment processing with webhook handling.

## Features

- User registration and login
- JWT-based authentication
- Browse pizza products
- Browse products by category
- Shopping cart management
- Add, update, remove and clear cart items
- Order creation and order history
- Individual order details
- Razorpay Test/Sandbox payment integration
- Razorpay payment signature verification
- Razorpay webhook processing
- Webhook signature validation
- Duplicate payment webhook handling
- Payment success and failure handling
- Responsive React frontend
- MongoDB database with Mongoose
- Database migrations and sample data seeding
- RESTful backend APIs

---

## Technology Stack

### Frontend
- React.js
- Vite
- React Router
- Bootstrap
- React Icons
- JavaScript
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Joi
- Razorpay API

### Development & Testing
- Bruno - API testing
- MongoDB Atlas - Database
- ngrok - Local webhook testing
- Git & GitHub

---

## Project Structure

just-pizza/

├── just-pizza-backend/

│   ├── config/

│   ├── migrations/

│   ├── models/

│   ├── modules/

│   ├── seed/

│   ├── .env

│   ├── main.js

│   ├── middleware.js

│   └── package.json

│

├── just-pizza-frontend/

│   ├── public/

│   ├── src/

│   │   ├── assets/

│   │   ├── components/

│   │   ├── data/

│   │   ├── pages/

│   │   ├── services/

│   │   ├── App.jsx

│   │   ├── DefaultTemplate.jsx

│   │   ├── index.css

│   │   └── main.jsx

│   ├── .env

│   ├── package.json

│   └── vite.config.js

│

└── README.md

---

## Prerequisites

Before running the project, make sure the following are installed:

- Node.js
- npm
- MongoDB Atlas account
- Razorpay Test/Sandbox account
- Bruno (for API testing, optional)
- ngrok (required for local Razorpay webhook testing)

---

## Environment Variables

Create a `.env` file inside both the backend and frontend directories.

### Backend `.env`

```env
MONGO_DB_URL=your_mongodb_cluster_url
MONGO_DB_US=your_mongodb_username
MONGO_DB_PW=your_mongodb_password
MONGO_DB_DB=your_database_name

JWT_TOKEN_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
```

### Frontend `.env`

```env
VITE_BACKEND_URL=your_backend_api_url
VITE_RAZORPAY_KEY_ID=your_razorpay_test_key_id
```

**Important:** Never commit `.env` files or Razorpay/MongoDB secrets to GitHub. Add `.env` to `.gitignore`.

---
## Database Setup

JustPizza uses MongoDB Atlas as its database.

### 1. Create MongoDB Atlas Database

Create a MongoDB Atlas cluster and database, then configure the following backend environment variables:

```env
MONGO_DB_URL=your_mongodb_cluster_url
MONGO_DB_US=your_mongodb_username
MONGO_DB_PW=your_mongodb_password
MONGO_DB_DB=your_database_name
```

### 2. Install Backend Dependencies

Navigate to the backend directory:

```
cd just-pizza-backend
```

Install the required dependencies:

```
npm install
```

### 3. Run Database Migration

Run the migration script:

```
npm run migrate
```

The migration script synchronizes the indexes defined by the Mongoose models with the MongoDB database.

### 4. Seed Sample Data

Run the seed script:

```
npm run seed
```

The seed script creates the sample categories and pizza products required by the application.

**Note:** The seed script clears the existing categories and products collections before inserting the sample data. Use this command only when resetting or initializing the sample product/category data.


---

## Backend Setup

Navigate to the backend directory:

```bash
cd just-pizza-backend
```

Start the backend server:

```
npm run start
```

The backend server runs on:

```
http://localhost:3000
```

---

## Frontend Setup

Navigate to the frontend directory:

```bash
cd just-pizza-frontend
```

Install dependencies:

```
npm install
```

Create a .env file and configure:

```
VITE_BACKEND_URL=your_backend_api_url
VITE_RAZORPAY_KEY_ID=your_razorpay_test_key_id
```

Start the Vite development server:

```
npm run dev
```

The frontend will be available at the URL displayed by Vite in the terminal.

---

## API Documentation

The backend REST APIs have been tested and documented using Bruno.

The Bruno collection contains the following modules:

### Auth Module

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/registration` | Register a new user |
| POST | `/api/auth/login` | Login user |

### User Module

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/user/` | Get all users |
| GET | `/api/user/:userId` | Get a single user |
| PATCH | `/api/user/:userId` | Update user |
| DELETE | `/api/user/:userId` | Delete a user |

### Category Module

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/category/` | Get all categories |
| GET | `/api/category/:categoryId` | Get a single category |
| POST | `/api/category/` | Add a category |
| DELETE | `/api/category/:categoryId` | Delete a category |
| PATCH | `/api/category/:categoryId` | Update a category |

### Product Module

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/product` | Get all products |
| GET | `/api/product/:productId` | Get a single product |
| POST | `/api/product` | Add a product |
| PATCH | `/api/product/:productId` | Update a product |
| DELETE | `/api/product/:productId` | Delete a product |

### Cart Module

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/cart` | Get cart items |
| POST | `/api/cart` | Add product to cart |
| PATCH | `/api/cart/:userId` | Update cart item |
| DELETE | `/api/cart/:userId` | Delete cart item |
| DELETE | `/api/cart` | Clear entire cart |

### Order Module

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/order` | Get user's orders |
| GET | `/api/order/:orderId` | Get a single order |
| POST | `/api/order` | Create an order |

### Payment Module

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/payment/create` | Create a Razorpay order |
| POST | `/api/payment/verify` | Verify Razorpay payment |
| POST | `/api/payment/webhook` | Handle Razorpay webhook events |

---

## Razorpay Test/Sandbox Configuration

JustPizza uses Razorpay in Test/Sandbox mode for payment processing.

### Razorpay Environment Variables

Configure the following variables in the backend `.env` file:

```env
RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
```

Configure the Razorpay Test Key ID in the frontend .env file:

```
VITE_RAZORPAY_KEY_ID=your_razorpay_test_key_id
```

### Payment Process

The application follows this payment process:
```
1. The user adds products to the cart.
2. The user proceeds to checkout.
3. The backend creates an order in the database.
4. The backend creates a Razorpay Test/Sandbox order.
5. Razorpay Checkout is opened on the frontend.
6. The user completes or fails the test payment.
7. The frontend sends the Razorpay payment details to the backend.
8. The backend verifies the Razorpay payment signature.
9. Razorpay sends the corresponding webhook event to the backend.
10. The backend validates the webhook signature and updates the payment and order status.
```
**Note:** The frontend payment response is verified by the backend using the Razorpay payment signature, while the webhook provides asynchronous payment status updates from Razorpay.


## Razorpay Webhook Configuration

The application uses Razorpay webhooks to receive payment status events from Razorpay.

### Webhook Endpoint

```text
POST /api/payment/webhook
```

For local development, the backend is exposed publicly using ngrok so that Razorpay can reach the local webhook endpoint.

The webhook URL follows this format:

```
https://<ngrok-id>.ngrok-free.app/api/payment/webhook
```

Configure this URL in the Razorpay Test/Sandbox webhook settings.

### Webhook Secret
The webhook secret configured in Razorpay must match the following backend environment variable:

```
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
```

The backend uses the x-razorpay-signature header and the webhook secret to verify that the webhook request was sent by Razorpay.


### Supported Webhook Events

The application handles the following Razorpay events:

`payment.captured`

When a payment is successfully captured:

- Payment status is updated to paid.
- Order payment status is updated to paid.
- Order status is updated to confirmed.
- The user's cart is cleared.

The webhook handler also checks whether the payment has already been marked as paid. If so, the event is not processed again.

`payment.failed`

When a payment fails:

- Payment status is updated to failed.
- Order payment status is updated to failed.
- Order status is updated to cancelled.
- The user's cart is preserved.

Duplicate payment webhook events are handled without processing the payment again.

---

## Payment Flow

```text
User
 │
 ▼
Cart
 │
 ▼
Create Order
 │
 ▼
Backend creates Razorpay Order
 │
 ▼
Razorpay Checkout
 │
 ├───────────────┐
 │               │
 ▼               ▼
Success         Failure
 │               │
 ▼               ▼
Payment          Payment
Verification     Failure
 │               │
 ▼               ▼
Razorpay        Razorpay
Webhook         Webhook
 │               │
 ▼               ▼
Payment: PAID   Payment: FAILED
Order:          Order:
CONFIRMED       CANCELLED
 │               │
 ▼               ▼
Cart Cleared    Cart Preserved
```

## Payment Not Completed

If the user closes the Razorpay checkout without completing the payment:

- No successful payment response is received.
- Payment status remains `pending`.
- Order status remains `pending`.
- Cart is preserved.

---

## Order & Payment Status Behaviour

| Scenario | Payment Status | Order Status | Cart |
|---|---|---|---|
| Payment successful | `paid` | `confirmed` | Cleared |
| Payment failed | `failed` | `cancelled` | Preserved |
| Checkout abandoned | `pending` | `pending` | Preserved |

---

## Testing

The application was tested for the following payment scenarios using Razorpay Test/Sandbox mode:

### Successful Payment

- Razorpay test payment completed successfully.
- `payment.captured` webhook was received.
- Payment was marked as `paid`.
- Order was marked as `confirmed`.
- Cart was cleared.

### Failed Payment

- Razorpay test payment was intentionally failed.
- `payment.failed` webhook was received.
- Payment was marked as `failed`.
- Order was marked as `cancelled`.
- Cart was preserved.

### Checkout Abandoned

- Razorpay Checkout was closed before completing payment.
- No successful payment webhook was received.
- Order remained pending.
- Cart was preserved.

### Webhook Security

- Webhook signature verification was tested.
- Invalid/missing webhook signatures are rejected.
- Duplicate payment webhook events are handled idempotently.

---

## Running the Complete Application

### Terminal 1 — Backend

```bash
cd just-pizza-backend
npm install
npm run migrate
npm run seed
npm start
```

### Terminal 2 — Frontend

```bash
cd just-pizza-frontend
npm install
npm run dev
```

For local Razorpay webhook testing, start ngrok and configure the generated public URL in the Razorpay Test/Sandbox webhook settings.

The application can then be accessed using the frontend URL provided by Vite.

## Security Notes
- Sensitive credentials are stored in environment variables.
- Razorpay Test/Sandbox credentials are used for payment testing.
- Razorpay webhook requests are validated using the webhook signature.
- JWT is used for authenticated API requests.
- `.env` files should not be committed to version control.