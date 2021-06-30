import { useEffect, useRef } from 'react';

export const useEffectInitial = (callback, state) => {
    const isInitial = useRef(true);

    useEffect(() => {
        if(isInitial.current){
            isInitial.current = false;
            return;
        }
        callback()
    }, state)
}