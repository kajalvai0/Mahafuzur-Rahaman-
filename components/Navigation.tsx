"use client"

import type React from "react"
import { Home, MessageCircle, FileText, AlertCircle, HeartHandshake, Menu, Scale } from "lucide-react"
import { AppView } from "../types"

interface TopBarProps {
  logoImage: string
  title: string
  onMenuClick: () => void
}

export const TopBar: React.FC<TopBarProps> = ({ logoImage, title, onMenuClick }) => {
  return (
    <div className="bg-gradient-to-r from-red-600 to-green-700 text-white p-4 shadow-md sticky top-0 z-50 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="p-2 hover:bg-green-700 rounded-xl transition-colors">
          <Menu size={24} />
        </button>
        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden border border-white/20 shrink-0">
          <img src={logoImage || "/placeholder.svg"} alt="Logo" className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-sm leading-tight line-clamp-1">{title}</h1>
            <Scale size={14} className="text-emerald-300 shrink-0" />
          </div>
          <p className="text-[10px] text-emerald-100 opacity-80">স্মার্ট নির্বাচনী পোর্টাল</p>
        </div>
      </div>
    </div>
  )
}

interface BottomNavProps {
  currentView: AppView
  setView: (view: AppView) => void
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView }) => {
  const navItems = [
    { view: AppView.HOME, icon: Home, label: "হোম" },
    { view: AppView.MANIFESTO, icon: FileText, label: "ইশতেহার" },
    { view: AppView.CHAT, icon: MessageCircle, label: "হ্যালো", highlight: true },
    { view: AppView.ISSUES, icon: AlertCircle, label: "সমস্যা" },
    { view: AppView.SERVICES, icon: HeartHandshake, label: "সেবা" },
  ]

  return (
    <div className="fixed bottom-0 left-0 w-full bg-slate-100 border-t border-slate-300 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.view

          if (item.highlight) {
            return (
              <button
                key={item.view}
                onClick={() => setView(item.view)}
                className={`relative -top-5 flex flex-col items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform active:scale-95 ${
                  isActive ? "bg-emerald-800 text-white ring-4 ring-emerald-100" : "bg-green-700 text-white"
                }`}
              >
                <Icon size={24} />
              </button>
            )
          }

          return (
            <button
              key={item.view}
              onClick={() => setView(item.view)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? "text-emerald-800 font-bold" : "text-slate-500 hover:text-green-700"
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px]">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
