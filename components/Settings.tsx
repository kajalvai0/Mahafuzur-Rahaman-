"use client"

import type React from "react"
import { Camera, ShieldCheck, RotateCcw, AlertTriangle } from "lucide-react"

interface SettingsProps {
  currentImage: string
  onUpdateImage: (newUrl: string) => void
  defaultImage: string
  onOpenAdmin?: () => void
}

export const Settings: React.FC<SettingsProps> = ({ currentImage, onUpdateImage, defaultImage, onOpenAdmin }) => {
  const handleReset = () => {
    if (confirm("আপনি কি নিশ্চিত যে আপনি সব ডিফল্ট ফটোতে ফিরতে চান?")) {
      onUpdateImage(defaultImage)
    }
  }

  const handleAdminAccess = () => {
    const pin = prompt("অ্যাডমিন পিন কোড দিন (ডিফল্ট: 1234):")
    if (pin === "1234") {
      if (onOpenAdmin) {
        onOpenAdmin()
      }
    } else {
      alert("ভুল পিন কোড!")
    }
  }

  return (
    <div className="p-6 space-y-8 animate-in slide-in-from-right duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">অ্যাপ সেটিংস</h2>
        <p className="text-slate-500 text-sm">অ্যাপ কনফিগারেশন এবং ম্যানেজমেন্ট</p>
      </div>

      <div className="space-y-4">
        {/* Admin Access Section */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">অ্যাডমিন কন্ট্রোল</h3>
              <p className="text-xs text-slate-500">সব তথ্য পরিবর্তন করুন</p>
            </div>
          </div>
          <button
            onClick={handleAdminAccess}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-colors shadow-lg active:scale-95"
          >
            অ্যাডমিন প্যানেলে প্রবেশ করুন
          </button>
        </div>

        {/* Profile Quick Update */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Camera size={18} className="text-emerald-600" /> কুইক প্রোফাইল ফটো
          </h3>
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full border-4 border-emerald-50 overflow-hidden shadow-md">
              <img src={currentImage || "/placeholder.svg"} className="w-full h-full object-cover" alt="Profile" />
            </div>
            <div className="flex gap-2 w-full">
              <button
                onClick={() => {
                  const url = prompt("নতুন ফটো লিঙ্ক (URL) দিন:", currentImage)
                  if (url) onUpdateImage(url)
                }}
                className="flex-1 bg-emerald-50 text-emerald-700 font-bold py-3 rounded-xl text-sm"
              >
                লিঙ্ক পরিবর্তন
              </button>
              <button
                onClick={handleReset}
                className="px-4 bg-slate-50 text-slate-400 py-3 rounded-xl border border-slate-100"
              >
                <RotateCcw size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3">
          <AlertTriangle size={20} className="text-red-500 shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-red-800 text-sm">সতর্কতা</h4>
            <p className="text-[10px] text-red-600 leading-relaxed">
              অ্যাডমিন প্যানেলের পরিবর্তনগুলো সরাসরি ভোটারদের অ্যাপে প্রভাব ফেলবে। সঠিক তথ্য নিশ্চিত করে আপডেট করুন।
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
