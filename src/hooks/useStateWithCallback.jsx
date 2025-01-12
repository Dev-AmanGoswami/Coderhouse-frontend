import { useCallback, useEffect, useRef, useState } from "react"

// Below hook is implemented to execute lot of tasks when a new client has been updated.
// Similar to class components we can pass callbac when state gets updated. Default useState doesn't provide such feature
export const useStateWithCallback = (initialState) => {
    const [state, setState] = useState(initialState);
    const cbRef = useRef(); // Callback reference

    useEffect(()=>{
        if(cbRef.current){
            cbRef.current(state); //Calling callback function           
        }
        cbRef.current = null;
    },[state]);

    const updateState = useCallback((newState, cb) => {
        cbRef.current = cb;
        setState((prev) => {
            return typeof newState === 'function' ? newState(prev) : newState
        });
    },[])

    return [state, updateState];
}