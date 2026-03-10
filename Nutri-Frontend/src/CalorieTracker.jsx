import React, { useState } from 'react';
import Navigation from './components/Navigation';
import LandingHero from './components/LandingHero';
import AnalysisDashboard from './components/AnalysisDashboard';

const CalorieTracker = () => {
    const [page, setPage] = useState('landing');
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setImageFile(file);
            setAnalysisResult(null);
        }
    };

    const clearImage = () => {
        setImage(null);
        setImageFile(null);
        setAnalysisResult(null);
    };

    const processBackendImage = async () => {
        if (!imageFile) return;
        setIsProcessing(true);
        setAnalysisResult(null);

        const formData = new FormData();
        formData.append('image', imageFile); // API expects field named 'image'

        try {
            const response = await fetch('https://xp1f2rd8-8000.inc1.devtunnels.ms/analyze', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Analysis failed to fetch from backend.');
            }

            const data = await response.json();
            setAnalysisResult(data);
        } catch (error) {
            console.error('Backend analysis error:', error);
            // Fallback UI to show the user what it would look like if it failed
            setAnalysisResult({
                error: "Could not connect to backend.",
                message: error.message,
                note: "Ensure backend is running and CORS is enabled."
            });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans overflow-x-hidden transition-all duration-500 relative">

            {/* Navigation */}
            <Navigation setPage={setPage} />

            {/* Dynamic Pages */}
            <div className="relative z-10">
                {page === 'landing' ? (
                    <LandingHero setPage={setPage} />
                ) : (
                    <AnalysisDashboard
                        image={image}
                        analysisResult={analysisResult}
                        clearImage={clearImage}
                        handleImageUpload={handleImageUpload}
                        isProcessing={isProcessing}
                        processBackendImage={processBackendImage}
                    />
                )}
            </div>

            <style>{`
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-4px); }
                }
                @keyframes slide-in-right {
                    0% { transform: translateX(50px); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                }
                @keyframes slide-in-right-hero {
                    0% { transform: translateX(100px); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                }
                @keyframes slide-in-left {
                    0% { transform: translateX(-100px); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(3deg); }
                }
                @keyframes pulse-soft {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.5); opacity: 0.2; }
                }
                @keyframes slide-up-fade {
                    0% { transform: translateY(30px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                @keyframes fade-in-quick {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }

                .animate-bounce-subtle { animation: bounce-subtle 4s ease-in-out infinite; }
                .animate-slide-in-right { animation: slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-slide-in-right-hero { animation: slide-in-right-hero 1.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
                .animate-slide-in-left { animation: slide-in-left 1.2s cubic-bezier(0.16, 1, 0.3, 1) both; }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-float.slow { animation: float 10s ease-in-out infinite reverse; }
                .animate-pulse-soft { animation: pulse-soft 4s ease-in-out infinite; }
                .animate-slide-up-fade { animation: slide-up-fade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-fade-in-quick { animation: fade-in-quick 0.3s ease-out forwards; }

                /* Hide Scrollbar completely for cleaner UI */
                .hide-scroll::-webkit-scrollbar {
                    display: none;
                }
                .hide-scroll {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default CalorieTracker;
