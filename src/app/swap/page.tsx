import dynamic from "next/dynamic";
const SocketBridgeD = dynamic(() => import("@/app/_components/SocketBridge"), {
  ssr: false,
});
export default function Swap() {
  return (
    <>
      <div className="flex w-full h-full justify-center items-center">
        <SocketBridgeD />
      </div>
    </>
  );
}
