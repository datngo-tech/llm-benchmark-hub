"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, DollarSign, Cpu, BookOpen, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Overview", icon: BarChart3 },
  { href: "/finance", label: "Finance", icon: DollarSign },
  { href: "/tech", label: "Tech", icon: Cpu },
  { href: "/methodology", label: "Methodology", icon: BookOpen },
];

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-60 lg:fixed lg:inset-y-0 lg:border-r lg:border-slate-800 lg:bg-slate-950 lg:z-40">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <BarChart3 className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-100 leading-tight">
              LLM Benchmark
            </p>
            <p className="text-[10px] text-slate-500 leading-tight">Hub</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Sidebar">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-slate-800 text-slate-100"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isActive ? "text-blue-400" : "text-slate-500"
                  )}
                />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-800">
          <p className="text-[10px] text-slate-600 leading-relaxed">
            Data last updated March 2026
            <br />
            26 benchmarks tracked
          </p>
        </div>
      </aside>

      {/* Top bar — mobile */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 h-14 border-b border-slate-800 bg-slate-950">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600">
            <BarChart3 className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-slate-100">
            LLM Benchmark Hub
          </span>
        </div>
        <button
          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 pt-14">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="relative bg-slate-950 border-r border-slate-800 w-64 h-full flex flex-col">
            <div className="flex-1 px-3 py-4 space-y-1">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive =
                  href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-slate-800 text-slate-100"
                        : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isActive ? "text-blue-400" : "text-slate-500"
                      )}
                    />
                    {label}
                  </Link>
                );
              })}
            </div>
            <div className="px-5 py-4 border-t border-slate-800">
              <p className="text-[10px] text-slate-600 leading-relaxed">
                Data last updated March 2026
                <br />
                26 benchmarks tracked
              </p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
