"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();

  const [supabase, setSupabase] = useState<any>(null);

  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  // 🔥 SUPABASE CLIENT (FIX)
  useEffect(() => {
    const supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    setSupabase(supabaseClient);
  }, []);

  const handleReset = async () => {
    if (!supabase) return;

    if (!email) return showToast("E-posta gir", "error");

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      setLoading(false);
      return showToast("Mail gönderilemedi", "error");
    }

    showToast("📩 Mail gönderildi!", "success");
    setLoading(false);
  };

  return (
    <div className="rgb-bg min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* BG */}
      <div className="mesh-bg"></div>
      <div className="absolute inset-0 bg-black/30"></div>

      {/* TOAST */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.msg}
        </div>
      )}

      {/* HOME BUTTON */}
      <div className="absolute top-5 left-5 z-50">
        <button
          onClick={() => router.push("/")}
          className="button-outline px-4 py-2 text-sm"
        >
          ← Ana Sayfa
        </button>
      </div>

      {/* CARD */}
      <div className="snake-card w-[380px] z-10">
        <div className="snake-inner text-center">

          <h2 className="text-xl font-bold mb-6">
            Şifre Sıfırla
          </h2>

          <input
            className="input"
            placeholder="E-posta"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={handleReset}
            disabled={loading}
            className="button-modern w-full mt-4"
          >
            {loading ? "Gönderiliyor..." : "Mail Gönder"}
          </button>

          <div className="mt-5 text-sm text-gray-400">
            Giriş ekranına dönmek ister misin?
          </div>

          <button
            onClick={() => router.push("/login")}
            className="button-outline w-full mt-2"
          >
            Giriş Yap
          </button>

        </div>
      </div>
    </div>
  );
}