/**
 * Formats a file size in bytes to a human-readable string (KB, MB, GB)
 * @param bytes - The size in bytes to format
 * @param decimals - Number of decimal places to include (default: 2)
 * @returns A formatted string representing the size with appropriate unit
 */
export function formatSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  
  // Determine the appropriate unit by calculating the log
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  // Format the number with the specified decimal places
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

/**
 * Generates a UUID (Universally Unique Identifier)
 * Uses the Web Crypto API if available, otherwise falls back to a simple implementation
 * @returns A UUID string
 */
export const generateUUID = (): string => {
  // Use the Web Crypto API if available (works in modern browsers and Node.js)
  if (typeof globalThis.crypto !== 'undefined' && typeof globalThis.crypto.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }
  
  // Fallback implementation for environments without crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};