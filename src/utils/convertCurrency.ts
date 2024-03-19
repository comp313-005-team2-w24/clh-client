const convertCurrency = (value: number) => {
    return (Math.round(value * 100) / 100).toFixed(2);
};
export default convertCurrency;
