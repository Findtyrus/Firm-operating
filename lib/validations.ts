export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phone.length >= 10 && phoneRegex.test(phone);
};

export const validateRequired = (value: string | null | undefined): boolean => {
  return value !== null && value !== undefined && value.trim() !== "";
};

export const validateNumber = (value: string | number, min?: number, max?: number): boolean => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return false;
  if (min !== undefined && num < min) return false;
  if (max !== undefined && num > max) return false;
  return true;
};

export const validateDate = (date: string | Date): boolean => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
};

export const sanitizeString = (input: string): string => {
  return input.trim().replace(/[<>]/g, "");
};

export const validateURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateFileSize = (file: File, maxSizeMB: number = 10): boolean => {
  return file.size <= maxSizeMB * 1024 * 1024;
};

export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.some((type) => file.type.includes(type) || file.name.endsWith(type));
};
