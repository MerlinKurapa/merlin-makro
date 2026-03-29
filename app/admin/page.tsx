"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([])
  const [toast, setToast] = useState<any>(null)
  const [search, setSearch] = useState("") // 🔥 SEARCH
  const router = useRouter()

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4000)
  }

  useEffect(() => {
    checkAdmin()
  }, [])

  const checkAdmin = async () => {
    const { data: userData } = await supabase.auth.getUser()
    const email = userData.user?.email

    // ❗ LOGIN YOK
    if (!userData.user) {
      localStorage.setItem("admin_error", "⚠ Giriş yapmadan erişemezsin")
      router.push("/login")
      return
    }

    const banned = localStorage.getItem("admin_banned")

    if (banned === "true") {
      localStorage.setItem("admin_error", "🚫 Admin erişimin engellendi")
      router.push("/dashboard")
      return
    }

    let attempts = Number(localStorage.getItem("admin_attempts") || 0)

    if (email !== "bulureren76@gmail.com") {
      attempts++
      localStorage.setItem("admin_attempts", String(attempts))

      if (attempts >= 3) {
        localStorage.setItem("admin_banned", "true")
        localStorage.setItem(
          "admin_error",
          "🚫 Çok fazla deneme! Admin erişimin engellendi"
        )
      } else {
        localStorage.setItem(
          "admin_error",
          "⚠ Bu sayfaya erişim yetkin yok"
        )
      }

      router.push("/dashboard")
      return
    }

    localStorage.removeItem("admin_attempts")
    localStorage.removeItem("admin_banned")

    fetchUsers()
  }

  const fetchUsers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")

    if (data) setUsers(data)
  }

  const updateLicense = async (id: string, newLicense: string) => {
    await supabase
      .from("profiles")
      .update({ license: newLicense })
      .eq("id", id)

    showToast(`✔ Kullanıcı ${newLicense.toUpperCase()} yapıldı`, "success")
    fetchUsers()
  }

  return (
    <div className="rgb-bg min-h-screen p-10 text-white relative overflow-hidden">

      {/* BG */}
      <div className="mesh-bg"></div>

      {/* TOAST */}
      {toast && (
        <div
          className={`fixed right-5 top-20 z-50 px-6 py-4 rounded-xl border backdrop-blur-xl shadow-2xl animate-slideIn flex items-center gap-3 ${
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

      {/* ÜST */}
      <div className="flex justify-between items-center mb-6 relative z-10">

        <h1 className="text-3xl font-bold tracking-wide">
          Admin Panel
        </h1>

        <div className="flex gap-3">

          <button
            onClick={() => router.push("/dashboard")}
            className="button-outline"
          >
            Dashboard
          </button>

          <button
            onClick={async () => {
              await supabase.auth.signOut()
              router.push("/")
            }}
            className="button-modern"
          >
            Çıkış Yap
          </button>

        </div>

      </div>

      {/* 🔍 SEARCH */}
      <div className="mb-6 z-10 relative">
        <input
          placeholder="Kullanıcı ara..."
          className="input w-[300px]"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* USER LIST */}
      <div className="space-y-6 z-10 relative">

        {users
          .filter((user) =>
            user.email.toLowerCase().includes(search.toLowerCase())
          )
          .map((user) => (
            <div key={user.id} className="snake-card">

              <div className="snake-inner flex justify-between items-center hover:scale-[1.01] transition">

                {/* SOL */}
                <div>
                  <p className="text-white font-semibold text-lg">
                    {user.email}
                  </p>

                  <p className="text-gray-400 text-sm">
                    Lisans:{" "}
                    <span className={`font-semibold ${
                      user.license === "pro"
                        ? "text-green-400"
                        : "text-gray-400"
                    }`}>
                      {user.license}
                    </span>
                  </p>
                </div>

                {/* SAĞ */}
                <div className="flex gap-3">

                  <button
                    onClick={() => updateLicense(user.id, "pro")}
                    className="button-modern"
                  >
                    PRO
                  </button>

                  <button
                    onClick={() => updateLicense(user.id, "free")}
                    className="button-outline"
                  >
                    FREE
                  </button>

                </div>

              </div>

            </div>
          ))}

      </div>

    </div>
  )
}