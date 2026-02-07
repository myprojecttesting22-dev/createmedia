// Shared spam detection utilities for client-side validation

const DISPOSABLE_DOMAINS = [
  'tempmail.com', 'throwaway.email', 'guerrillamail.com', 'mailinator.com',
  'sharklasers.com', 'grr.la', 'guerrillamailblock.com', 'pokemail.net',
  'spam4.me', 'binkmail.com', 'bobmail.info', 'chammy.info', 'devnullmail.com',
  'dispostable.com', 'dodgit.com', 'emailgo.de', 'fakeinbox.com', 'filzmail.com',
  'haltospam.com', 'harakirimail.com', 'incognitomail.org', 'jetable.org',
  'kasmail.com', 'koszmail.pl', 'kurzepost.de', 'letthemeatspam.com',
  'lhsdv.com', 'mailinater.com', 'mailnesia.com', 'mailnull.com', 'meltmail.com',
  'mintemail.com', 'mt2015.com', 'mytrashmail.com', 'nobulk.com', 'noclickemail.com',
  'nogmailspam.info', 'nomail.xl.cx', 'nospam.ze.tc', 'owlpic.com', 'proxymail.eu',
  'rcpt.at', 'reallymymail.com', 'rtrtr.com', 'sharklasers.com', 'shieldedmail.com',
  'soodonims.com', 'spambob.net', 'spamfree24.org', 'spamgourmet.com', 'spamhole.com',
  'spaml.de', 'tempail.com', 'tempalias.com', 'tempe4mail.com', 'tempr.email',
  'temporaryforwarding.com', 'temporaryinbox.com', 'thankyou2010.com', 'thisisnotmyrealemail.com',
  'trashmail.com', 'trashmail.me', 'trashmail.net', 'trashymail.com', 'trashymail.net',
  'yopmail.com', 'yopmail.fr', 'mailcatch.com', 'maildrop.cc', '10minutemail.com',
  'guerrillamail.info', 'temp-mail.org', 'tempmailo.com', 'emailondeck.com',
];

// Common English words for dictionary check
const COMMON_WORDS = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for',
  'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by',
  'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all',
  'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get',
  'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him',
  'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them',
  'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over',
  'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first',
  'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day',
  'most', 'us', 'need', 'help', 'project', 'brand', 'content', 'media', 'video',
  'marketing', 'social', 'website', 'design', 'business', 'company', 'team', 'create',
  'real', 'estate', 'property', 'looking', 'interested', 'please', 'contact', 'more',
  'information', 'plan', 'custom', 'service', 'services', 'thanks', 'thank', 'hello',
  'hi', 'dear', 'sir', 'madam', 'regards', 'best', 'sincerely', 'am', 'are', 'is',
  'was', 'were', 'been', 'being', 'has', 'had', 'having', 'does', 'did', 'doing',
  'shall', 'should', 'may', 'might', 'must', 'ought', 'let', 'here', 'where', 'why',
  'very', 'much', 'many', 'few', 'more', 'less', 'own', 'same', 'able', 'each',
  'every', 'both', 'such', 'still', 'again', 'too', 'yet', 'already', 'always',
  'never', 'often', 'soon', 'great', 'long', 'right', 'while', 'world', 'next',
  'left', 'big', 'high', 'small', 'large', 'last', 'old', 'young', 'different',
  'important', 'early', 'possible', 'call', 'ask', 'try', 'tell', 'show', 'keep',
  'start', 'run', 'turn', 'move', 'play', 'live', 'believe', 'hold', 'bring',
  'happen', 'write', 'provide', 'sit', 'stand', 'lose', 'pay', 'meet', 'include',
  'continue', 'set', 'learn', 'change', 'lead', 'understand', 'watch', 'follow',
  'stop', 'speak', 'read', 'spend', 'grow', 'open', 'walk', 'win', 'offer',
  'remember', 'love', 'consider', 'appear', 'buy', 'wait', 'serve', 'die', 'send',
  'expect', 'build', 'stay', 'fall', 'cut', 'reach', 'kill', 'remain', 'suggest',
  'raise', 'pass', 'sell', 'require', 'report', 'decide', 'pull', 'develop', 'would',
]);

export function isGibberish(text: string): boolean {
  // Check for no spaces (single long word)
  if (text.length > 8 && !text.includes(' ')) return true;
  
  // Calculate consonant-to-vowel ratio
  const lower = text.toLowerCase();
  const vowels = lower.replace(/[^aeiou]/g, '').length;
  const consonants = lower.replace(/[^bcdfghjklmnpqrstvwxyz]/g, '').length;
  if (consonants > 0 && vowels > 0 && consonants / vowels > 5) return true;
  
  // Check for random case mixing (e.g., "wKMfanJNgPfvGcn")
  if (text.length > 5) {
    let caseChanges = 0;
    for (let i = 1; i < text.length; i++) {
      const prevUpper = text[i-1] >= 'A' && text[i-1] <= 'Z';
      const currUpper = text[i] >= 'A' && text[i] <= 'Z';
      const prevLetter = /[a-zA-Z]/.test(text[i-1]);
      const currLetter = /[a-zA-Z]/.test(text[i]);
      if (prevLetter && currLetter && prevUpper !== currUpper) caseChanges++;
    }
    if (caseChanges / text.length > 0.4) return true;
  }

  return false;
}

export function countRealWords(text: string): number {
  const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  return words.filter(w => COMMON_WORDS.has(w.replace(/[^a-z]/g, ''))).length;
}

export function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return true;
  return DISPOSABLE_DOMAINS.includes(domain);
}

export function hasExcessiveDots(email: string): boolean {
  const localPart = email.split('@')[0];
  if (!localPart) return true;
  const dotCount = (localPart.match(/\./g) || []).length;
  return dotCount > 3;
}

export function isAutoGeneratedEmail(email: string): boolean {
  const localPart = email.split('@')[0];
  if (!localPart) return true;
  // Random strings with lots of consonants and numbers mixed
  const cleaned = localPart.replace(/[.]/g, '');
  if (cleaned.length > 10 && isGibberish(cleaned)) return true;
  return false;
}

export function isValidPhone(phone: string): { valid: boolean; reason?: string } {
  if (!phone) return { valid: true };
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) {
    return { valid: false, reason: 'Phone number must be between 7 and 15 digits' };
  }
  // Check repeating digits
  if (/^(\d)\1{6,}$/.test(digits)) {
    return { valid: false, reason: 'Invalid phone number' };
  }
  // Check sequential patterns
  if (digits === '1234567890' || digits === '0987654321' || digits === '1234567890'.slice(0, digits.length)) {
    return { valid: false, reason: 'Invalid phone number' };
  }
  return { valid: true };
}

export function isValidName(name: string): { valid: boolean; reason?: string } {
  if (name.length < 2) return { valid: false, reason: 'Name must be at least 2 characters' };
  if (!/^[a-zA-Z\s'-]+$/.test(name)) return { valid: false, reason: 'Name must contain only letters, spaces, hyphens, and apostrophes' };
  if (isGibberish(name.replace(/\s/g, ''))) return { valid: false, reason: 'Please enter a valid name' };
  return { valid: true };
}

export function isValidMessage(text: string): { valid: boolean; reason?: string } {
  if (text.length < 20) return { valid: false, reason: 'Message must be at least 20 characters' };
  if (isGibberish(text)) return { valid: false, reason: 'Please enter a meaningful message' };
  const realWords = countRealWords(text);
  if (realWords < 3) return { valid: false, reason: 'Message must contain at least 3 recognizable words' };
  return { valid: true };
}

export function isValidCompany(company: string): { valid: boolean; reason?: string } {
  if (company.length < 2) return { valid: false, reason: 'Company name must be at least 2 characters' };
  if (isGibberish(company)) return { valid: false, reason: 'Please enter a valid company name' };
  return { valid: true };
}

export function validateEmail(email: string): { valid: boolean; reason?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return { valid: false, reason: 'Invalid email address' };
  if (isDisposableEmail(email)) return { valid: false, reason: 'Disposable email addresses are not allowed' };
  if (hasExcessiveDots(email)) return { valid: false, reason: 'Invalid email format' };
  if (isAutoGeneratedEmail(email)) return { valid: false, reason: 'Please use a valid email address' };
  return { valid: true };
}
