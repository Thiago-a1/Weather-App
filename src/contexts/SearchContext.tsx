import { createContext, useState, useEffect, ReactNode } from "react";

import api from '../services/api';

interface SearchProviderProps {
  children: ReactNode
}

interface Data {
  location: {
    name: string,
    retion: string,
    country: string,
    localtime: string
  },
  current: {
    temp_c: number,
    temp_f: number,
    condition: {
      text: string,
      icon: string,
    },
    wind_mph: number,
    wind_degree: number,
    wind_dir: string,
    pressure_mb: number,
    humidity: number,
    vis_miles: number,
  },
  forecast: {
    forecastday: [
      {
        date: string,
        day: {
          maxtemp_c: number,
          mintemp_c: number,
          condition: {
            text: string,
            icon: string
          }
        }
      }
    ]
  }
}

interface SearchContextData {
  data: Data;
  getQuery: (input: string) => void;
  isLoading: boolean;
  measurement: string;
  handleMeasurement: (value: 'F' | 'C') => void;
}

export const SearchContext = createContext<SearchContextData>(
  {} as SearchContextData
)

export const SearchProvider = ({children}: SearchProviderProps) => {
  const [data, setData] = useState({} as Data);
  const [isLoading, setIsLoading] = useState(true);
  const [measurement, setMeasurement] = useState<'F' | 'C'>('C')
  const [query, setQuery] = useState('rio');

  useEffect(() => {
    setIsLoading(true)
    async function getData() {
      try {
        let response = await api.get(`forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${query}&days=5&aqi=no&alerts=no`)
        let { data } = response;

        setData(data)
        setIsLoading(false)
      } catch (err) {
        alert("not found!");
      }
    }
    getData()
  }, [name])
  
  function getQuery(input: string) {
    setQuery(input);
  }

  function handleMeasurement (value: 'F' | 'C') {
    setMeasurement(value);
  }
  
  return (
    <SearchContext.Provider 
      value={{
        data,
        getQuery,
        isLoading,
        measurement,
        handleMeasurement
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}