import { useState, useEffect, useCallback } from 'react';
import type { GalleryImage, ServiceResponse } from '@/types';
import { createGalleryService } from '@/services/gallery.service';

// =============================
// 🖼️ Gallery Hook
// =============================
export function useGallery(): ServiceResponse<GalleryImage[]> {
  const [data, setData] = useState<GalleryImage[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const galleryService = createGalleryService();

  const fetchGallery = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await galleryService.fetchGalleryImages();
      
      setData(result.data);
      setError(result.error);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch gallery images';
      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [galleryService]);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);


  return {
    data,
    loading,
    error,
  };
}
