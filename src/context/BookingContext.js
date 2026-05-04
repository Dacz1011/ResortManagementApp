import React, { createContext, useState, useContext, useEffect } from 'react';
import { REINE_DATA, RYU_DATA, CASAM_DATA } from '../datas/mockData';
import { mockDb } from '../services/mockDb';

const BookingContext = createContext();

const PROPERTY_NAME_MAP = {
  'Reine': 'Reine Beach House',
  'Ryu': 'Ryu Resort',
  'Casa': 'Casa M.O.'
};

export const BookingProvider = ({ children }) => {
  const [reineBookings, setReineBookings] = useState(REINE_DATA.bookings);
  const [ryuBookings, setRyuBookings] = useState(RYU_DATA.bookings);
  const [casaBookings, setCasaBookings] = useState(CASAM_DATA.bookings);

  const loadAllBookings = async () => {
    const storedReine = await mockDb.getAll('bookings_reine');
    if (storedReine && Object.keys(storedReine).length > 0) setReineBookings(storedReine);

    const storedRyu = await mockDb.getAll('bookings_ryu');
    if (storedRyu && Object.keys(storedRyu).length > 0) setRyuBookings(storedRyu);

    const storedCasa = await mockDb.getAll('bookings_casa');
    if (storedCasa && Object.keys(storedCasa).length > 0) setCasaBookings(storedCasa);
  };

  useEffect(() => {
    loadAllBookings();
  }, []);

  const addBooking = async (propertyId, newBookings) => {
    let updatedBookings;
    let storageKey;
    let setter;

    switch (propertyId) {
      case 'Reine':
        updatedBookings = { ...reineBookings, ...newBookings };
        setter = setReineBookings;
        storageKey = 'bookings_reine';
        break;
      case 'Ryu':
        updatedBookings = { ...ryuBookings, ...newBookings };
        setter = setRyuBookings;
        storageKey = 'bookings_ryu';
        break;
      case 'Casa':
        updatedBookings = { ...casaBookings, ...newBookings };
        setter = setCasaBookings;
        storageKey = 'bookings_casa';
        break;
      default:
        return;
    }

    setter(updatedBookings);
    await mockDb.saveAll(storageKey, updatedBookings);

    const days = Object.keys(newBookings);
    if (days.length > 0) {
      const firstDayData = newBookings[days[0]];
      const numericAmount = firstDayData.amount ?
        parseFloat(firstDayData.amount.replace(/[^\d.]/g, '')) : 0;

      await mockDb.add('dailyCollections', {
        property: PROPERTY_NAME_MAP[propertyId],
        amount: numericAmount,
        guest: firstDayData.guestName,
        date: new Date().toISOString().split('T')[0],
        type: 'Booking'
      });
    }
  };

  const updateGuestPhotos = async (propertyId, guestName, checkIn, checkOut, photos) => {
    let currentBookings;
    let setter;
    let storageKey;

    switch (propertyId) {
      case 'Reine':
        currentBookings = { ...reineBookings };
        setter = setReineBookings;
        storageKey = 'bookings_reine';
        break;
      case 'Ryu':
        currentBookings = { ...ryuBookings };
        setter = setRyuBookings;
        storageKey = 'bookings_ryu';
        break;
      case 'Casa':
        currentBookings = { ...casaBookings };
        setter = setCasaBookings;
        storageKey = 'bookings_casa';
        break;
      default:
        return;
    }

    const updatedBookings = { ...currentBookings };
    let changed = false;

    Object.keys(updatedBookings).forEach((day) => {
      const b = updatedBookings[day];
      if (
        b.guestName === guestName &&
        b.checkIn === checkIn &&
        b.checkOut === checkOut
      ) {
        updatedBookings[day] = { ...b, ...photos };
        changed = true;
      }
    });

    if (changed) {
      setter(updatedBookings);
      await mockDb.saveAll(storageKey, updatedBookings);
      return true;
    }
    return false;
  };

  const deleteStay = async (propertyId, guestName, checkIn, checkOut) => {
    let currentBookings;
    let setter;
    let storageKey;

    switch (propertyId) {
      case 'Reine':
        currentBookings = { ...reineBookings };
        setter = setReineBookings;
        storageKey = 'bookings_reine';
        break;
      case 'Ryu':
        currentBookings = { ...ryuBookings };
        setter = setRyuBookings;
        storageKey = 'bookings_ryu';
        break;
      case 'Casa':
        currentBookings = { ...casaBookings };
        setter = setCasaBookings;
        storageKey = 'bookings_casa';
        break;
      default:
        return;
    }

    const updatedBookings = { ...currentBookings };
    Object.keys(updatedBookings).forEach((day) => {
      const b = updatedBookings[day];
      if (
        b.guestName === guestName &&
        b.checkIn === checkIn &&
        b.checkOut === checkOut
      ) {
        delete updatedBookings[day];
      }
    });

    setter(updatedBookings);
    await mockDb.saveAll(storageKey, updatedBookings);
  };

  const getBookings = (propertyId) => {
    switch (propertyId) {
      case 'Reine': return reineBookings;
      case 'Ryu': return ryuBookings;
      case 'Casa': return casaBookings;
      default: return {};
    }
  };

  return (
    <BookingContext.Provider value={{ getBookings, addBooking, deleteStay, updateGuestPhotos, refreshBookings: loadAllBookings }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};
