import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slice/auth.slice";
import taskReducer from "./slice/task.slice";
import toggleReducer from "./slice/toggle.slice";
import userReducer from "./slice/user.slice";
import taskStatusReducer from "./slice/taskStatus.slice";

const persistConfig: PersistConfig<any> = {
  key: "user",
  storage,
  whitelist: ["name"],
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: persistedUserReducer,
    task: taskReducer,
    toggle: toggleReducer,
    taskStatus: taskStatusReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
