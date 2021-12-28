import { createContext } from "react";
import { UserInfo } from "../types/Auth/UserInfo";

export const AuthContext = createContext<UserInfo | null>(null);
