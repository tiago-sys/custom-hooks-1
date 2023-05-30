import { useState } from 'react';

export const useCounter = (initialValue) => {
    const [counter, setCounter] = useState(initialValue);

    const increase = (increment = 1) => {
        setCounter(counter + increment);
    };

    const decrease = (increment = 1) => {
        if (counter - increment <= 0) {
            setCounter(0);
            return;
        }

        setCounter(counter - increment);
    };

    const reset = () => {
        setCounter(initialValue);
    };

    return {
        counter,
        increase,
        decrease,
        reset,
    };
};
