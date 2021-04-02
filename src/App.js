
import Header from "./Components/Header/Header";
import Shop from "./Components/shop/Shop";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from "./Components/Review/Review";
import Inventory from "./Components/inventory/Inventory";
import NotFound from "./Components/notFound/NotFound";
import ProductDetail from "./Components/productDetail/ProductDetail";
import Shipment from "./Components/Shipment/Shipment";
import Login from "./Components/Login/Login";
import { createContext, useState } from "react";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";


export const UserContext = createContext()

function App() {

  const [loggedInUser,setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={ [loggedInUser,setLoggedInUser]  }>
      <p>log in email:  {loggedInUser.email} </p>
      <Router>
        <Header />
        <Switch>
          
          <Route exact path="/">
            <Shop></Shop>
          </Route>

          <Route path="/shop">
            <Shop></Shop>
          </Route>

          <Route path="/review">
            <Review></Review>
          </Route>

          <PrivateRoute path="/inventory">
              <Inventory />
          </PrivateRoute>
          <PrivateRoute path="/shipment">
              <Shipment />
          </PrivateRoute>
          <Route path="/login">
             <Login />
          </Route>

          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>

          <Route  path="*">
            <NotFound></NotFound>
          </Route>

        </Switch>
      </Router>
      
     
    </UserContext.Provider>
  );
}

export default App;
