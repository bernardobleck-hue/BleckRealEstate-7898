interface LogoProps {
  tone?: "light" | "dark";
  className?: string;
}

/** BleckTeam wordmark — "BLECK" in the base tone, "TEAM" in gold. */
export function Logo({ tone = "light", className = "" }: LogoProps) {
  const base = tone === "light" ? "text-white" : "text-ink";
  const sub = tone === "light" ? "text-white/55" : "text-muted";

  return (
    <div className={`leading-none select-none ${className}`}>
      <div className={`text-[17px] font-semibold tracking-[0.34em] ${base}`}>
        BLECK<span className="text-gold">TEAM</span>
      </div>
      <div className={`mt-[6px] text-[7px] font-semibold tracking-[0.24em] uppercase ${sub}`}>
        Real Estate Consultants
      </div>
    </div>
  );
}
