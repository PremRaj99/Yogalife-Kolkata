import { Calendar } from "lucide-react";

export default function ImageCard({ data }) {
  return (
    <div className="relative group rounded-lg overflow-hidden shadow-xl transition-transform duration-300 ease-in-out hover:scale-105">
      {/* Image with Overlay */}
      <div className="relative">
        <img
          src={data.image}
          alt={data.title}
          title={data.title}
          className="w-full h-56 object-cover transition-opacity duration-300 group-hover:opacity-80"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {/* Text & Date Section */}
      <div className="absolute bottom-3 left-3 flex items-center bg-white/80 backdrop-blur-md px-3 py-1 rounded-full shadow-md">
        <Calendar className="w-4 h-4 text-gray-700 mr-2" />
        <span className="text-sm font-medium text-gray-700">{data.date}</span>
      </div>

      {/* Title */}
      <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-md shadow-md text-sm font-medium">
        {data.title}
      </div>
    </div>
  );
}
