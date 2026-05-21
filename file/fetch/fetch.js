(function ()  {
  const fetchPriceData = async () => {
    try {
      const response = await fetch('https://usca.com.ua/calc/price.json');
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching price data:", error);
    }
  };

  const fetchAndCalculateCoefficient = async () => {
    try {
      const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const usd = data.find(currency => currency.cc === 'USD');
      const eur = data.find(currency => currency.cc === 'EUR');

      if (usd && eur) {
        return usdCoefficient = eur.rate / usd.rate;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  window.fetchPriceData = fetchPriceData
  window.fetchAndCalculateCoefficient = fetchAndCalculateCoefficient
})()

