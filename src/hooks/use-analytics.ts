import { useState } from 'react';
import { toast } from "@/hooks/use-toast";

export function useAnalytics(podcastId?: string) {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateAnalytics = async (action: 'play' | 'download' | 'share', podcastId?:string) => {
    if (isUpdating) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/analytics/${podcastId}/${action}`, { method: 'POST' });
      if (!response.ok) {
        throw new Error(`Failed to update ${action} analytics`);
      }
      const updatedAnalytics = await response.json();
      return updatedAnalytics;
    } catch (error) {
      console.error(`Error updating ${action} analytics:`, error);
      toast({
        title: "Error",
        description: `Failed to update ${action} analytics.`,
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateAnalytics, isUpdating };
}

