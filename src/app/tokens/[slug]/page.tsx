import TokenChart from "@/app/_components/token/TokenChart";

import dynamic from "next/dynamic";

const DynamicTokenChart = dynamic(
  () => import("@/app/_components/token/TokenChart"),
  {
    ssr: false,
  },
);

export default function Token({ params }: { params: { slug: string } }) {
  return (
    <>
      <div>
        <DynamicTokenChart coinId={params.slug} />
      </div>
    </>
  );
}
