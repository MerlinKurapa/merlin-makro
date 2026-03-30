"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const ReCAPTCHA = dynamic(
  () => import("react-google-recaptcha"),
  { ssr: false }
);

const SUPABASE_URL = "https://qlmphykuggjqhcznbwgq.supabase.co";
const SUPABASE_KEY = "sb_publishable_OBu1w6AOE67N84ryTy0O6g_1SlsV21N";
const RECAPTCHA_KEY = "6LfHGJssAAAAAC2c28qrGShwZMk378jaHFNG787S";

export default function Register() {
  const router = useRouter();

  const [supabase, setSupabase] = useState<any>(null);
  const [mounted, setMounted] = useState(false); // 🔥 EKLENDİ

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [toast, setToast] = useState<any>(null);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
    setSupabase(supabaseClient);

    setMounted(true); // 🔥 KRİTİK

    const error = localStorage.getItem("admin_error");
    if (error) {
      showToast(error, "error");
      localStorage.removeItem("admin_error");
    }
  }, []);

  const handleRegister = async () => {
    if (!supabase) return;

    if (!email || !password || !password2) {
      return showToast("Tüm alanları doldur", "error");
    }

    if (password !== password2) {
      return showToast("Şifreler uyuşmuyor", "error");
    }

    if (!captcha) {
      return showToast("Captcha doğrulaması yap", "error");
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return showToast(error.message, "error");
    }

    showToast("✔ Kayıt başarılı", "success");

    setTimeout(() => {
      router.push("/login");
    }, 1200);
  };

  return (
    <div className="rgb-bg min-h-screen flex items-center justify-center relative overflow-hidden">

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

      {toast && (
        <div className={`fixed right-5 top-20 z-50 px-6 py-4 rounded-xl border backdrop-blur-xl shadow-2xl animate-slideIn flex items-center gap-3 ${
          toast.type === "success"
            ? "bg-green-500/10 border-green-400 text-green-300"
            : "bg-red-500/10 border-red-400 text-red-300"
        }`}>
          <span className="text-lg">
            {toast.type === "success" ? "✔" : "⚠"}
          </span>
          <span>{toast.msg}</span>
        </div>
      )}

      <div className="snake-card w-[380px] z-10">
        <div className="snake-inner text-center">

          <h2 className="text-xl font-bold mb-6">
            Kayıt Ol
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
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

            <input
              className="input"
              type="password"
              placeholder="Şifre (Tekrar)"
              onChange={(e) => setPassword2(e.target.value)}
            />

            {/* 🔥 FIX BURASI */}
            <div className="my-4 flex justify-center">
              {mounted && (
                <ReCAPTCHA
                  sitekey={RECAPTCHA_KEY}
                  onChange={(val) => setCaptcha(val)}
                />
              )}
            </div>

            <button
              type="submit"
              className="button-modern w-full"
            >
              Kayıt Ol
            </button>

          </form>

          <div className="mt-6">
            <p className="text-gray-400 text-sm">
              Zaten hesabın var mı?
            </p>

            <button
              onClick={() => router.push("/login")}
              className="button-outline w-full mt-2"
            >
              Giriş Yap
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}