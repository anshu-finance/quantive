import ScrollReveal from '../components/reactbits/ScrollReveal';
import ClickSpark from '../components/reactbits/ClickSpark';
import { resumeData, personalInfo } from '../data/projects.jsx';

const Resume = () => {
    const handleDownload = () => {
        // Download the actual PDF resume
        const link = document.createElement('a');
        link.href = '/Anshumaan_Verma_Resume.pdf';
        link.download = 'Anshumaan_Verma_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="page">
            <section className="resume-section container">
                {/* Header */}
                <div className="resume-header">
                    <ScrollReveal
                        containerClassName="resume-title-container"
                        textClassName="h2"
                    >
                        My Resume
                    </ScrollReveal>
                    <ScrollReveal
                        containerClassName="resume-subtitle-container"
                        textClassName="hero-subtitle text-center"
                        baseOpacity={0.25}
                        staggerDelay={50}
                    >
                        {personalInfo.title}
                    </ScrollReveal>

                    {/* Download Button */}
                    <div className="download-btn" style={{ marginTop: 'var(--spacing-xl)' }}>
                        <ClickSpark sparkColor="#8b5cf6" sparkCount={16} extraScale={1.5}>
                            <button onClick={handleDownload} className="btn btn-primary">
                                Download Resume
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                </svg>
                            </button>
                        </ClickSpark>
                    </div>
                </div>

                {/* Resume Content */}
                <div className="resume-content">
                    {/* Certifications */}
                    <div className="resume-category card">
                        <h3>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '10px', verticalAlign: 'middle' }}>
                                <circle cx="12" cy="8" r="6" />
                                <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                            </svg>
                            Certifications
                        </h3>
                        {resumeData.certifications.map((cert, index) => (
                            <div key={index} className="resume-item">
                                <div className="resume-item-title">{cert.title}</div>
                                <div className="resume-item-subtitle">
                                    {cert.institution} • {cert.period}
                                </div>
                                <div className="resume-item-description">{cert.description}</div>
                            </div>
                        ))}
                    </div>

                    {/* Experience */}
                    <div className="resume-category card">
                        <h3>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '10px', verticalAlign: 'middle' }}>
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                            </svg>
                            Experience
                        </h3>
                        {resumeData.experience.map((exp, index) => (
                            <div key={index} className="resume-item">
                                <div className="resume-item-title">{exp.title}</div>
                                <div className="resume-item-subtitle">
                                    {exp.company} • {exp.period}
                                </div>
                                <div className="resume-item-description">{exp.description}</div>
                            </div>
                        ))}
                    </div>

                    {/* Education */}
                    <div className="resume-category card">
                        <h3>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '10px', verticalAlign: 'middle' }}>
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                <path d="M6 12v5c3 3 9 3 12 0v-5" />
                            </svg>
                            Education
                        </h3>
                        {resumeData.education.map((edu, index) => (
                            <div key={index} className="resume-item">
                                <div className="resume-item-title">{edu.title}</div>
                                <div className="resume-item-subtitle">
                                    {edu.institution} • {edu.period}
                                </div>
                                <div className="resume-item-description">{edu.description}</div>
                            </div>
                        ))}
                    </div>

                    {/* Skills */}
                    <div className="resume-category card">
                        <h3>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '10px', verticalAlign: 'middle' }}>
                                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                            </svg>
                            Skills
                        </h3>
                        <div className="skills-grid">
                            {resumeData.skills.map((skill, index) => (
                                <span key={index} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Resume;
