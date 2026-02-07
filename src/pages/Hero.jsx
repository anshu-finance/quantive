import ScrollReveal from '../components/reactbits/ScrollReveal';
import ClickSpark from '../components/reactbits/ClickSpark';
import LogoLoop from '../components/reactbits/LogoLoop';
import StarBorder from '../components/reactbits/StarBorder';
import Carousel from '../components/reactbits/Carousel';
import ProfileCard from '../components/reactbits/ProfileCard';
import { personalInfo, categoryProjects } from '../data/projects.jsx';
import { Link } from 'react-router-dom';

// Use category-specific arrays for each carousel
const carousel1Projects = categoryProjects.financialModel;
const carousel2Projects = categoryProjects.equityResearch;
const carousel3Projects = [...categoryProjects.mutualFund, ...categoryProjects.ipoAnalysis];

const Hero = () => {
    const handleConnect = () => {
        window.open(personalInfo.linkedInUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="page hero-page">
            {/* SECTION 1: Hero - Top */}
            <section className="hero-section">
                <div className="hero-container">
                    {/* Left Column - Text Content */}
                    <div className="hero-text-column">
                        {/* Animated Name */}
                        <ScrollReveal
                            containerClassName="hero-name-container"
                            textClassName="hero-title"
                            baseOpacity={0.3}
                            staggerDelay={80}
                        >
                            {`Hi, I'm ${personalInfo.name}`}
                        </ScrollReveal>

                        {/* Role/Title */}
                        <h2 className="hero-subtitle text-gradient">
                            {personalInfo.title}
                        </h2>

                        {/* Introduction */}
                        <ScrollReveal
                            containerClassName="hero-intro-container"
                            textClassName="hero-intro"
                            baseOpacity={0.25}
                            staggerDelay={40}
                        >
                            {personalInfo.intro}
                        </ScrollReveal>

                        {/* CTA Buttons */}
                        <div className="hero-cta">
                            <ClickSpark sparkColor="#6366f1" sparkCount={12}>
                                <Link to="/projects" className="btn btn-primary">
                                    View My Work
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </ClickSpark>

                            <ClickSpark sparkColor="#818cf8" sparkCount={8}>
                                <Link to="/resume" className="btn btn-secondary">
                                    Download Resume
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                    </svg>
                                </Link>
                            </ClickSpark>
                        </div>

                        {/* Star Border Connect Button */}
                        <div className="hero-connect">
                            <ClickSpark sparkColor="#6366f1" sparkCount={16} extraScale={1.5}>
                                <StarBorder
                                    as="a"
                                    href={personalInfo.linkedInUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="#6366f1"
                                    speed="2s"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    Connect Now
                                </StarBorder>
                            </ClickSpark>
                        </div>
                    </div>

                    {/* Right Column - Profile Card */}
                    <div className="hero-card-column">
                        <ProfileCard
                            avatarUrl="/profile.jpg"
                            name={personalInfo.name}
                            title={personalInfo.title}
                            handle="anshu2710"
                            status="Available for opportunities"
                            contactText="Connect"
                            showUserInfo={true}
                            onContactClick={handleConnect}
                            behindGlowEnabled={true}
                            behindGlowColor="rgba(99, 102, 241, 0.45)"
                            behindGlowSize="50%"
                            enableTilt={true}
                        />
                    </div>
                </div>
            </section>

            {/* SECTION 2: Three Carousels - Middle */}
            <section className="carousels-section">
                <div className="container">
                    <h2 className="section-title text-gradient">Recent Work</h2>
                    <div className="carousels-grid">
                        <div className="carousel-wrapper">
                            <h3 className="carousel-label">Financial Models</h3>
                            <Carousel
                                items={carousel1Projects}
                                baseWidth={320}
                                autoplay={true}
                                autoplayDelay={4000}
                                loop={true}
                                pauseOnHover={true}
                            />
                        </div>
                        <div className="carousel-wrapper">
                            <h3 className="carousel-label">Equity Research</h3>
                            <Carousel
                                items={carousel2Projects}
                                baseWidth={320}
                                autoplay={true}
                                autoplayDelay={4500}
                                loop={true}
                                pauseOnHover={true}
                            />
                        </div>
                        <div className="carousel-wrapper">
                            <h3 className="carousel-label">Fund Analysis</h3>
                            <Carousel
                                items={carousel3Projects}
                                baseWidth={320}
                                autoplay={true}
                                autoplayDelay={5000}
                                loop={true}
                                pauseOnHover={true}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;
