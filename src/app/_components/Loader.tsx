import ClipLoader from "react-spinners/ClipLoader";

export default function Loader() {
  return (
    <ClipLoader
      className="absolute top-[calc(50%-250px)] left-[calc(50%-250px)] opacity-80 z-[90]"
      color="gray"
      loading={true}
      size={500}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
