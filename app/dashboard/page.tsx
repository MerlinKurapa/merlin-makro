"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

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
    const supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

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
    window.location.href = "/merlin-setup.exe";
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

  // 🔥 LOGOUT
  const handleLogout = async () => {
    if (loggingOut || !supabase) return;

    setLoggingOut(true);

    showToast("Çıkış yapılıyor, lütfen 3 saniye bekleyin...", "success");

    setTimeout(async () => {
      await supabase.auth.signOut();
      router.replace("/");
    }, 3000);
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

        <div className="snake-card w-[420px] mb-6">
          <div className="snake-inner text-center">
            <h1 className="font-bold text-lg">
              Hoşgeldin {user.email}
            </h1>
          </div>
        </div>

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