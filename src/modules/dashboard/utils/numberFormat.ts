const numberFormat = (value: number): string => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
    }).format(value);
  };
  
  export default numberFormat;