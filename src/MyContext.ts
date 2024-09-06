import { createContext } from "react";

// Define the type of context
interface MyContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    selTab: number;
    setSelTab: (value: number) => void;
    animate: number;
    setAnimate: (value: number) => void;
    isMovTween: number;
    setIsMovTween: (value: number) => void;
}

// Initialize context with undefined, to be provided by the provider
const MyContext = createContext<MyContextType | undefined>(undefined);

export default MyContext;
