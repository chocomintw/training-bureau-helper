import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { StatsCardProps } from './types';

const StatsCard: React.FC<StatsCardProps> = ({
    chatlogValue,
    processedChatlog,
    processingError
}) => {
    const inputLines = chatlogValue.split('\n').length;
    const outputLines = processedChatlog ? processedChatlog.split('\n').length : 0;
    const reduction = inputLines > 0 ? Math.round((1 - outputLines / inputLines) * 100) : 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Processing Information</CardTitle>
                <CardDescription>
                    Real-time processing statistics
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Input Lines:</span>
                            <span className="font-medium">{inputLines}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Output Lines:</span>
                            <span className="font-medium">{outputLines}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Reduction:</span>
                            <span className="font-medium">
                                {reduction}%
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Status:</span>
                            <span className={`font-medium ${
                                processingError ? 'text-red-500' : 'text-green-500'
                            }`}>
                                {processingError ? 'Error' : 'Ready'}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default StatsCard;