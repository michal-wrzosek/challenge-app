// *
// * API responds with prices as integers, that's why we need some parsers ($14.99 => 1499)
// *

export function integerToPrice(integer?: number | null) {
  if (typeof integer === 'undefined') return 'N/A';
  if (integer === null) return 'N/A';

  return (integer / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}
