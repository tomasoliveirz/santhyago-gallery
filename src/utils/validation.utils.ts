import type { GalleryImage } from '@/types';

// =============================
// 🔍 Validation Utilities
// =============================
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidGalleryImage(image: any): image is GalleryImage {
  return (
    image &&
    typeof image === 'object' &&
    typeof image.id === 'string' &&
    typeof image.url === 'string' &&
    typeof image.alt === 'string' &&
    image.id.trim().length > 0 &&
    image.url.trim().length > 0 &&
    image.alt.trim().length > 0 &&
    isValidUrl(image.url)
  );
}

export function validateGalleryImages(images: any[]): GalleryImage[] {
  if (!Array.isArray(images)) {
    return [];
  }

  return images.filter(isValidGalleryImage);
}

export function sanitizeImageUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    // Only allow http and https protocols
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      throw new Error('Invalid protocol');
    }
    return urlObj.toString();
  } catch {
    return '';
  }
}
