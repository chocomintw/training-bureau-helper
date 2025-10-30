import type { ParsedChatLine, SortableChatLine } from './types';

/**
 * Processes a chatlog: 
 * 1. Parses all lines for time-of-day (HH:MM:SS) only.
 * 2. Deduplicates and filters (keeping the earliest time-of-day for duplicates).
 * 3. Sorts the unique, filtered lines by time-of-day.
 * 4. Assigns chronological day offsets based on the time-sorted list to ensure final order is correct.
 * @param chatlog The raw multi-line chatlog string.
 * @param searchParameter The string to filter lines by (case-insensitive).
 * @returns The filtered, deduplicated, and time-sorted chatlog string.
 */
export function removeApplicants(chatlog: string, searchParameter: string): string {
    const lines = chatlog.split('\n');
    const timestampRegex = /^\[(\d{2}):(\d{2}):(\d{2})\]\s*(.*)/;
    const includesRegex = new RegExp(`${searchParameter}`, 'i');
    
    // --- STEP 1: PARSE ALL LINES (TIME-OF-DAY ONLY) ---
    let allParsedLines: ParsedChatLine[] = [];
    
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) {
            continue; 
        }

        const match = trimmedLine.match(timestampRegex);
        let timeOfDayMs = 0; 
        let dedupeKey: string;
        
        if (match && match[1] && match[2] && match[3]) {
            const hours = parseInt(match[1], 10);
            const minutes = parseInt(match[2], 10);
            const seconds = parseInt(match[3], 10);

            // Calculate total milliseconds since midnight
            timeOfDayMs = (hours * 3600 + minutes * 60 + seconds) * 1000;
            
            // Dedupe key is content after timestamp
            dedupeKey = match[4].trim();

        } else {
            // Lines without timestamps. Assigned a time of 0ms (earliest possible time).
            timeOfDayMs = 0; 
            dedupeKey = trimmedLine;
        }

        allParsedLines.push({ 
            fullLine: trimmedLine, 
            timeOfDayMs: timeOfDayMs,
            dedupeKey: dedupeKey
        });
    }

    // --- STEP 2 & 3 (COMBINED): DEDUPLICATE (KEEPING EARLIEST) AND FILTER ---
    // Map stores unique content (dedupeKey) -> { ParsedChatLine with earliest timeOfDayMs }
    const uniqueFilteredMap = new Map<string, ParsedChatLine>();

    for (const item of allParsedLines) {
        // Only process lines that match the search parameter
        if (!includesRegex.test(item.fullLine)) {
            continue;
        }
        
        const existingEntry = uniqueFilteredMap.get(item.dedupeKey);

        if (!existingEntry || item.timeOfDayMs < existingEntry.timeOfDayMs) {
            // If new, or if current line has an EARLIER time-of-day, replace it.
            uniqueFilteredMap.set(item.dedupeKey, item);
        }
    }
    
    // Get final unique, filtered list as an array
    let finalItems = Array.from(uniqueFilteredMap.values());
    
    // Sort by time of day (HH:MM:SS) *before* assigning days
    finalItems.sort((a, b) => a.timeOfDayMs - b.timeOfDayMs);

    // --- STEP 4: ASSIGN DAY OFFSET AND FINAL SORT ---
    let sortableItems: SortableChatLine[] = [];
    let lastTimeOfDayMs = -1;
    let currentDayOffset = 0;
    const dayMs = 24 * 60 * 60 * 1000;
    // Using a fixed base date for relative chronological calculation
    const baseDate = new Date('2024-01-01T00:00:00.000Z');

    for (const item of finalItems) {
        // Infer Day Progression based on time roll-back in the NOW-SORTED list
        if (lastTimeOfDayMs !== -1 && item.timeOfDayMs < lastTimeOfDayMs) {
            currentDayOffset++;
        }

        const dayOffsetMs = currentDayOffset * dayMs;
        const absoluteTimestamp = new Date(baseDate.getTime() + item.timeOfDayMs + dayOffsetMs);
        
        lastTimeOfDayMs = item.timeOfDayMs;

        sortableItems.push({
            fullLine: item.fullLine,
            timestamp: absoluteTimestamp,
        });
    }
    
    // The items are already in near-perfect chronological order, but a final sort
    // is kept as a safeguard against any subtle timestamp tie-breaking logic.
    sortableItems.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    return sortableItems.map(item => item.fullLine).join('\n');
}