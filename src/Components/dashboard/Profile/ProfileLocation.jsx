
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import toast from "react-hot-toast";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png"
import Button from "../../common/Button";
import axios from "axios";
import { useProfile, useUpdateProfile } from "../../../hooks/dashboard/userProfile";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const DEFAULT_CENTER = [35.6892, 51.389];

function ClickHandler({ onPick }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
}

function FlyToPosition({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, Math.max(map.getZoom(), 15));
    }
  }, [position, map]);

  return null;
}

export default function LocationPicker() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const [address, setAddress] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  const { mutate, isPending } = useUpdateProfile();
     const {data:profile}=useProfile()

     const birthDay = profile?.birthDay ?? ""

     console.log("birthday map",birthDay);
     
  const position =
    location.latitude !== null && location.longitude !== null
      ? [location.latitude, location.longitude]
      : null;

const fetchAddress = async (lat, lng) => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          format: "jsonv2",
          lat,
          lon: lng,
          "accept-language": "fa",
        },
      }
    );

    setAddress(response.data?.display_name ?? "");
  } catch (error) {
    setAddress("");
    toast.error("دریافت آدرس انجام نشد");
  }
};
  const handlePick = (lat, lng) => {
    setLocation({
      latitude: lat,
      longitude: lng,
    });

    setAddress("");

    fetchAddress(lat, lng);
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      toast.error("مرورگر شما از موقعیت‌یابی پشتیبانی نمی‌کند");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        handlePick(
          pos.coords.latitude,
          pos.coords.longitude
        );

        setIsLocating(false);
      },

      () => {
        toast.error("دسترسی به موقعیت مکانی داده نشد");
        setIsLocating(false);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  const handleSubmit = () => {
    if (
      location.latitude === null ||
      location.longitude === null
    ) {
      toast.error("لطفاً ابتدا موقعیت خود را روی نقشه انتخاب کنید");
      return;
    }

    mutate({
      BirthDay:birthDay,
      Latitude: location.latitude,
      Longitude: location.longitude,
    });
  };

  return (
    <div className="flex w-full flex-col gap-4" >

      <h4 className="text-base text-primary self-start">داخل نقشه موقعیت مکانی محل سکونت خود را انتخاب کنید</h4>

      <div className="flex justify-start">
        <Button
          color="bg-primary"
          content={
            isLocating
              ? "در حال یافتن موقعیت..."
              : "موقعیت من"
          }
          onClick={handleLocateMe}
          disabled={isLocating}
        />
      </div>

      
      <MapContainer
        center={position ?? DEFAULT_CENTER}
        zoom={13}
        className="h-80 w-full rounded-[16px]"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickHandler onPick={handlePick} />

        <FlyToPosition position={position} />

        {position && (
          <Marker
            position={position}
            draggable
            eventHandlers={{
              dragend: (e) => {
                const { lat, lng } = e.target.getLatLng();

                handlePick(lat, lng);
              },
            }}
          />
        )}
      </MapContainer>

      {address && (
        <p className="text-sm text-text-secondary">
          آدرس انتخاب‌شده: {address}
        </p>
      )}


      <Button
        color="bg-primary"
        content={
          isPending
            ? "در حال ثبت موقعیت..."
            : "ثبت موقعیت"
        }
        onClick={handleSubmit}
        disabled={isPending || !position}
      />

    </div>
  );
}
