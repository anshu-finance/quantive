import { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import ClickSpark from './ClickSpark';
import './CardNav.css';

const CardNav = ({
    items = [],
    className = '',
    ease = 'power3.out',
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const navRef = useRef(null);
    const cardsRef = useRef([]);
    const tlRef = useRef(null);
    const navigate = useNavigate();

    // Card configuration with colors for portfolio
    const cardConfig = [
        {
            label: 'Home',
            path: '/',
            bgColor: '#1a1a2e',
            links: [
                { label: 'About Me', href: '#about' },
                { label: 'Skills', href: '#skills' }
            ]
        },
        {
            label: 'Projects',
            path: '/projects',
            bgColor: '#16213e',
            links: [
                { label: 'Featured', href: '/projects#featured' },
                { label: 'All Work', href: '/projects' }
            ]
        },
        {
            label: 'Resume',
            path: '/resume',
            bgColor: '#1a1a2e',
            links: [
                { label: 'Experience', href: '/resume#experience' },
                { label: 'Download', href: '/resume#download' }
            ]
        }
    ];

    const calculateHeight = () => {
        const navEl = navRef.current;
        if (!navEl) return 400;
        return 400; // Full height for space-filling cards
    };

    const createTimeline = () => {
        const navEl = navRef.current;
        if (!navEl) return null;

        gsap.set(navEl, { height: 60, overflow: 'hidden' });
        gsap.set(cardsRef.current, { y: 50, opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        tl.to(navEl, {
            height: calculateHeight,
            duration: 0.26, // 35% faster than 0.4
            ease
        });

        tl.to(cardsRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.26,
            ease,
            stagger: 0.05 // 35% faster than 0.08
        }, '-=0.06');

        return tl;
    };

    useLayoutEffect(() => {
        const tl = createTimeline();
        tlRef.current = tl;

        return () => {
            tl?.kill();
            tlRef.current = null;
        };
    }, [ease]);

    const toggleMenu = () => {
        const tl = tlRef.current;
        if (!tl) return;

        if (!isExpanded) {
            setIsExpanded(true);
            tl.play(0);
        } else {
            tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
            tl.reverse();
        }
    };

    const handleCardClick = (path) => {
        toggleMenu();
        setTimeout(() => navigate(path), 200);
    };

    const setCardRef = (i) => (el) => {
        if (el) cardsRef.current[i] = el;
    };

    return (
        <div className={`card-nav-container ${className}`}>
            <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`}>
                {/* Top Bar */}
                <div className="card-nav-top">
                    {/* Hamburger Menu */}
                    <ClickSpark sparkColor="#6366f1" sparkCount={6} sparkRadius={12}>
                        <button
                            className={`hamburger-menu ${isExpanded ? 'open' : ''}`}
                            onClick={toggleMenu}
                            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                        >
                            <div className="hamburger-line" />
                            <div className="hamburger-line" />
                        </button>
                    </ClickSpark>

                    {/* Center Logo */}
                    <div className="logo-container">
                        <span className="logo-text">Anshumaan Verma</span>
                    </div>

                    {/* CTA Button */}
                    <ClickSpark sparkColor="#818cf8" sparkCount={8} sparkRadius={15}>
                        <a
                            href="https://linkedin.com/in/anshumaan-verma"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card-nav-cta"
                        >
                            Connect
                        </a>
                    </ClickSpark>
                </div>

                {/* Expandable Cards Container */}
                <div className="card-nav-content" aria-hidden={!isExpanded}>
                    {cardConfig.map((card, idx) => (
                        <ClickSpark
                            key={idx}
                            sparkColor="#818cf8"
                            sparkCount={10}
                            sparkRadius={25}
                        >
                            <div
                                ref={setCardRef(idx)}
                                className="nav-card"
                                style={{ backgroundColor: card.bgColor }}
                                onClick={() => handleCardClick(card.path)}
                            >
                                <div className="nav-card-label">{card.label}</div>
                                <div className="nav-card-links">
                                    {card.links.map((link, i) => (
                                        <a
                                            key={i}
                                            className="nav-card-link"
                                            href={link.href}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <svg className="nav-card-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                                            </svg>
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </ClickSpark>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default CardNav;
