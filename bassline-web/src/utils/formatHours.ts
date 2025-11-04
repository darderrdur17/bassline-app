/**
 * Formats venue hours for better readability
 * Converts ambiguous times to clear AM/PM format
 */
export const formatVenueHours = (hoursString: string | undefined | null): string => {
  if (!hoursString || hoursString.trim() === '') return '—';

  let hours = hoursString.trim();

  // Remove common prefixes
  hours = hours.replace(/^(Hours:)?\s*(Inside|Inside:)?\s*/i, '').trim();

  // Split by semicolon to handle multiple day ranges
  const parts = hours.split(';').map(part => part.trim()).filter(part => part);

  const formattedParts = parts.map(part => {
    // Extract notes in parentheses (preserve them)
    const noteMatch = part.match(/\(([^)]+)\)/);
    const note = noteMatch ? ` (${noteMatch[1]})` : '';
    let mainPart = noteMatch ? part.replace(/\([^)]+\)/, '').trim() : part;

    // Handle "Closed" days
    if (/closed/i.test(mainPart)) {
      return mainPart + note;
    }

    // Handle "Daily" prefix
    const dailyMatch = mainPart.match(/^(Daily|daily)\s+/i);
    const isDaily = !!dailyMatch;
    if (isDaily) {
      mainPart = mainPart.replace(/^(Daily|daily)\s+/i, '');
    }

    // Find time ranges (handles formats like "5–11", "5:30–9", "2–2", "12–2", "10pm–2am")
    const timeRangeRegex = /(\d{1,2}(?::\d{2})?)\s*[–-]\s*(\d{1,2}(?::\d{2})?)\s*([ap]m)?/i;
    const timeMatch = mainPart.match(timeRangeRegex);

    if (timeMatch) {
      let startTime = timeMatch[1];
      let endTime = timeMatch[2];
      const hasAmPm = !!timeMatch[3];

      // If no AM/PM specified, convert to clear format
      if (!hasAmPm) {
        const startHour = parseInt(startTime.split(':')[0], 10);
        const endHour = parseInt(endTime.split(':')[0], 10);

        // Detect if end time is past midnight
        // Rules: end < start, or end == start (like 2-2 means 2 PM to 2 AM), or end is 12 (midnight)
        const isPastMidnight = endHour < startHour || 
                               (endHour === startHour && startHour >= 2) || 
                               endHour === 12;

        // Format start time (venues typically open PM)
        let formattedStart = formatTime(startTime, startHour, true);
        
        // Format end time
        let formattedEnd = formatTime(endTime, endHour, false, isPastMidnight ? startHour : null);

        // Replace the time range in the string
        mainPart = mainPart.replace(timeRangeRegex, `${formattedStart}–${formattedEnd}`);
      } else {
        // Already has AM/PM, just normalize spacing
        mainPart = mainPart.replace(timeRangeRegex, `${startTime}${timeMatch[3] || ''}–${endTime}${timeMatch[3] || ''}`);
      }
    }

    // Add "Daily" prefix back if it was there
    if (isDaily && !mainPart.toLowerCase().startsWith('daily')) {
      mainPart = `Daily ${mainPart}`;
    }

    return mainPart + note;
  });

  return formattedParts.join('; ');
};

/**
 * Formats a single time value to 12-hour format with AM/PM
 */
const formatTime = (timeStr: string, hour: number, isStart: boolean, startHour: number | null = null): string => {
  const hasMinutes = timeStr.includes(':');
  const minutes = hasMinutes ? timeStr.split(':')[1] : '00';
  const displayMinutes = minutes === '00' && !hasMinutes ? '' : `:${minutes}`;
  
  // Handle midnight and noon
  if (hour === 0) return `12${displayMinutes} AM`;
  if (hour === 12) return `12${displayMinutes} PM`;
  
  // For start times: venues typically open in afternoon/evening
  if (isStart) {
    // Times 1-11: Usually PM for venues (like 2 PM, 4 PM, 5 PM)
    // Exception: 9-11 might be AM for breakfast venues, but assume PM for bars/restaurants
    if (hour >= 1 && hour <= 11) {
      return `${hour}${displayMinutes} PM`;
    }
    // 12-23: Already PM or next day
    if (hour >= 12) {
      return `${hour === 12 ? 12 : hour - 12}${displayMinutes} PM`;
    }
  } else {
    // For end times: handle past midnight
    // If end time is less than start time, it's past midnight
    if (startHour !== null && (hour < startHour || hour === 12)) {
      // Past midnight - these are AM
      if (hour === 0) return `12${displayMinutes} AM`;
      if (hour === 12) return `12${displayMinutes} AM`; // Midnight
      if (hour <= 11) return `${hour}${displayMinutes} AM`;
      return `${hour - 12}${displayMinutes} AM`;
    }
    
    // Same day end time (end > start)
    // These should be PM to match the start time
    if (hour === 0) return `12${displayMinutes} AM`;
    if (hour === 12) return `12${displayMinutes} PM`; // Noon (rare for venues but possible)
    if (hour <= 11) return `${hour}${displayMinutes} PM`; // Same day PM
    return `${hour - 12}${displayMinutes} PM`;
  }
  
  // Fallback
  if (hour < 12) return `${hour}${displayMinutes} AM`;
  return `${hour === 12 ? 12 : hour - 12}${displayMinutes} PM`;
};

