import { Routes, Route } from "react-router-dom";
import DefaultTemplate from "./DefaultTemplate";
import Login from "./pages/Login/Login";
import Register from "./pages/Registration/Register";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu"
import About from "./pages/About/About";
import Account from "./pages/Account/Account";
import Cart from "./pages/Cart/Cart";
import EditProfile from "./pages/EditProfile/EditProfile";
import Orders from "./pages/Orders/Orders";
import OrderDetails from "./pages/OrderDetails/OrderDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultTemplate />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/account/:userId" element={<Account />} />
          <Route path="/edit/:userId" element={<EditProfile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />        
        <Route
          path="*"
          element={
            <div className="container text-center">
              <h2 className="mt-3">404 - No page found</h2>
              <a href="/">Return to Home</a>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
