// Mock Data for Resort Management App

export const REINE_DATA = {
  bookings: {
    5: { guestName: 'Alice W.', contact: '+63 911 111 1111', email: 'alice.w@example.com', checkIn: 'Oct 5', checkOut: 'Oct 8', status: 'CONFIRMED', amount: '₱15,000.00' },
    6: { guestName: 'Alice W.', contact: '+63 911 111 1111', email: 'alice.w@example.com', checkIn: 'Oct 5', checkOut: 'Oct 8', status: 'CONFIRMED', amount: '₱15,000.00' },
    7: { guestName: 'Alice W.', contact: '+63 911 111 1111', email: 'alice.w@example.com', checkIn: 'Oct 5', checkOut: 'Oct 8', status: 'CONFIRMED', amount: '₱15,000.00' },
    11: { guestName: 'Bob M.', contact: '+63 922 222 2222', email: 'bob.m@example.com', checkIn: 'Oct 11', checkOut: 'Oct 13', status: 'CONFIRMED', amount: '₱15,000.00' },
    12: { guestName: 'Bob M.', contact: '+63 922 222 2222', email: 'bob.m@example.com', checkIn: 'Oct 11', checkOut: 'Oct 13', status: 'CONFIRMED', amount: '₱15,000.00' },
    20: { guestName: 'Mark J.', contact: '+63 912 345 6789', email: 'mark.j@example.com', checkIn: 'Oct 20', checkOut: 'Oct 22', status: 'CONFIRMED', amount: '₱15,000.00' },
    21: { guestName: 'Mark J.', contact: '+63 912 345 6789', email: 'mark.j@example.com', checkIn: 'Oct 20', checkOut: 'Oct 22', status: 'CONFIRMED', amount: '₱15,000.00' },
    22: { guestName: 'Mark J.', contact: '+63 912 345 6789', email: 'mark.j@example.com', checkIn: 'Oct 20', checkOut: 'Oct 22', status: 'CONFIRMED', amount: '₱15,000.00' },
    24: { guestName: 'Sarah L.', contact: '+63 917 123 4567', email: 'sarah.l@example.com', checkIn: 'Oct 24', checkOut: 'Oct 26', status: 'PENDING', amount: '₱15,000.00' },
  },
  stats: {
    monthlyEarnings: '₱145,200',
    occupancyRate: '85%',
    activeBookings: 12,
  }
};

export const RYU_DATA = {
  bookings: {
    5: { guestName: 'Kevin P.', contact: '+63 918 765 4321', email: 'kevin.p@example.com', checkIn: 'Oct 5', checkOut: 'Oct 7', status: 'CONFIRMED', amount: '₱8,000.00' },
    6: { guestName: 'Kevin P.', contact: '+63 918 765 4321', email: 'kevin.p@example.com', checkIn: 'Oct 5', checkOut: 'Oct 7', status: 'CONFIRMED', amount: '₱8,000.00' },
    7: { guestName: 'Kevin P.', contact: '+63 918 765 4321', email: 'kevin.p@example.com', checkIn: 'Oct 5', checkOut: 'Oct 7', status: 'CONFIRMED', amount: '₱8,000.00' },
    11: { guestName: 'James D.', contact: '+63 933 333 3333', email: 'james.d@example.com', checkIn: 'Oct 11', checkOut: 'Oct 15', status: 'CONFIRMED', amount: '₱8,000.00' },
    12: { guestName: 'James D.', contact: '+63 933 333 3333', email: 'james.d@example.com', checkIn: 'Oct 11', checkOut: 'Oct 15', status: 'CONFIRMED', amount: '₱8,000.00' },
    20: { guestName: 'Chris T.', contact: '+63 944 444 4444', email: 'chris.t@example.com', checkIn: 'Oct 20', checkOut: 'Oct 23', status: 'CONFIRMED', amount: '₱8,000.00' },
    21: { guestName: 'Chris T.', contact: '+63 944 444 4444', email: 'chris.t@example.com', checkIn: 'Oct 20', checkOut: 'Oct 23', status: 'CONFIRMED', amount: '₱8,000.00' },
    22: { guestName: 'Chris T.', contact: '+63 944 444 4444', email: 'chris.t@example.com', checkIn: 'Oct 20', checkOut: 'Oct 23', status: 'CONFIRMED', amount: '₱8,000.00' },
    24: { guestName: 'Maria G.', contact: '+63 955 555 5555', email: 'maria.g@example.com', checkIn: 'Oct 24', checkOut: 'Oct 25', status: 'PENDING', amount: '₱8,000.00' },
  },
  stats: {
    monthlyEarnings: '₱98,400',
    occupancyRate: '72%',
    activeBookings: 8,
  }
};

export const CASAM_DATA = {
  bookings: {
    5: { guestName: 'Elena R.', contact: '+63 905 111 2222', email: 'elena.r@example.com', checkIn: 'Oct 5', checkOut: 'Oct 10', status: 'CONFIRMED', amount: '₱12,000.00' },
    11: { guestName: 'Victor S.', contact: '+63 966 666 6666', email: 'victor.s@example.com', checkIn: 'Oct 11', checkOut: 'Oct 14', status: 'CONFIRMED', amount: '₱12,000.00' },
    20: { guestName: 'Rose B.', contact: '+63 977 777 7777', email: 'rose.b@example.com', checkIn: 'Oct 20', checkOut: 'Oct 25', status: 'CONFIRMED', amount: '₱12,000.00' },
    24: { guestName: 'Liam N.', contact: '+63 916 993 9201', email: 'liam.n@example.com', checkIn: 'Oct 24', checkOut: 'Oct 28', status: 'PENDING', amount: '₱12,000.00' },
  },
  stats: {
    monthlyEarnings: '₱210,000',
    occupancyRate: '92%',
    activeBookings: 15,
  }
};

export const OWNER_DATA = {
  properties: [
    { id: '1', name: 'Reine', earnings: '₱145,200', color: '#E64E76' },
    { id: '2', name: 'Ryu', earnings: '₱98,400', color: '#23324B' },
    { id: '3', name: 'Casa M.O.', earnings: '₱210,000', color: '#1B5E20' },
  ],
  totalPortfolioValue: '₱453,600',
};
