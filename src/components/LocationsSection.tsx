import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Car,
  Calendar,
  ArrowRight,
  Search,
  Crosshair,
  Building2,
  Navigation,
} from 'lucide-react';
import { CLINIC_LOCATIONS, PRACTICE_CONFIG } from '../data/orthoData';
import { ClinicLocation } from '../types';

interface LocationsSectionProps {
  onBookAtLocation: (locationId: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({
  onBookAtLocation,
}) => {
  const [selectedLocationId, setSelectedLocationId] = useState<string>(
    CLINIC_LOCATIONS[0].id
  );
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = CLINIC_LOCATIONS.filter((loc) => {
    const q = searchQuery.toLowerCase();
    return (
      loc.name.toLowerCase().includes(q) ||
      loc.address.toLowerCase().includes(q) ||
      loc.city.toLowerCase().includes(q) ||
      loc.tag.toLowerCase().includes(q)
    );
  });

  const activeLocation =
    CLINIC_LOCATIONS.find((l) => l.id === selectedLocationId) ||
    CLINIC_LOCATIONS[0];

  return (
    <section id="locations" className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#171715]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#A95B30]">
            Convenient Practices
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171715] mt-2">
            Find the FORME studio nearest you.
          </h2>
          <p className="text-base text-[#777771] mt-3 max-w-2xl leading-relaxed">
            Thoughtfully designed orthodontic environments equipped with 3D digital scanners, serene private consultation suites, and dedicated parking.
          </p>
        </div>

        {/* 2-Column Location Finder Layout (Inspired by Reference Image 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Search & Location Cards List (Cols 1-6) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Search Input Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#777771] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by neighborhood, city, or address..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#F8F6F1] border border-black/10 text-sm text-[#171715] placeholder-[#777771]/60 focus:outline-hidden focus:ring-2 focus:ring-[#A95B30]/30 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#777771] hover:text-[#171715]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Helper Button */}
            <div className="flex items-center justify-between text-xs text-[#777771] px-1">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLocationId(CLINIC_LOCATIONS[0].id);
                }}
                className="inline-flex items-center gap-1.5 font-medium hover:text-[#171715] cursor-pointer"
              >
                <Crosshair className="w-3.5 h-3.5 text-[#A95B30]" />
                <span>Use current location (San Francisco Bay Area)</span>
              </button>
              <span className="font-semibold text-[#171715]">
                {filteredLocations.length} Locations
              </span>
            </div>

            {/* Scrollable Locations Cards */}
            <div className="space-y-4 max-h-[640px] overflow-y-auto pr-1">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((loc) => {
                  const isSelected = selectedLocationId === loc.id;
                  return (
                    <div
                      key={loc.id}
                      onClick={() => setSelectedLocationId(loc.id)}
                      className={`p-6 rounded-3xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#FAF9F6] border-[#A95B30] shadow-md ring-1 ring-[#A95B30]/20'
                          : 'bg-white border-black/8 hover:border-black/20 shadow-xs'
                      }`}
                    >
                      {/* Top Header of Card */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'bg-[#A95B30] text-white'
                                : 'bg-[#F8F6F1] text-[#171715]'
                            }`}
                          >
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#A95B30] block">
                              {loc.tag}
                            </span>
                            <h3 className="font-serif-display text-xl sm:text-2xl font-normal text-[#171715]">
                              {loc.name}
                            </h3>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="text-[11px] font-semibold text-emerald-800 bg-[#D5E5D5]/60 px-2.5 py-0.5 rounded-full">
                            Selected
                          </span>
                        )}
                      </div>

                      {/* Address & Phone */}
                      <div className="mt-4 pt-4 border-t border-black/5 space-y-2 text-xs sm:text-sm text-[#777771]">
                        <div className="flex items-start gap-2.5">
                          <MapPin className="w-4 h-4 text-[#A95B30] shrink-0 mt-0.5" />
                          <span>
                            {loc.address}, {loc.city}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Phone className="w-4 h-4 text-[#A95B30] shrink-0" />
                          <a
                            href={`tel:${loc.phone}`}
                            className="font-medium text-[#171715] hover:text-[#A95B30] transition-colors"
                          >
                            {loc.phone}
                          </a>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Clock className="w-4 h-4 text-[#777771] shrink-0 mt-0.5" />
                          <span>{loc.hours.weekdays}</span>
                        </div>
                      </div>

                      {/* Card Action Buttons (Directly inspired by Reference 2 soft green button) */}
                      <div className="mt-5 pt-3 flex items-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onBookAtLocation(loc.id);
                          }}
                          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-[#D5E5D5] text-[#171715] hover:bg-[#C4D9C4] transition-colors cursor-pointer shadow-xs"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book an Appointment</span>
                        </button>

                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(
                            loc.address + ', ' + loc.city
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-10 h-10 rounded-xl bg-[#F8F6F1] border border-black/5 hover:bg-black/5 flex items-center justify-center text-[#171715] shrink-0 transition-colors"
                          aria-label={`Get directions to ${loc.name}`}
                        >
                          <Navigation className="w-4 h-4 text-[#171715]" />
                        </a>
                      </div>

                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center bg-[#F8F6F1] rounded-3xl border border-black/5 text-[#777771]">
                  <p className="text-sm font-medium">No locations match your search query.</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-2 text-xs font-semibold text-[#A95B30] underline"
                  >
                    View all studios
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Interactive Styled Map (Cols 7-12) */}
          <div className="lg:col-span-6 sticky top-24">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-3xl overflow-hidden border border-[#171715]/10 shadow-lg bg-[#E5ECE9]">
              
              {/* Stylized Bay Area / Coastal Map Vector Canvas */}
              <svg
                className="w-full h-full object-cover"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {/* Water background */}
                <rect width="100" height="100" fill="#DFE8E4" />
                
                {/* Landmass shapes (Stylized peninsula and coast) */}
                <path
                  d="M 0,0 L 55,0 C 58,25 45,35 48,55 C 52,70 70,85 85,100 L 0,100 Z"
                  fill="#F3EFEA"
                  stroke="#D3CDC4"
                  strokeWidth="0.5"
                />
                
                {/* East bay / Marin landmass hint */}
                <path
                  d="M 68,0 C 72,18 78,28 100,32 L 100,0 Z"
                  fill="#EFEAE3"
                  stroke="#D3CDC4"
                  strokeWidth="0.5"
                />
                <path
                  d="M 80,45 C 75,55 72,70 100,85 L 100,45 Z"
                  fill="#EFEAE3"
                  stroke="#D3CDC4"
                  strokeWidth="0.5"
                />

                {/* Major transit / highway corridors */}
                <path d="M 38,15 L 42,45 L 62,75 L 75,95" stroke="#E0D6C8" strokeWidth="1.2" fill="none" />
                <path d="M 20,40 L 40,44 L 80,45" stroke="#E0D6C8" strokeWidth="1" strokeDasharray="1 1" fill="none" />

                {/* City name text marks on map */}
                <text x="18" y="22" fill="#99958C" fontSize="3" fontWeight="bold" letterSpacing="0.2">
                  SAN FRANCISCO
                </text>
                <text x="56" y="68" fill="#99958C" fontSize="2.8" fontWeight="bold" letterSpacing="0.2">
                  PALO ALTO
                </text>
                <text x="68" y="24" fill="#99958C" fontSize="2.8" fontWeight="bold" letterSpacing="0.2">
                  OAKLAND
                </text>
              </svg>

              {/* Interactive Pins for each Location */}
              {CLINIC_LOCATIONS.map((loc) => {
                const isSelected = selectedLocationId === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocationId(loc.id)}
                    style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-full group transition-all duration-300 cursor-pointer focus:outline-hidden ${
                      isSelected ? 'z-20 scale-125' : 'z-10 hover:scale-110'
                    }`}
                    aria-label={`Select ${loc.name} on map`}
                  >
                    {/* Pin Bubble */}
                    <div
                      className={`relative flex items-center justify-center p-2 rounded-full shadow-lg border-2 ${
                        isSelected
                          ? 'bg-[#171715] text-white border-white ring-4 ring-[#A95B30]/30'
                          : 'bg-white text-[#171715] border-[#171715]/20 hover:bg-[#FAF9F6]'
                      }`}
                    >
                      <MapPin className={`w-4 h-4 ${isSelected ? 'text-[#D5E5D5]' : 'text-[#A95B30]'}`} />
                    </div>
                    {/* Pulsing indicator beneath pin */}
                    {isSelected && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#171715] animate-ping" />
                    )}
                  </button>
                );
              })}

              {/* Floating Active Location Card Over Map */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-black/10 shadow-lg flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#A95B30] block">
                    {activeLocation.tag}
                  </span>
                  <h4 className="font-serif-display text-base sm:text-lg font-medium text-[#171715] truncate">
                    {activeLocation.name}
                  </h4>
                  <p className="text-xs text-[#777771] truncate">
                    {activeLocation.address}, {activeLocation.city}
                  </p>
                </div>

                <button
                  onClick={() => onBookAtLocation(activeLocation.id)}
                  className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#171715] text-white hover:bg-[#2A2A26] transition-colors cursor-pointer"
                >
                  <span>Select Studio</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Map Controls Simulation */}
              <div className="absolute top-4 right-4 flex flex-col gap-1 shadow-sm">
                <button
                  aria-label="Zoom in"
                  className="w-8 h-8 rounded-t-lg bg-white border border-black/10 flex items-center justify-center text-sm font-bold text-[#171715] hover:bg-[#FAF9F6]"
                >
                  +
                </button>
                <button
                  aria-label="Zoom out"
                  className="w-8 h-8 rounded-b-lg bg-white border-x border-b border-black/10 flex items-center justify-center text-sm font-bold text-[#171715] hover:bg-[#FAF9F6]"
                >
                  −
                </button>
              </div>

              {/* Mapbox Style Attribution */}
              <div className="absolute bottom-1 left-2 text-[9px] text-[#777771]/60 font-mono">
                Map View · FORME Digital Locator
              </div>

            </div>

            {/* Parking & Accessibility Details for Selected Location */}
            <div className="mt-4 p-4 rounded-2xl bg-[#F8F6F1] border border-black/5 flex items-start gap-3 text-xs text-[#777771]">
              <Car className="w-4 h-4 text-[#A95B30] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#171715] block">
                  Arrival & Accessibility:
                </span>
                <p className="mt-0.5 leading-relaxed">{activeLocation.parkingInfo}</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
