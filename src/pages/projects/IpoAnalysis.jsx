import { Link } from 'react-router-dom';
import ChromaGrid from '../../components/reactbits/ChromaGrid';
import '../Projects.css';

import { categoryProjects } from '../../data/projects.jsx';
const projects = categoryProjects.ipoAnalysis;

const IpoAnalysis = () => {
    return (
        <div className="page project-subpage">
            <section className="container">
                {/* Header */}
                <div className="subpage-header">
                    <Link to="/projects" className="back-link">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Projects
                    </Link>
                    <h1>IPO Analysis Report</h1>
                    <p>Prospectus evaluation, pricing analysis, and investment recommendations</p>
                </div>

                {/* ChromaGrid Projects */}
                <ChromaGrid
                    items={projects}
                    columns={2}
                    radius={350}
                    damping={0.4}
                />
            </section>
        </div>
    );
};

export default IpoAnalysis;
