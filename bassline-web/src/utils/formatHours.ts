/**
 * Formats a single time value to 12-hour format with AM/PM
 */
const formatTime = (timeStr: string, hour: number, isStart: boolean, startHour: number | null = null): string => {
  const hasMinutes = timeStr.includes(':');
  const minutes = hasMinutes ? timeStr.split(':')[1] : '00';
  const displayMinutes = minutes === '00' && !hasMinutes ? '' : `:${minutes}`;
  
  // Handle midnight and noon
  if (hour === 0) return `12${displayMinutes} AM`;
  if (hour === 12 && isStart) return `12${displayMinutes} PM`;
  
  // For start times: venues typically open in afternoon/evening
  if (isStart) {
    // Times 1-11: Usually PM for venues (like 2 PM, 4 PM, 5 PM)
    if (hour >= 1 && hour <= 11) {
      return `${hour}${displayMinutes} PM`;
    }
    // 12-23: Already PM or next day
    if (hour >= 12) {
      return `${hour === 12 ? 12 : hour - 12}${displayMinutes} PM`;
    }
  } else {
    // For end times: handle past midnight
    // If startHour is provided, check if it's past midnight
    if (startHour !== null) {
      // Check if this is past midnight based on hour comparison
      const isPastMidnight = hour < startHour || 
                            (hour === startHour && startHour >= 2) || 
                            (hour === 12 && startHour < 12);
      
      if (isPastMidnight) {
        // Past midnight - these are AM
        if (hour === 0) return `12${displayMinutes} AM`;
        if (hour === 12) return `12${displayMinutes} AM`; // Midnight
        if (hour <= 11) return `${hour}${displayMinutes} AM`;
        return `${hour - 12}${displayMinutes} AM`;
      }
    }
    
    // Same day end time (end > start, or no startHour provided)
    // These should be PM to match the start time
    if (hour === 0) return `12${displayMinutes} AM`;
    if (hour === 12) {
      // If no startHour or startHour is 12, it's noon; otherwise it was handled above as midnight
      return startHour === null ? `12${displayMinutes} PM` : `12${displayMinutes} AM`;
    }
    if (hour <= 11) return `${hour}${displayMinutes} PM`; // Same day PM
    return `${hour - 12}${displayMinutes} PM`;
  }
  
  // Fallback
  if (hour < 12) return `${hour}${displayMinutes} AM`;
  return `${hour === 12 ? 12 : hour - 12}${displayMinutes} PM`;
};

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
      // Format closed days nicely: "Sun–Mon Closed" -> "Sun–Mon: Closed"
      const closedMatch = mainPart.match(/^(.+?)\s*closed/i);
      if (closedMatch) {
        return `${closedMatch[1].trim()}: Closed`;
      }
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
        // Rules: end < start, or end == start (like 2-2 means 2 PM to 2 AM), or end is 12 when start < 12 (midnight)
        // Special case: if end is 12 and start is 2-11, it's definitely midnight (12 AM), not noon
        const isPastMidnight = endHour < startHour || 
                               (endHour === startHour && startHour >= 2) || 
                               (endHour === 12 && startHour < 12 && startHour >= 1);

        // Format start time (venues typically open PM)
        let formattedStart = formatTime(startTime, startHour, true);
        
        // Format end time
        let formattedEnd = formatTime(endTime, endHour, false, isPastMidnight ? startHour : null);

        // Replace the time range in the string with proper spacing
        mainPart = mainPart.replace(timeRangeRegex, `${formattedStart} – ${formattedEnd}`);
      } else {
        // Already has AM/PM, normalize spacing
        mainPart = mainPart.replace(timeRangeRegex, `${startTime}${timeMatch[3] || ''} – ${endTime}${timeMatch[3] || ''}`);
      }
    }

    // Add "Daily" prefix back if it was there
    if (isDaily && !mainPart.toLowerCase().startsWith('daily')) {
      mainPart = `Daily ${mainPart}`;
    }

    // Add colon after day ranges for better readability
    // Match day abbreviations (Mon, Tue, Wed, Thu, Fri, Sat, Sun) and ranges
    const dayPrefixMatch = mainPart.match(/^([A-Za-z]{3}(?:[–-][A-Za-z]{3})*)\s+(.+)$/);
    if (dayPrefixMatch && !mainPart.includes(':')) {
      mainPart = `${dayPrefixMatch[1]}: ${dayPrefixMatch[2]}`;
    }

    return mainPart + note;
  });

  // Join with semicolon and space for better readability
  return formattedParts.join('; ');
};

