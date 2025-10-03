import type { GalleryImage, ServiceResponse } from '@/types';
import { API_CONFIG } from '@/config/constants';

// =============================
// 🖼️ Gallery Service
// =============================
export class GalleryService {
  private static instance: GalleryService;
  private cache: Map<string, { data: GalleryImage[]; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

  private constructor() {}

  public static getInstance(): GalleryService {
    if (!GalleryService.instance) {
      GalleryService.instance = new GalleryService();
    }
    return GalleryService.instance;
  }

  private getCacheKey(): string {
    return 'gallery-images';
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_DURATION;
  }

  public async fetchGalleryImages(): Promise<ServiceResponse<GalleryImage[]>> {
    const cacheKey = this.getCacheKey();
    const cached = this.cache.get(cacheKey);

    // Return cached data if valid
    if (cached && this.isCacheValid(cached.timestamp)) {
      return {
        data: cached.data,
        loading: false,
        error: null,
      };
    }

    try {
      // First try to get local images (from GALLERY_CONFIG)
      const localResponse = await this.getFallbackImages();
      if (localResponse.data && localResponse.data.length > 0) {
        // Cache the local images
        this.cache.set(cacheKey, {
          data: localResponse.data,
          timestamp: Date.now(),
        });
        return localResponse;
      }

      // If no local images, try to fetch from server
      const serverResponse = await this.fetchFromServer();
      if (serverResponse.data && serverResponse.data.length > 0) {
        // Cache the server response
        this.cache.set(cacheKey, {
          data: serverResponse.data,
          timestamp: Date.now(),
        });
        return serverResponse;
      }

      // Final fallback
      return localResponse;

    } catch (error) {
      // Return local images on error
      const fallbackResponse = await this.getFallbackImages();
      return {
        data: fallbackResponse.data,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch gallery images',
      };
    }
  }

  private async fetchFromServer(): Promise<ServiceResponse<GalleryImage[]>> {
    try {
      const response = await fetch(API_CONFIG.GALLERY_API_ENDPOINT, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data: GalleryImage[] = await response.json();

      // Validate the response structure
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format: expected array of images');
      }

      // Validate each image object
      const validatedData = data.filter((image: any) => 
        image && 
        typeof image.id === 'string' && 
        typeof image.url === 'string' && 
        typeof image.alt === 'string'
      );

      if (validatedData.length === 0) {
        throw new Error('No valid images found in server response');
      }

      return {
        data: validatedData,
        loading: false,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Server fetch failed',
      };
    }
  }

  private async getFallbackImages(): Promise<ServiceResponse<GalleryImage[]>> {
    // Import default images dynamically to avoid circular dependencies
    const { GALLERY_CONFIG } = await import('@/config/constants');
    
    console.log('getFallbackImages:', GALLERY_CONFIG.images);
    
    return {
      data: GALLERY_CONFIG.images,
      loading: false,
      error: null,
    };
  }

  public clearCache(): void {
    this.cache.clear();
  }

  public async refreshImages(): Promise<ServiceResponse<GalleryImage[]>> {
    this.clearCache();
    return this.fetchGalleryImages();
  }
}

// =============================
// 🔧 Gallery Service Factory
// =============================
export function createGalleryService(): GalleryService {
  return GalleryService.getInstance();
}
