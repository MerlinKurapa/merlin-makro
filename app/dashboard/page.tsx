"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  // ✅ HARDCODE SUPABASE (CRASH FIX)
  const supabase = createClient(
    "https://qlmphykuggjqhcznbwgq.supabase.co"
    "sb_publishable_OBu1w6AOE67N84ryTy0O6g_1SlsV21N"
  );

  const [user, setUser] = useState<any>(null);
  const [license, setLicense] = useState("free");
  const [toast, setToast] = useState<any>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  // ✅ USER GET
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
        return;
      }

      setUser(data.user);

      const { data: profile } = await supabase
        .from("profiles")
        .select("license")
        .eq("id", data.user.id)
        .single();

      if (profile) setLicense(profile.license);
    };

    getUser();
  }, []);

  // ✅ DOWNLOAD
  const handleDownload = () => {
    if (license !== "pro") {
      return showToast("⚠ Bu özellik sadece PRO üyeler için", "error");
    }

    showToast("✔ İndirme başlatıldı", "success");
    window.location.href = "/merlin-setup.exe";
  };

  // ✅ LOGOUT
  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    showToast("Çıkış yapılıyor...", "success");

    setTimeout(async () => {
      await supabase.auth.signOut();
      router.replace("/");
    }, 2000);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden">

      {/* BG */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

      {/* TOP */}
      <div className="absolute top-5 right-5 z-50">
        <button
          onClick={handleLogout}
          className="button-modern"
        >
          {loggingOut ? "Çıkış..." : "Çıkış Yap"}
        </button>
      </div>

      {/* TOAST */}
      {toast && (
        <div className="fixed right-5 top-24 z-50 px-4 py-2 rounded bg-black/70 text-white">
          {toast.msg}
        </div>
      )}

      {/* CONTENT */}
      <div className="flex flex-col items-center justify-center flex-1 z-10">

        {/* HOŞGELDİN */}
        <div className="snake-card w-[420px] mb-6">
          <div className="snake-inner text-center">

            <h1 className="font-bold text-lg flex items-center justify-center gap-2">
              <span className="snow-icon">&#10052;</span>
              <span>Hoşgeldin {user.email}</span>
            </h1>

          </div>
        </div>

        {/* DOWNLOAD */}
        <div className="snake-card w-[420px] mb-6">
          <div className="snake-inner text-center">
            <h2 className="font-bold mb-2">Merlin Makro</h2>

            <button
              onClick={handleDownload}
              className={`w-full ${
                license === "pro"
                  ? "button-modern"
                  : "button-outline opacity-60 cursor-not-allowed"
              }`}
            >
              {license === "pro" ? "⬇ İndir" : "🔒 PRO Gerekli"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}