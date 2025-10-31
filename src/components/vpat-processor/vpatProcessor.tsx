import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// Import components and utilities
import { removeApplicants } from './processingLogic';
import InputSection from './inputSection';
import OutputSection from './outputSection';
import StatsCard from './statsCard';

const VpatProcessor: React.FC = () => {
    const [applicantValue, setApplicantValue] = useState<string>('');
    const [chatlogValue, setChatlogValue] = useState<string>('');
    const [applicantError, setApplicantError] = useState<string | null>(null);
    const [chatlogError, setChatlogError] = useState<string | null>(null);
    const [processingError, setProcessingError] = useState<string | null>(null);

    // Use useMemo with try...catch to prevent fatal crashes during processing
    const processedChatlog = useMemo(() => {
        setProcessingError(null); // Clear error on every input change

        // Only run the heavy processing if both fields are populated
        if (!chatlogValue.trim() || !applicantValue.trim()) {
            return '';
        }
        
        try {
            return removeApplicants(chatlogValue, applicantValue);
        } catch (e: any) {
            // Catch the error and set a user-friendly message
            console.error("Chatlog Processing Error:", e);
            setProcessingError("A critical error occurred while processing the chatlog. This is usually caused by extremely long or malformed input data. Check the console for details.");
            return ''; // Return empty string on error
        }
    }, [chatlogValue, applicantValue]);

    const handleProcess = () => {
        let hasError = false;

        if (!applicantValue.trim()) {
            setApplicantError('Applicant name cannot be empty.');
            hasError = true;
        } else {
            setApplicantError(null);
        }

        if (!chatlogValue.trim()) {
            setChatlogError('Chatlog cannot be empty.');
            hasError = true;
        } else {
            setChatlogError(null);
        }

        return !hasError && !processingError;
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Link to="/">
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text">
                            VPAT Log Processor
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            A utility for filtering, <strong>deduplicating</strong>, and chronologically sorting session logs.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Input Section */}
                    <div className="space-y-6">
                        <InputSection
                            applicantValue={applicantValue}
                            setApplicantValue={setApplicantValue}
                            chatlogValue={chatlogValue}
                            setChatlogValue={setChatlogValue}
                            applicantError={applicantError}
                            chatlogError={chatlogError}
                            processingError={processingError}
                            onProcess={handleProcess}
                        />
                    </div>

                    {/* Output Section */}
                    <div className="space-y-6">
                        <OutputSection
                            processedChatlog={processedChatlog}
                            applicantError={applicantError}
                            chatlogError={chatlogError}
                            processingError={processingError}
                            chatlogValue={chatlogValue}
                        />

                        <StatsCard
                            chatlogValue={chatlogValue}
                            processedChatlog={processedChatlog}
                            processingError={processingError}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VpatProcessor;