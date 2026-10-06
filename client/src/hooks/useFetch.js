import { useState, useEffect, useCallback } from 'react';

export function useFetch(fetchFn, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const executeFetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      console.error(err);
      setError(err.message || 'ডাটা লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    executeFetch();
  }, dependencies);

  return { data, loading, error, refetch: executeFetch };
}

export default useFetch;
