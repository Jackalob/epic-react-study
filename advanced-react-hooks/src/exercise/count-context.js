import { createContext, useContext, useState } from "react";

const CountContext = createContext()

export const CountProvider = (props) => {
    const [count, setCount] = useState(0)
    return <CountContext.Provider {...props} value={[count, setCount]} />
}

export const useCount =  () => {
    const context = useContext(CountContext)
    if (!context) {
        throw new Error('useCount must be used with CountProvider')
    }
    return context
}
