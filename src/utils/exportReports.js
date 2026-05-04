import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
// 👇 THE FIX: Pointing specifically to the legacy file system API for SDK 55+
import * as FileSystem from 'expo-file-system/legacy';
import { Alert, Platform } from 'react-native';

// Helper to format the current date for filenames
const getFormattedDate = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// Helper for Web-based CSV Downloads
const downloadWebCSV = (csvString, filename) => {
  if (Platform.OS === 'web') {
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  }
  return false;
};

// ==========================================
// 1. Export Transactions to CSV
// ==========================================
export const exportTransactionsToCSV = async (transactions, propertyName) => {
  try {
    const headerString = 'ID,Type,Title,Subtitle,Amount,Date\n';
    const rowString = transactions.map(t =>
      `"${t.id}","${t.type.toUpperCase()}","${t.title}","${t.subtitle}","${t.amount.trim()}","${t.date}"`
    ).join('\n');

    const csvString = `${headerString}${rowString}`;
    const filename = `${propertyName.replace(/\s+/g, '_')}_Finance_${getFormattedDate()}.csv`;

    if (Platform.OS === 'web') {
      downloadWebCSV(csvString, filename);
      return;
    }

    const fileUri = `${FileSystem.documentDirectory}${filename}`;
    await FileSystem.writeAsStringAsync(fileUri, csvString);
    await Sharing.shareAsync(fileUri, { mimeType: 'text/csv', dialogTitle: 'Download Financial CSV' });
  } catch (error) {
    console.error(error);
    Alert.alert('Export Error', 'Failed to export CSV document.');
  }
};

// ==========================================
// 2. Export Guests to CSV
// ==========================================
export const exportGuestsToCSV = async (guests, propertyName) => {
  try {
    const headerString = 'ID,Name,Stay Dates,Status\n';
    const rowString = guests.map(g =>
      `"${g.id}","${g.name}","${g.date}","${g.status}"`
    ).join('\n');

    const csvString = `${headerString}${rowString}`;
    const filename = `${propertyName.replace(/\s+/g, '_')}_Guests_${getFormattedDate()}.csv`;

    if (Platform.OS === 'web') {
      downloadWebCSV(csvString, filename);
      return;
    }

    const fileUri = `${FileSystem.documentDirectory}${filename}`;
    await FileSystem.writeAsStringAsync(fileUri, csvString);
    await Sharing.shareAsync(fileUri, { mimeType: 'text/csv', dialogTitle: 'Download Guest CSV' });
  } catch (error) {
    console.error(error);
    Alert.alert('Export Error', 'Failed to export CSV document.');
  }
};

// ==========================================
// 3. Export Financial Report to PDF
// ==========================================
export const exportToPDF = async (transactions, metrics, propertyName) => {
  try {
    const html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #18181B; }
            .header { text-align: center; border-bottom: 2px solid #E4E4E7; padding-bottom: 20px; margin-bottom: 30px; }
            h1 { margin: 0; color: #18181B; font-size: 28px; letter-spacing: -0.5px; }
            .date { color: #71717A; font-size: 14px; margin-top: 8px; }
            .metrics { display: flex; justify-content: space-between; background: #F7F7F9; padding: 24px; border-radius: 16px; margin-bottom: 30px; }
            .metric-box { text-align: center; width: 30%; }
            .metric-label { font-size: 12px; color: #71717A; text-transform: uppercase; font-weight: bold; letter-spacing: 1px; margin-bottom: 8px; }
            .metric-val { font-size: 24px; font-weight: 800; color: #E64E76; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px; }
            th, td { border-bottom: 1px solid #E4E4E7; padding: 16px 12px; text-align: left; }
            th { background-color: #18181B; color: #FFFFFF; font-weight: bold; border: none; }
            th:first-child { border-top-left-radius: 8px; border-bottom-left-radius: 8px; }
            th:last-child { border-top-right-radius: 8px; border-bottom-right-radius: 8px; }
            .income { color: #16A34A; font-weight: bold; }
            .expense { color: #18181B; font-weight: bold; }
            .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #A1A1AA; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${propertyName}</h1>
            <div class="date">Official Financial Report — Generated on ${getFormattedDate()}</div>
          </div>

          ${metrics ? `
          <div class="metrics">
            <div class="metric-box">
              <div class="metric-label">Cap Rate</div>
              <div class="metric-val">${metrics.capRate}%</div>
            </div>
            <div class="metric-box">
              <div class="metric-label">Gross Yield</div>
              <div class="metric-val">${metrics.yield}%</div>
            </div>
            <div class="metric-box">
              <div class="metric-label">Projected NOI</div>
              <div class="metric-val">PHP ${metrics.projectedNOI.toLocaleString()}</div>
            </div>
          </div>` : ''}

          <table>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Details</th>
              <th style="text-align: right;">Amount (PHP)</th>
            </tr>
            ${transactions.map(t => `
              <tr>
                <td style="color: #71717A; font-weight: 500;">${t.date}</td>
                <td style="font-weight: bold; font-size: 12px;">${t.type.toUpperCase()}</td>
                <td>
                  <strong style="color: #18181B;">${t.title}</strong><br/>
                  <span style="font-size: 12px; color: #71717A;">${t.subtitle}</span>
                </td>
                <td style="text-align: right;" class="${t.type === 'income' ? 'income' : 'expense'}">${t.amount}</td>
              </tr>
            `).join('')}
          </table>

          <div class="footer">
            System Generated Report • ${propertyName} Management Portal
          </div>
        </body>
      </html>
    `;

    if (Platform.OS === 'web') {
      await Print.printAsync({ html });
      return;
    }

    const { uri } = await Print.printToFileAsync({ html, base64: false });
    await Sharing.shareAsync(uri, { UTI: 'com.adobe.pdf', mimeType: 'application/pdf', dialogTitle: 'Download Financial PDF' });
  } catch (error) {
    console.error(error);
    Alert.alert('Export Error', 'Failed to generate PDF document.');
  }
};

// ==========================================
// 4. Export Guest Roster to PDF
// ==========================================
export const exportGuestsToPDF = async (guests, propertyName) => {
  try {
    const html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #18181B; }
            .header { text-align: center; border-bottom: 2px solid #E4E4E7; padding-bottom: 20px; margin-bottom: 30px; }
            h1 { margin: 0; color: #18181B; font-size: 28px; letter-spacing: -0.5px; }
            .date { color: #71717A; font-size: 14px; margin-top: 8px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px; }
            th, td { border-bottom: 1px solid #E4E4E7; padding: 16px 12px; text-align: left; }
            th { background-color: #18181B; color: #FFFFFF; font-weight: bold; border: none; }
            th:first-child { border-top-left-radius: 8px; border-bottom-left-radius: 8px; }
            th:last-child { border-top-right-radius: 8px; border-bottom-right-radius: 8px; }
            .status-paid { color: #16A34A; font-weight: 800; font-size: 12px; }
            .status-due { color: #CA8A04; font-weight: 800; font-size: 12px; }
            .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #A1A1AA; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${propertyName}</h1>
            <div class="date">Official Guest Roster — Generated on ${getFormattedDate()}</div>
          </div>
          <table>
            <tr>
              <th>Guest Name</th>
              <th>Scheduled Stay Dates</th>
              <th>Payment Status</th>
            </tr>
            ${guests.map(g => `
              <tr>
                <td><strong style="color: #18181B; font-size: 15px;">${g.name}</strong></td>
                <td style="color: #71717A; font-weight: 500;">${g.date}</td>
                <td class="${g.status === 'FULLY PAID' ? 'status-paid' : 'status-due'}">${g.status}</td>
              </tr>
            `).join('')}
          </table>
          <div class="footer">
            System Generated Report • ${propertyName} Management Portal
          </div>
        </body>
      </html>
    `;

    if (Platform.OS === 'web') {
      await Print.printAsync({ html });
      return;
    }

    const { uri } = await Print.printToFileAsync({ html, base64: false });
    await Sharing.shareAsync(uri, { UTI: 'com.adobe.pdf', mimeType: 'application/pdf', dialogTitle: 'Download Guest PDF' });
  } catch (error) {
    console.error(error);
    Alert.alert('Export Error', 'Failed to generate PDF document.');
  }
};