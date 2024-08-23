"use client";
import { trpc } from "../_trpc/client";
import ConnectWallet from "./ConnectWallet";

export default function Topbar() {
  console.log(trpc.favoritesRouter.listFavorites.useQuery().data);
  return (
    <>
      <div className="w-full h-full flex items-center justify-between"></div>
    </>
  );
}
