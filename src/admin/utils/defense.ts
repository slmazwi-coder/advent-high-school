/**
 * Anti-Malicious Defense System (AMD)
 * A lightweight, rule-based AI safety layer for the Staff Portal.
 */

export interface SafetyResult {
  safe: boolean;
  reason?: string;
}

const FORBIDDEN_KEYWORDS = [
  'fuck', 'shit', 'porn', 'adult', 'sex', 'nude', 'xxx',
  '<script', 'javascript:', 'onerror=', 'onclick=', 'eval(',
  'password:', 'secret:', 'private key',
];

const SCHOOL_POLICY_WORDS = [
  'strike', 'protest', 'illegal', 'scam'
];

export const checkTextSafety = (text: string, context?: string): SafetyResult => {
  const lowerText = text.toLowerCase();

  for (const word of FORBIDDEN_KEYWORDS) {
    if (lowerText.includes(word)) {
      return { safe: false, reason: `Inappropriate or malicious content detected: "${word}"` };
    }
  }

  for (const word of SCHOOL_POLICY_WORDS) {
    if (lowerText.includes(word)) {
      return { safe: false, reason: `Content violates school community guidelines regarding: "${word}"` };
    }
  }

  if (context === 'achievements') {
    if (lowerText.includes('timetable') || lowerText.includes('schedule')) {
      return { safe: false, reason: 'Context mismatch: Timetables should be uploaded to the Documents section, not Achievements.' };
    }
  }

  if (context === 'documents') {
    if (lowerText.includes('result') || lowerText.includes('top achiever')) {
      return { safe: false, reason: 'Context mismatch: Academic results should be managed in the Achievements section.' };
    }
  }

  return { safe: true };
};

export const checkImageSafety = async (base64: string): Promise<SafetyResult> => {
  if (!base64) return { safe: true };
  await new Promise(resolve => setTimeout(resolve, 400));
  if (base64.length > 5 * 1024 * 1024) {
    return { safe: false, reason: 'File size too large. Please compress or optimize.' };
  }
  if (base64.includes(';base64,PHNjcmlwdD4=')) {
    return { safe: false, reason: 'Suspicious script injection detected in image metadata.' };
  }
  return { safe: true };
};

export const runFullDefenseScan = async (data: any, context: string): Promise<SafetyResult> => {
  for (const key in data) {
    if (typeof data[key] === 'string') {
      const result = checkTextSafety(data[key], context);
      if (!result.safe) return result;

      if (data[key].startsWith('data:image/')) {
        const imgResult = await checkImageSafety(data[key]);
        if (!imgResult.safe) return imgResult;
      }
    }
  }
  return { safe: true };
};
