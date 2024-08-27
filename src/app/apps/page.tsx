import AppGrid, { AppGridProps } from "@/app/_components/apps/AppGrid";
import { serverClient } from "../_trpc/serverClient";
import { AppCardData } from "../_components/apps/AppCard";

export default async function Apps() {
  const apps = (await serverClient.appsRouter.getApps()) as AppCardData[];
  const appGridProps: AppGridProps = {
    apps,
  };
  return (
    <>
      <div className="w-full h-full flex justify-center">
        <div className="w-full flex">
          <AppGrid apps={appGridProps.apps} />
        </div>
      </div>
    </>
  );
}
