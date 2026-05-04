import { mockDb } from '../services/mockDb';

/**
 * Kukunin ang mga data mula sa mockDb at kakalkulahin ang mga financial metrics.
 * @returns {Promise<Object>} Object na naglalaman ng mga financial totals.
 */
export const getComprehensiveFinancials = async () => {
  try {
    // Kukunin ang mga specific na data mula sa AsyncStorage
    const dailyCollections = await mockDb.getAll('dailyCollections');
    const electricity = await mockDb.getAll('electricityBills');
    const water = await mockDb.getAll('waterBills');
    const rooms = await mockDb.getAll('rooms');
    const maintenance = await mockDb.getAll('maintenance');

    // 1. totalRevenue: Kabuuang kita mula sa lahat ng 'dailyCollections'
    const totalRevenue = dailyCollections.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

    // 2. totalExpenses: Kabuuang gastos (Kuryente + Tubig)
    const totalElectricity = electricity.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const totalWater = water.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const totalExpenses = totalElectricity + totalWater;

    // 3. netIncome: Kita pagkatapos ibawas ang mga gastos
    const netIncome = totalRevenue - totalExpenses;

    // 4. pendingIssues: Bilang ng mga maintenance logs na 'Open' pa
    const pendingIssues = maintenance.filter(m => m.status === 'Open').length;

    // 5. occupancyRate: Porsyento ng mga kwartong may tao
    const occupiedRooms = rooms.filter(r => r.isOccupied).length;
    const occupancyRate = rooms.length > 0 ? Math.round((occupiedRooms / rooms.length) * 100) : 0;

    return {
      totalRevenue,
      totalExpenses,
      netIncome,
      pendingIssues,
      totalBookings: dailyCollections.length,
      occupancyRate
    };
  } catch (error) {
    console.error('Error sa pag-calculate ng financials:', error);
    return {
      totalRevenue: 0,
      totalExpenses: 0,
      netIncome: 0,
      pendingIssues: 0,
      totalBookings: 0,
      occupancyRate: 0
    };
  }
};
