import { useEffect } from 'react';

const TradingViewPlot = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    window.document.body.appendChild(script);
    script.onload = () => {
      const script2 = document.createElement('script');
      script2.async = true;
      script2.innerHTML = `new TradingView.widget(
      {
        "width": 1080,
        "height": 480,
        "symbol": "BINANCE:BTCUSDT",
        "interval": "D",
        "timezone": "Asia/Taipei",
        "theme": "dark",
        "style": "2",
        "locale": "zh_TW",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "tradingview_6abab"
      }
    );`;
      window.document.body.appendChild(script2);
    };
  }, []);
  return (
    <>
      <div className="tradingview-widget-container">
        <div id="tradingview_6abab"></div>
      </div>
    </>
  );
};
export default TradingViewPlot;
