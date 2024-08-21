import AppCard, { AppCardData } from "./AppCard";

export type AppGridProps = {
  apps: AppCardData[];
};
export default function AppGrid({ apps }: AppGridProps) {
  return (
    <>
      <div className="grid-container p-8 w-full auto-rows-min">
        {apps.map((app, index) => {
          return <AppCard key={index} {...app} />;
        })}
      </div>
    </>
  );
}
