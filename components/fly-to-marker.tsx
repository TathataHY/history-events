import { useEffect } from "react";
import { useMap } from "react-leaflet";

function FlyToMarker({
  position,
  zoom,
}: {
  position: [number, number];
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      const newzoom = zoom ?? map.getZoom();
      map.flyTo(position, newzoom, { duration: 1.5 });
    }
  }, [map, position, zoom]);

  return null;
}

export default FlyToMarker;
