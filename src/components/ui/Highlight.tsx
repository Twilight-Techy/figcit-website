// Headlines whose closing words are in Terracotta Bloom ("…when the world doesn’t fit.").
export function Highlight({ text, highlight }: { text: string; highlight?: string | null }) {
  if (!highlight || !text.endsWith(highlight)) return <>{text}</>
  return (
    <>
      {text.slice(0, text.length - highlight.length)}
      <span className="text-accent">{highlight}</span>
    </>
  )
}
