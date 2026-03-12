import React from 'react';
import { Camera, CheckCircle2, Leaf } from 'lucide-react';
import UploadSection from './UploadSection';

const AnalysisDashboard = ({ image, analysisResult, clearImage, handleImageUpload, isProcessing, processBackendImage }) => {
    const totalCalories = Math.round(analysisResult?.foods?.reduce((sum, food) => {
        const cal = typeof food.calories === 'string' ? parseFloat(food.calories.replace(/[^\d.-]/g, '')) : food.calories;
        return sum + (!isNaN(cal) ? cal : 0);
    }, 0) || 0);

    const totalProtein = Math.round(analysisResult?.foods?.reduce((sum, food) => {
        const val = typeof food.protein === 'string' ? parseFloat(food.protein.replace(/[^\d.-]/g, '')) : food.protein;
        return sum + (!isNaN(val) ? val : 0);
    }, 0) || 0);

    const totalCarbs = Math.round(analysisResult?.foods?.reduce((sum, food) => {
        const val = typeof food.carbs === 'string' ? parseFloat(food.carbs.replace(/[^\d.-]/g, '')) : food.carbs;
        return sum + (!isNaN(val) ? val : 0);
    }, 0) || 0);

    const totalFat = Math.round(analysisResult?.foods?.reduce((sum, food) => {
        const val = typeof food.fat === 'string' ? parseFloat(food.fat.replace(/[^\d.-]/g, '')) : food.fat;
        return sum + (!isNaN(val) ? val : 0);
    }, 0) || 0);

    const mealName = analysisResult?.foods?.length > 1 ? "Combined Meal" : (analysisResult?.foods?.[0]?.name || "Dish");

    return (
        <main className="relative max-w-6xl mx-auto px-6 pt-8 pb-40 animate-slide-up-fade transition-all duration-700">
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
                {/* Floating Gradient Blobs */}
                <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-[#00E676]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float slow"></div>
                <div className="absolute top-[20%] right-[-5%] w-[350px] h-[350px] bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-yellow-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-soft"></div>

                {/* Subtle Dotted Grid Pattern overlay */}
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                    opacity: 0.3
                }}></div>
            </div>

            {/* Header State 1: Nothing uploaded */}
            {!image && (
                <div className="text-center mb-10">
                    <h2 className="text-5xl md:text-[3.5rem] font-black text-[#1B2533] tracking-tighter mb-4">
                        Analyze Your Meal
                    </h2>
                    <p className="text-[#6B7280] font-bold text-[17px]">Our AI is ready to break down your nutritional profile.</p>
                    <div className="w-full mt-12 border-b-2 border-dashed border-slate-200"></div>
                </div>
            )}

            {/* Header State 2: Uploaded, Processing or Waiting */}
            {!analysisResult && image && (
                <div className="text-center mb-10">
                    <h2 className="text-5xl md:text-[3.5rem] font-black text-[#1B2533] tracking-tighter mb-4">
                        Ready to Analyze
                    </h2>
                    <p className="text-[#6B7280] font-bold text-[17px]">Click process to scan the photo.</p>
                    <div className="w-full mt-12 border-b-2 border-dashed border-slate-200"></div>
                </div>
            )}

            {/* Header State 3: Analysis Complete */}
            {analysisResult && !analysisResult.error && (
                <div className="mb-8 animate-fade-in-quick">
                    <div className="text-[11px] text-slate-500 font-bold mb-2 tracking-widest uppercase">
                        <span className="opacity-50">Analysis /</span> <span className="text-[#1B2533]">{mealName} Breakdown</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <div>
                            <h2 className="text-[2.5rem] font-black text-[#1B2533] tracking-tighter mb-2">
                                Meal Analysis
                            </h2>
                            <p className="text-slate-500 font-medium text-sm">Detailed ingredient and nutritional breakdown based on AI image recognition.</p>
                        </div>
                        <button
                            onClick={clearImage}
                            className="bg-white text-[#1B2533] font-bold px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all shadow-sm text-xs flex items-center gap-2"
                        >
                            <Camera size={14} />
                            Scan New Image
                        </button>
                    </div>
                </div>
            )}

            <div className={`transition-all duration-700 w-full ${!analysisResult ? (image ? 'max-w-xl mx-auto' : 'max-w-4xl mx-auto') : ''}`}>

                {/* We handle Upload/Preview OR the Dashboard in the same container slot based on state */}
                {!analysisResult ? (
                    <UploadSection
                        image={image}
                        handleImageUpload={handleImageUpload}
                        analysisResult={analysisResult}
                        isProcessing={isProcessing}
                        processBackendImage={processBackendImage}
                        clearImage={clearImage}
                    />
                ) : (
                    /* Full Analysis Dashboard Layout (State 3 - Result Exists) */
                    <div className="w-full flex justify-center w-full animate-fade-in-quick">
                        <div className="w-full max-w-6xl flex flex-col gap-6">

                            {/* Two Column Layout matching new design */}
                            <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6 items-start">

                                {/* LEFT COLUMN: Image & Food Log */}
                                <div className="flex flex-col gap-6">
                                    {/* Image Card */}
                                    <div className="bg-white p-3 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center justify-center relative overflow-hidden h-[400px]">
                                        <img src={image} className="w-full h-full object-cover rounded-[1.5rem]" />
                                        {/* Badge inside image */}
                                        <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-sm text-white px-4 py-2.5 rounded-full flex items-center gap-2 border border-white/10 shadow-lg">
                                            <CheckCircle2 size={16} className="text-[#00E676] fill-[#00E676]/20" />
                                            <span className="text-xs font-bold tracking-wide">Visual Analysis Confirmed</span>
                                        </div>
                                    </div>

                                    {/* Identified Food Log Card */}
                                    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 flex flex-col h-[400px]">
                                        <div className="flex justify-between items-center mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="text-[#00E676]">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                                                </div>
                                                <h3 className="font-bold text-lg text-[#1B2533]">Identified Food Log</h3>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-0 overflow-y-auto pr-2 pb-2 hide-scroll">
                                            {analysisResult.foods && analysisResult.foods.length > 0 ? (
                                                analysisResult.foods.map((food, idx) => (
                                                    <div key={idx} className="flex justify-between items-center py-5 border-b border-slate-50 last:border-0">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-[52px] h-[52px] bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] text-[#00E676] rounded-2xl flex items-center justify-center shrink-0">
                                                                <Leaf size={22} strokeWidth={2.5} />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="font-extrabold text-[#1B2533] text-[15px] capitalize tracking-wide">{food.name}</span>
                                                                <div className="flex gap-3 mt-1">
                                                                    <span className="text-[11px] font-bold text-slate-500">P: <span className="text-[#2563EB]">{food.protein || '0g'}</span></span>
                                                                    <span className="text-[11px] font-bold text-slate-500">C: <span className="text-[#F59E0B]">{food.carbs || '0g'}</span></span>
                                                                    <span className="text-[11px] font-bold text-slate-500">F: <span className="text-[#E11D48]">{food.fat || '0g'}</span></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span className="font-extrabold text-[#1B2533] text-[15px]">{food.calories} kcal</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="py-4 text-sm text-slate-500">No specific ingredients parsed.</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT COLUMN: Nutritional Summary */}
                                <div className="bg-white rounded-[2rem] p-8 flex flex-col h-full">
                                    <h3 className="font-bold text-lg text-[#1B2533] mb-12">Nutritional Summary</h3>

                                    {/* Circular Chart */}
                                    <div className="flex flex-col items-center justify-center mb-6 mt-2">
                                        <div className="w-56 h-56 rounded-full border-[14px] border-slate-50 border-t-[#00E676] border-r-[#00E676] border-b-[#00E676] flex flex-col items-center justify-center mb-8 relative">
                                            <span className="text-[3.5rem] font-black text-[#1B2533] tracking-tighter leading-none">{totalCalories}</span>
                                            <span className="text-sm font-black text-slate-400 tracking-widest uppercase mt-2">Kcal</span>
                                        </div>
                                        <p className="text-xs font-semibold text-slate-400">27% of your daily intake goal</p>
                                    </div>

                                    {/* Macro Cards Row */}
                                    <div className="grid grid-cols-3 gap-4 mt-4">

                                        {/* Protein */}
                                        <div className="bg-slate-50 p-4 py-5 rounded-2xl flex flex-col items-center justify-center text-center">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#1B2533] mb-3">Protein</span>
                                            <span className="text-[1.75rem] leading-none font-bold text-[#2563EB] mb-4">{totalProtein}g</span>
                                            <div className="h-1.5 w-12 bg-slate-200 rounded-full overflow-hidden mx-auto">
                                                <div className="h-full bg-[#2563EB] rounded-full w-[60%]"></div>
                                            </div>
                                        </div>

                                        {/* Carbs */}
                                        <div className="bg-slate-50 p-4 py-5 rounded-2xl flex flex-col items-center justify-center text-center">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#1B2533] mb-3">Carbs</span>
                                            <span className="text-[1.75rem] leading-none font-bold text-[#F59E0B] mb-4">{totalCarbs}g</span>
                                            <div className="h-1.5 w-12 bg-slate-200 rounded-full overflow-hidden mx-auto">
                                                <div className="h-full bg-[#F59E0B] rounded-full w-[45%]"></div>
                                            </div>
                                        </div>

                                        {/* Fats */}
                                        <div className="bg-slate-50 p-4 py-5 rounded-2xl flex flex-col items-center justify-center text-center">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#1B2533] mb-3">Fats</span>
                                            <span className="text-[1.75rem] leading-none font-bold text-[#E11D48] mb-4">{totalFat}g</span>
                                            <div className="h-1.5 w-12 bg-slate-200 rounded-full overflow-hidden mx-auto">
                                                <div className="h-full bg-[#E11D48] rounded-full w-[30%]"></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
};

export default AnalysisDashboard;
