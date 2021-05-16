import { ToastAndroid } from "react-native";

export const Toast = (toast) => {
    ToastAndroid.show(toast, ToastAndroid.LONG);
  };