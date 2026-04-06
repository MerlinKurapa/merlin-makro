"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
 
// 🔥 HARDCODED (ENV YOK)
const SUPABASE_URL = "https://qlmphykuggjqhcznbwgq.supabase.co";
const SUPABASE_KEY = "sb_publishable_OBu1w6AOE67N84ryTy0O6g_1SlsV21N";

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

  useEffect(() => {
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
    setSupabase(supabaseClient);
  }, []);

  const handleReset = async () => {
    if (!supabase) return;

    if (!email) return showToast("E-posta gir", "error");

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://www.merlinmacro.xyz/update-password",
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

      <div className="mesh-bg"></div>
      <div className="absolute inset-0 bg-black/30"></div>

      {toast && (
        <div className={`fixed right-5 top-24 z-50 px-6 py-4 rounded-xl ${
          toast.type === "success"
            ? "bg-green-500/10 text-green-300"
            : "bg-red-500/10 text-red-300"
        }`}>
          {toast.msg}
        </div>
      )}

      <div className="absolute top-5 left-5 z-50">
        <button
          onClick={() => router.push("/")}
          className="button-outline px-4 py-2 text-sm"
        >
          ← Ana Sayfa
        </button>
      </div>

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