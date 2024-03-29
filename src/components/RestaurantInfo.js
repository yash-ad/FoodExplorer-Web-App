import React, { useState, useEffect } from "react";
import { IMG_URL } from "../utilities/config";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { REST_INFO_API_URL } from "../utilities/config";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantInfo = () => {
  const [resInfo, setResInfo] = useState(null);
  const [resMenu, setResMenu] = useState(null);
  const [resNewInfo, setResNewInfo] = useState(null);
  const [resCategory, setResCategory] = useState(null);
  const [showIndex, setShowIndex] = useState(null);
  const [searchText, setSearchText] = useState('');

  const { resId } = useParams();

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    try {
      const data = await fetch(REST_INFO_API_URL + resId);
      const json = await data.json();
      setResMenu(json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards);
      setResNewInfo(json?.data?.cards[0]?.card?.card?.info?.labels[1]);
      setResInfo(json?.data?.cards[0]?.card?.card?.info);
      setResCategory(json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((category) => category.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"));
    } catch (error) {
      console.error("Error fetching restaurant information:", error);
    }
  };

  if (resMenu === null) {
    return <Shimmer />;
  };

  const { name, cuisines, avgRating, costForTwoMessage, cloudinaryImageId, locality, totalRatingsString, avgRatingString } = resInfo;
  const { lastMileTravelString, maxDeliveryTime } = resInfo?.sla;
  const { message } = resNewInfo;

  const categories = resCategory;

  const handleBrowseSearch = () => {
    if (!searchText) {
      setShowIndex(null);
      return;
    }

    let filteredCategories = categories.filter((category) =>
      category.card?.card?.title.toLowerCase().includes(searchText.toLowerCase())
    );

    if (filteredCategories.length > 0) {
      setShowIndex(categories.indexOf(filteredCategories[0]));
    } else {
      setShowIndex(null);
    }
  };

  return (
    <div className="pages-container">
      <div className="rest-menu">
        <div className="top-menu">
          <div className="top-menu-left">
            <img src={IMG_URL + cloudinaryImageId} alt="Restaurant" />
          </div>
          <div className="top-menu-right">
            <h1>{name}</h1>
            <p>{cuisines.join(" , ")}</p>
            <p>{locality} - {lastMileTravelString}</p>
            <div className="top-menu-right-child">
              <p style={avgRating > 3.8 ? { backgroundColor: "darkgreen" } : { backgroundColor: "rgb(164, 14, 14)" }}>
                <i className="ri-star-fill"></i>
                {avgRating}
              </p>
              <span>|</span>
              <p>{maxDeliveryTime}mins</p>
              <span>|</span>
              <p>{costForTwoMessage}</p>
            </div>
          </div>
          <div className="ratings-container">
            <button className="RestaurantRatings_wrapper" >
              <span className="RestaurantRatings_avgRating" >
                <span className="icon-star"></span>
                <span><i className="ri-star-fill"></i>{avgRatingString}</span>
              </span>
              <span className="RestaurantRatings_totalRatings" >{totalRatingsString}</span>
            </button>
          </div>
        </div>
        <div className="mid-menu-search">
          <div className="search-container">
            <div className="search-bar">
              <input className="input-bar" autoComplete="off" name="hidden" type="text" placeholder="Search within title" id="searchInp" value={searchText} onChange={(event) => {
                setSearchText(event.target.value);
                handleBrowseSearch();
              }} onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleBrowseSearch();
                }
              }} />
              <div className="button-container">
                <button data-testid="clickSearchButton" id="searchBtn">
                  <svg xmlns="http://www.w3.org/2000/svg" height="23" width="23" viewBox="0 0 448 512">
                    <path fill="#fc9a01" d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        {categories.map((category, index) => (
          <RestaurantCategory
            key={category?.card?.card?.title}
            data={category?.card?.card}
            showItems={index === showIndex ? true : false}
            showTheIndex={() => {
              setShowIndex((prevIndex) => (prevIndex === index ? null : index))
            }}
          />
        ))}
        <div className="bottom-menu">
          <div className="RestaurantLicence_wrapper__4BYQV">
            <div className="RestaurantLicence_licence__Oo5_q" aria-hidden="true">
              <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_120,h_60/fssai_final_edss9i" alt="FSSAI" className="RestaurantLicence_image__2-5G_" />
            </div>
            <div></div>
          </div>
          <div className="RestaurantFooterAddress_wrapper__16xqp" aria-hidden="true">
            <p className="RestaurantFooterAddress_name__deVKZ">{name}</p><br></br>
            <p>Outlet: {locality}</p><br></br>
            <div className="RestaurantFooterAddress_address__37uUA">
              <div className="icon-markerDark RestaurantFooterAddress_icon__2Kjdg"></div>
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;

