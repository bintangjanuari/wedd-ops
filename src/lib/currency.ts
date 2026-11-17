/**
 * Helper formatter mata uang Rupiah Indonesia (IDR)
 */
export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function parseIDR(formatted: string): number {
  const clean = formatted.replace(/[^0-9]/g, "");
  return parseInt(clean, 10) || 0;
}

