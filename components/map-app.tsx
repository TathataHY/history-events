"use client";

import "leaflet/dist/leaflet.css";

import eventsData from "@/history-events";

import { Icon } from "leaflet";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Filter from "./filter";
import FlyToMarker from "./fly-to-marker";

const DEFAULT_POSITION: [number, number] = [51.505, -0.09];

const emptyStar = <i className="fa-regular fa-star" />;
const fullStar = (
  <i className="fa-solid fa-star" style={{ color: "#fdc401" }} />
);

function MapApp() {
  const icon: Icon = new Icon({
    iconUrl: "/marker.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );
  const [activeEvent, setActiveEvent] = React.useState<HistoricalEvent | null>(
    null
  );
  const [favorites, setFavorites] = React.useState<number[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const handleFavorite = (id: number) => {
    let updatedFavorites = favorites.filter((favorite) => favorite !== id);

    if (!favorites.includes(id)) {
      updatedFavorites = [id, ...updatedFavorites];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleEventClick = (id: number) => {
    const event = eventsData.find((event) => event.id === id);

    if (event) setActiveEvent(event);
  };

  return (
    <div className="content">
      <div className="map-content flex flex-col gap-6 h-full">
        <Filter setSelectedCategory={setSelectedCategory} />
        <MapContainer
          center={DEFAULT_POSITION}
          zoom={13}
          className="map-container"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {eventsData
            .filter(
              (event) =>
                !selectedCategory || event.category === selectedCategory
            )
            .map((event) => (
              <Marker
                key={event.id}
                position={event.position}
                icon={icon}
                eventHandlers={{
                  click: () => setActiveEvent(event),
                }}
              />
            ))}

          {activeEvent && (
            <Popup position={activeEvent.position}>
              <div className="popup-inner">
                <h2 className="popup-inner__title">{activeEvent.title}</h2>
              </div>
              <p className="popup-inner__description">
                {activeEvent.description}
              </p>
              <button
                className="popup-inner__button"
                onClick={() => handleFavorite(activeEvent.id)}
              >
                <span>
                  {favorites.includes(activeEvent.id) ? (
                    <>{fullStar} Remove from favorites</>
                  ) : (
                    <>{emptyStar} Add to favorites</>
                  )}
                </span>
              </button>
            </Popup>
          )}

          {activeEvent && (
            <FlyToMarker position={activeEvent.position} zoom={15} />
          )}
        </MapContainer>
      </div>

      <div className="liked-events">
        <h2 className="liked-events__title">
          <i className="fa-solid fa-star"></i> Liked Events
        </h2>

        <ul>
          {favorites.map((id) => (
            <li
              key={id}
              className="liked-events__event"
              onClick={() => handleEventClick(id)}
            >
              {eventsData.find((event) => event.id === id)?.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MapApp;
