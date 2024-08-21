"use client";

import Script from "next/script";
import { HTMLAttributes } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "gecko-coin-price-chart-widget": MyElementAttributes;
    }

    interface MyElementAttributes {
      locale: string;
      width: string;
      height: string;
    }
  }
}

export default function TokenChart({ coinId }: { coinId: string }) {
  return (
    <>
      <div className="w-[600px] h-[460px] border-black border shadow-xl rounded-lg">
        <gecko-coin-price-chart-widget
          transparent-background="true"
          locale="en"
          coin-id={coinId}
          initial-currency="usd"
          width="600"
          height="300"
        ></gecko-coin-price-chart-widget>
        <Script src="https://widgets.coingecko.com/gecko-coin-price-chart-widget.js"></Script>
      </div>
    </>
  );
}
