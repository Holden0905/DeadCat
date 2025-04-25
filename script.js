document.addEventListener('DOMContentLoaded', function() {
    // Get all poster date elements
    const posterDates = document.querySelectorAll('.poster-date');
    
    // Function to format a date: Month Day, Year (e.g., April 25, 2025)
    function formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
    
    // Function to get the previous weekday (skips weekends)
    function getPreviousWeekday(date) {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() - 1);
      
      // If the previous day is Sunday (0) or Saturday (6), skip to Friday
      const dayOfWeek = newDate.getDay();
      if (dayOfWeek === 0) { // Sunday
        newDate.setDate(newDate.getDate() - 2); // Go back to Friday
      } else if (dayOfWeek === 6) { // Saturday
        newDate.setDate(newDate.getDate() - 1); // Go back to Friday
      }
      
      return newDate;
    }
    
    // Start with the current date
    let currentDate = new Date();
    
    // Update each poster date
    posterDates.forEach((dateElement, index) => {
      if (index === 0) {
        // First poster gets the current date
        dateElement.textContent = formatDate(currentDate);
      } else {
        // Get the previous weekday
        currentDate = getPreviousWeekday(currentDate);
        dateElement.textContent = formatDate(currentDate);
      }
    });
    
    // Update copyright year in footer
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
  });

// Using multiple free APIs for market data
async function getMarketData() {
    try {
      // 1. Get Bitcoin price from CoinGecko (already working)
      const btcResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      const btcData = await btcResponse.json();
      
      if (btcData && btcData.bitcoin && btcData.bitcoin.usd) {
        const bitcoinPrice = "$" + btcData.bitcoin.usd.toLocaleString();
        document.getElementById('bitcoin-display').textContent = bitcoinPrice;
      }
      
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  }

  function fetchSPYPrice() {
    fetch('https://finnhub.io/api/v1/quote?symbol=SPY&token=cuds4jhr01qiosq10ud0cuds4jhr01qiosq10udg')
        .then(response => response.json())
        .then(data => {
            document.getElementById('spy-price').textContent = '$' + data.c.toFixed(2);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('spy-price').textContent = 'Error loading price';
        });
}

  function fetchQQQPrice() {
    fetch('https://finnhub.io/api/v1/quote?symbol=QQQ&token=cuds4jhr01qiosq10ud0cuds4jhr01qiosq10udg')
        .then(response => response.json())
        .then(data => {
            document.getElementById('qqq-price').textContent = '$' + data.c.toFixed(2);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('qqq-price').textContent = 'Error loading price';
        });
  }

// Fetch immediately when page loads
fetchSPYPrice();
fetchQQQPrice();

// Update every minute (60000 milliseconds)
setInterval(fetchSPYPrice, 120000);
  
  // Run when the page loads
  document.addEventListener('DOMContentLoaded', function() {
    getMarketData();
  });