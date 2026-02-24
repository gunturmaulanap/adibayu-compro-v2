import { MapPin, Mail, Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { copy } from "@/lib/translations";

type FindUsProps = {
  isDarkMode?: boolean;
  locale: Locale;
};

export default function FindUs({ isDarkMode = false, locale }: FindUsProps) {
  const t = copy[locale].home.findUs;

  const mapEmbedUrl =
    "https://www.google.com/maps?q=Graha%20Pratama%20Building%20Level%2019,%20Jl.%20Letjen%20M.T.%20Haryono%20No.KAV15,%20Tebet,%20Jakarta%2012810&output=embed";

  const mapsUrl =
    "https://maps.google.com/?q=Graha%20Pratama%20Building%20Level%2019,%20Jl.%20Letjen%20M.T.%20Haryono%20No.KAV15,%20Jakarta";

  const email = "office@adibayu.com";
  const phone = "+62-811-2700-9505";

  return (
    <section
      id="find-us"
      className={`py-20 md:py-24 transition-colors duration-300 ${
        isDarkMode ? "bg-[#151922]" : "bg-[#F6F6F7]"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold tracking-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {t.title}
          </h2>
          <p
            className={`mt-4 text-base md:text-lg leading-relaxed max-w-2xl ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[1.7fr_1fr] md:gap-5 lg:grid-cols-[2.1fr_1fr] lg:gap-8">
          {/* Map */}
          <div className="order-1">
            <div
              className={`h-[360px] w-full overflow-hidden rounded-2xl border shadow-sm md:h-[400px] lg:h-[420px] ${
                isDarkMode
                  ? "border-neutral-800 bg-neutral-900"
                  : "border-neutral-200 bg-white"
              }`}
            >
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Adibayu Group Location"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Contact Card */}
          <div className="order-2">
            <div
              className={`rounded-3xl border p-5 shadow-sm md:p-6 lg:p-7 ${
                isDarkMode
                  ? "border-neutral-800 bg-neutral-900"
                  : "border-neutral-200 bg-white"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail
                    className={`mt-0.5 h-4 w-4 ${
                      isDarkMode ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  />
                  <div>
                    <p
                      className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                        isDarkMode ? "text-neutral-400" : "text-neutral-500"
                      }`}
                    >
                      EMAIL
                    </p>
                    <a
                      href={`mailto:${email}`}
                      className={`mt-1 inline-block text-sm font-semibold ${
                        isDarkMode
                          ? "text-neutral-100 hover:text-white"
                          : "text-neutral-900 hover:text-black"
                      } transition-colors`}
                    >
                      {email}
                    </a>
                  </div>
                </div>

                <div
                  className={`h-px ${isDarkMode ? "bg-neutral-800" : "bg-neutral-200"}`}
                />

                <div className="flex items-start gap-3">
                  <Phone
                    className={`mt-0.5 h-4 w-4 ${
                      isDarkMode ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  />
                  <div>
                    <p
                      className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                        isDarkMode ? "text-neutral-400" : "text-neutral-500"
                      }`}
                    >
                      PHONE
                    </p>
                    <a
                      href={`tel:${phone.replace(/-/g, "")}`}
                      className={`mt-1 inline-block text-sm font-semibold ${
                        isDarkMode
                          ? "text-neutral-100 hover:text-white"
                          : "text-neutral-900 hover:text-black"
                      } transition-colors`}
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                <div
                  className={`h-px ${isDarkMode ? "bg-neutral-800" : "bg-neutral-200"}`}
                />

                <div className="flex items-start gap-3">
                  <MapPin
                    className={`mt-0.5 h-4 w-4 ${
                      isDarkMode ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  />
                  <div>
                    <p
                      className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                        isDarkMode ? "text-neutral-400" : "text-neutral-500"
                      }`}
                    >
                      LOCATION
                    </p>
                    <address
                      className={`mt-1 not-italic text-sm leading-6 ${
                        isDarkMode ? "text-neutral-300" : "text-neutral-700"
                      }`}
                    >
                      <div>Graha Pratama Building Level 19</div>
                      <div>Jl. Letjen M.T. Haryono No.KAV15, RT.11/RW.5</div>
                      <div>Tebet Barat, Tebet, Kota Jakarta Selatan</div>
                      <div>DKI Jakarta 12810</div>
                    </address>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2.5">
                <a
                  href="https://maps.google.com/?q=Graha%20Pratama%20Building%20Level%2019,%20Jl.%20Letjen%20M.T.%20Haryono%20No.KAV15,%20Jakarta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                    isDarkMode
                      ? "bg-neutral-100 text-neutral-900 hover:bg-white"
                      : "bg-neutral-900 text-white hover:bg-black"
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  Open in Google Maps
                </a>

                <a
                  href="mailto:office@adibayu.com"
                  className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border px-5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                    isDarkMode
                      ? "border-neutral-700 text-neutral-100 hover:bg-neutral-800"
                      : "border-neutral-300 text-neutral-900 hover:bg-neutral-50"
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
