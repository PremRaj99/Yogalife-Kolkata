import { ArrowRight, Calendar, Clock, MapPin, Megaphone, X } from "lucide-react";
import { useEffect, useState } from "react";
import SectionWrapper from "../layout/SectionWrapper";
import Papa from "papaparse";

const newsheetCsvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJFOdlMKF_Vwx-F7UN1T7nGjbfkMw8FeL-97_gsuGcequQBBGpLecurFamRkIb7fYxjccQUvFCoECt/pub?gid=304718466&single=true&output=csv";
const eventsheetCsvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJFOdlMKF_Vwx-F7UN1T7nGjbfkMw8FeL-97_gsuGcequQBBGpLecurFamRkIb7fYxjccQUvFCoECt/pub?gid=153098187&single=true&output=csv";

export default function NoticeBoard() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [notice, setNotice] = useState({ news: [], events: [] });

  useEffect(() => {
    Papa.parse(newsheetCsvUrl, {
      download: true,
      header: true,
      complete: (results) => {
        setNotice((prev) => ({ ...prev, news: results.data }));
      }
    });
    Papa.parse(eventsheetCsvUrl, {
      download: true,
      header: true,
      complete: (results) => {
        setNotice((prev) => ({ ...prev, events: results.data }));
      }
    });
  }, []);

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <SectionWrapper
      title="Notice Board & Events Hub"
      subtitle="Stay updated with the latest news, announcements, and upcoming yoga and wellness workshops."
      className="bg-white"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">

        {/* Latest Announcements - High Contrast Side Panel */}
        <div className="lg:col-span-4 flex flex-col bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
            <Megaphone className="w-5 h-5 text-slate-300" />
            <h3 className="text-lg font-bold tracking-tight">Announcements</h3>
          </div>
          <div className="flex-grow overflow-y-auto [scrollbar-width:none] max-h-[500px] pr-2 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
            {notice.news.map((item) => (
              <div key={item.id} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] uppercase font-bold px-2 py-1 bg-slate-700 rounded text-slate-300">
                    {item.tag}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{item.date}</span>
                </div>
                <h4 className="text-sm font-bold mb-2">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events - Clean Minimalist Grid */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-5 h-5 text-slate-900" />
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Upcoming Workshops</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {notice.events.map((event) => (
              <div
                key={event.id}
                className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-slate-900 rounded shadow-sm">
                    {event.date}
                  </div>
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-4 leading-tight group-hover:text-slate-600 transition-colors">
                      {event.title}
                    </h4>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm text-slate-600 gap-3">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600 gap-3">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Register Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal selectedEvent={selectedEvent} closeModal={closeModal} />
    </SectionWrapper>
  );
}

const Modal = ({ selectedEvent, closeModal }) => {
  return (
    <>
      {/* Registration Modal Overlay (Glassmorphism applied here for focus) */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row relative animate-fade-in">

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded-full p-2 transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side: Premium Event Showcase */}
            <div className="md:w-1/2 bg-slate-950 relative flex flex-col justify-end min-h-[300px] md:min-h-0">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              {/* High-contrast dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>

              <div className="relative p-6 md:p-8 text-white z-10">
                <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-full inline-block mb-4">
                  Featured Workshop
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight tracking-tight">
                  {selectedEvent.title}
                </h3>

                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Description and Form (Two-Step Flow) */}
            <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-between bg-white">
              <div className="flex flex-col h-full justify-between">
                <div className="mb-6 flex-grow">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                    Event Description
                  </h4>
                  <p dangerouslySetInnerHTML={{ __html: selectedEvent.description || "" }} className="text-sm unset text-slate-600 leading-relaxed mb-8">
                  </p>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                    <h5 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                      Quick Summary
                    </h5>
                    <div className="flex items-center text-sm text-slate-700 gap-3">
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                      <span><strong>Date:</strong> {selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-700 gap-3">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <span><strong>Time:</strong> {selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-700 gap-3">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span><strong>Location:</strong> {selectedEvent.location}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => { if (selectedEvent.registrationLink) window.open(selectedEvent.registrationLink, "_blank"); else alert("No registration link found") }}
                  className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 group"
                >
                  <span>Register for this Event</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div >
      )}</>
  )
}