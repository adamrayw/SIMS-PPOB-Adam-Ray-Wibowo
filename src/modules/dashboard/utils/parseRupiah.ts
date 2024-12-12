const parseRupiah = (formattedValue: string): number => {
    // Menghapus semua karakter non-angka
    return Number(formattedValue.replace(/[^\d]/g, ''));
};

export default parseRupiah;