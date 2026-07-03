export default function CardComponent({
  image = "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  title = "Noteworthy technology acquisitions 2021",
  desc = "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
}) {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-md bg-white dark:bg-gray-800">
      <img
        className="w-full h-48 aspect-square object-cover"
        src={image}
        alt={title}
        style={{ WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)", maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)"}}
      />
      <div className="p-4">
        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mt-2 text-xs text-gray-700 dark:text-gray-400">{desc}</p>
      </div>
    </div>
  );
}
