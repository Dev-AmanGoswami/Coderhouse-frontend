import { useCallback, useRef, useState } from "react"

// Hook usecase is to execute a function when state updates
export const useStateWithCallback = (initialState) => {
    // Set clients second parameter will be a callback
    const [state, setState] = useState(initialState);
    const cbRef = useRef();
    const updateState = useCallback((newState, cb) => {
        cbRef.current = cb;
        setState((prev) => {
            return typeof newState === 'function' ? newState(prev) : newState
        });
    })

    return [state, setState];
}