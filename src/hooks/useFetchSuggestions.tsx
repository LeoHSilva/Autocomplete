import { useState, useEffect } from 'react';

export type Pokemon = {
  name: string;
};

const useFetchSuggestions = () => {
  const [suggestions, setSuggestions] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0');
        const data = await response.json();
        const fetchedSuggestions = data.results.map((p: any) => ({ name: p.name }));
        
        setSuggestions(fetchedSuggestions);
      } catch (error) {
        setError('Failed to fetch suggestions');
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  return { suggestions, loading, error };
};

export default useFetchSuggestions;