"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

// 🔥 SADECE SSR FIX (EKLENDİ)
const ReCAPTCHA = dynamic(
  () => import("react-google-recaptcha"),
  { ssr: false }
);

// 🔥 SADECE ENV FIX (EKLENDİ)
const SUPABASE_URL = "https://qlmphykuggjqhcznbwgq.supabase.co";
const SUPABASE_KEY = "sb_publishable_OBu1w6AOE67N84ryTy0O6g_1SlsV21N";

export default function Login() {
  const router = useRouter();

  const [supabase, setSupabase] = useState<any>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [toast, setToast] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  // 🔥 SADECE BURASI FIXLENDİ (supabase init)
  useEffect(() => {
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
    setSupabase(supabaseClient);

    const error = localStorage.getItem("admin_error");
    if (error) {
      showToast(error, "error");
      localStorage.removeItem("admin_error");
    }
  }, []);

  const handleLogin = async () => {
    if (loading || !supabase) return;

    if (!email || !password) {
      return showToast("Tüm alanları doldur", "error");
    }

    if (!captcha) {
      return showToast("Captcha doğrulaması yap", "error");
    }

    setLoading(true);

    // 🔥 SENİN ORİJİNAL 5 SANİYE TOAST
    showToast("Giriş yapılıyor, lütfen 5 saniye bekleyin...", "success");

    setTimeout(async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setLoading(false);
        return showToast("E-posta veya şifre hatalı", "error");
      }

      router.push("/dashboard");
    }, 5000);
  };

  return (
    <div className="rgb-bg min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* BG */}
      <div className="mesh-bg"></div>
      <div className="absolute inset-0 bg-black/30"></div>

      {/* ANA SAYFA BUTONU */}
      <div className="absolute top-5 left-5 z-50">
        <button
          onClick={() => router.push("/")}
          className="button-outline"
        >
         ← Ana Sayfa
        </button>
      </div>

      {/* 🔥 SENİN ORİJİNAL TOAST (DEĞİŞMEDİ) */}
      {toast && (
        <div
          className={`fixed right-5 top-24 z-50 px-6 py-4 rounded-xl border backdrop-blur-xl shadow-xl animate-slideIn flex items-center gap-3 ${
            toast.type === "success"
              ? "bg-green-500/10 border-green-400 text-green-300"
              : "bg-red-500/10 border-red-400 text-red-300"
          }`}
        >
          <span>{toast.type === "success" ? "✔" : "⚠"}</span>
          <span>{toast.msg}</span>
        </div>
      )}

      {/* CARD */}
      <div className="snake-card w-[380px] z-10">
        <div className="snake-inner text-center">

          <h2 className="text-xl font-bold mb-6">
            Giriş Yap
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >

            <input
              className="input"
              placeholder="E-posta"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="input"
              type="password"
              placeholder="Şifre"
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* 🔥 SADECE SSR FIX */}
            <div className="my-4 flex justify-center">
              {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={(val) => setCaptcha(val)}
                />
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="button-modern w-full disabled:opacity-50"
            >
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>

          </form>

          {/* ALT (SENİN UI – DOKUNMADIM) */}
          <div className="mt-6 space-y-3">

            <label className="flex items-center gap-2 text-sm text-gray-400">
              <input type="checkbox" className="accent-cyan-400" />
              Beni hatırla
            </label>

            <button
              onClick={() => router.push("/forgot-password")}
              className="text-cyan-400 text-sm hover:underline"
            >
              Şifremi unuttum
            </button>

            <p className="text-gray-400 text-sm">
              Hesabın yok mu?
            </p>

            <button
              onClick={() => router.push("/register")}
              className="button-outline w-full"
            >
              Kayıt Ol
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}