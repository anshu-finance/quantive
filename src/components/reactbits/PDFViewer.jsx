import { useState, useEffect, useRef } from 'react';
import './PDFViewer.css';

const PDFViewer = ({
    pdfUrl,
    title = 'Document',
    isOpen,
    onClose,
    initialDarkMode = true
}) => {
    const [darkMode, setDarkMode] = useState(initialDarkMode);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);
    const iframeRef = useRef(null);

    // Detect mobile devices
    useEffect(() => {
        const checkMobile = () => {
            const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
                || window.innerWidth <= 768;
            setIsMobile(mobile);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle keyboard shortcuts
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Handle backdrop click
    const handleBackdropClick = (e) => {
        if (e.target === containerRef.current) {
            onClose();
        }
    };

    // Handle iframe load
    const handleIframeLoad = () => {
        setLoading(false);
    };

    // Handle iframe error
    const handleIframeError = () => {
        setLoading(false);
        setError(true);
    };

    // Reset state when PDF changes
    useEffect(() => {
        if (isOpen && pdfUrl) {
            setLoading(true);
            setError(false);
        }
    }, [isOpen, pdfUrl]);

    if (!isOpen) return null;

    // Build the full URL for the PDF
    const fullPdfUrl = pdfUrl.startsWith('http')
        ? pdfUrl
        : `${window.location.origin}${pdfUrl}`;

    return (
        <div
            ref={containerRef}
            className={`pdf-viewer-overlay ${darkMode ? 'dark' : 'light'}`}
            onClick={handleBackdropClick}
        >
            <div className="pdf-viewer-container">
                {/* Header */}
                <header className="pdf-viewer-header">
                    <div className="header-left">
                        <h2 className="pdf-title">{title}</h2>
                    </div>

                    <div className="header-center">
                        {/* Open in new tab - always visible */}
                        <a
                            href={fullPdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-open-new"
                            title="Open in new tab"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                            <span className="btn-text">Open in New Tab</span>
                        </a>
                    </div>

                    <div className="header-right">
                        {/* Dark Mode Toggle - only on desktop */}
                        {!isMobile && (
                            <button
                                className="btn-icon"
                                onClick={() => setDarkMode(!darkMode)}
                                title={darkMode ? 'Light mode' : 'Dark mode'}
                            >
                                {darkMode ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="5" />
                                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                    </svg>
                                )}
                            </button>
                        )}

                        {/* Close Button */}
                        <button className="btn-icon btn-close" onClick={onClose} title="Close (Esc)">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </header>

                {/* Mobile View - Show direct open button */}
                {isMobile ? (
                    <div className="mobile-pdf-container">
                        <div className="mobile-pdf-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                            </svg>
                        </div>
                        <h3 className="mobile-pdf-title">{title}</h3>
                        <p className="mobile-pdf-desc">
                            Mobile browsers don't support inline PDF viewing.
                            Tap the button below to view the document.
                        </p>
                        <a
                            href={fullPdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-view-pdf"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                            View PDF
                        </a>
                    </div>
                ) : (
                    <>
                        {/* Loading State */}
                        {loading && (
                            <div className="loading-container">
                                <div className="loading-spinner"></div>
                                <p className="loading-text">Loading PDF...</p>
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="error-container">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 8v4M12 16h.01" />
                                </svg>
                                <p>Failed to load PDF in viewer.</p>
                                <a
                                    href={fullPdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-retry"
                                >
                                    Open PDF Directly
                                </a>
                            </div>
                        )}

                        {/* PDF Embed using iframe - Desktop only */}
                        <div className={`pdf-embed-container ${loading ? 'hidden' : ''}`}>
                            <iframe
                                ref={iframeRef}
                                src={fullPdfUrl}
                                className="pdf-iframe"
                                title={title}
                                onLoad={handleIframeLoad}
                                onError={handleIframeError}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PDFViewer;
