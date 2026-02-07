import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ClickSpark from './ClickSpark';
import './Dock.css';

function DockItem({ children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize, isActive }) {
    const ref = useRef(null);
    const isHovered = useMotionValue(0);

    const mouseDistance = useTransform(mouseX, val => {
        const rect = ref.current?.getBoundingClientRect() ?? {
            x: 0,
            width: baseItemSize
        };
        return val - rect.x - baseItemSize / 2;
    });

    const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
    const size = useSpring(targetSize, spring);

    return (
        <ClickSpark sparkColor="#6366f1" sparkCount={8} sparkRadius={15} sparkSize={10}>
            <motion.div
                ref={ref}
                style={{
                    width: size,
                    height: size
                }}
                onHoverStart={() => isHovered.set(1)}
                onHoverEnd={() => isHovered.set(0)}
                onFocus={() => isHovered.set(1)}
                onBlur={() => isHovered.set(0)}
                onClick={onClick}
                className={`dock-item ${className} ${isActive ? 'active' : ''}`}
                tabIndex={0}
                role="button"
                aria-haspopup="true"
            >
                {Children.map(children, child => cloneElement(child, { isHovered }))}
            </motion.div>
        </ClickSpark>
    );
}

function DockLabel({ children, className = '', ...rest }) {
    const { isHovered } = rest;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = isHovered.on('change', latest => {
            setIsVisible(latest === 1);
        });
        return () => unsubscribe();
    }, [isHovered]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: -10 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.13 }}
                    className={`dock-label ${className}`}
                    role="tooltip"
                    style={{ x: '-50%' }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function DockIcon({ children, className = '' }) {
    return <div className={`dock-icon ${className}`}>{children}</div>;
}

export default function Dock({
    items,
    className = '',
    spring = { mass: 0.1, stiffness: 300, damping: 15 }, // Higher damping for quicker return
    magnification = 60, // Reduced magnification to prevent overlap
    distance = 140, // Reduced distance for tighter control
    panelHeight = 64,
    dockHeight = 200,
    baseItemSize = 48
}) {
    const mouseX = useMotionValue(Infinity);
    const isHovered = useMotionValue(0);
    const navigate = useNavigate();
    const location = useLocation();

    const maxHeight = useMemo(
        () => Math.max(dockHeight, magnification + magnification / 2 + 4),
        [magnification, dockHeight]
    );
    const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
    const height = useSpring(heightRow, spring);

    const handleItemClick = (item) => {
        // Reset mouseX to Infinity immediately after click to shrink icons back
        setTimeout(() => {
            mouseX.set(Infinity);
            isHovered.set(0);
        }, 100);

        if (item.path) {
            navigate(item.path);
        } else if (item.onClick) {
            item.onClick();
        }
    };

    return (
        <motion.div style={{ height, scrollbarWidth: 'none' }} className="dock-outer">
            <motion.div
                onMouseMove={({ pageX }) => {
                    isHovered.set(1);
                    mouseX.set(pageX);
                }}
                onMouseLeave={() => {
                    isHovered.set(0);
                    mouseX.set(Infinity);
                }}
                onTouchEnd={() => {
                    // Reset on touch end for mobile
                    setTimeout(() => {
                        isHovered.set(0);
                        mouseX.set(Infinity);
                    }, 150);
                }}
                className={`dock-panel ${className}`}
                style={{ height: panelHeight }}
                role="toolbar"
                aria-label="Application dock"
            >
                {items.map((item, index) => (
                    <DockItem
                        key={index}
                        onClick={() => handleItemClick(item)}
                        className={item.className}
                        mouseX={mouseX}
                        spring={spring}
                        distance={distance}
                        magnification={magnification}
                        baseItemSize={baseItemSize}
                        isActive={location.pathname === item.path}
                    >
                        <DockIcon>{item.icon}</DockIcon>
                        <DockLabel>{item.label}</DockLabel>
                    </DockItem>
                ))}
            </motion.div>
        </motion.div>
    );
}
