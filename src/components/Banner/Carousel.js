import axios from "axios";
import React, { useEffect, useState } from "react";
import { useData } from "../../context";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
function Carousel() {
  const { currency, currSymbol } = useData();
  const [trendingCoins, setTrendingCoins] = useState([]);

  const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
    );
    setTrendingCoins(data);
    console.log(data);
  };
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trendingCoins.map((curr) => {
    return (
      <Link to={`/coins/${curr.id}`}>
        <img src={curr?.image} alt={curr.name} height="55" />
        <br />
        <div style={{ margin: "5px" }}>
          <span style={{ textTransform: "uppercase" }}>{curr?.symbol}</span>
          &nbsp; &nbsp;
          <span
            style={{
              color: curr?.price_change_percentage_24h >= 0 ? "green" : "red",
            }}
          >
            {curr?.price_change_percentage_24h >= 0 && "+"}
            {curr?.price_change_percentage_24h?.toFixed(2)}
          </span>
        </div>
        <div style={{ fontSize: 18, fontWeight: 500, color: "white" }}>
          {currSymbol}&nbsp;
          {numberWithCommas(curr?.current_price.toFixed(2))}
        </div>
      </Link>
    );
  });
  return (
    <div className="carousel">
      <AliceCarousel
        maxWidth="xxl"
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={{ 0: { items: 2 }, 512: { items: 3 }, 1000: { items: 4 } }}
        autoPlay
        disableButtonsControls
        items={items}
      />
    </div>
  );
}

export default Carousel;
