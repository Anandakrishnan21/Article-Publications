"use client";
import React, { useEffect, useState } from "react";
import { BadgeCheck } from "lucide-react";
import { Label } from "../ui/label";
import { offers } from "@/utils/constants";
import UploadBtn from "./UploadBtn";

function UploadCard() {
  const [price, setPrice] = useState([]);
  const [error, setError] = useState(null);

  const CardContent = [
    {
      id: "1",
      name: "Journal",
      href: "/home/upload/journal",
      upload: "Upload Journal",
    },
    {
      id: "2",
      name: "Conference",
      href: "/home/upload/conference",
      upload: "Upload Conference",
    },
  ];

  useEffect(() => {
    const fetchPrice = async () => {
      const res = await fetch("/api/getPricing", {
        cache: "no-store",
      });
      const data = await res.json();
      setPrice(data);
    };
    fetchPrice();
  }, []);

  const handleSubscription = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: price[0].id,
        }),
      });

      if (!res.ok) {
        throw new error("Network response was not ok");
      }

      const data = await res.json();
      window.location.assign(data);
    } catch (error) {
      setError("Error:", error.message);
    }
  };

  return (
    <div className="subscriptionDiv">
      {CardContent.map((card) => (
        <div
          key={card.id}
          className="subscriptionCard"
        >
          <div className="flex flex-col gap-2 font-semibold">
            <span className="planDiv">
              Pro
            </span>
            <div className="flex items-center">
              <h1 className="text-3xl">
                Free
                <span className="px-2 text-base font-light">for 1 year</span>
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>Available Features</p>
            <div className="uploadCard flex-col gap-4 p-4 rounded-lg">
              {offers.map((offer, index) => (
                <div className="flex items-center gap-2" key={index}>
                  <BadgeCheck size={20} />
                  <Label>{offer}</Label>
                </div>
              ))}
            </div>
          </div>
          <UploadBtn
            href={card.href}
            upload={card.upload}
            handleSubscription={handleSubscription}
          />
        </div>
      ))}
    </div>
  );
}

export default UploadCard;
