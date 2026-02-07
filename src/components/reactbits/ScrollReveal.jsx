import { useEffect, useRef, useMemo } from 'react';
import './ScrollReveal.css';

const ScrollReveal = ({
    children,
    containerClassName = '',
    textClassName = '',
    baseOpacity = 0.15,
    revealThreshold = 0.3,
    staggerDelay = 60 // milliseconds between each word
}) => {
    const containerRef = useRef(null);
    const hasAnimated = useRef(false);

    // Split text into words
    const splitText = useMemo(() => {
        const text = typeof children === 'string' ? children : '';
        return text.split(/(\s+)/).map((word, index) => {
            if (word.match(/^\s+$/)) return word;
            return (
                <span
                    className="scroll-word"
                    key={index}
                    style={{
                        '--word-index': index,
                        opacity: baseOpacity,
                        filter: 'blur(2px)'
                    }}
                >
                    {word}
                </span>
            );
        });
    }, [children, baseOpacity]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const words = container.querySelectorAll('.scroll-word');

        const revealWords = () => {
            if (hasAnimated.current) return;
            hasAnimated.current = true;

            words.forEach((word, index) => {
                setTimeout(() => {
                    word.classList.add('revealed');
                }, index * staggerDelay);
            });
        };

        // Intersection Observer for scroll trigger
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= revealThreshold) {
                        revealWords();
                        observer.unobserve(container);
                    }
                });
            },
            {
                threshold: [0, 0.1, 0.2, 0.3, 0.5],
                rootMargin: '-10% 0px -10% 0px'
            }
        );

        observer.observe(container);

        return () => {
            observer.disconnect();
        };
    }, [staggerDelay, revealThreshold]);

    return (
        <div ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
            <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
        </div>
    );
};

export default ScrollReveal;
