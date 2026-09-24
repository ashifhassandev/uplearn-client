import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "@/features/auth/redux/auth.slice";
import studentReducer from "@/features/admin/redux/student.slice";
import adminTutorReducer from "@/features/admin/redux/tutor.slice";
import tutorReducer from "@/features/tutor/redux/tutor.slice";
import tutorProfileReducer from "@/features/tutor/redux/profile.slice";
import adminTutorApplicationReducer from "@/features/admin/redux/tutor-application.slice";
import studentProfileReducer from "@/features/student/redux/profile.slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  adminStudents: studentReducer,
  adminTutors: adminTutorReducer,
  tutor: tutorReducer,
  tutorProfile: tutorProfileReducer,
  adminTutorApplications: adminTutorApplicationReducer,
  studentProfile: studentProfileReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;