interface GoogleStarsProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  showGoogleLabel?: boolean;
}

export default function GoogleStars({
  rating,
  reviewCount,
  size = "md",
  showGoogleLabel = true,
}: GoogleStarsProps) {
  const starSize =
    size === "lg" ? "h-5 w-5" : size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  const textSize =
    size === "lg" ? "text-base" : size === "md" ? "text-xs sm:text-sm" : "text-xs";

  return (
    <div
      className="inline-flex flex-wrap items-center gap-1.5 rounded-lg border border-amber-200/80 bg-amber-50/90 px-2.5 py-1 shadow-2xs"
      title={`Calificación de ${rating.toFixed(1)} estrellas sobre 5 en Google`}
    >
      {/* Google 'G' mini icon */}
      <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.3 0 6.08-1.09 8.1-2.96l-3.88-3.05c-1.1.74-2.51 1.18-4.22 1.18-3.24 0-5.99-2.19-6.97-5.14H1.02v3.14C3.03 21.16 7.21 24 12 24z"
        />
        <path
          fill="#FBBC05"
          d="M5.03 14.03c-.25-.74-.39-1.54-.39-2.36 0-.82.14-1.62.39-2.36V6.17H1.02C.37 7.47 0 8.94 0 12c0 3.06.37 4.53 1.02 5.83l4.01-3.8z"
        />
        <path
          fill="#EA4335"
          d="M12 4.75c1.8 0 3.41.62 4.68 1.84l3.51-3.51C18.07 1.19 15.3 0 12 0 7.21 0 3.03 2.84 1.02 6.83l4.01 3.14c.98-2.95 3.73-5.22 6.97-5.22z"
        />
      </svg>

      <span className={`font-extrabold text-slate-900 ${textSize}`}>
        {rating.toFixed(1)}
      </span>

      <div className="flex items-center text-amber-400" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            className={`${starSize} fill-current`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {reviewCount !== undefined && (
        <span className="text-[11px] font-semibold text-slate-600">
          ({reviewCount}{" "}
          {showGoogleLabel ? "reseñas en Google" : "reseñas"})
        </span>
      )}
    </div>
  );
}
