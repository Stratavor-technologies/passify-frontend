import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { appRoutes } from "./utils/appRoutes.js";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import { AuthProvider } from "./Hooks/AuthHook.jsx";
import { Provider } from "react-redux";
import { store } from "./store";
import ForgotPassword from "./pages/auth/forgotPassword.jsx";
import PageNotFound from "./pages/404.jsx";

const App = () => {
  const handalRoute = (type) => {

  };

  return (
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<ForgotPassword />} path="/forgot-password" />
            <Route path="*" element={<PageNotFound />} />

            {appRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  <ProtectedRoutes handalRoute={handalRoute} >
                    <route.element />
                  </ProtectedRoutes>
                }
              />
            ))}
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );
};

export default App;
