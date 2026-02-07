import { useNavigate } from 'react-router-dom';
import Folder from '../components/reactbits/Folder';
import ScrollReveal from '../components/reactbits/ScrollReveal';
import './Projects.css';

// Category data
const categories = [
    {
        id: 'financial-model',
        title: 'Financial Model & Valuation Report',
        color: '#6366f1',
        path: '/projects/financial-model'
    },
    {
        id: 'equity-research',
        title: 'Equity Research Report',
        color: '#818cf8',
        path: '/projects/equity-research'
    },
    {
        id: 'mutual-fund',
        title: 'Mutual Fund Analysis Report',
        color: '#a5b4fc',
        path: '/projects/mutual-fund'
    },
    {
        id: 'ipo-analysis',
        title: 'IPO Analysis Report',
        color: '#c7d2fe',
        path: '/projects/ipo-analysis'
    }
];

const Projects = () => {
    const navigate = useNavigate();

    return (
        <div className="page projects-page">
            <section className="projects-section container">
                {/* Header with ScrollReveal */}
                <div className="projects-header">
                    <ScrollReveal
                        containerClassName="projects-title-container"
                        textClassName="h2"
                        staggerDelay={100}
                    >
                        My Projects
                    </ScrollReveal>
                    <ScrollReveal
                        containerClassName="projects-subtitle-container"
                        textClassName="projects-subtitle"
                        staggerDelay={80}
                    >
                        Click on a folder to explore projects in each category
                    </ScrollReveal>
                </div>

                {/* Folder Grid */}
                <div className="folders-grid">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="folder-item"
                            onClick={() => navigate(category.path)}
                        >
                            <Folder
                                color={category.color}
                                size={1.5}
                                items={[]}
                            />
                            <span className="folder-label">{category.title}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Projects;
