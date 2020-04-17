import React, { useState, useCallback, useRef, useEffect } from 'react';
import styles from './window.module.css';
import throttle from 'lodash/throttle';

export default ({
    title = 'default title',
    ...props
}) => {
    const [[x, y], setPosition] = useState([0, 0]);
    const [isDragging, setIsDragging] = useState(false);
    const dragOffset = useRef([0, 0]);

    const dragStartHandler = useCallback(e => {
        setIsDragging(true);  
        const rect = e.target.getBoundingClientRect();  
        dragOffset.current = [e.clientX - rect.left, e.clientY - rect.top];
    }, []);

    const dragHandler = useCallback(throttle(e => {
        setPosition([
            e.clientX - dragOffset.current[0],
            e.clientY - dragOffset.current[1]
        ]);
    }, 16), []); // 16ms ~= 60fps

    const stopDragging = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', dragHandler);
            window.addEventListener('mouseup', stopDragging);
            return () => {
                window.removeEventListener('mousemove', dragHandler);
                window.addEventListener('mouseup', stopDragging);
            }
        }
    }, [isDragging, dragHandler, stopDragging]);

    return (
        <div className={styles.window} style={{ left: `${x}px`, top: `${y}px` }}>
            <header className={styles.window__header} onMouseDown={dragStartHandler}>
                { title }
            </header>
            { props.children }
        </div>
    );
};