"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function UpdatePassword() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [toast, setToast] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  // 🔥 KRİTİK: SESSION YAKALA
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        showToast("Geçersiz veya süresi dolmuş link", "error");

        setTimeout(() => {
          router.push("/login");
        }, 2000);

        return;
      }

      setReady(true);
    };

    checkSession();
  }, []);

  const handleUpdate = async () => {
    if (!password || !password2) {
      return showToast("Alanları doldur", "error");
    }

    if (password !== password2) {
      return showToast("Şifreler uyuşmuyor", "error");
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setLoading(false);
      return showToast("Şifre güncellenemedi", "error");
    }

    showToast("✔ Şifre güncellendi", "success");

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  if (!ready) return null;

  return (
    <div className="rgb-bg min-h-screen flex items-center justify-center relative overflow-hidden">

      <div className="mesh-bg"></div>
      <div className="absolute inset-0 bg-black/30"></div>

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.msg}
        </div>
      )}

      <div className="snake-card w-[380px] z-10">
        <div className="snake-inner text-center">

          <h2 className="text-xl font-bold mb-6">
            Yeni Şifre
          </h2>

          <input
            className="input"
            type="password"
            placeholder="Yeni Şifre"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="input"
            type="password"
            placeholder="Tekrar"
            onChange={(e) => setPassword2(e.target.value)}
          />

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="button-modern w-full mt-4"
          >
            {loading ? "Güncelleniyor..." : "Şifreyi Güncelle"}
          </button>

        </div>
      </div>
    </div>
  );
}