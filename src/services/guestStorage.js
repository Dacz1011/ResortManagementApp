import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  REINE: 'bookings_reine',
  RYU: 'bookings_ryu',
  CASA: 'bookings_casa',
};

/**
 * Save bookings for a specific property to offline storage
 * @param {string} propertyId - 'Reine', 'Ryu', or 'Casa'
 * @param {object} bookings - The bookings object to store
 */
export const saveBookings = async (propertyId, bookings) => {
  try {
    const key = STORAGE_KEYS[propertyId.toUpperCase()] || `bookings_${propertyId}`;
    await AsyncStorage.setItem(key, JSON.stringify(bookings));
    return true;
  } catch (error) {
    console.error(`Error saving bookings for ${propertyId}:`, error);
    return false;
  }
};

/**
 * Retrieve bookings for a specific property from offline storage
 * @param {string} propertyId - 'Reine', 'Ryu', or 'Casa'
 * @returns {object|null} - The stored bookings or null if not found
 */
export const getStoredBookings = async (propertyId) => {
  try {
    const key = STORAGE_KEYS[propertyId.toUpperCase()] || `bookings_${propertyId}`;
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error reading bookings for ${propertyId}:`, error);
    return null;
  }
};
