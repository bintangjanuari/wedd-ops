import { format, formatDistanceToNow, isAfter, isBefore, addDays } from "date-fns";
import { id } from "date-fns/locale";

/**
 * Format tanggal standar Indonesia (contoh: "14 Oktober 2026")
 */
export function formatIndoDate(date: Date | string | number, formatStr: string = "d MMMM yyyy"): string {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  return format(d, formatStr, { locale: id });
}

/**
 * Format tanggal pendek (contoh: "14 Okt 2026")
 */
export function formatShortDate(date: Date | string | number): string {
  return formatIndoDate(date, "d MMM yyyy");
}

/**
 * Format tanggal lengkap dengan hari (contoh: "Sabtu, 14 Oktober 2026")
 */
export function formatFullDate(date: Date | string | number): string {
  return formatIndoDate(date, "EEEE, d MMMM yyyy");
}

/**
 * Format jam menit (contoh: "08:30 WIB")
 */
export function formatTimeWIB(date: Date | string | number): string {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  return `${format(d, "HH:mm")} WIB`;
}

/**
 * Hitung selisih relatif ke hari ini (contoh: "3 hari yang lalu" atau "dalam 7 hari")
 */
export function formatRelativeDate(date: Date | string | number): string {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  return formatDistanceToNow(d, { addSuffix: true, locale: id });
}

