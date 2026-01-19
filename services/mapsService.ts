
import { Trip, ItineraryItem } from '../types';

export const GOOGLE_MAPS_API_KEY = 'AIzaSyAlqsRC5hcYvT-sLUhmUXWPrBdIPhPEmtQ';

const STORAGE_KEY_COUNT = 'wanderlust_maps_count';
const STORAGE_KEY_DATE = 'wanderlust_maps_start';
const LIMIT = 5000;

/**
 * Checks if the API key usage is within the monthly limit (5000 requests).
 * Resets the counter if a month has passed since the start date.
 */
export const canLoadMap = (): boolean => {
  const now = Date.now();
  const startStr = localStorage.getItem(STORAGE_KEY_DATE);
  
  if (!startStr) {
    localStorage.setItem(STORAGE_KEY_DATE, now.toString());
    localStorage.setItem(STORAGE_KEY_COUNT, '0');
    return true;
  }

  const start = parseInt(startStr, 10);
  const oneMonthMs = 30 * 24 * 60 * 60 * 1000; // Approx 30 days

  if (now - start > oneMonthMs) {
    // Reset quota for new month
    localStorage.setItem(STORAGE_KEY_DATE, now.toString());
    localStorage.setItem(STORAGE_KEY_COUNT, '0');
    return true;
  }

  const count = parseInt(localStorage.getItem(STORAGE_KEY_COUNT) || '0', 10);
  return count < LIMIT;
};

/**
 * Increments the map usage counter. Should be called when the map iframe is rendered.
 */
export const recordMapLoad = () => {
   const count = parseInt(localStorage.getItem(STORAGE_KEY_COUNT) || '0', 10);
   localStorage.setItem(STORAGE_KEY_COUNT, (count + 1).toString());
};

export const getMapUsage = (): number => {
  return parseInt(localStorage.getItem(STORAGE_KEY_COUNT) || '0', 10);
};

/**
 * Generates the Google Maps Embed URL based on the trip location and itinerary events.
 */
export const getMapUrl = (tripLocation: string, events: ItineraryItem[]): string => {
  const baseUrl = 'https://www.google.com/maps/embed/v1';
  
  // Filter out transport items or items without titles if needed, 
  // currently we use all items with titles.
  const validEvents = events.filter(e => e.title && e.title.trim() !== '');

  if (validEvents.length === 0) {
    // Show the general trip location if no specific events
    return `${baseUrl}/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(tripLocation)}`;
  }

  if (validEvents.length === 1) {
    // Show single place
    const loc = `${validEvents[0].title}, ${tripLocation}`;
    return `${baseUrl}/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(loc)}`;
  }

  // Show directions for multiple events
  const origin = `${validEvents[0].title}, ${tripLocation}`;
  const destination = `${validEvents[validEvents.length - 1].title}, ${tripLocation}`;
  
  let url = `${baseUrl}/directions?key=${GOOGLE_MAPS_API_KEY}&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
  
  // Add waypoints (Embed API limits waypoints, we take up to 10 intermediates)
  if (validEvents.length > 2) {
    const waypoints = validEvents.slice(1, -1).slice(0, 10)
      .map(e => `${e.title}, ${tripLocation}`)
      .join('|');
    url += `&waypoints=${encodeURIComponent(waypoints)}`;
  }

  return url;
};
