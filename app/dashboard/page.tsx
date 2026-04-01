"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

// 🔥 ENV PROBLEMİ FIX (HARDCODED)
const SUPABASE_URL = "https://qlmphykuggjqhcznbwgq.supabase.co";
const SUPABASE_KEY = "sb_publishable_OBu1w6AOE67N84ryTy0O6g_1SlsV21N";

export default function Dashboard() {
  const router = useRouter();

  const [supabase, setSupabase] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [license, setLicense] = useState("free");
  const [toast, setToast] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);


  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
    setSupabase(supabaseClient);

    const getUser = async () => {
      const { data } = await supabaseClient.auth.getUser();

      if (!data.user) {
        router.push("/login");
        return;
      }

      setUser(data.user);

      const { data: profile } = await supabaseClient
        .from("profiles")
        .select("license")
        .eq("id", data.user.id)
        .single();

      if (profile) setLicense(profile.license);
    };

    getUser();
  }, []);

  const handleDownload = () => {
    if (license !== "pro") {
      return showToast("⚠ Bu özellik sadece PRO üyeler için", "error");
    }

    showToast("✔ İndirme başlatıldı", "success");
    window.location.href = "https://drive.google.com/uc?export=download&id=1PF_8_pIha8QcQX-hbgVBw9cDsEYJRUNL";
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({ email: user.email }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        showToast("Stripe hatası", "error");
      }
    } catch {
      showToast("Bir hata oluştu", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (loggingOut || !supabase) return;

    setLoggingOut(true);

    showToast("Çıkış yapılıyor lütfen 3 Saniye bekleyin...", "success");

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
        className="absolute inset-0 bg-animate"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

      {/* TOP */}
      <div className="absolute top-5 right-5 flex gap-3 z-50">

        {user.email === "bulureren76@gmail.com" && (
          <button
            onClick={() => router.push("/admin")}
            className="button-outline"
          >
            Admin
          </button>
        )}

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="button-modern disabled:opacity-50"
        >
          {loggingOut ? "Çıkış yapılıyor..." : "Çıkış Yap"}
        </button>

      </div>

      {/* TOAST */}
      {toast && (
        <div
          className={`fixed right-5 top-24 z-50 px-6 py-4 rounded-xl border backdrop-blur-xl shadow-xl animate-slideIn flex items-center gap-3 ${
            toast.type === "success"
              ? "bg-green-500/10 border-green-400 text-green-300"
              : "bg-red-500/10 border-red-400 text-red-300"
          }`}
        >
          <span className="text-lg">
            {toast.type === "success" ? "✔" : "⚠"}
          </span>
          <span>{toast.msg}</span>
        </div>
      )}

      {/* CONTENT */}
      <div className="flex flex-col items-center justify-center flex-1 z-10">

        {/* HOŞGELDİN */}
        <div className="snake-card w-[420px] mb-6">
          <div className="snake-inner text-center">
            <h1 className="font-bold text-lg flex items-center justify-center gap-2">
              <span className="snow-icon">&#10052;</span>
              Hoşgeldin {user.email}
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

        {/* STATUS */}
        <div className="flex gap-4">

          <div className="snake-card w-[200px]">
            <div className="snake-inner text-center">
              <p className="text-gray-400">Durum</p>
              <p className="text-green-400 font-bold">Aktif</p>
            </div>
          </div>

          <div className="snake-card w-[200px]">
            <div className="snake-inner text-center">
              <p className="text-gray-400">Lisans</p>
              <p
                className={`font-bold ${
                  license === "pro"
                    ? "text-yellow-400 animate-pulse"
                    : "text-blue-400"
                }`}
              >
                {license}
              </p>
            </div>
          </div>

        </div>

        {/* EXTRA */}
        <div className="snake-card w-[420px] mt-6">
          <div className="snake-inner text-center">

            <p className="text-gray-400 text-sm">Hesap Durumu</p>

            <p className="font-bold text-lg">
              {license === "pro" ? "👑 PRO Üye" : "Free Kullanıcı"}
            </p>

          </div>
        </div>

        {/* PAYMENT */}
        {license !== "pro" && (
          <div className="snake-card w-[420px] mt-6">
            <div className="snake-inner text-center">

              <button
                className="button-modern w-full text-lg flex items-center justify-center gap-2"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading
                  ? "Yönlendiriliyor..."
                  : "💳 PRO Satın Al"}
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}