import { useState, useRef, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { styled } from "@alex.radulescu/styled-static";
import { Modal, Textarea } from "@mantine/core";
import { IconHome, IconPencil, IconX, IconSend, IconCamera } from "@tabler/icons-react";
import { Navbar } from "@/components/Navbar";
import { mockPosts, REACTION_EMOJIS } from "@/data/feedMockData";
import type { Post, Comment } from "@/data/feedMockData";

export const Route = createFileRoute("/feed")({
  component: FeedPage,
});

// ─── Styled ───────────────────────────────────────────────────────────────────

const Page = styled.main`
  min-height: 100dvh;
  background: var(--med-color-bg);
  padding-bottom: 88px;
`;

const FeedInner = styled.div`
  max-width: 520px;
  margin: 0 auto;
  padding: 0 0 8px;
`;

const CarouselTrack = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
`;

// ─── Constants ────────────────────────────────────────────────────────────────

const COPPER_GRADIENT = "linear-gradient(135deg, #C68D4A 0%, #B87333 55%, #9A5E25 100%)";

const AVATAR_BG: Record<string, string> = {
  Alex:           "linear-gradient(135deg, #C68D4A 0%, #B87333 100%)",
  Mom:            "linear-gradient(135deg, #D4778A 0%, #B85470 100%)",
  "Grandma Rose": "linear-gradient(135deg, #7DB891 0%, #4E8B65 100%)",
  "Uncle Mike":   "linear-gradient(135deg, #7A9EC8 0%, #4F78A8 100%)",
  "Aunt Sarah":   "linear-gradient(135deg, #C8A468 0%, #A8803A 100%)",
};

function avatarBg(name: string) {
  return AVATAR_BG[name] ?? COPPER_GRADIENT;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}

function initials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: avatarBg(name),
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
      fontFamily: '"DM Sans", sans-serif',
      fontSize: size * 0.36,
      fontWeight: 600,
      color: "#fff",
      letterSpacing: "0.02em",
      userSelect: "none",
    }}>
      {initials(name)}
    </div>
  );
}

// ─── Image Carousel ───────────────────────────────────────────────────────────

function ImageCarousel({ images, maxHeight = 380 }: { images: string[]; maxHeight?: number }) {
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
          <img
            key={i} src={src} alt=""
            style={{
              flexShrink: 0, width: "100%", height: maxHeight,
              objectFit: "cover", scrollSnapAlign: "start", display: "block",
            }}
          />
        ))}
      </CarouselTrack>
      {images.length > 1 && (
        <div style={{
          display: "flex", justifyContent: "center", gap: 5,
          padding: "7px 0 5px",
          background: "var(--med-color-surface)",
        }}>
          {images.map((_, i) => (
            <button
              key={i} onClick={() => scrollTo(i)} aria-label={`Photo ${i + 1}`}
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

function ReactionBar({
  baseReactions,
  mySet,
  onToggle,
}: {
  baseReactions: Array<{ emoji: string }>;
  mySet: Set<string>;
  onToggle: (emoji: string) => void;
}) {
  return (
    <div style={{ display: "flex", gap: 6, padding: "8px 12px", flexWrap: "wrap" }}>
      {REACTION_EMOJIS.map(emoji => {
        const base  = baseReactions.filter(r => r.emoji === emoji).length;
        const mine  = mySet.has(emoji) ? 1 : 0;
        const total = base + mine;
        const active = mySet.has(emoji);
        return (
          <button
            key={emoji} onClick={() => onToggle(emoji)}
            style={{
              display: "flex", alignItems: "center", gap: 4,
              padding: "4px 10px", borderRadius: 999,
              background: active ? "rgba(184,115,51,0.13)" : "transparent",
              border: `1px solid ${active ? "rgba(184,115,51,0.45)" : "var(--med-color-border)"}`,
              cursor: "pointer", outline: "none",
              transition: "all 140ms ease",
              transform: active ? "scale(1.07)" : "scale(1)",
            }}
          >
            <span style={{ fontSize: "1rem", lineHeight: 1 }}>{emoji}</span>
            {total > 0 && (
              <span style={{
                fontFamily: '"DM Sans", sans-serif', fontSize: "0.75rem", fontWeight: 500,
                color: active ? "var(--med-color-accent)" : "var(--med-color-text-muted)",
              }}>
                {total}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Post Card ────────────────────────────────────────────────────────────────

function PostCard({
  post, myReactions, onReact, onOpen,
}: {
  post: Post;
  myReactions: Set<string>;
  onReact: (emoji: string) => void;
  onOpen: () => void;
}) {
  return (
    <div style={{
      background: "var(--med-color-surface)",
      backdropFilter: "blur(20px) saturate(1.4)",
      WebkitBackdropFilter: "blur(20px) saturate(1.4)",
      borderRadius: 20, border: "1px solid var(--med-color-border)",
      overflow: "hidden", margin: "0 12px 16px",
      boxShadow: "0 4px 16px rgba(120,80,40,0.08)",
    }}>
      {/* Header */}
      <div
        onClick={onOpen}
        style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px 10px", cursor: "pointer" }}
      >
        <Avatar name={post.author} size={38} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.9rem", fontWeight: 600, color: "var(--med-color-text-primary)" }}>
            {post.author}
          </div>
          <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.75rem", color: "var(--med-color-text-muted)", marginTop: 1 }}>
            {formatTime(post.at)}
          </div>
        </div>
      </div>

      {/* Images */}
      {post.images.length > 0 && (
        <div onClick={onOpen} style={{ cursor: "pointer" }}>
          <ImageCarousel images={post.images} />
        </div>
      )}

      {/* Caption */}
      {post.caption && (
        <p style={{
          fontFamily: '"DM Sans", sans-serif', fontSize: "0.9375rem", lineHeight: 1.55,
          color: "var(--med-color-text-primary)", margin: 0,
          padding: post.images.length > 0 ? "10px 14px 4px" : "2px 14px 4px",
        }}>
          {post.caption}
        </p>
      )}

      {/* Reactions */}
      <ReactionBar baseReactions={post.reactions} mySet={myReactions} onToggle={onReact} />

      {/* Comments preview */}
      {post.comments.length > 0 && (
        <div onClick={onOpen} style={{ padding: "2px 14px 12px", cursor: "pointer" }}>
          {post.comments.slice(-2).map(c => (
            <div key={c.id} style={{
              fontFamily: '"DM Sans", sans-serif', fontSize: "0.8125rem",
              color: "var(--med-color-text-secondary)", marginBottom: 3, lineHeight: 1.5,
            }}>
              <span style={{ fontWeight: 600, color: "var(--med-color-text-primary)" }}>{c.user}</span>
              {" "}{c.text}
            </div>
          ))}
          {post.comments.length > 2 && (
            <div style={{
              fontFamily: '"DM Sans", sans-serif', fontSize: "0.75rem",
              color: "var(--med-color-text-muted)", marginTop: 5,
            }}>
              View all {post.comments.length} comments →
            </div>
          )}
        </div>
      )}
      {post.comments.length === 0 && <div style={{ height: 4 }} />}
    </div>
  );
}

// ─── Activity Timeline ────────────────────────────────────────────────────────

type ActivityItem =
  | { kind: "reaction"; user: string; emoji: string; at: string }
  | { kind: "comment"; id: string; user: string; text: string; at: string };

function buildTimeline(post: Post, extra: Comment[]): ActivityItem[] {
  const items: ActivityItem[] = [
    ...post.reactions.map(r => ({ kind: "reaction" as const, user: r.user, emoji: r.emoji, at: r.at })),
    ...[...post.comments, ...extra].map(c => ({
      kind: "comment" as const, id: c.id, user: c.user, text: c.text, at: c.at,
    })),
  ];
  return items.sort((a, b) => new Date(a.at).getTime() - new Date(b.at).getTime());
}

function ActivityTimeline({ items }: { items: ActivityItem[] }) {
  if (items.length === 0) {
    return (
      <p style={{
        fontFamily: '"DM Sans", sans-serif', fontSize: "0.8125rem",
        color: "var(--med-color-text-muted)", textAlign: "center",
        padding: "24px 16px", margin: 0,
      }}>
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
                <div style={{
                  background: "var(--med-color-surface-deep)",
                  borderRadius: "0 12px 12px 12px",
                  padding: "8px 12px",
                  fontFamily: '"DM Sans", sans-serif', fontSize: "0.875rem",
                  lineHeight: 1.5, color: "var(--med-color-text-primary)",
                }}>
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

function FullScreenPost({
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
    <div style={{
      position: "fixed", inset: 0, zIndex: 300,
      display: "flex", flexDirection: "column",
      background: "var(--med-color-bg)",
    }}>
      {/* Top bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "14px 16px 12px",
        background: "var(--med-color-surface)",
        backdropFilter: "blur(20px) saturate(1.4)",
        WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        borderBottom: "0.5px solid var(--med-color-border)",
        flexShrink: 0,
      }}>
        <button
          onClick={onClose} aria-label="Close"
          style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "var(--med-color-surface-deep)",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--med-color-text-primary)",
            flexShrink: 0,
          }}
        >
          <IconX size={16} />
        </button>
        <Avatar name={post.author} size={34} />
        <div>
          <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.875rem", fontWeight: 600, color: "var(--med-color-text-primary)" }}>
            {post.author}
          </div>
          <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.725rem", color: "var(--med-color-text-muted)" }}>
            {formatTime(post.at)}
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {post.images.length > 0 && <ImageCarousel images={post.images} maxHeight={300} />}

        {post.caption && (
          <p style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: "1rem", lineHeight: 1.6,
            color: "var(--med-color-text-primary)", padding: "14px 16px 8px", margin: 0,
          }}>
            {post.caption}
          </p>
        )}

        <ReactionBar baseReactions={post.reactions} mySet={myReactions} onToggle={onReact} />

        <div style={{ borderTop: "0.5px solid var(--med-color-divider)", marginTop: 8, paddingTop: 14 }}>
          <div style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: "0.625rem", fontWeight: 600,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "var(--med-color-text-muted)", padding: "0 16px 14px",
          }}>
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
        backdropFilter: "blur(20px) saturate(1.4)",
        WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        borderTop: "0.5px solid var(--med-color-border)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <Avatar name="Alex" size={30} />
        <div style={{ flex: 1, position: "relative" }}>
          <input
            type="text"
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Add a comment…"
            style={{
              width: "100%", boxSizing: "border-box",
              padding: "8px 40px 8px 14px", borderRadius: 999,
              border: "1px solid var(--med-color-border)",
              background: "var(--med-color-input-bg)",
              fontFamily: '"DM Sans", sans-serif', fontSize: "0.875rem",
              color: "var(--med-color-text-primary)", outline: "none",
            }}
          />
          {commentText.trim() && (
            <button
              onClick={handleSend}
              style={{
                position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)",
                width: 28, height: 28, borderRadius: "50%",
                background: COPPER_GRADIENT, border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
              }}
            >
              <IconSend size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Create Post ──────────────────────────────────────────────────────────────

function CreatePost({ onPost, onClose }: { onPost: (post: Post) => void; onClose: () => void }) {
  const [caption, setCaption]   = useState("");
  const [previews, setPreviews] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    setPreviews(prev => [...prev, ...Array.from(files).map(f => URL.createObjectURL(f))]);
  };

  const handlePost = () => {
    if (!caption.trim() && previews.length === 0) return;
    onPost({
      id: Date.now().toString(),
      author: "Alex",
      at: new Date().toISOString(),
      caption: caption.trim(),
      images: previews,
      reactions: [],
      comments: [],
    });
    onClose();
  };

  const canPost = caption.trim().length > 0 || previews.length > 0;

  return (
    <div>
      {/* Caption */}
      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <Avatar name="Alex" size={36} />
        <Textarea
          placeholder="Share a moment with the family…"
          value={caption}
          onChange={e => setCaption(e.target.value)}
          autosize
          minRows={3}
          style={{ flex: 1 }}
          styles={{
            input: {
              borderRadius: 12,
              background: "var(--med-color-input-bg)",
              border: "1px solid var(--med-color-border)",
              fontFamily: '"DM Sans", sans-serif',
              fontSize: "0.9375rem",
              color: "var(--med-color-text-primary)",
              resize: "none",
            },
          }}
        />
      </div>

      {/* Image previews */}
      {previews.length > 0 && (
        <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "4px 0 10px" }}>
          {previews.map((src, i) => (
            <div key={i} style={{ position: "relative", flexShrink: 0 }}>
              <img src={src} alt="" style={{ width: 80, height: 80, borderRadius: 10, objectFit: "cover", display: "block" }} />
              <button
                onClick={() => setPreviews(p => p.filter((_, j) => j !== i))}
                style={{
                  position: "absolute", top: -6, right: -6,
                  width: 20, height: 20, borderRadius: "50%",
                  background: "rgba(42,33,24,0.8)", border: "none",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
                }}
              >
                <IconX size={10} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
        <button
          onClick={() => fileRef.current?.click()}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 14px", borderRadius: 999,
            border: "1px solid var(--med-color-border)",
            background: "var(--med-color-surface-deep)",
            cursor: "pointer",
            fontFamily: '"DM Sans", sans-serif', fontSize: "0.8125rem",
            fontWeight: 500, color: "var(--med-color-text-secondary)",
          }}
        >
          <IconCamera size={15} />
          Photo
        </button>
        <div style={{ flex: 1 }} />
        <button
          onClick={handlePost}
          disabled={!canPost}
          style={{
            padding: "8px 24px", borderRadius: 999,
            background: canPost ? COPPER_GRADIENT : "var(--med-color-border)",
            border: "none", cursor: canPost ? "pointer" : "default",
            fontFamily: '"DM Sans", sans-serif', fontSize: "0.9rem", fontWeight: 600,
            color: canPost ? "#fff" : "var(--med-color-text-muted)",
            transition: "all 140ms ease",
          }}
        >
          Post
        </button>
      </div>

      <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={e => handleFiles(e.target.files)} />
    </div>
  );
}

// ─── Feed Page ────────────────────────────────────────────────────────────────

function FeedPage() {
  const [posts, setPosts]             = useState<Post[]>(mockPosts);
  const [myReactions, setMyReactions] = useState<Record<string, Set<string>>>({});
  const [extraComments, setExtraComments] = useState<Record<string, Comment[]>>({});
  const [openPost, setOpenPost]       = useState<Post | null>(null);
  const [showCreate, setShowCreate]   = useState(false);
  const [activeNav, setActiveNav]     = useState("feed");

  const toggleReaction = (postId: string, emoji: string) => {
    setMyReactions(prev => {
      const set = new Set(prev[postId] ?? []);
      if (set.has(emoji)) set.delete(emoji); else set.add(emoji);
      return { ...prev, [postId]: set };
    });
  };

  const addComment = (postId: string, text: string) => {
    const comment: Comment = { id: `new-${Date.now()}`, user: "Alex", text, at: new Date().toISOString() };
    setExtraComments(prev => ({ ...prev, [postId]: [...(prev[postId] ?? []), comment] }));
  };

  const handleNavSelect = (id: string) => {
    if (id === "post") { setShowCreate(true); return; }
    setActiveNav(id);
  };

  return (
    <Page>
      <FeedInner>

        {/* Header */}
        <header style={{ padding: "32px 16px 18px", textAlign: "center" }}>
          <h1 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: "2.1rem", fontWeight: 600, lineHeight: 1.1,
            color: "var(--med-color-text-primary)", margin: 0, letterSpacing: "0.01em",
          }}>
            Our Little One
          </h1>
          <p style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: "0.8125rem",
            color: "var(--med-color-text-muted)", margin: "6px 0 0",
          }}>
            A private family journal
          </p>
        </header>

        {/* Create post bar */}
        <div
          onClick={() => setShowCreate(true)}
          style={{
            margin: "0 12px 20px", padding: "11px 14px",
            background: "var(--med-color-surface)",
            backdropFilter: "blur(20px) saturate(1.4)",
            WebkitBackdropFilter: "blur(20px) saturate(1.4)",
            borderRadius: 16, border: "1px solid var(--med-color-border)",
            display: "flex", alignItems: "center", gap: 10,
            cursor: "pointer", transition: "all 140ms ease",
          }}
        >
          <Avatar name="Alex" size={32} />
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.9rem", color: "var(--med-color-text-muted)", flex: 1 }}>
            Share a moment…
          </span>
          <IconCamera size={16} color="var(--med-color-text-muted)" />
        </div>

        {/* Feed */}
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={{ ...post, comments: [...post.comments, ...(extraComments[post.id] ?? [])] }}
            myReactions={myReactions[post.id] ?? new Set()}
            onReact={emoji => toggleReaction(post.id, emoji)}
            onOpen={() => setOpenPost(post)}
          />
        ))}

      </FeedInner>

      {/* Bottom nav */}
      <Navbar
        activeId={activeNav}
        onSelect={handleNavSelect}
        items={[
          { id: "feed", icon: <IconHome size={20} />,   label: "Feed" },
          { id: "post", icon: <IconPencil size={20} />, label: "New Post" },
        ]}
      />

      {/* Create post modal */}
      <Modal
        opened={showCreate}
        onClose={() => setShowCreate(false)}
        title="New moment"
        styles={{ title: { fontFamily: '"Cormorant Garamond", serif', fontSize: "1.25rem", fontWeight: 600 } }}
      >
        <CreatePost onPost={post => { setPosts(p => [post, ...p]); setShowCreate(false); }} onClose={() => setShowCreate(false)} />
      </Modal>

      {/* Full screen post */}
      {openPost && (
        <FullScreenPost
          post={openPost}
          myReactions={myReactions[openPost.id] ?? new Set()}
          onReact={emoji => toggleReaction(openPost.id, emoji)}
          extraComments={extraComments[openPost.id] ?? []}
          onAddComment={text => addComment(openPost.id, text)}
          onClose={() => setOpenPost(null)}
        />
      )}
    </Page>
  );
}
