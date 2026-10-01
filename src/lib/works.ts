import { getCollection } from 'astro:content';

// Gallery order: works with a `number` first (1, 2, 3 …, same order as the portfolio PDF),
// then everything else, newest first.
export async function getWorks({ includeHidden = false } = {}) {
  const all = await getCollection('work');
  return all
    .filter((w) => includeHidden || !w.data.hidden)
    .sort((a, b) => {
      const na = a.data.number ?? Infinity;
      const nb = b.data.number ?? Infinity;
      if (na !== nb) return na - nb;
      return new Date(b.data.date || 0).getTime() - new Date(a.data.date || 0).getTime();
    });
}
