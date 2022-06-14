import React, { useRef, useState, useEffect } from 'react';

export default function useElementWidth(setIsDesktop) {
    const ref = useRef();
    const [ width, setWidth ] = useState(null);

    const observer = useRef(
        new ResizeObserver((entries) => {
            const { width } = entries[0].contentRect;
            setWidth(width);
            setIsDesktop(width > 800);
        })
    );

    useEffect(() => {
        if (ref.current) {observer.current.observe(ref.current);}
    }, [ref, observer]);

    return [ ref, width ];
}
