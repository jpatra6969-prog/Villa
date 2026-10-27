"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { HOTEL_SUITES, BOOKING_ADD_ONS } from "@/data/hotelData";

// Data Types
type BookingStatus = "checked-in" | "vip-arriving" | "confirmed" | "pending" | "completed" | "cancelled";
type PaymentStatus = "paid" | "partial" | "pending";

interface Reservation {
  id: string;
  guestName: string;
  guestEmail: string;
  phone: string;
  vipTier: string;
  suiteId: string;
  suiteName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  status: BookingStatus;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  specialRequests: string;
  assignedButler: string;
  arrivalMethod: string;
  addons: string[];
}

interface SuiteState {
  id: string;
  name: string;
  category: string;
  pricePerNight: number;
  status: "occupied" | "reserved" | "available" | "turnover";
  currentGuest?: string;
  turnoverNotes?: string;
}

interface ConciergeDispatch {
  id: string;
  serviceName: string;
  category: "yacht" | "heli" | "dining" | "spa";
  scheduledTime: string;
  guestName: string;
  suiteName: string;
  status: "confirmed" | "in-progress" | "scheduled";
  specialNotes: string;
}

// Initial Mock Data
const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: "AS-2026-9401",
    guestName: "Vikramaditya & Radhika Singhania",
    guestEmail: "vikram.singhania@singhaniagroup.in",
    phone: "+91 22 6678 9001",
    vipTier: "VIP Sovereign • Full Buyout",
    suiteId: "grand-villa",
    suiteName: "The Grand Sunset Villa (Full Estate)",
    checkIn: "2026-10-25",
    checkOut: "2026-10-31",
    nights: 6,
    guests: 8,
    status: "checked-in",
    totalAmount: 34200,
    paymentStatus: "paid",
    specialRequests: "AgustaWestland helipad arrival completed. Dom Pérignon 2008 vintage chilled. Clifftop degustation Tuesday evening.",
    assignedButler: "Raghav Sharma",
    arrivalMethod: "Helicopter (Private Helipad)",
    addons: ["Private Riva DolceVita Yacht Charter", "In-Villa Michelin 7-Course Degustation", "Helicopter Direct Hub Transfer"],
  },
  {
    id: "AS-2026-9402",
    guestName: "Ananya Birla & Kabir Kapoor",
    guestEmail: "ananya.birla@birlacapital.in",
    phone: "+91 98 2001 4455",
    vipTier: "VIP Tier 1",
    suiteId: "ocean-penthouse",
    suiteName: "The Panoramic Ocean Penthouse",
    checkIn: "2026-10-27",
    checkOut: "2026-10-30",
    nights: 3,
    guests: 2,
    status: "vip-arriving",
    totalAmount: 9850,
    paymentStatus: "paid",
    specialRequests: "Riva DolceVita yacht sunset charter booked for Oct 28. Temperature strictly set to 21°C.",
    assignedButler: "Aditya Varma",
    arrivalMethod: "Riva Aquarama Boat Transfer",
    addons: ["Private Riva DolceVita Yacht Charter", "Royal Osetra Caviar & Vintage Krug Greeting"],
  },
  {
    id: "AS-2026-9403",
    guestName: "Dr. Arvind & Sunita Mehrotra",
    guestEmail: "arvind.mehrotra@apollopharm.in",
    phone: "+91 11 4155 8820",
    vipTier: "VIP Guest",
    suiteId: "calacatta-spa",
    suiteName: "The Calacatta Marble Spa Residence",
    checkIn: "2026-10-28",
    checkOut: "2026-11-02",
    nights: 5,
    guests: 2,
    status: "confirmed",
    totalAmount: 10870,
    paymentStatus: "paid",
    specialRequests: "Daily couple thalassotherapy rituals. Strictly dairy-free and satvik dietary requirements.",
    assignedButler: "Pooja Deshmukh",
    arrivalMethod: "Mercedes Maybach Chauffeur",
    addons: ["Moonlight Thalasso & Amber Massage"],
  },
  {
    id: "AS-2026-9404",
    guestName: "Rajesh & Meera Ambani",
    guestEmail: "rajesh.ambani@reliancefamily.in",
    phone: "+91 22 2288 7700",
    vipTier: "VIP Tier 1",
    suiteId: "emerald-suite",
    suiteName: "The Emerald Dining & Living Suite",
    checkIn: "2026-10-29",
    checkOut: "2026-11-03",
    nights: 5,
    guests: 2,
    status: "confirmed",
    totalAmount: 9150,
    paymentStatus: "paid",
    specialRequests: "Sommelier cellar vertical tasting of rare reserves with Rohit Varma. Early check-in requested at 11:30.",
    assignedButler: "Raghav Sharma",
    arrivalMethod: "Mercedes Maybach Chauffeur",
    addons: ["In-Villa Michelin 7-Course Degustation"],
  },
  {
    id: "AS-2026-9405",
    guestName: "Maharani Gayatri Devi & Family",
    guestEmail: "gayatri.devi@heritageestates.in",
    phone: "+91 14 1238 5500",
    vipTier: "VIP Sovereign • Full Buyout",
    suiteId: "grand-villa",
    suiteName: "The Grand Sunset Villa (Full Estate)",
    checkIn: "2026-11-05",
    checkOut: "2026-11-12",
    nights: 7,
    guests: 10,
    status: "pending",
    totalAmount: 42600,
    paymentStatus: "partial",
    specialRequests: "Advance deposit confirmed; remaining balance due upon check-in. Private security escort clearance verified.",
    assignedButler: "Aditya Varma",
    arrivalMethod: "Helicopter (Private Helipad)",
    addons: ["Private Riva DolceVita Yacht Charter", "In-Villa Michelin 7-Course Degustation", "Helicopter Direct Hub Transfer"],
  },
  {
    id: "AS-2026-9406",
    guestName: "Devendra & Ishita Mittal",
    guestEmail: "devendra.mittal@mittalinvest.in",
    phone: "+91 80 4122 3344",
    vipTier: "Repeat Guest",
    suiteId: "ocean-penthouse",
    suiteName: "The Panoramic Ocean Penthouse",
    checkIn: "2026-10-20",
    checkOut: "2026-10-24",
    nights: 4,
    guests: 2,
    status: "completed",
    totalAmount: 11450,
    paymentStatus: "paid",
    specialRequests: "Rated stay 10/10. Re-booking requested for Diwali Season 2027.",
    assignedButler: "Raghav Sharma",
    arrivalMethod: "Mercedes Maybach Chauffeur",
    addons: ["Moonlight Thalasso & Amber Massage"],
  },
];

const INITIAL_SUITES: SuiteState[] = [
  {
    id: "grand-villa",
    name: "The Grand Sunset Villa (Full Estate)",
    category: "Full Estate Buyout",
    pricePerNight: 4800,
    status: "occupied",
    currentGuest: "Vikramaditya & Radhika Singhania",
    turnoverNotes: "Exclusive estate buyout active through Oct 31.",
  },
  {
    id: "ocean-penthouse",
    name: "The Panoramic Ocean Penthouse",
    category: "Penthouse Suite",
    pricePerNight: 2200,
    status: "reserved",
    currentGuest: "Ananya Birla (Arriving Oct 27)",
    turnoverNotes: "Housekeeping pre-arrival inspection complete.",
  },
  {
    id: "calacatta-spa",
    name: "The Calacatta Marble Spa Residence",
    category: "Wellness Residence",
    pricePerNight: 1750,
    status: "turnover",
    currentGuest: "Available for check-in Oct 28",
    turnoverNotes: "Diptyque aromatics restock in progress.",
  },
  {
    id: "emerald-suite",
    name: "The Emerald Dining & Living Suite",
    category: "Culinary Salon",
    pricePerNight: 1450,
    status: "available",
    currentGuest: "Next arrival Oct 29",
    turnoverNotes: "Cellar inventory sanitized & ready.",
  },
];

const CONCIERGE_DISPATCHES: ConciergeDispatch[] = [
  {
    id: "CD-101",
    serviceName: "Helicopter Transfer (Naples NAP → Sanctuary Helipad)",
    category: "heli",
    scheduledTime: "Tomorrow, 14:00 CEST",
    guestName: "Ananya Birla",
    suiteName: "Panoramic Ocean Penthouse",
    status: "scheduled",
    specialNotes: "Flight route approved by maritime aviation authority. Luggage transfer pre-arranged.",
  },
  {
    id: "CD-102",
    serviceName: "Private Riva DolceVita Yacht Sunset Navigation",
    category: "yacht",
    scheduledTime: "Oct 28, 16:30 CEST",
    guestName: "Vikramaditya & Radhika Singhania",
    suiteName: "Grand Sunset Villa Buyout",
    status: "confirmed",
    specialNotes: "Captain Devraj Chauhan on duty. Vintage Krug & raw seafood crudo on board.",
  },
  {
    id: "CD-103",
    serviceName: "In-Villa Michelin 7-Course Degustation",
    category: "dining",
    scheduledTime: "Tonight, 20:00 CEST",
    guestName: "Vikramaditya & Radhika Singhania",
    suiteName: "Clifftop Terrace Pavilion",
    status: "in-progress",
    specialNotes: "Executive Chef Sanjeev Oberoi preparing local sea bass with volcanic citrus reduction.",
  },
  {
    id: "CD-104",
    serviceName: "Moonlight Thalassotherapy & Amber Massage",
    category: "spa",
    scheduledTime: "Oct 29, 17:00 CEST",
    guestName: "Dr. Arvind & Sunita Mehrotra",
    suiteName: "Calacatta Spa Residence",
    status: "scheduled",
    specialNotes: "Essential oils warmed; hydrotherapy pool set to 36.5°C.",
  },
];

const STAFF_ENSEMBLE = [
  {
    name: "Raghav Sharma",
    role: "Head In-Villa Butler",
    assignment: "The Grand Sunset Villa (Full Estate)",
    status: "On Active Shift",
    experience: "14 Years Luxury Butler Direction (Taj Exotica, Aman)",
  },
  {
    name: "Chef Sanjeev Oberoi",
    role: "Executive Culinary Director (3 Michelin Stars)",
    assignment: "L'Orizzonte & Private In-Villa Degustations",
    status: "Service Active",
    experience: "18 Years Master Gastronomy Direction",
  },
  {
    name: "Aditya Varma",
    role: "Senior Guest Experience Butler",
    assignment: "The Panoramic Ocean Penthouse",
    status: "On Standby",
    experience: "9 Years Luxury Hospitality (The Oberoi, Umaid Bhawan)",
  },
  {
    name: "Captain Devraj Chauhan",
    role: "Master Marine Officer & Riva Skipper",
    assignment: "Riva DolceVita Private Charters",
    status: "Vessel Prepared",
    experience: "16 Years High-Sea Marine Navigation",
  },
  {
    name: "Pooja Deshmukh",
    role: "Head of Housekeeping & Estate Wellness Host",
    assignment: "Calacatta Spa & Overall Sanctuary",
    status: "Inspection Rounds",
    experience: "11 Years Luxury Hospitality & Spa Management",
  },
];

export default function AdminPage() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<"overview" | "reservations" | "suites" | "concierge" | "staff">(
    "overview"
  );

  // Reservations Data State
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [suites, setSuites] = useState<SuiteState[]>(INITIAL_SUITES);
  const [dispatches, setDispatches] = useState<ConciergeDispatch[]>(CONCIERGE_DISPATCHES);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modals & Slide-overs
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Booking Form State
  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestEmail, setNewGuestEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newSuiteId, setNewSuiteId] = useState(HOTEL_SUITES[0].id);
  const [newCheckIn, setNewCheckIn] = useState("2026-11-15");
  const [newCheckOut, setNewCheckOut] = useState("2026-11-20");
  const [newGuests, setNewGuests] = useState(2);
  const [newVipTier, setNewVipTier] = useState("VIP Guest");
  const [newRequests, setNewRequests] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered reservations
  const filteredReservations = useMemo(() => {
    return reservations.filter((res) => {
      const matchesSearch =
        res.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.suiteName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || res.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [reservations, searchQuery, statusFilter]);

  // Financial & Metric Calculations
  const metrics = useMemo(() => {
    const totalRevenue = reservations.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const activeCheckedIn = reservations.filter((r) => r.status === "checked-in").length;
    const pendingDeposits = reservations.filter((r) => r.paymentStatus !== "paid").length;
    const occupiedSuites = suites.filter((s) => s.status === "occupied").length;
    const occupancyRate = ((occupiedSuites / suites.length) * 100).toFixed(0);

    return {
      totalRevenue,
      activeCheckedIn,
      pendingDeposits,
      occupancyRate,
      adr: 3890,
    };
  }, [reservations, suites]);

  // Handle Status Update for Reservation
  const handleUpdateStatus = (id: string, newStatus: BookingStatus) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    if (selectedReservation && selectedReservation.id === id) {
      setSelectedReservation((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    showToast(`Reservation ${id} updated to ${newStatus.toUpperCase()}`);
  };

  // Handle Suite Status Toggle
  const handleToggleSuiteStatus = (suiteId: string) => {
    const statusCycle: SuiteState["status"][] = ["occupied", "reserved", "turnover", "available"];
    setSuites((prev) =>
      prev.map((s) => {
        if (s.id === suiteId) {
          const nextIdx = (statusCycle.indexOf(s.status) + 1) % statusCycle.length;
          return { ...s, status: statusCycle[nextIdx] };
        }
        return s;
      })
    );
    showToast("Suite operational status updated");
  };

  // Handle Concierge Dispatch Toggle
  const handleToggleDispatchStatus = (dispatchId: string) => {
    setDispatches((prev) =>
      prev.map((d) => {
        if (d.id === dispatchId) {
          const nextStatus = d.status === "scheduled" ? "in-progress" : d.status === "in-progress" ? "confirmed" : "scheduled";
          return { ...d, status: nextStatus };
        }
        return d;
      })
    );
    showToast("Concierge dispatch status updated");
  };

  // Submit New Booking
  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const suite = HOTEL_SUITES.find((s) => s.id === newSuiteId) || HOTEL_SUITES[0];
    const nights = 5;
    const totalAmount = suite.pricePerNight * nights;

    const newRes: Reservation = {
      id: `AS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName: newGuestName || "Distinguished Guest",
      guestEmail: newGuestEmail || "guest@private.com",
      phone: newPhone || "+39 081 000 0000",
      vipTier: newVipTier,
      suiteId: suite.id,
      suiteName: suite.name,
      checkIn: newCheckIn,
      checkOut: newCheckOut,
      nights,
      guests: newGuests,
      status: "confirmed",
      totalAmount,
      paymentStatus: "paid",
      specialRequests: newRequests || "Private welcome amenity requested.",
      assignedButler: "Raghav Sharma",
      arrivalMethod: "Mercedes Maybach Chauffeur",
      addons: ["Royal Osetra Caviar & Vintage Krug Greeting"],
    };

    setReservations([newRes, ...reservations]);
    setIsNewBookingModalOpen(false);
    // Reset Form
    setNewGuestName("");
    setNewGuestEmail("");
    setNewPhone("");
    setNewRequests("");
    showToast(`New reservation created for ${newRes.guestName}`);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = "Booking ID,Guest Name,Suite,Check-In,Check-Out,Nights,Total Amount,Status,Payment\n";
    const rows = reservations
      .map(
        (r) =>
          `"${r.id}","${r.guestName}","${r.suiteName}","${r.checkIn}","${r.checkOut}",${r.nights},${r.totalAmount},"${r.status}","${r.paymentStatus}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Aura_Sanctuary_Bookings_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    showToast("Bookings ledger CSV generated and downloaded");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#14213D] text-[#FAF8F5] px-5 py-3 rounded-xl shadow-xl border border-white/10 text-xs font-semibold uppercase tracking-[0.08em] flex items-center gap-3 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#B8923A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Architectural Management Header */}
      <header className="bg-[#14213D] text-white border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Brand Identity */}
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#B8923A] text-[#14213D] flex items-center justify-center font-bold text-sm tracking-wider">
              AS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-[0.14em] uppercase text-white">
                  Aura Sanctuary
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] px-2 py-0.5 rounded bg-[#B8923A]/20 border border-[#B8923A]/40 text-[#B8923A]">
                  Estate Console
                </span>
              </div>
              <div className="text-[11px] text-zinc-300">
                Capri Peninsula, Italy • Forbes 5-Star Private Sanctuary
              </div>
            </div>
          </div>

          {/* Right Status & Public Link */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs">
            {/* Live Operational Status */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" />
              <span className="text-zinc-200">
                Estate Status: <strong className="text-white">Active Buyout</strong>
              </span>
            </div>

            {/* Link to public guest site */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors py-1 px-3 rounded-lg hover:bg-white/5 border border-white/10"
            >
              <span>Public Estate View</span>
              <span className="text-[#B8923A]">↗</span>
            </Link>

            {/* Estate Director User Badge */}
            <div className="flex items-center gap-2 pl-3 border-l border-white/15">
              <div className="w-7 h-7 rounded-full bg-[#B8923A] text-[#14213D] flex items-center justify-center font-bold text-xs">
                AM
              </div>
              <div className="hidden lg:block text-left">
                <div className="font-semibold text-white leading-tight">Arjun Mehra</div>
                <div className="text-[10px] text-zinc-300">Estate Director</div>
              </div>
            </div>
          </div>
        </div>

        {/* Console Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 border-t border-white/10 flex items-center justify-between overflow-x-auto scrollbar-none">
          <nav className="flex items-center gap-1 sm:gap-2 py-2">
            {[
              { id: "overview", label: "Executive Overview" },
              { id: "reservations", label: `Reservations (${reservations.length})` },
              { id: "suites", label: "Suites & Inventory" },
              { id: "concierge", label: `Concierge Dispatch (${dispatches.length})` },
              { id: "staff", label: "Butler Ensemble" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-[0.06em] whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-[#B8923A] text-white shadow-sm"
                      : "text-zinc-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Create Reservation CTA */}
          <div className="hidden sm:flex items-center gap-2 py-2">
            <button
              onClick={() => setIsNewBookingModalOpen(true)}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-[0.08em] uppercase transition-colors flex items-center gap-1.5"
            >
              <span>+</span>
              <span>New Reservation</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Console Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-10">
        {/* ============================================================== */}
        {/* TAB 1: EXECUTIVE OVERVIEW */}
        {/* ============================================================== */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fade-in">
            {/* Header intro */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E7E2DA]">
              <div>
                <div className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#B8923A] mb-1">
                  <span className="w-5 h-px bg-[#B8923A]" />
                  <span>Real-Time Estate Operations</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-[#1C1917] tracking-tight">
                  Executive Sanctuary Dashboard
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-2 rounded-lg bg-white border border-[#E7E2DA] hover:border-[#B8923A] text-xs font-semibold tracking-[0.06em] text-[#1C1917] transition-colors"
                >
                  Export Ledger (CSV)
                </button>
                <button
                  onClick={() => setIsNewBookingModalOpen(true)}
                  className="gold-button px-4 py-2 rounded-lg text-xs font-semibold tracking-[0.08em] uppercase"
                >
                  + Add Reservation
                </button>
              </div>
            </div>

            {/* 4 Precision Operational KPIs */}
            <div className="bg-white rounded-2xl border border-[#E7E2DA] shadow-sm divide-y sm:divide-y-0 sm:divide-x divide-[#E7E2DA] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden">
              <div className="p-6 sm:p-7">
                <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#57534E] block mb-2">
                  01 / Gross Booked Revenue
                </span>
                <div className="text-3xl font-bold text-[#1C1917] tabular-nums tracking-tight">
                  €{metrics.totalRevenue.toLocaleString()}
                </div>
                <div className="text-xs text-[#15803D] font-medium mt-1 flex items-center gap-1">
                  <span>↑ 18.4%</span>
                  <span className="text-[#57534E]">vs previous season</span>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#57534E] block mb-2">
                  02 / Current Occupancy
                </span>
                <div className="text-3xl font-bold text-[#1C1917] tabular-nums tracking-tight">
                  {metrics.occupancyRate}%
                </div>
                <div className="text-xs text-[#1C1917] font-medium mt-1">
                  Full Estate Buyout Active
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#57534E] block mb-2">
                  03 / Average Daily Rate (ADR)
                </span>
                <div className="text-3xl font-bold text-[#1C1917] tabular-nums tracking-tight">
                  €{metrics.adr.toLocaleString()}
                </div>
                <div className="text-xs text-[#57534E] mt-1">
                  RevPAR: <strong className="text-[#1C1917]">€3,664</strong>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#57534E] block mb-2">
                  04 / Active Butler Ensembles
                </span>
                <div className="text-3xl font-bold text-[#1C1917] tabular-nums tracking-tight">
                  5 Staff
                </div>
                <div className="text-xs text-[#15803D] font-medium mt-1">
                  100% Shift Coverage
                </div>
              </div>
            </div>

            {/* Split Grid: Live In-House VIPs & Upcoming Arrivals */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Live In-House VIPs & Today's Schedule */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white rounded-2xl border border-[#E7E2DA] p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E7E2DA]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                      <h3 className="text-base font-semibold text-[#1C1917] tracking-tight">
                        In-House VIP Guests &amp; Buyout Parties
                      </h3>
                    </div>
                    <span className="text-xs text-[#57534E] font-medium">
                      {reservations.filter((r) => r.status === "checked-in").length} Active Suites
                    </span>
                  </div>

                  <div className="space-y-4">
                    {reservations
                      .filter((r) => r.status === "checked-in" || r.status === "vip-arriving")
                      .map((res) => (
                        <div
                          key={res.id}
                          onClick={() => setSelectedReservation(res)}
                          className="p-4 rounded-xl border border-[#E7E2DA] hover:border-[#B8923A] bg-[#FAF8F5]/50 hover:bg-[#FAF8F5] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-[#1C1917] group-hover:text-[#B8923A] transition-colors">
                                {res.guestName}
                              </span>
                              <span
                                className={`text-[10px] font-semibold uppercase tracking-[0.06em] px-2 py-0.5 rounded ${
                                  res.status === "checked-in"
                                    ? "bg-[#15803D]/10 text-[#15803D] border border-[#15803D]/30"
                                    : "bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/30"
                                }`}
                              >
                                {res.status === "checked-in" ? "In Residence" : "Arriving Today"}
                              </span>
                            </div>
                            <div className="text-xs text-[#57534E] mt-1">
                              {res.suiteName} • {res.nights} Nights • Assigned to: {res.assignedButler}
                            </div>
                          </div>

                          <div className="text-left sm:text-right">
                            <div className="text-sm font-bold text-[#1C1917] tabular-nums">
                              €{res.totalAmount.toLocaleString()}
                            </div>
                            <div className="text-[11px] text-[#B8923A] font-semibold">
                              Inspect Dossier →
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Live Suite Status Quick Ribbon */}
                <div className="bg-white rounded-2xl border border-[#E7E2DA] p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E7E2DA]">
                    <h3 className="text-base font-semibold text-[#1C1917] tracking-tight">
                      Suite Operations Status
                    </h3>
                    <button
                      onClick={() => setActiveTab("suites")}
                      className="text-xs font-semibold text-[#B8923A] hover:underline"
                    >
                      Manage Suites &amp; Rates →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {suites.map((suite) => (
                      <div
                        key={suite.id}
                        className="p-4 rounded-xl border border-[#E7E2DA] flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-xs font-semibold text-[#1C1917] leading-tight">
                              {suite.name}
                            </div>
                            <div className="text-[11px] text-[#57534E] mt-0.5">
                              {suite.category}
                            </div>
                          </div>
                          <span
                            className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                              suite.status === "occupied"
                                ? "bg-[#15803D]/10 text-[#15803D] border border-[#15803D]/30"
                                : suite.status === "reserved"
                                ? "bg-[#14213D]/10 text-[#14213D] border border-[#14213D]/30"
                                : suite.status === "turnover"
                                ? "bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/30"
                                : "bg-zinc-100 text-[#57534E] border border-zinc-200"
                            }`}
                          >
                            {suite.status}
                          </span>
                        </div>
                        <div className="mt-3 pt-2 border-t border-[#E7E2DA] flex items-center justify-between text-xs">
                          <span className="text-[#57534E]">Rate: €{suite.pricePerNight}/nt</span>
                          <button
                            onClick={() => handleToggleSuiteStatus(suite.id)}
                            className="text-[11px] font-semibold text-[#B8923A] hover:underline"
                          >
                            Change Status
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Concierge Dispatches & VIP Logistics */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-2xl border border-[#E7E2DA] p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E7E2DA]">
                    <h3 className="text-base font-semibold text-[#1C1917] tracking-tight">
                      Concierge Dispatches
                    </h3>
                    <button
                      onClick={() => setActiveTab("concierge")}
                      className="text-xs font-semibold text-[#B8923A] hover:underline"
                    >
                      View All ({dispatches.length}) →
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    {dispatches.map((disp) => (
                      <div
                        key={disp.id}
                        className="p-3.5 rounded-xl border border-[#E7E2DA] bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#B8923A]">
                            {disp.category.toUpperCase()} • {disp.scheduledTime}
                          </span>
                          <span
                            className={`text-[9px] font-semibold uppercase px-2 py-0.5 rounded ${
                              disp.status === "confirmed"
                                ? "bg-[#15803D]/10 text-[#15803D]"
                                : disp.status === "in-progress"
                                ? "bg-[#D97706]/10 text-[#D97706]"
                                : "bg-zinc-100 text-[#57534E]"
                            }`}
                          >
                            {disp.status}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-[#1C1917] mt-1">
                          {disp.serviceName}
                        </div>
                        <div className="text-[11px] text-[#57534E] mt-0.5">
                          Guest: <strong className="text-[#1C1917]">{disp.guestName}</strong> ({disp.suiteName})
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Estate Quick Action Bulletin */}
                <div className="p-6 rounded-2xl bg-[#14213D] text-white">
                  <span className="text-[#B8923A] text-[10px] font-semibold tracking-[0.14em] uppercase block mb-1">
                    Directorial Directives
                  </span>
                  <h4 className="text-lg font-semibold tracking-tight text-white mb-2">
                    Peninsula Helipad Protocol
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                    AgustaWestland AW109 rotorcraft arrival authorized for 14:00 CEST. Maritime breeze is 8 knots SW; landing coordinates clear.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => showToast("Helipad landing coordinates re-verified")}
                      className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-[0.06em] transition-colors"
                    >
                      Verify Helipad Log
                    </button>
                    <button
                      onClick={() => setActiveTab("reservations")}
                      className="text-xs text-[#B8923A] hover:underline font-semibold"
                    >
                      Inspect Arrivals →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: RESERVATIONS & BUYOUTS LEDGER */}
        {/* ============================================================== */}
        {activeTab === "reservations" && (
          <div className="space-y-6 animate-fade-in">
            {/* Header with Title & Action Controls */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E7E2DA]">
              <div>
                <div className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#B8923A] mb-1">
                  <span className="w-5 h-px bg-[#B8923A]" />
                  <span>Central Guest Registry</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-[#1C1917] tracking-tight">
                  Reservations &amp; Buyouts Ledger
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-2 rounded-lg bg-white border border-[#E7E2DA] hover:border-[#B8923A] text-xs font-semibold tracking-[0.06em] text-[#1C1917] transition-colors"
                >
                  Export CSV
                </button>
                <button
                  onClick={() => setIsNewBookingModalOpen(true)}
                  className="gold-button px-4 py-2 rounded-lg text-xs font-semibold tracking-[0.08em] uppercase"
                >
                  + Create Reservation
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-[#E7E2DA] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search Box */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by guest name, reservation code, or suite..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg px-4 py-2 text-xs text-[#1C1917] placeholder-[#57534E]/60 focus:outline-none focus:border-[#B8923A]"
                />
              </div>

              {/* Status Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                {[
                  { id: "all", label: "All Bookings" },
                  { id: "checked-in", label: "In Residence" },
                  { id: "vip-arriving", label: "Arriving" },
                  { id: "confirmed", label: "Confirmed" },
                  { id: "pending", label: "Pending" },
                  { id: "completed", label: "Completed" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setStatusFilter(f.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      statusFilter === f.id
                        ? "bg-[#14213D] text-white"
                        : "bg-[#FAF8F5] text-[#57534E] hover:text-[#1C1917] border border-[#E7E2DA]"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-2xl border border-[#E7E2DA] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] text-[#57534E] font-semibold border-b border-[#E7E2DA] uppercase tracking-[0.08em] text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4 sm:px-6">Booking Ref</th>
                      <th className="py-3.5 px-4">Guest &amp; VIP Tier</th>
                      <th className="py-3.5 px-4">Suite / Buyout</th>
                      <th className="py-3.5 px-4">Dates &amp; Stay</th>
                      <th className="py-3.5 px-4">Amount</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E2DA]">
                    {filteredReservations.map((res) => (
                      <tr
                        key={res.id}
                        className="hover:bg-[#FAF8F5]/60 transition-colors cursor-pointer group"
                        onClick={() => setSelectedReservation(res)}
                      >
                        <td className="py-4 px-4 sm:px-6 font-semibold text-[#1C1917] tabular-nums">
                          {res.id}
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-semibold text-[#1C1917] group-hover:text-[#B8923A] transition-colors">
                            {res.guestName}
                          </div>
                          <div className="text-[11px] text-[#57534E]">
                            {res.vipTier}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-[#1C1917] font-medium max-w-[200px] truncate">
                          {res.suiteName}
                        </td>
                        <td className="py-4 px-4 text-[#57534E]">
                          <div>{res.checkIn} → {res.checkOut}</div>
                          <div className="text-[11px]">{res.nights} Nights • {res.guests} Guests</div>
                        </td>
                        <td className="py-4 px-4 font-bold text-[#1C1917] tabular-nums">
                          €{res.totalAmount.toLocaleString()}
                          <span className="block text-[10px] font-normal text-[#15803D]">
                            {res.paymentStatus.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full ${
                              res.status === "checked-in"
                                ? "bg-[#15803D]/10 text-[#15803D] border border-[#15803D]/30"
                                : res.status === "vip-arriving"
                                ? "bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/30"
                                : res.status === "confirmed"
                                ? "bg-[#14213D]/10 text-[#14213D] border border-[#14213D]/30"
                                : res.status === "pending"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-zinc-100 text-[#57534E]"
                            }`}
                          >
                            {res.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedReservation(res);
                            }}
                            className="px-3 py-1 rounded bg-[#FAF8F5] border border-[#E7E2DA] hover:border-[#B8923A] text-xs font-semibold text-[#1C1917]"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: SUITES & INVENTORY */}
        {/* ============================================================== */}
        {activeTab === "suites" && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E7E2DA]">
              <div>
                <div className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#B8923A] mb-1">
                  <span className="w-5 h-px bg-[#B8923A]" />
                  <span>Inventory Control</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-[#1C1917] tracking-tight">
                  Suites &amp; Estate Allocations
                </h1>
              </div>

              <div className="text-xs text-[#57534E]">
                Total Estate Capacity: <strong className="text-[#1C1917]">5 Suites / 10 Master Bedrooms</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suites.map((suite) => (
                <div
                  key={suite.id}
                  className="bg-white rounded-2xl border border-[#E7E2DA] p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-[#E7E2DA]">
                      <div>
                        <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#B8923A] block mb-1">
                          {suite.category}
                        </span>
                        <h3 className="text-lg font-semibold text-[#1C1917] tracking-tight">
                          {suite.name}
                        </h3>
                      </div>
                      <span
                        className={`text-xs font-semibold uppercase px-3 py-1 rounded-full ${
                          suite.status === "occupied"
                            ? "bg-[#15803D]/10 text-[#15803D] border border-[#15803D]/30"
                            : suite.status === "reserved"
                            ? "bg-[#14213D]/10 text-[#14213D] border border-[#14213D]/30"
                            : suite.status === "turnover"
                            ? "bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/30"
                            : "bg-zinc-100 text-[#57534E]"
                        }`}
                      >
                        {suite.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-[#57534E]">
                      <div>
                        Current Guest / Allocation:{" "}
                        <strong className="text-[#1C1917]">{suite.currentGuest || "Available"}</strong>
                      </div>
                      <div>
                        Housekeeping &amp; Operational Log:{" "}
                        <span className="text-[#1C1917]">{suite.turnoverNotes}</span>
                      </div>
                      <div>
                        Current Baseline Rate:{" "}
                        <strong className="text-[#1C1917] tabular-nums">€{suite.pricePerNight} / night</strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E7E2DA] flex items-center justify-between">
                    <button
                      onClick={() => handleToggleSuiteStatus(suite.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#E7E2DA] hover:border-[#B8923A] text-xs font-semibold text-[#1C1917] transition-colors"
                    >
                      Cycle Status: {suite.status.toUpperCase()}
                    </button>
                    <span className="text-xs text-[#B8923A] font-semibold">
                      Full Buyout Eligible
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: CONCIERGE & LOGISTICS DISPATCH */}
        {/* ============================================================== */}
        {activeTab === "concierge" && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E7E2DA]">
              <div>
                <div className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#B8923A] mb-1">
                  <span className="w-5 h-px bg-[#B8923A]" />
                  <span>Curated Experiences &amp; Transport</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-[#1C1917] tracking-tight">
                  Concierge &amp; Marine Operations Dispatch
                </h1>
              </div>

              <button
                onClick={() => showToast("Concierge dispatch log synchronized with marine authorities")}
                className="gold-button px-4 py-2 rounded-lg text-xs font-semibold tracking-[0.08em] uppercase"
              >
                Sync Flight &amp; Marine Schedules
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dispatches.map((disp) => (
                <div
                  key={disp.id}
                  className="bg-white rounded-2xl border border-[#E7E2DA] p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3 pb-3 border-b border-[#E7E2DA]">
                      <div>
                        <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#B8923A] block mb-1">
                          {disp.id} • {disp.category.toUpperCase()}
                        </span>
                        <h3 className="text-base font-semibold text-[#1C1917] tracking-tight">
                          {disp.serviceName}
                        </h3>
                      </div>
                      <span
                        className={`text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full ${
                          disp.status === "confirmed"
                            ? "bg-[#15803D]/10 text-[#15803D]"
                            : disp.status === "in-progress"
                            ? "bg-[#D97706]/10 text-[#D97706]"
                            : "bg-zinc-100 text-[#57534E]"
                        }`}
                      >
                        {disp.status}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-[#57534E]">
                      <div>Schedule: <strong className="text-[#1C1917]">{disp.scheduledTime}</strong></div>
                      <div>Guest: <strong className="text-[#1C1917]">{disp.guestName}</strong> ({disp.suiteName})</div>
                      <div className="mt-2 text-xs text-[#1C1917] bg-[#FAF8F5] p-3 rounded-lg border border-[#E7E2DA]">
                        {disp.specialNotes}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E7E2DA] flex items-center justify-between">
                    <button
                      onClick={() => handleToggleDispatchStatus(disp.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#E7E2DA] hover:border-[#B8923A] text-xs font-semibold text-[#1C1917] transition-colors"
                    >
                      Update: {disp.status.toUpperCase()}
                    </button>
                    <span className="text-[11px] text-[#57534E]">Aura Concierge Desk</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: BUTLER ENSEMBLE ROSTER */}
        {/* ============================================================== */}
        {activeTab === "staff" && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E7E2DA]">
              <div>
                <div className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#B8923A] mb-1">
                  <span className="w-5 h-px bg-[#B8923A]" />
                  <span>Dedicated Private Ensemble</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-[#1C1917] tracking-tight">
                  Butler, Culinary &amp; Marine Ensemble
                </h1>
              </div>

              <div className="text-xs text-[#57534E]">
                Ensemble Ratio: <strong className="text-[#1C1917]">5 Staff to 1 Private Party</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {STAFF_ENSEMBLE.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#E7E2DA] p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E7E2DA]">
                      <span className="w-8 h-8 rounded-full bg-[#14213D] text-[#FAF8F5] flex items-center justify-center font-bold text-xs">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                      <span className="text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-[#15803D]/10 text-[#15803D] border border-[#15803D]/30">
                        {member.status}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-[#1C1917] tracking-tight">
                      {member.name}
                    </h3>
                    <div className="text-xs font-medium text-[#B8923A] mt-0.5">
                      {member.role}
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E7E2DA] text-xs space-y-1.5 text-[#57534E]">
                      <div>Assignment: <strong className="text-[#1C1917]">{member.assignment}</strong></div>
                      <div>Pedigree: <span>{member.experience}</span></div>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#E7E2DA] text-right">
                    <button
                      onClick={() => showToast(`Direct communication channel opened with ${member.name}`)}
                      className="text-xs font-semibold text-[#14213D] hover:text-[#B8923A] transition-colors"
                    >
                      Radio Staff Member →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ============================================================== */}
      {/* MODAL 1: RESERVATION DOSSIER SLIDE-OVER / INSPECTION */}
      {/* ============================================================== */}
      {selectedReservation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl border border-[#E7E2DA] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-start justify-between pb-4 border-b border-[#E7E2DA]">
              <div>
                <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#B8923A] block mb-1">
                  Estate Reservation Dossier • {selectedReservation.id}
                </span>
                <h2 className="text-xl sm:text-2xl font-semibold text-[#1C1917] tracking-tight">
                  {selectedReservation.guestName}
                </h2>
                <div className="text-xs text-[#57534E] mt-0.5">
                  {selectedReservation.vipTier}
                </div>
              </div>
              <button
                onClick={() => setSelectedReservation(null)}
                className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E7E2DA] text-[#1C1917] font-bold text-sm hover:bg-zinc-200 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Dossier Content */}
            <div className="py-6 space-y-6 text-xs text-[#57534E]">
              {/* Core Information Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[#FAF8F5] border border-[#E7E2DA]">
                <div>
                  <span className="block text-[10px] uppercase font-semibold text-[#57534E]">Suite / Buyout</span>
                  <span className="text-sm font-semibold text-[#1C1917]">{selectedReservation.suiteName}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-semibold text-[#57534E]">Dates</span>
                  <span className="text-sm font-semibold text-[#1C1917]">
                    {selectedReservation.checkIn} → {selectedReservation.checkOut}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-semibold text-[#57534E]">Party Size</span>
                  <span className="text-sm font-semibold text-[#1C1917]">
                    {selectedReservation.guests} Guests ({selectedReservation.nights} Nights)
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-semibold text-[#57534E]">Direct Email</span>
                  <span className="text-sm font-semibold text-[#1C1917] truncate block">{selectedReservation.guestEmail}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-semibold text-[#57534E]">Phone</span>
                  <span className="text-sm font-semibold text-[#1C1917]">{selectedReservation.phone}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-semibold text-[#57534E]">Arrival Logistics</span>
                  <span className="text-sm font-semibold text-[#1C1917]">{selectedReservation.arrivalMethod}</span>
                </div>
              </div>

              {/* Special Requests & Logistics Notes */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.08em] font-semibold text-[#1C1917] mb-2">
                  Special Butler &amp; Dining Requests
                </h4>
                <div className="p-4 rounded-xl border border-[#E7E2DA] bg-white leading-relaxed text-[#1C1917]">
                  {selectedReservation.specialRequests}
                </div>
              </div>

              {/* Add-ons List */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.08em] font-semibold text-[#1C1917] mb-2">
                  Included Curated Experiences
                </h4>
                <div className="space-y-1.5">
                  {selectedReservation.addons.map((addon, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E7E2DA]">
                      <span className="text-[#B8923A]">✓</span>
                      <span className="font-semibold text-[#1C1917]">{addon}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Billing Summary */}
              <div className="p-4 rounded-xl border border-[#E7E2DA] bg-[#FAF8F5] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-[#57534E]">Total Amount Invoiced</span>
                  <div className="text-2xl font-bold text-[#1C1917] tabular-nums">
                    €{selectedReservation.totalAmount.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-semibold text-[#57534E] block">Payment Ledger</span>
                  <span className="text-xs font-semibold uppercase px-2.5 py-1 rounded bg-[#15803D]/10 text-[#15803D] border border-[#15803D]/30 inline-block mt-0.5">
                    {selectedReservation.paymentStatus.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Actions / Status Changer */}
            <div className="pt-4 border-t border-[#E7E2DA] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#57534E]">Change Status:</span>
                <button
                  onClick={() => handleUpdateStatus(selectedReservation.id, "checked-in")}
                  className="px-3 py-1.5 rounded-lg bg-[#15803D] text-white text-xs font-semibold hover:bg-[#15803D]/90"
                >
                  Check In
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedReservation.id, "completed")}
                  className="px-3 py-1.5 rounded-lg bg-[#14213D] text-white text-xs font-semibold hover:bg-[#14213D]/90"
                >
                  Check Out
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedReservation.id, "confirmed")}
                  className="px-3 py-1.5 rounded-lg bg-zinc-200 text-[#1C1917] text-xs font-semibold hover:bg-zinc-300"
                >
                  Confirm
                </button>
              </div>

              <button
                onClick={() => setSelectedReservation(null)}
                className="px-4 py-1.5 rounded-lg border border-[#E7E2DA] text-xs font-semibold text-[#57534E] hover:text-[#1C1917]"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: CREATE NEW RESERVATION */}
      {/* ============================================================== */}
      {isNewBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl border border-[#E7E2DA] max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-start justify-between pb-4 border-b border-[#E7E2DA]">
              <div>
                <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#B8923A] block mb-1">
                  Estate Booking Protocol
                </span>
                <h2 className="text-xl font-semibold text-[#1C1917] tracking-tight">
                  Create New Reservation
                </h2>
              </div>
              <button
                onClick={() => setIsNewBookingModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E7E2DA] text-[#1C1917] font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="py-6 space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#57534E] mb-1">
                  Primary Guest Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Siddharth Singhal"
                  value={newGuestName}
                  onChange={(e) => setNewGuestName(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg px-3.5 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#B8923A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#57534E] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="guest@domain.com"
                    value={newGuestEmail}
                    onChange={(e) => setNewGuestEmail(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg px-3.5 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#B8923A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#57534E] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="+39 081 ..."
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg px-3.5 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#B8923A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#57534E] mb-1">
                  Select Suite / Allocation *
                </label>
                <select
                  value={newSuiteId}
                  onChange={(e) => setNewSuiteId(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg px-3.5 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#B8923A]"
                >
                  {HOTEL_SUITES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (€{s.pricePerNight}/night)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#57534E] mb-1">
                    Check-In Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newCheckIn}
                    onChange={(e) => setNewCheckIn(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg px-3.5 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#B8923A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#57534E] mb-1">
                    Check-Out Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newCheckOut}
                    onChange={(e) => setNewCheckOut(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg px-3.5 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#B8923A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#57534E] mb-1">
                    Guests Count
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={newGuests}
                    onChange={(e) => setNewGuests(parseInt(e.target.value) || 1)}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg px-3.5 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#B8923A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#57534E] mb-1">
                    VIP Tier
                  </label>
                  <select
                    value={newVipTier}
                    onChange={(e) => setNewVipTier(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg px-3.5 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#B8923A]"
                  >
                    <option value="VIP Sovereign • Full Buyout">VIP Sovereign • Full Buyout</option>
                    <option value="VIP Tier 1">VIP Tier 1</option>
                    <option value="VIP Guest">VIP Guest</option>
                    <option value="Repeat Guest">Repeat Guest</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#57534E] mb-1">
                  Special Requests / Logistics Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Helicopter transfer, champagne preferences, dietary restrictions..."
                  value={newRequests}
                  onChange={(e) => setNewRequests(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg p-3 text-xs text-[#1C1917] focus:outline-none focus:border-[#B8923A]"
                />
              </div>

              <div className="pt-4 border-t border-[#E7E2DA] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewBookingModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#E7E2DA] text-xs font-semibold text-[#57534E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="gold-button px-5 py-2 rounded-lg text-xs font-semibold tracking-[0.08em] uppercase"
                >
                  Confirm &amp; Issue Dossier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
