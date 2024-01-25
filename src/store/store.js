import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./reducers/userReducer";
import searchReducer from "./reducers/searchReducer";
import toastReducer from "./reducers/toastReducer";

const rootReducer = combineReducers({
  userReducer,
  searchReducer,
  toastReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userReducer", "searchReducer"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);
export default store;
