"use server";
import ky from "ky";
import { writeFileSync } from "fs";

export type CoinData = {
  id: String;
  assetName: String;
  price: number;
  hour1: number;
  hour24: number;
  day7: number;
  day30: number;
  marketcap: number;
  isfavorite?: boolean;
};

export async function getCoinData() {
  try {
    const result: CoinData[] = await ky
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        searchParams: {
          vs_currency: "usd",
          price_change_percentage: "1h,24h,7d,30d",
        },
      })
      .json();

    // const response = (await (
    //   await fetch(
    //     "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h,24h,7d,30d",
    //
    //     {
    //       next: { revalidate: 30 },
    //     },
    //   )
    // ).json()) as CoinData[];
    //

    const data = result?.map((data: any) => {
      return {
        id: data.id,
        assetName: data.name,
        price: data.current_price,
        hour1: data.price_change_percentage_1h_in_currency,
        hour24: data.price_change_percentage_24h_in_currency,
        day7: data.price_change_percentage_7d_in_currency,
        day30: data.price_change_percentage_30d_in_currency,
        marketcap: data.market_cap,
        isfavorite: false,
      } as CoinData;
    });
    return data;
  } catch (err) {
    return err;
  }
}

export type PortfolioAssetData = {
  id: String;
  price: Number;
  balance: Number;
  value: Number;
  percent_1d: Number;
  name: String;
  symbol: String;
  icon_url: String;
};

export type PortfolioData = {
  totalValueInUSD: Number;
  assets: PortfolioAssetData[];
};

type ZerionPortfolioTokenResult = {
  ok: boolean;
  data: {
    attributes: {
      value: Number;
      price: Number;
      quantity: {
        float: Number;
      };
      changes: {
        absolute_1d: Number;
        percent_1d: Number;
      };
      fungible_info: {
        name: String;
        symbol: String;
        icon: {
          url: String;
        };
        flags: {
          verified: true;
        };
      };
    };
    relationships: {};
  }[];
};

type ZerionPortfolioResult = {
  data: ZerionPortfolioTokenResult[];
};

export async function getPortfolioData(address: String) {
  try {
    const result = await ky
      .get(`https://api.zerion.io/v1/wallets/${address}/positions`, {
        headers: {
          authorization: `Basic ${process.env.ZERION_API_KEY}`,
        },
        searchParams: {
          "filter[chain_ids]": "scroll",
          "filter[positions]": "only_simple",
          currency: "usd",
          "filter[trash]": "only_non_trash",
          sort: "value",
        },
      })
      .json<ZerionPortfolioTokenResult>();

    // const response = (await (
    //   await fetch(
    //     `https://api.zerion.io/v1/wallets/${address}/positions/?filter[positions]=only_simple&currency=usd&filter[chain_ids]=scroll&filter[trash]=only_non_trash&sort=value`,
    //     {
    //       headers: {
    //         authorization: `Basic ${process.env.ZERION_API_KEY}`,
    //         "Content-Type": "application/json",
    //       },
    //       next: { revalidate: 30 },
    //     },
    //   )
    // ).json()) as ZerionPortfolioTokenResult;
    //
    // if (!response.ok) throw response;

    let totalAmount = 0;

    const portfolioAssetsData = result.data.map((token) => {
      totalAmount = Number(token.attributes.price);
      const attr = token.attributes;
      let id = filteredCoins.find((coin) => {
        return coin.name == attr?.fungible_info?.name;
      })?.id;

      if (attr?.fungible_info?.name == "Ethereum") {
        id = "ethereum";
      }

      return {
        id: id ?? "",
        balance: attr?.quantity?.float,
        price: attr?.price,
        value: attr.value,
        name: attr?.fungible_info?.name,
        icon_url: attr?.fungible_info.icon?.url,
        symbol: attr?.fungible_info?.symbol,
        percent_1d: attr?.changes?.percent_1d,
      };
    });

    const portfolioData = {
      totalValueInUSD: totalAmount,
      assets: portfolioAssetsData,
    };

    return portfolioData;
  } catch (err) {
    return err;
  }
}

import filteredCoins from "~/data.json";

export async function getApps() {}
