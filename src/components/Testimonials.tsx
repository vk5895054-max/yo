"use client";

import React from "react";

interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  quote: string;
}

export function Testimonials() {
  const testimonials: TestimonialItem[] = [
    {
      id: "james-carter",
      name: "James Carter",
      location: "Chicago, Illinois",
      quote:
        "Our startup needed a mobile app with backend APIs to sync data in real time. Infyle got it done, and the app works flawlessly across iOS and Android. They even helped us deploy it to both app stores. Professional, flexible, and truly collaborative.",
    },
    {
      id: "aditya-mehra",
      name: "Aditya Mehra",
      location: "Mumbai, India",
      quote:
        "We had very specific requirements for inventory and billing software for our electronics shop. They built a custom solution in just under 5 weeks, and it integrates perfectly with GST. Their team is sharp, responsive, and budget-friendly.",
    },
    {
      id: "ankit-verma",
      name: "Ankit Verma",
      location: "Bangalore, India",
      quote:
        "We run a B2B portal and wanted everything from login, dashboards, payments to reporting. Infyle's dev team built it end-to-end. The product is fast, secure, and very scalable.",
    },
  ];

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-white border-b border-[#e5e7eb] relative overflow-hidden">
      {/* Soft Ambient Background Glows */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#0066ff]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-sky-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* 3 Testimonial Cards Grid (Clean UI Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-7 sm:p-8 rounded-[28px] bg-[#f0f8ff] border border-[#d2e7fc] shadow-xs hover:shadow-md transition-all duration-300 relative group hover:-translate-y-1"
            >
              {/* Top Quote Mark Icon (Image 1 Style) */}
              <div>
                <div className="text-[#38bdf8] text-3xl font-black font-serif leading-none mb-4 select-none">
                  ““
                </div>
                <p className="text-xs sm:text-[13.5px] text-[#334155] leading-relaxed font-normal">
                  {item.quote}
                </p>
              </div>

              {/* Divider & Author Footer */}
              <div className="mt-8 pt-6 border-t border-[#cbd5e1]/50">
                <h4 className="text-base font-bold text-[#0f172a] tracking-tight">
                  {item.name}
                </h4>
                <p className="text-xs text-[#64748b] font-medium mt-0.5">
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
