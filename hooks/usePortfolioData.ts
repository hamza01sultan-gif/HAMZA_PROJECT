import { useState, useEffect, useCallback } from 'react';
import type { PortfolioData } from '../types';
import { INITIAL_DATA } from '../constants';

const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData>(INITIAL_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem('portfolioData');
      if (storedData) {
        setData(JSON.parse(storedData));
      } else {
        setData(INITIAL_DATA);
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
      setData(INITIAL_DATA);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const updateData = useCallback((newData: PortfolioData) => {
    try {
      localStorage.setItem('portfolioData', JSON.stringify(newData));
      setData(newData);
    } catch (error) {
      console.error("Failed to save data to localStorage", error);
    }
  }, []);

  return { data, updateData, isLoaded };
};

export default usePortfolioData;
