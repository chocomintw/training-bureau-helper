// Interface for items during the initial parsing phase
export interface ParsedChatLine {
    fullLine: string;
    timeOfDayMs: number; // Time of day in milliseconds (0 to 86399999)
    dedupeKey: string;
}

// Interface for items during the final sorting phase
export interface SortableChatLine {
    fullLine: string;
    timestamp: Date; // Absolute date/time for final sort
}

// Props for InputSection component
export interface InputSectionProps {
    applicantValue: string;
    setApplicantValue: (value: string) => void;
    chatlogValue: string;
    setChatlogValue: (value: string) => void;
    applicantError: string | null;
    chatlogError: string | null;
    processingError: string | null;
    onProcess: () => boolean;
}

// Props for OutputSection component
export interface OutputSectionProps {
    processedChatlog: string;
    applicantError: string | null;
    chatlogError: string | null;
    processingError: string | null;
    chatlogValue: string;
}

// Props for StatsCard component
export interface StatsCardProps {
    chatlogValue: string;
    processedChatlog: string;
    processingError: string | null;
}