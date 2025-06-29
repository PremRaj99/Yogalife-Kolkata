import CTA from "../components/CTA";
import HeadingPage from "../components/common/HeadingPage";

export default function Programs() {
  return (
    <div className="w-full">
      <HeadingPage>Program</HeadingPage>
      <div className="flex w-full h-screen justify-center items-center">
        <p className="text-5xl">No Programs available...</p>
      </div>
      <CTA />
    </div>
  );
}
