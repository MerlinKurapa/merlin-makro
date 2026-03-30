"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const ReCAPTCHA = dynamic(
  () => import("react-google-recaptcha"),
  { ssr: false }
);

// 🔥 HARDCODED
const SUPABASE_URL = "https://qlmphykuggjqhcznbwgq.supabase.co";
const SUPABASE_KEY = "sb_publishable_OBu1w6AOE67N84ryTy0O6g_1SlsV21N";
const RECAPTCHA_KEY = "6LfHGJssAAAAAC2c28qrGShwZMk378jaHFNG787S";

export default function Register() {
  const router = useRouter();

  const [supabase, setSupabase] = useState<any>(null);

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
    <div className="rgb-bg min-h-screen flex items-center justify-center">

      {toast && (
        <div className={`fixed right-5 top-24 z-50 px-6 py-4 rounded-xl ${
          toast.type === "success"
            ? "bg-green-500/10 text-green-300"
            : "bg-red-500/10 text-red-300"
        }`}>
          {toast.msg}
        </div>
      )}

      <div className="snake-card w-[380px]">
        <div className="snake-inner text-center">

          <h2 className="text-xl font-bold mb-6">
            Kayıt Ol
          </h2>

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

          {/* 🔥 CAPTCHA */}
          <div className="my-4 flex justify-center">
            <ReCAPTCHA
              sitekey={RECAPTCHA_KEY}
              onChange={(val) => setCaptcha(val)}
            />
          </div>

          <button
            onClick={handleRegister}
            className="button-modern w-full"
          >
            Kayıt Ol
          </button>

          <div className="mt-4">
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