/**
 * Utilidades para cálculo de fechas
 */

/**
 * Calcula los años de experiencia desde una fecha de inicio
 * @param startDate Fecha de inicio (formato YYYY-MM-DD o Date)
 * @returns Número de años completos de experiencia
 */
export function calculateYearsOfExperience(startDate: string | Date): number {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const now = new Date();
  
  const yearDiff = now.getFullYear() - start.getFullYear();
  const monthDiff = now.getMonth() - start.getMonth();
  
  // Si aún no ha pasado el mes/día de aniversario, restar 1 año
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < start.getDate())) {
    return yearDiff - 1;
  }
  
  return yearDiff;
}

/**
 * Formatea los años de experiencia con texto apropiado
 * @param years Número de años
 * @returns Texto formateado (ej: "1 año", "2 años", "menos de 1 año")
 */
export function formatYearsOfExperience(years: number): string {
  if (years < 1) {
    return 'menos de 1 año';
  }
  return `${years} ${years === 1 ? 'año' : 'años'}`;
}
