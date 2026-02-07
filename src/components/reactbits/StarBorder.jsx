import './StarBorder.css';

const StarBorder = ({
    children,
    as = 'button',
    className = '',
    color = '#8b5cf6',
    speed = '6s',
    ...props
}) => {
    const Tag = as;

    return (
        <Tag
            className={`star-border ${className}`}
            style={{
                '--star-color': color,
                '--star-speed': speed
            }}
            {...props}
        >
            <div className="star-border-glow" />
            <div className="star-border-inner">
                {children}
            </div>
        </Tag>
    );
};

export default StarBorder;

