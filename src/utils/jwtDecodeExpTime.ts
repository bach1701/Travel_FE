import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const decoded: { exp: number } = jwtDecode(token);
    const now = Date.now() / 1000; // thời gian hiện tại (tính bằng giây)
    const expDate = new Date(decoded.exp * 1000);
    const nowDate = new Date(now * 1000);
    console.log("Hết hạn:", expDate.toLocaleString());
    console.log("Hiện tại:", nowDate.toLocaleString());
    return decoded.exp > now;
  } catch (err) {
    return false;
  }
};
