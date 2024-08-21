import { toast } from "react-toastify";

export const notify = (
  message: string,
  toastOptions: Partial<ToastrOptions>,
) => {
  toast[toastOptions.messageType || ToastMessageType.Success](message, {
    position: toastOptions?.position || ToastPosition.TOP_RIGHT,
    autoClose: toastOptions.timeOut || 3000,
  });
};

export enum ToastPosition {
  TOP_RIGHT = "top-right",
  TOP_LEFT = "top-left",
  BOTTOM_RIGHT = "bottom-right",
  BOTTOM_LEFT = "bottom-left",
  TOP_CENTER = "top-center",
  BOTTOM_CENTER = "bottom-center",
}

export class ToastrOptions {
  messageType: ToastMessageType = ToastMessageType.Success;
  position: ToastPosition = ToastPosition.TOP_RIGHT;
  timeOut: number = 1;
}

export enum ToastMessageType {
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error",
}
