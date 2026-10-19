import { Check } from "lucide-react";
import type { Block } from "../../lib/guide-content";

/** Renders one content block of the guide. Plain text in, editorial type out. */
export function GuideBlock({ block }: { block: Block }) {
  switch (block.kind) {
    case "p":
      return <p className="mt-5 text-[16.5px] leading-[1.8] text-[#2c302e]">{block.text}</p>;

    case "h3":
      return (
        <h3 className="mt-11 font-sans text-[11px] font-bold tracking-[0.18em] text-gold uppercase">{block.text}</h3>
      );

    case "list":
      return (
        <ul className="mt-6 space-y-3.5">
          {block.items.map((item) => (
            <li key={item} className="relative pl-6 text-[16px] leading-[1.75] text-[#2c302e]">
              <span aria-hidden className="absolute top-[11px] left-0 h-[5px] w-[5px] rotate-45 bg-gold" />
              {item}
            </li>
          ))}
        </ul>
      );

    case "check":
      return (
        <ul className="mt-6 space-y-4">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3.5 text-[16px] leading-[1.75] text-[#2c302e]">
              <Check size={16} className="mt-[5px] shrink-0 text-gold" strokeWidth={2.6} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "callout":
      return (
        <aside className="mt-9 border-l-2 border-gold bg-white px-6 py-6 md:px-8">
          <p className="text-[10px] font-bold tracking-[0.2em] text-gold uppercase">{block.title}</p>
          <p className="mt-3 text-[15.5px] leading-[1.75] text-[#2c302e]">{block.text}</p>
        </aside>
      );

    case "table":
      return (
        <div className="mt-9">
          <div className="overflow-x-auto border border-line bg-white">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  {block.head.map((cell, i) => (
                    <th
                      key={`${cell}-${i}`}
                      className="border-b border-line px-4 py-3.5 text-[9.5px] font-bold tracking-[0.16em] text-muted uppercase"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row.join("|")} className="last:border-0">
                    {row.map((cell, i) => (
                      <td
                        key={`${cell}-${i}`}
                        className={`border-b border-line/70 px-4 py-3.5 align-top text-[14.5px] leading-[1.6] ${
                          i === 0 ? "font-medium text-ink" : "text-[#3c403e]"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.foot && (
            <p className="mt-3 text-[11px] font-bold tracking-[0.16em] text-ink uppercase">{block.foot}</p>
          )}
        </div>
      );

    case "steps":
      return (
        <ol className="mt-8 space-y-8">
          {block.items.map((item, i) => (
            <li key={item.title} className="grid grid-cols-[38px_1fr] gap-4 md:grid-cols-[52px_1fr] md:gap-6">
              <span className="font-display text-[26px] leading-none text-gold md:text-[32px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-display text-[21px] leading-tight text-ink md:text-[24px]">{item.title}</p>
                <p className="mt-2.5 text-[15.5px] leading-[1.75] text-[#2c302e]">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      );

    default:
      return null;
  }
}
