"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import useDebounce from "@/hooks/useDebounce";

export const PhotographerContext = createContext();

export function usePhotographer() {
  return useContext(PhotographerContext);
}

export function PhotographerProvider({ children }) {
  const [allPhotographers, setAllPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    rating: 0,
    styles: [],
    sortBy: "",
    city: "",
  });
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/photographers`);
        setAllPhotographers(res.data);
      } catch (err) {
        console.error("Error fetching photographers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  // FILTERING
  const filteredPhotographers = allPhotographers.filter((p) => {
    const priceMatch =
      (!filters.minPrice || p.price >= Number(filters.minPrice)) &&
      (!filters.maxPrice || p.price <= Number(filters.maxPrice));

    const ratingMatch = p.rating >= filters.rating;

    const styleMatch =
      filters.styles.length === 0 ||
      filters.styles.some((style) => p.styles.includes(style));

    const cityMatch =
      !filters.city || p.location.toLowerCase() === filters.city.toLowerCase();

    // Search
    const keyword = debouncedSearch.toLowerCase();
    const searchMatch =
      p.name.toLowerCase().includes(keyword) ||
      p.location.toLowerCase().includes(keyword) ||
      p.tags.some((tag) => tag.toLowerCase().includes(keyword));

    return priceMatch && ratingMatch && styleMatch && cityMatch && searchMatch;
  }).sort((a, b) => {
    if (filters.sortBy === "priceLowHigh") return a.price - b.price;
    if (filters.sortBy === "ratingHighLow") return b.rating - a.rating;
    if (filters.sortBy === "recent") return b.id - a.id;
    return 0;
  });

  useEffect(() => {
    setVisibleCount(6);
  }, [filters, debouncedSearch]);

  const value = {
    allPhotographers,
    loading,
    filters,
    setFilters,
    search,
    setSearch,
    filteredPhotographers,
    visibleCount,
    setVisibleCount,
  };

  return (
    <PhotographerContext.Provider value={value}>
      {children}
    </PhotographerContext.Provider>
  );
}
