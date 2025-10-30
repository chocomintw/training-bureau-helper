import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, AlertCircle } from 'lucide-react';
import type { InputSectionProps } from './types';

const InputSection: React.FC<InputSectionProps> = ({
    applicantValue,
    setApplicantValue,
    chatlogValue,
    setChatlogValue,
    applicantError,
    chatlogError,
    processingError,
    onProcess
}) => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Input Parameters</CardTitle>
                    <CardDescription>
                        Enter the applicant/keyword and paste your session chatlog
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label htmlFor="applicant" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Applicant/Keyword (Filter by Content)
                        </label>
                        <input
                            id="applicant"
                            type="text"
                            placeholder='e.g., "Applicant A"'
                            value={applicantValue}
                            onChange={(e) => setApplicantValue(e.target.value)}
                            className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                applicantError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                        />
                        {applicantError && (
                            <p className="text-red-500 text-sm mt-1">{applicantError}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="chatlog" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Raw Session Chatlog
                        </label>
                        <textarea
                            id="chatlog"
                            placeholder='Paste your session chatlog here (must include [HH:MM:SS] timestamps)...'
                            value={chatlogValue}
                            onChange={(e) => setChatlogValue(e.target.value)}
                            rows={8}
                            className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono ${
                                chatlogError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                        />
                        {chatlogError && (
                            <p className="text-red-500 text-sm mt-1">{chatlogError}</p>
                        )}
                    </div>

                    <Button
                        onClick={onProcess}
                        className="w-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-xl transition-all duration-200 hover:scale-105"
                        disabled={!!processingError}
                    >
                        <FileText className="h-4 w-4 mr-2" />
                        Process Logs (Real-time Update)
                    </Button>
                </CardContent>
            </Card>

            {/* Processing Error Alert */}
            {processingError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                    <div className="flex items-center space-x-2 text-red-500">
                        <AlertCircle className="h-5 w-5" />
                        <span className="font-semibold">Processing Failed</span>
                    </div>
                    <p className="text-red-400 text-sm mt-1">{processingError}</p>
                </div>
            )}
        </div>
    );
};

export default InputSection;