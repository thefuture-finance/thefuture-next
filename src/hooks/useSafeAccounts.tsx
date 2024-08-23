import SafeApiKit, { OwnerResponse } from "@safe-global/api-kit";
import { useEffect, useState } from "react";
import { useSafeApiKit } from "./useSafeApiKit";

export async function getSafeAccounts(address: string) {
  const safes: OwnerResponse = await apiKit.getSafesByOwner(address);
  return safes;
}
