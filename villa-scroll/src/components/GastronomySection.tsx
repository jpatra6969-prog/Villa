"use client";

import React from "react";
import { WineIcon } from "./Icons";

interface GastronomySectionProps {
  onOpenBooking: () => void;
}

export default function GastronomySection({ onOpenBooking }: GastronomySectionProps) {
  const experiences = [
    {
      title: "In-Villa Private Chef Degustation",
      chef: "Executive Chef Sanjeev Oberoi",
      desc: "A bespoke 7-course culinary journey prepared directly in your suite's professional presentation kitchen, tailored to your personal preferences.",
      tag: "Michelin Technique",
    },
    {
      title: "1,800-Bottle Historic Wine Cellar",
      chef: "Master Sommelier Rohit Varma",
      desc: "Private tastings of rare Super Tuscans, Piedmont vintages, and rare Champagne reserves, curated from family-owned boutique vineyards.",
      tag: "Vintage Reserves",
    },
    {
      title: "Clifftop Sunset Cocktail Salon",
      chef: "Mixology & Crudo Bar",
      desc: "Artisanal cocktails infused with wild Mediterranean botanicals, accompanied by freshly shucked oysters and sea urchin carpaccio.",
      tag: "Golden Hour",
    },
  ];

  return (
    <section id="dining" className="relative z-20 bg-[#FAF8F5] px-4 sm:px-8 py-24 sm:py-32 border-t border-[#E7E2DA] font-sans scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14213D]/10 text-[#14213D] text-xs font-semibold tracking-[0.08em] uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14213D]" />
              Gastronomy &amp; Cellar
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-[#1C1917] tracking-normal leading-[1.2]">
              Epicurean Mastery Overlooking the Sea
            </h2>
          </div>
          <p className="text-[#57534E] text-base max-w-xl font-normal leading-[1.6]">
            Dining at Aura Sanctuary is deeply rooted in the coastal terroir of Campania. Wild seafood caught hours before dusk, heirloom vegetables picked from our volcanic soil terraces, and century-old recipes elevated by three-star Michelin precision.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-white border border-[#E7E2DA] shadow-sm hover:border-[#B8923A] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-[0.08em] font-semibold text-[#B8923A] px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E7E2DA]">
                    {exp.tag}
                  </span>
                  <WineIcon size={18} className="text-[#57534E] group-hover:text-[#B8923A] transition-colors" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#1C1917] group-hover:text-[#B8923A] transition-colors mb-2">
                  {exp.title}
                </h3>
                <div className="text-xs font-medium text-[#57534E] mb-3">{exp.chef}</div>
                <p className="text-sm text-[#57534E] font-normal leading-[1.6]">
                  {exp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* In-Suite Chef Callout Card */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#14213D] text-white border border-white/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl sm:text-2xl font-serif font-medium text-white">
              Complimentary In-Villa Breakfast &amp; Private Sommelier
            </h4>
            <p className="text-zinc-300 text-sm font-normal mt-1 max-w-2xl leading-[1.6]">
              Every stay includes daily made-to-order artisanal breakfast served on your terrace, evening aperitivo with vintage Champagne, and personal cellar consultations.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="gold-button px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.08em] flex-shrink-0 transition-colors"
          >
            Reserve Gastronomy Stay
          </button>
        </div>
      </div>
    </section>
  );
}
