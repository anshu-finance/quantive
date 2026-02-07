import './LogoLoop.css';
import { socialLinks } from '../../data/projects.jsx';

const LogoLoop = () => {
    // Render a single logo item
    const renderItem = (item, index) => (
        <a
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="marquee-item"
            title={item.title}
        >
            {item.node}
        </a>
    );

    return (
        <div className="marquee-wrapper">
            <div className="marquee-content">
                {/* First set */}
                {socialLinks.map((item, i) => renderItem(item, `a-${i}`))}
                {/* Second set for seamless loop */}
                {socialLinks.map((item, i) => renderItem(item, `b-${i}`))}
                {/* Third set for extra smooth */}
                {socialLinks.map((item, i) => renderItem(item, `c-${i}`))}
            </div>
        </div>
    );
};

export default LogoLoop;
