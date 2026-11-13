"use client";

interface NearMeTriggerButtonProps {
  label?: string;
  className?: string;
  targetId?: string;
}

export default function NearMeTriggerButton({
  label = "📍 Barberías Cerca de Mí",
  className = "",
  targetId = "buscador-barberias",
}: NearMeTriggerButtonProps) {
  function handleClick() {
    if (typeof window !== "undefined") {
      // Dispatch synchronously inside user gesture so browser geolocation permission triggers cleanly
      window.dispatchEvent(new CustomEvent("guiadebarberias:locate-near-me"));
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        className ||
        "inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400 cursor-pointer"
      }
    >
      <svg
        className="h-4 w-4 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
      <span>{label}</span>
    </button>
  );
}
