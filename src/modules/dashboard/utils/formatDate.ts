// utils/dateFormat.ts

const MONTHS: string[] = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

export const formatDate = (dateInput: string | Date): string => {
    const date = new Date(dateInput);

    const day = date.getDate();
    const month = MONTHS[date.getMonth()];
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day} ${month} ${year} ${hours}:${minutes}`;
};

export default formatDate;
