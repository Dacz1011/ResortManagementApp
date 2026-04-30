    import React, { createContext, useState, useContext } from 'react';
    import { REINE_DATA, RYU_DATA, CASAM_DATA } from '../datas/mockData';

    const BookingContext = createContext();

    export const BookingProvider = ({ children }) => {
      const [reineBookings, setReineBookings] = useState(REINE_DATA.bookings);
      const [ryuBookings, setRyuBookings] = useState(RYU_DATA.bookings);
      const [casaBookings, setCasaBookings] = useState(CASAM_DATA.bookings);

      const addBooking = (propertyId, newBookings) => {
        switch (propertyId) {
          case 'Reine':
            setReineBookings(prev => ({ ...prev, ...newBookings }));
            break;
          case 'Ryu':
            setRyuBookings(prev => ({ ...prev, ...newBookings }));
            break;
          case 'Casa':
            setCasaBookings(prev => ({ ...prev, ...newBookings }));
            break;
          default:
            break;
        }
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
        <BookingContext.Provider value={{ getBookings, addBooking }}>
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
