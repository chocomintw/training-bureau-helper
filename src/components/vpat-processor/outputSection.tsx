import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check, Upload } from 'lucide-react';
import type { OutputSectionProps } from './types';

const OutputSection: React.FC<OutputSectionProps> = ({
    processedChatlog,
    applicantError,
    chatlogError,
    processingError
}) => {
    const [copied, setCopied] = useState<boolean>(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(processedChatlog);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const hasOutput = processedChatlog && !applicantError && !chatlogError && !processingError;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Output Results</CardTitle>
                <CardDescription>
                    Cleaned and sorted chatlog output
                </CardDescription>
            </CardHeader>
            <CardContent>
                {hasOutput ? (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Cleaned & Sorted Output
                            </h3>
                            <Button
                                onClick={handleCopy}
                                variant="outline"
                                size="sm"
                                className="flex items-center space-x-2"
                            >
                                {copied ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                                <span>{copied ? 'Copied!' : 'Copy'}</span>
                            </Button>
                        </div>
                        
                        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 max-h-96 overflow-y-auto">
                            <pre className="text-gray-100 text-sm font-mono whitespace-pre-wrap">
                                {processedChatlog}
                            </pre>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>{processedChatlog.split('\n').length} lines processed</span>
                            <span>{processedChatlog.length} characters</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">
                            Processed output will appear here after you enter both fields and click "Process Logs"
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default OutputSection;