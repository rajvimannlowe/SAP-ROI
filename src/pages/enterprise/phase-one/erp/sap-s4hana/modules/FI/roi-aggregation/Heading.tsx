import { ArrowLeft, Sparkles } from "lucide-react";

const Heading = () => {
    return (
        <div className="bg-linear-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
            <div className="flex items-center gap-4 mb-4">
                <button className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-sm">Back to FI ROI Cockpit</span>
                </button>
            </div>
            
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-sm text-blue-200 mb-1">SAP FI – ROI Aggregation & Feedback Loop</div>
                    <h1 className="text-2xl font-bold flex items-center gap-3">
                        Enterprise Financial Controls ROI Synthesis
                        <Sparkles className="h-6 w-6 text-blue-200" />
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Heading