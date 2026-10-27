"use client";

import React from "react";
import { TOUR_CHAPTERS } from "@/data/hotelData";

interface EstateStorySectionProps {
  onJumpToTourChapter: (startFrame: number) => void;
  onOpenBooking: () => void;
}

export default function EstateStorySection({
  onJumpToTourChapter,
  onOpenBooking,
}: EstateStorySectionProps) {
  const highlights = [
    {
      category: "01 / Dimensions",
      value: "8,400",
      unit: "Sq. Ft.",
      label: "Private Clifftop Estate",
      desc: "Cantilevered travertine terraces and floor-to-ceiling glass panoramic facades.",
    },
    {
      category: "02 / Capacity",
      value: "05",
      unit: "Suites",
      label: "Exclusive Buyout Privacy",
      desc: "Panoramic sunset exposure across every living space with private marble en-suites.",
    },
    {
      category: "03 / Wellness",
      value: "25m",
      unit: "Heated",
      label: "Saltwater Infinity Pool",
      desc: "Torchlit twilight lounge, submerged sunbeds, and hydrotherapy sea-cliff basin.",
    },
    {
      category: "04 / Distinction",
      value: "3 Keys",
      unit: "Michelin",
      label: "Hospitality Accolade",
      desc: "Top 0.1% worldwide distinction for service, architecture, and gastronomy.",
    },
  ];

  const pillars = [
    {
      number: "01",
      tag: "Italian Stonecraft",
      title: "Material Honesty & Coastal Modernism",
      description:
        "Hand-quarried Roman travertine, patinated bronze, and book-matched Calacatta Oro marble create an environment of quiet, tactile luxury.",
    },
    {
      number: "02",
      tag: "Peninsula Access",
      title: "Absolute Peninsula Seclusion",
      description:
        "Protected by rugged coastal topography, private security gates, and an on-site helipad. No ambient sound except the Tyrrhenian tide below.",
    },
    {
      number: "03",
      tag: "Staff of 5",
      title: "Dedicated In-Villa Butler Ensemble",
      description:
        "An unobtrusive private team of five—including in-suite butler, executive chef, sommelier, and Riva skipper—catering exclusively to your schedule.",
    },
  ];

  return (
    <section id="sanctuary" className="relative z-20 bg-[#FAF8F5] px-4 sm:px-8 pt-20 sm:pt-24 pb-24 scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Subtitle & Main Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-16 sm:mb-20">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.14em] uppercase text-[#B8923A] mb-4">
                <span className="w-6 h-px bg-[#B8923A]" />
                <span>The Architectural Philosophy</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold text-[#1C1917] tracking-tight leading-[1.2]">
                Suspended Between Sunlit Travertine Cliffs &amp; Sapphire Waters
              </h2>
            </div>

            {/* Anchored Architectural Metadata Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#E7E2DA]">
              <div>
                <span className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-[#57534E]">Location</span>
                <span className="text-sm font-semibold text-[#1C1917]">Capri Peninsula, Italy</span>
              </div>
              <div>
                <span className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-[#57534E]">Classification</span>
                <span className="text-sm font-semibold text-[#1C1917]">Private Clifftop Estate</span>
              </div>
              <div>
                <span className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-[#57534E]">Restoration</span>
                <span className="text-sm font-semibold text-[#1C1917]">Capri Studio • 2024</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pl-8 lg:border-l border-[#E7E2DA] flex flex-col justify-between h-full space-y-4">
            <p className="text-[#1C1917] text-base sm:text-lg font-medium leading-relaxed">
              Carved directly into the limestone cliffs of the Capri peninsula, Aura Sanctuary is a masterwork of coastal modernism. An uncompromising private sanctuary designed for those who seek absolute seclusion and transcendent luxury.
            </p>
            <p className="text-[#57534E] text-sm leading-relaxed">
              Every cantilevered volume responds to Mediterranean sunlight, sea horizons, and natural breezes—merging raw cliff geology with minimalist architectural restraint.
            </p>
            <div className="pt-4 flex items-center justify-between border-t border-[#E7E2DA]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#14213D] text-[#FAF8F5] flex items-center justify-center text-xs font-semibold tracking-wider">
                  AS
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1C1917]">Capri Conservation Trust</div>
                  <div className="text-[11px] text-[#57534E]">Heritage &amp; Biosphere Protection</div>
                </div>
              </div>
              <span className="text-[11px] font-semibold tracking-[0.08em] uppercase px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#E7E2DA] text-[#57534E]">
                Buyout Only
              </span>
            </div>
          </div>
        </div>

        {/* Unified Architectural Specification Bar */}
        <div className="bg-white rounded-2xl border border-[#E7E2DA] shadow-sm divide-y sm:divide-y-0 sm:divide-x divide-[#E7E2DA] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-20 overflow-hidden">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 lg:p-9 flex flex-col justify-between hover:bg-[#FAF8F5]/60 transition-colors group"
            >
              <div>
                <div className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#57534E]/80 mb-4">
                  {item.category}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#1C1917] tabular-nums tracking-tight">
                    {item.value}
                  </span>
                  <span className="text-xs font-semibold text-[#B8923A] tracking-[0.1em] uppercase">
                    {item.unit}
                  </span>
                </div>
                <div className="text-sm font-semibold text-[#1C1917] mt-3 tracking-tight">
                  {item.label}
                </div>
              </div>
              <p className="text-xs text-[#57534E] mt-2 font-normal leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 3 Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="p-8 rounded-2xl bg-white border border-[#E7E2DA] shadow-sm hover:border-[#B8923A] transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold tracking-[0.16em] uppercase text-[#B8923A] px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#E7E2DA]">
                    Pillar {pillar.number}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.08em] text-[#57534E]">
                    {pillar.tag}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-[#1C1917] mb-3 leading-snug tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-[#57534E] text-sm font-normal leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E7E2DA]/80 flex items-center justify-between text-xs font-semibold text-[#14213D] tracking-[0.08em] uppercase">
                <span>Architectural Detail</span>
                <span className="text-[#B8923A] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Visual 3D Spatial Walkthrough Chapter Selector */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#E7E2DA] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#E7E2DA]">
            <div>
              <div className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#B8923A] mb-2">
                <span className="w-5 h-px bg-[#B8923A]" />
                <span>Spatial Navigation</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#1C1917] tracking-tight">
                Discover The Estate In 3D
              </h3>
            </div>
            <p className="text-[#57534E] text-sm font-normal max-w-md sm:text-right">
              Select any space below to jump directly into its high-resolution interactive walkthrough.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {TOUR_CHAPTERS.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => onJumpToTourChapter(chapter.startFrame)}
                className="group p-5 rounded-xl bg-[#FAF8F5] border border-[#E7E2DA] hover:border-[#B8923A] text-left transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-[#B8923A] text-xs font-semibold tracking-[0.08em] uppercase tabular-nums">
                    Chapter {chapter.number}
                  </div>
                  <div className="text-[#1C1917] text-base font-semibold mt-1 tracking-tight group-hover:text-[#B8923A] transition-colors">
                    {chapter.title}
                  </div>
                  <div className="text-[#57534E] text-xs mt-1 font-normal line-clamp-2 leading-relaxed">
                    {chapter.subtitle}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E7E2DA] flex items-center justify-between text-xs font-semibold text-[#14213D] tracking-[0.08em] uppercase">
                  <span>Explore Space</span>
                  <span className="text-[#B8923A] transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
