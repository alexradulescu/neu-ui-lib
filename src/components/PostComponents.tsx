import { useState, useRef, useCallback } from "react";
import { styled } from "@alex.radulescu/styled-static";
import { IconX, IconSend } from "@tabler/icons-react";
import { REACTION_EMOJIS } from "@/data/feedMockData";
import type { Post, Comment } from "@/data/feedMockData";

// ─── Constants ────────────────────────────────────────────────────────────────

export const COPPER_GRADIENT = "linear-gradient(135deg, #C68D4A 0%, #B87333 55%, #9A5E25 100%)";

const AVATAR_BG: Record<string, string> = {
  Alex:           "linear-gradient(135deg, #C68D4A 0%, #B87333 100%)",
  Mom:            "linear-gradient(135deg, #D4778A 0%, #B85470 100%)",
  "Grandma Rose": "linear-gradient(135deg, #7DB891 0%, #4E8B65 100%)",
  "Uncle Mike":   "linear-gradient(135deg, #7A9EC8 0%, #4F78A8 100%)",
  "Aunt Sarah":   "linear-gradient(135deg, #C8A468 0%, #A8803A 100%)",
};

export function avatarBg(name: string) {
  return AVATAR_BG[name] ?? COPPER_GRADIENT;
}

export function formatTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

export function initials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

export function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: avatarBg(name),
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
      fontFamily: '"DM Sans", sans-serif',
      fontSize: size * 0.36, fontWeight: 600,
      color: "#fff", letterSpacing: "0.02em", userSelect: "none",
    }}>
      {initials(name)}
    </div>
  );
}

// ─── Image Carousel ───────────────────────────────────────────────────────────

const CarouselTrack = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
`;

export function ImageCarousel({ images, maxHeight = 380 }: { images: string[]; maxHeight?: number }) {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollTo = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
    setCurrent(idx);
  };

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCurrent(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  return (
    <div style={{ position: "relative", background: "var(--med-color-surface-deep)" }}>
      <CarouselTrack ref={trackRef} onScroll={onScroll}>
        {images.map((src, i) => (
          <img key={i} src={src} alt=""
            style={{ flexShrink: 0, width: "100%", height: maxHeight, objectFit: "cover", scrollSnapAlign: "start", display: "block" }}
          />
        ))}
      </CarouselTrack>
      {images.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 5, padding: "7px 0 5px", background: "var(--med-color-surface)" }}>
          {images.map((_, i) => (
            <button key={i} onClick={() => scrollTo(i)} aria-label={`Photo ${i + 1}`}
              style={{
                width: i === current ? 18 : 6, height: 6, borderRadius: 3,
                background: i === current ? "var(--med-color-accent)" : "var(--med-color-border)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "all 220ms cubic-bezier(0.34,1.56,0.64,1)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Reaction Bar ─────────────────────────────────────────────────────────────

export function ReactionBar({
  baseReactions, mySet, onToggle,
}: {
  baseReactions: Array<{ emoji: string }>;
  mySet: Set<string>;
  onToggle: (emoji: string) => void;
}) {
  return (
    <div style={{ display: "flex", gap: 6, padding: "8px 12px", flexWrap: "wrap" }}>
      {REACTION_EMOJIS.map(emoji => {
        const total  = baseReactions.filter(r => r.emoji === emoji).length + (mySet.has(emoji) ? 1 : 0);
        const active = mySet.has(emoji);
        return (
          <button key={emoji} onClick={() => onToggle(emoji)}
            style={{
              display: "flex", alignItems: "center", gap: 4,
              padding: "4px 10px", borderRadius: 999,
              background: active ? "rgba(184,115,51,0.13)" : "transparent",
              border: `1px solid ${active ? "rgba(184,115,51,0.45)" : "var(--med-color-border)"}`,
              cursor: "pointer", outline: "none", transition: "all 140ms ease",
              transform: active ? "scale(1.07)" : "scale(1)",
            }}
          >
            <span style={{ fontSize: "1rem", lineHeight: 1 }}>{emoji}</span>
            {total > 0 && (
              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.75rem", fontWeight: 500, color: active ? "var(--med-color-accent)" : "var(--med-color-text-muted)" }}>
                {total}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Activity Timeline ────────────────────────────────────────────────────────

export type ActivityItem =
  | { kind: "reaction"; user: string; emoji: string; at: string }
  | { kind: "comment"; id: string; user: string; text: string; at: string };

export function buildTimeline(post: Post, extra: Comment[]): ActivityItem[] {
  const items: ActivityItem[] = [
    ...post.reactions.map(r => ({ kind: "reaction" as const, user: r.user, emoji: r.emoji, at: r.at })),
    ...[...post.comments, ...extra].map(c => ({ kind: "comment" as const, id: c.id, user: c.user, text: c.text, at: c.at })),
  ];
  return items.sort((a, b) => new Date(a.at).getTime() - new Date(b.at).getTime());
}

export function ActivityTimeline({ items }: { items: ActivityItem[] }) {
  if (items.length === 0) {
    return (
      <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.8125rem", color: "var(--med-color-text-muted)", textAlign: "center", padding: "24px 16px", margin: 0 }}>
        Be the first to react or comment ✨
      </p>
    );
  }
  return (
    <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 14 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <Avatar name={item.user} size={30} />
          <div style={{ flex: 1 }}>
            {item.kind === "reaction" ? (
              <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.8125rem", color: "var(--med-color-text-secondary)", lineHeight: 1.5 }}>
                <span style={{ fontWeight: 600, color: "var(--med-color-text-primary)" }}>{item.user}</span>
                {" "}reacted {item.emoji}
                <span style={{ color: "var(--med-color-text-muted)", marginLeft: 6, fontSize: "0.725rem" }}>{formatTime(item.at)}</span>
              </div>
            ) : (
              <div>
                <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.75rem", color: "var(--med-color-text-muted)", marginBottom: 3 }}>
                  <span style={{ fontWeight: 600, color: "var(--med-color-text-primary)", fontSize: "0.8125rem" }}>{item.user}</span>
                  <span style={{ marginLeft: 6 }}>{formatTime(item.at)}</span>
                </div>
                <div style={{ background: "var(--med-color-surface-deep)", borderRadius: "0 12px 12px 12px", padding: "8px 12px", fontFamily: '"DM Sans", sans-serif', fontSize: "0.875rem", lineHeight: 1.5, color: "var(--med-color-text-primary)" }}>
                  {item.text}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Full Screen Post ─────────────────────────────────────────────────────────

export function FullScreenPost({
  post, myReactions, onReact, extraComments, onAddComment, onClose,
}: {
  post: Post;
  myReactions: Set<string>;
  onReact: (emoji: string) => void;
  extraComments: Comment[];
  onAddComment: (text: string) => void;
  onClose: () => void;
}) {
  const [commentText, setCommentText] = useState("");
  const timeline = buildTimeline(post, extraComments);

  const handleSend = () => {
    const t = commentText.trim();
    if (!t) return;
    onAddComment(t);
    setCommentText("");
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", flexDirection: "column", background: "var(--med-color-bg)" }}>
      {/* Top bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12, padding: "14px 16px 12px",
        background: "var(--med-color-surface)",
        backdropFilter: "blur(20px) saturate(1.4)", WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        borderBottom: "0.5px solid var(--med-color-border)", flexShrink: 0,
      }}>
        <button onClick={onClose} aria-label="Close"
          style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--med-color-surface-deep)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--med-color-text-primary)", flexShrink: 0 }}
        >
          <IconX size={16} />
        </button>
        <Avatar name={post.author} size={34} />
        <div>
          <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.875rem", fontWeight: 600, color: "var(--med-color-text-primary)" }}>{post.author}</div>
          <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.725rem", color: "var(--med-color-text-muted)" }}>{formatTime(post.at)}</div>
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {post.images.length > 0 && <ImageCarousel images={post.images} maxHeight={300} />}
        {post.caption && (
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "1rem", lineHeight: 1.6, color: "var(--med-color-text-primary)", padding: "14px 16px 8px", margin: 0 }}>
            {post.caption}
          </p>
        )}
        <ReactionBar baseReactions={post.reactions} mySet={myReactions} onToggle={onReact} />
        <div style={{ borderTop: "0.5px solid var(--med-color-divider)", marginTop: 8, paddingTop: 14 }}>
          <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.625rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--med-color-text-muted)", padding: "0 16px 14px" }}>
            Activity
          </div>
          <ActivityTimeline items={timeline} />
        </div>
        <div style={{ height: 24 }} />
      </div>

      {/* Comment input */}
      <div style={{
        padding: "10px 12px 12px",
        background: "var(--med-color-surface)",
        backdropFilter: "blur(20px) saturate(1.4)", WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        borderTop: "0.5px solid var(--med-color-border)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <Avatar name="Alex" size={30} />
        <div style={{ flex: 1, position: "relative" }}>
          <input
            type="text" value={commentText}
            onChange={e => setCommentText(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Add a comment…"
            style={{ width: "100%", boxSizing: "border-box", padding: "8px 40px 8px 14px", borderRadius: 999, border: "1px solid var(--med-color-border)", background: "var(--med-color-input-bg)", fontFamily: '"DM Sans", sans-serif', fontSize: "0.875rem", color: "var(--med-color-text-primary)", outline: "none" }}
          />
          {commentText.trim() && (
            <button onClick={handleSend}
              style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", width: 28, height: 28, borderRadius: "50%", background: COPPER_GRADIENT, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}
            >
              <IconSend size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
