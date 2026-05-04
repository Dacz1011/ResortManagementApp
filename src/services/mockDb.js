import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Generic Mock Database utility for CRUD operations using AsyncStorage
 */
export const mockDb = {
  /**
   * Read all items from a specific collection
   * @param {string} collection - Name of the collection (e.g., 'rooms', 'bookings')
   */
  getAll: async (collection) => {
    try {
      const data = await AsyncStorage.getItem(collection);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error reading ${collection}:`, error);
      return [];
    }
  },

  /**
   * Add a new item to a specific collection
   * @param {string} collection - Name of the collection
   * @param {object} item - The item to add
   */
  add: async (collection, item) => {
    try {
      const existingData = await mockDb.getAll(collection);
      // Give the item a unique ID if it doesn't have one
      const newItem = { id: Date.now().toString(), ...item };
      const updatedData = [...existingData, newItem];

      await AsyncStorage.setItem(collection, JSON.stringify(updatedData));
      return newItem;
    } catch (error) {
      console.error(`Error adding to ${collection}:`, error);
      return null;
    }
  },

  /**
   * Update an existing item by ID
   * @param {string} collection - Name of the collection
   * @param {string|number} id - ID of the item to update
   * @param {object} updatedFields - Fields to update
   */
  update: async (collection, id, updatedFields) => {
    try {
      const existingData = await mockDb.getAll(collection);
      const updatedData = existingData.map(item =>
        item.id === id ? { ...item, ...updatedFields } : item
      );

      await AsyncStorage.setItem(collection, JSON.stringify(updatedData));
      return true;
    } catch (error) {
      console.error(`Error updating ${collection}:`, error);
      return false;
    }
  },

  /**
   * Delete an item by ID
   * @param {string} collection - Name of the collection
   * @param {string|number} id - ID of the item to remove
   */
  remove: async (collection, id) => {
    try {
      const existingData = await mockDb.getAll(collection);
      const filteredData = existingData.filter(item => item.id !== id);

      await AsyncStorage.setItem(collection, JSON.stringify(filteredData));
      return true;
    } catch (error) {
      console.error(`Error deleting from ${collection}:`, error);
      return false;
    }
  },

  /**
   * Replace an entire collection (useful for bulk updates or migrating mock data)
   * @param {string} collection
   * @param {any} data
   */
  saveAll: async (collection, data) => {
    try {
      await AsyncStorage.setItem(collection, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(`Error saving all to ${collection}:`, error);
      return false;
    }
  },

  // NEW PRESENTATION SEED DATA
  seedPresentationData: async () => {
    try {
      const existingData = await mockDb.getAll('dailyCollections');

      if (existingData.length === 0) {
        console.log("Seeding full financial, operational, and maintenance data...");

        // 1. Rooms
        await AsyncStorage.setItem('rooms', JSON.stringify([
          { id: 'r1', roomNumber: 'Reine-01', property: 'Reine Beach House', isOccupied: true },
          { id: 'r2', roomNumber: 'Ryu-01', property: 'Ryu Resort', isOccupied: true },
          { id: 'r3', roomNumber: 'Casa-01', property: 'Casa M.O.', isOccupied: false },
        ]));

        // 2. Daily Collections (Income from property pages)
        await AsyncStorage.setItem('dailyCollections', JSON.stringify([
          { id: 'dc1', property: 'Reine Beach House', amount: 150000, pax: 12, date: '2026-05-01' },
          { id: 'dc2', property: 'Ryu Resort', amount: 300000, pax: 30, date: '2026-05-02' },
          { id: 'dc3', property: 'Casa M.O.', amount: 180000, pax: 15, date: '2026-05-03' },
          { id: 'dc4', property: 'Reine Beach House', amount: 25000, pax: 4, date: '2026-05-05' },
        ]));

        // 3. Electricity Bills
        await AsyncStorage.setItem('electricityBills', JSON.stringify([
          { id: 'e1', property: 'Reine Beach House', amount: 18000, date: '2026-05-01' },
          { id: 'e2', property: 'Ryu Resort', amount: 22000, date: '2026-05-01' },
          { id: 'e3', property: 'Casa M.O.', amount: 15000, date: '2026-05-01' },
        ]));

        // 4. Water Bills
        await AsyncStorage.setItem('waterBills', JSON.stringify([
          { id: 'w1', property: 'Reine Beach House', amount: 5500, date: '2026-05-01' },
          { id: 'w2', property: 'Ryu Resort', amount: 7500, date: '2026-05-01' },
          { id: 'w3', property: 'Casa M.O.', amount: 4500, date: '2026-05-01' },
        ]));

        // 5. Issues & Maintenance Logs
        await AsyncStorage.setItem('maintenance', JSON.stringify([
          { id: 'm1', property: 'Casa M.O.', description: 'Leaking AC Unit', status: 'Open', priority: 'High', reportedDate: '2026-05-03' },
          { id: 'm2', property: 'Reine Beach House', description: 'Broken Pool Tile', status: 'Open', priority: 'Medium', reportedDate: '2026-05-02' },
          { id: 'm3', property: 'Ryu Resort', description: 'Replace Lightbulbs', status: 'Resolved', priority: 'Low', reportedDate: '2026-05-01' },
        ]));

        // Backward compatibility seed if needed
        await AsyncStorage.setItem('bookings', JSON.stringify([]));
      }
    } catch (error) {
      console.error("Error seeding data:", error);
    }
  }
};
