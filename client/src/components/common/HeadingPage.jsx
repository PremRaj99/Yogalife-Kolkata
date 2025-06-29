
export default function HeadingPage({ children = "Title"}) {
  return <div className="w-full p-8 bg-blue-500 text-white font-bold text-center text-4xl">
    {children}
  </div>;
}
