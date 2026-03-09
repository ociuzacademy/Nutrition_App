import React from 'react';
import { UploadCloud } from 'lucide-react';

const UploadSection = ({ image, handleImageUpload, analysisResult, isProcessing, processBackendImage, clearImage }) => {
    return (
        <div className={`transition-all duration-500 relative group bg-[#FAFAFA] border-2 border-dashed border-[#E5E7EB] rounded-[2rem] flex flex-col items-center justify-center text-center p-6 md:p-10 hover:border-[#00E676] hover:bg-[#F0FDF4]/30 shadow-lg shadow-slate-100/50`}>

            {!image && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00E676]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            )}

            {analysisResult?.error && (
                <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 mb-6 w-full text-left">
                    <p className="font-black text-xl mb-1">{analysisResult.error}</p>
                    <p className="font-medium opacity-80">{analysisResult.message}</p>
                </div>
            )}

            {!image ? (
                <>
                    <div className="w-20 h-20 bg-[#E8F8EE] rounded-full flex items-center justify-center mb-6 text-[#00E676] group-hover:scale-110 group-hover:bg-[#00E676] group-hover:text-white transition-all duration-300 relative z-10 shadow-sm">
                        <UploadCloud size={32} />
                    </div>
                    <h3 className="text-xl font-black text-[#1F2937] mb-2 relative z-10">Drop your photo here</h3>
                    <p className="text-sm font-bold text-[#9CA3AF] mb-8 relative z-10">Supports JPG, Max 10MB.</p>

                    <label className="bg-[#00E676] text-black font-black px-10 py-4 rounded-xl cursor-pointer hover:shadow-lg hover:shadow-green-200 transition-all hover:scale-105 active:scale-95 relative z-10">
                        Browse Files
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                </>
            ) : (
                <div className="w-full relative flex flex-col items-center">
                    <div className="w-full rounded-3xl overflow-hidden relative group/img shadow-xl border-4 border-white aspect-square max-h-[500px]">
                        <img src={image} alt="Upload Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                onClick={clearImage}
                                className="bg-white text-red-500 font-bold px-6 py-2 rounded-lg shadow-lg hover:bg-red-50 transition-colors"
                            >
                                Remove Image
                            </button>
                        </div>
                    </div>

                    {isProcessing ? (
                        <div className="mt-8 flex flex-col items-center justify-center animate-pulse">
                            <div className="w-12 h-12 border-4 border-slate-100 border-t-[#00E676] rounded-full animate-spin mb-4"></div>
                            <p className="font-bold text-[#1F2937]">Checking</p>
                        </div>
                    ) : (
                        <div className="flex justify-center mt-8 w-full">
                            <button
                                onClick={processBackendImage}
                                className="bg-[#1B2533] text-white px-8 py-4 rounded-2xl font-black tracking-wide w-full max-w-[300px] hover:bg-black transition-all shadow-xl hover:-translate-y-1 active:translate-y-0"
                            >
                                Process Analysis
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UploadSection;
