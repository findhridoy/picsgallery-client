import React from "react";
import { Route, Switch } from "react-router-dom";
import "./Sass/App.scss";
import AddProductScreen from "./Screens/AddProductScreen";
import CartScreen from "./Screens/CartScreen";
import DashboardScreen from "./Screens/DashboardScreen";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import OrderScreen from "./Screens/OrderScreen";
import PaymentMethodScreen from "./Screens/PaymentMethodScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import ProductListScreen from "./Screens/ProductListScreen";
import ProductScreen from "./Screens/ProductScreen";
import SignupScreen from "./Screens/SignupScreen";
import UserListScreen from "./Screens/UserListScreen";
import UserProfileScreen from "./Screens/UserProfileScreen";
import AdminRoute from "./Utils/Private/AdminRoute";
import PrivateRoute from "./Utils/Private/PrivateRoute";

const App = () => (
  <div className="app">
    <Switch>
      <Route path="/" exact component={HomeScreen} />
      <Route path="/items/:id" exact component={ProductScreen} />
      <Route path="/signup" exact component={SignupScreen} />
      <Route path="/login" exact component={LoginScreen} />
      <Route path="/cart" exact component={CartScreen} />
      <PrivateRoute
        path="/paymentMethod"
        exact
        component={PaymentMethodScreen}
      />
      <PrivateRoute path="/placeOrder" exact component={PlaceOrderScreen} />
      <PrivateRoute path="/order/:id" exact component={OrderScreen} />
      <PrivateRoute path="/profile" exact component={UserProfileScreen} />
      <AdminRoute
        path="/dashboard/dashboard"
        exact
        component={DashboardScreen}
      />
      <AdminRoute
        path="/dashboard/addProduct"
        exact
        component={AddProductScreen}
      />
      <AdminRoute
        path="/dashboard/products"
        exact
        component={ProductListScreen}
      />
      <AdminRoute path="/dashboard/users" exact component={UserListScreen} />
    </Switch>
  </div>
);

export default App;
