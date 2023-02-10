import { toast } from "react-toastify";

export default function toastAlert(type = "info", message, ...args) {
  const theme = "colored";
  return toast[type](message, { autoClose: 3000, theme, ...args });
}
