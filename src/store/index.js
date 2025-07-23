import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import designSlice from "./reducers/designSlice";
import userReducer from "./reducers/userSlice";
import authSlice from "./reducers/authSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["design", "user", "auth"],
  blacklist: [],
  transforms: [],
};

const reducers = combineReducers({
  design: designSlice,
  user: userReducer,
  auth: authSlice,
});
const persistedReducer = persistReducer(persistConfig, reducers);

const middleware = getDefaultMiddleware({
  serializableCheck: false,
  immutableCheck: false,
}).concat(thunk);

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export const persistor = persistStore(store);
