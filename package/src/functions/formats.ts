// import copy from 'clipboard-copy';
export const formatComas = (number: number) => {
    return Intl.NumberFormat('es-MX').format(number)
}

export const formatRevertComas = (number: string) => {
    return Number(number.replaceAll(",", ""));
}

/**
 * formato con separadores de miles usando comas
 * @param number numero a convertir
 * @param decimal cantidad de decimales (opcional)
 * @returns numero formateado a dinero
 */
export const formatMoney = (number: number, decimal: number = 0) => {
    return Intl.NumberFormat('es-MX', { minimumFractionDigits: decimal, maximumFractionDigits: 2 }).format(number)
}

export const getDecimals = (number: number) => Math.abs(number % 1).toFixed(2).toString().substring(2);

export const formatDate = (date: number | Date, withTime: boolean = false, withYear: boolean = true) => {
    const formattedDate = new Date(date);
    const day = formattedDate.toLocaleDateString('es-ES', {
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        year: withYear ? "numeric" : undefined
    });
    const [dayPart, timePart] = day.split(',');

    return `${dayPart.trim()} ${withTime ? `, ${timePart}` : ""}`;
}

export const formatUpperFirst = (text: string) => {
    return text.slice(0, 1).toUpperCase() + text.slice(1);
}

export const formatUpperEach = (text: string) => {
    return text.split(' ')
        .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

/**
 * devuelve un numero entero en string, elimina cualquier caracter o puntuacion
 * @param text numero en string
 * @returns numero en string formateado
 */
export const formatInteger = (text: string) => {
    const cleanedText = text.replace(/[^\d]/g, '').replace(/^0+/, '');
    return String(cleanedText === '' ? "" : parseInt(cleanedText, 10));
}

/**
 * devuelve una cadena de texto libre de numeros y puntuaciones, ideal para formatear nombres
 * @param text cadena de texto
 * @returns cadena de texto formateada
 */
export const formatName = (text: string) => {
    return text.replace(/[^A-Za-zñáéíóúüÜÁÉÍÓÚÑñ\s]/g, '');
}

export const formatSeparateURL = (text: string) => {
    const replaced = text.replace('/', '').split("/", 2);
    return replaced.length === 1 && replaced[0] === "" ? ["/"] : replaced;
}