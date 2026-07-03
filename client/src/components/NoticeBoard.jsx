import { ArrowRight, Calendar, CheckCircle, Clock, MapPin, Megaphone, X } from "lucide-react";
import { useState } from "react";
import noticeData from "../../data/notices.json";

export default function NoticeBoard() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [registeredEventId, setRegisteredEventId] = useState(null);

  const closeModal = () => {
    setSelectedEvent(null);
    setIsRegistering(false);
    setFormData({ name: "", email: "", phone: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const constructGoogleFormUrl = (event, name, email, phone) => {
    const { registrationLink, googleFormFields } = event;
    if (!registrationLink) return "";
    if (!googleFormFields) return registrationLink;

    try {
      const url = new URL(registrationLink);
      if (googleFormFields.name) {
        url.searchParams.append(googleFormFields.name, name);
      }
      if (googleFormFields.email) {
        url.searchParams.append(googleFormFields.email, email);
      }
      if (googleFormFields.phone) {
        url.searchParams.append(googleFormFields.phone, phone);
      }
      return url.toString();
    } catch (error) {
      console.error("Invalid registration link URL:", error);
      return registrationLink;
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all fields.");
      return;
    }

    const formUrl = constructGoogleFormUrl(selectedEvent, formData.name, formData.email, formData.phone);
    
    // Open Google Form with prefilled answers in a new tab
    window.open(formUrl, "_blank");

    // Show temporary on-site success message
    setRegisteredEventId(selectedEvent.id);
    
    setTimeout(() => {
      setRegisteredEventId(null);
      closeModal();
    }, 3000);
  };

  return (
    <div className="container max-w-6xl mx-auto p-6 mt-12 bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100">
      
      {/* Header section with gradient line */}
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 mb-2">
          Notice Board & Events Hub
        </h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"></div>
        <p className="text-gray-500 mt-3 text-center text-sm md:text-base max-w-lg">
          Stay updated with the latest news, announcements, and upcoming yoga and wellness workshops.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* News Feed - Takes 5 cols on lg screen */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-xl">
              <Megaphone className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Latest Announcements</h3>
          </div>

          <div className="flex-grow overflow-y-auto max-h-[520px] pr-2 space-y-5 scrollbar-thin">
            {noticeData.news.map((item) => (
              <div 
                key={item.id}
                className="group p-5 bg-gradient-to-br from-purple-50/50 to-pink-50/20 border border-purple-100/50 rounded-2xl hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full">
                    {item.tag}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">{item.date}</span>
                </div>
                <h4 className="text-base font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-200 mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Events Section - Takes 7 cols on lg screen */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="p-2 bg-pink-100 text-pink-600 rounded-xl">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Upcoming Events & Workshops</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {noticeData.events.map((event) => (
              <div 
                key={event.id}
                className="group flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Event Image Banner */}
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-[11px] font-bold text-gray-800 rounded-lg shadow-sm">
                    {event.date}
                  </span>
                </div>

                {/* Event Details Content */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-bold text-gray-800 mb-3 group-hover:text-pink-500 transition-colors duration-250 leading-tight">
                      {event.title}
                    </h4>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs text-gray-500 gap-2">
                        <Clock className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 gap-2">
                        <MapPin className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedEvent(event)}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium text-xs transition-all duration-200 shadow-md shadow-purple-100 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Register Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Premium Event Registration Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row relative animate-fade-in">
            
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 bg-black/10 hover:bg-black/20 text-gray-700 hover:text-black rounded-full p-2 transition-all z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side: Event Showcase */}
            <div className="md:w-1/2 bg-gray-50 relative flex flex-col justify-end min-h-[300px] md:min-h-0">
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              <div className="relative p-6 md:p-8 text-white z-10">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-pink-500 rounded-full inline-block mb-3">
                  Featured Workshop
                </span>
                <h3 className="text-xl md:text-2xl font-black mb-4 leading-tight">
                  {selectedEvent.title}
                </h3>
                
                <div className="space-y-2 text-xs md:text-sm text-gray-200">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-pink-400 shrink-0" />
                    <span>{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-pink-400 shrink-0" />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-pink-400 shrink-0" />
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Description and Form (Two-Step Flow) */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              
              {registeredEventId === selectedEvent.id ? (
                // Success State View
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Registration Started!</h4>
                  <p className="text-sm text-gray-600 max-w-xs mb-4">
                    We have opened the Google Form in a new tab. Your details have been pre-filled. Please verify and submit the form to finalize your registration!
                  </p>
                  <span className="text-xs text-gray-400 italic">Redirecting in a few seconds...</span>
                </div>
              ) : !isRegistering ? (
                // Step 1: Event Details & Button to Register
                <div className="flex flex-col h-full justify-between">
                  <div className="mb-6 flex-grow">
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-2">Event Description</h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-light mb-6">
                      {selectedEvent.description}
                    </p>
                    
                    <div className="bg-purple-50/50 border border-purple-100/50 rounded-2xl p-4 space-y-3">
                      <h5 className="text-xs font-bold text-purple-800 uppercase tracking-wider">Quick Details</h5>
                      <div className="flex items-center text-xs text-gray-700 gap-2">
                        <Calendar className="w-4 h-4 text-purple-600 shrink-0" />
                        <span><strong>Date:</strong> {selectedEvent.date}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-700 gap-2">
                        <Clock className="w-4 h-4 text-purple-600 shrink-0" />
                        <span><strong>Time:</strong> {selectedEvent.time}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-700 gap-2">
                        <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
                        <span><strong>Location:</strong> {selectedEvent.location}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsRegistering(true)}
                    className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold text-xs transition-all duration-200 shadow-md shadow-purple-200 cursor-pointer text-center flex items-center justify-center gap-2"
                  >
                    <span>Register for this Event</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                // Step 2: Form & Button to Google Form
                <div className="flex flex-col h-full justify-between">
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-2">
                      <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                        Secure Your Spot
                      </h4>
                      <button 
                        type="button" 
                        onClick={() => setIsRegistering(false)}
                        className="text-xs font-semibold text-purple-600 hover:text-purple-700"
                      >
                        Back to Details
                      </button>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="9876543210"
                        className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold text-xs transition-all duration-200 shadow-md shadow-purple-200 cursor-pointer text-center"
                    >
                      Confirm & Redirect to Google Form
                    </button>
                  </form>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
