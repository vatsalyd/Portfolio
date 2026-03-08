import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const variants = {
    fadeUp: {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 },
    },
    fadeDown: {
        hidden: { opacity: 0, y: -60 },
        visible: { opacity: 1, y: 0 },
    },
    fadeLeft: {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 },
    },
    fadeRight: {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 },
    },
    scaleUp: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    },
    slideIn: {
        hidden: { opacity: 0, x: -60, filter: 'blur(10px)' },
        visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
    },
};

export default function ScrollReveal({
    children,
    variant = 'fadeUp',
    delay = 0,
    duration = 0.6,
    once = true,
    className = '',
    style = {},
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants[variant] || variants.fadeUp}
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
}
