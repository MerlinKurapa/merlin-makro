export default function Home() {
  return (
    <div className="rgb-bg min-h-screen flex flex-col items-center px-4 relative">

      {/* BG */}
      <div className="mesh-bg"></div>
      <div className="absolute inset-0 bg-black/20 z-[1]"></div>

      {/* HERO */}
      <div className="flex w-full max-w-[1600px] flex-col lg:flex-row justify-between items-center mt-16 lg:mt-24 z-10 gap-10">

        {/* LEFT */}
        <div className="hidden lg:flex flex-col gap-8 w-[320px] ml-6">

          <div className="snake-card">
            <div className="snake-inner">
              <h3 className="text-lg font-bold mb-3 text-cyan-400">
                ◆ Merlin Makro Nedir?
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Merlin Makro, oyunlarda sınırları kaldıran gelişmiş otomasyon sistemidir.
                Tek tıkla maksimum performans sağlar.
              </p>
            </div>
          </div>

          <div className="snake-card">
            <div className="snake-inner">
              <h3 className="text-lg font-bold mb-3 text-purple-400">
                ◆ Neden Biz?
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Türkiye'nin en stabil ve hızlı makro altyapısını sunuyoruz.
                Gecikme yok, performans kaybı yok.
              </p>
            </div>
          </div>

        </div>

        {/* CENTER */}
        <div className="flex flex-col items-center gap-6 lg:gap-8 w-full lg:w-auto">

          <div className="snake-card w-[95%] max-w-[950px]">
            <div className="snake-inner text-center">

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl leading-tight text-center text-shine"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  letterSpacing: "-0.04em",
                  lineHeight: "1.1",
                  color: "#ffffff",
                  textShadow: "0 0 22px rgba(0,255,255,0.22)"
                }}
              >
                Oyunların Tanıdığı Sınırlardan Kurtul

                <span className="block mt-4 relative w-full h-[3px] overflow-hidden">

                  <span
                    className="absolute inset-0 rgb-sword"
                    style={{
                      borderRadius: "999px",
                      boxShadow: "0 0 14px #00eaffcc"
                    }}
                  ></span>

                  <span className="shine-effect"></span>

                  <span
                    className="absolute"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%) rotate(45deg)",
                      width: "12px",
                      height: "12px",
                      background: "#fff",
                      boxShadow: "0 0 14px #00eaff"
                    }}
                  ></span>

                </span>

              </h1>

            </div>
          </div>

          <div className="snake-card w-[95%] max-w-[550px]">
            <div className="snake-inner text-center">
              <p className="text-gray-300 text-base sm:text-lg">
                Tek tıkla otomasyon. Hızlı, güçlü ve profesyonel makro çözümü.
              </p>
            </div>
          </div>

          <div className="snake-card w-[95%] max-w-[420px]">
            <div className="snake-inner flex flex-col items-center gap-4">

              <p className="text-gray-400 text-sm">
                Hemen başlayın
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <a href="/register" className="button-modern w-full sm:w-auto text-center">
                  Kayıt Ol
                </a>
                <a href="/login" className="button-outline w-full sm:w-auto text-center">
                  Giriş Yap
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="hidden lg:flex flex-col gap-8 w-[320px] mr-6">

          <div className="snake-card">
            <div className="snake-inner">
              <h3 className="text-lg font-bold mb-3 text-green-400">
                ◆ Özellikler
              </h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Tek tık makro</li>
                <li>• Ultra hızlı tepki</li>
                <li>• Stabil sistem</li>
                <li>• Sürekli güncelleme</li>
              </ul>
            </div>
          </div>

          <div className="snake-card">
            <div className="snake-inner">
              <h3 className="text-lg font-bold mb-3 text-yellow-400">
                ◆ Performans
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Minimum sistem kullanımı ile maksimum performans sağlar.
                FPS düşüşü olmadan çalışır.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* TRUST */}
      <div className="mt-16 lg:mt-24 flex flex-col items-center gap-6 z-10 w-full px-4">

        <div className="snake-card w-[95%] max-w-[600px]">
          <div className="snake-inner text-center">
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">
              Güvenli Ödeme Sistemi
            </h3>
            <p className="text-gray-400 text-sm">
              ✔ Lisanslı kullanım • ✔ Anında teslim • ✔ Güvenli ödeme altyapısı • ✔ 7/24 destek
            </p>
          </div>
        </div>

        <div className="snake-card w-[95%] max-w-[500px]">
          <div className="snake-inner text-center">

            <h3 className="text-md font-semibold mb-4 text-white">
              Desteklenen Ödeme Yöntemleri
            </h3>

            <div className="flex justify-center gap-6 sm:gap-10 items-center flex-wrap">

              <a href="https://www.paytr.com" target="_blank">
                <img
                  src="/paytr.png"
                  className="h-10 sm:h-12 opacity-80 hover:opacity-100 hover:scale-110 transition duration-300"
                />
              </a>

              <a href="https://www.visa.com" target="_blank">
                <img
                  src="/visa.png"
                  className="h-10 sm:h-12 opacity-80 hover:opacity-100 hover:scale-110 transition duration-300"
                />
              </a>

            </div>

          </div>
        </div>

      </div>

      {/* FOOTER */}
      <div className="mt-16 lg:mt-20 w-full max-w-[1200px] border-t border-white/10 pt-8 pb-10 z-10 px-4">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-400">

          <div>
            <h4 className="text-white mb-3 font-semibold">
              Merlin Makro
            </h4>
            <p>
              Türkiye'nin en gelişmiş makro çözümü.
            </p>
          </div>

          <div>
            <h4 className="text-white mb-3 font-semibold">
              Kısayollar
            </h4>
            <ul className="space-y-2">
              <li><a href="/login" className="hover:text-white">Giriş Yap</a></li>
              <li><a href="/register" className="hover:text-white">Kayıt Ol</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-3 font-semibold">
              Güvenlik
            </h4>
            <p>
              SSL ile korunur • Güvenli ödeme sistemi
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}