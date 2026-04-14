import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { styled } from "@alex.radulescu/styled-static";
import { IconHome, IconPencil, IconBookmark, IconUser } from "@tabler/icons-react";
import { Navbar } from "@/components/Navbar";
import { Avatar, formatTime, FullScreenPost, COPPER_GRADIENT } from "@/components/PostComponents";
import { useSaved, toggleSave } from "@/data/savedStore";
import { mockPosts } from "@/data/feedMockData";
import type { Post, Comment } from "@/data/feedMockData";

export const Route = createFileRoute("/saved")({
  component: SavedPage,
});

// ─── Styled ───────────────────────────────────────────────────────────────────

const Page = styled.main`
  min-height: 100dvh;
  background: var(--med-color-bg);
  padding-bottom: 88px;
`;

const PageInner = styled.div`
  max-width: 520px;
  margin: 0 auto;
`;

// ─── Shared nav items ─────────────────────────────────────────────────────────

const NAV = [
  { id: "feed",     icon: <IconHome size={20} />,     label: "Feed" },
  { id: "post",     icon: <IconPencil size={20} />,   label: "New Post" },
  { id: "saved",    icon: <IconBookmark size={20} />, label: "Saved" },
  { id: "settings", icon: <IconUser size={20} />,     label: "Profile" },
];

// ─── Saved thumbnail ──────────────────────────────────────────────────────────

function Thumbnail({ post, onOpen }: { post: Post; onOpen: () => void }) {
  const savedIds = useSaved();
  const saved = savedIds.has(post.id);

  if (post.images.length > 0) {
    return (
      <div onClick={onOpen} style={{ position: "relative", aspectRatio: "1", cursor: "pointer", overflow: "hidden" }}>
        <img src={post.images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />

        {/* Multi-image indicator */}
        {post.images.length > 1 && (
          <div style={{ position: "absolute", top: 7, left: 8, background: "rgba(0,0,0,0.52)", borderRadius: 6, padding: "2px 7px", fontFamily: '"DM Sans", sans-serif', fontSize: "0.7rem", fontWeight: 600, color: "#fff" }}>
            1/{post.images.length}
          </div>
        )}

        {/* Reaction count */}
        {post.reactions.length > 0 && (
          <div style={{ position: "absolute", bottom: 7, left: 8, background: "rgba(0,0,0,0.45)", borderRadius: 999, padding: "2px 8px", fontFamily: '"DM Sans", sans-serif', fontSize: "0.72rem", color: "#fff" }}>
            {post.reactions.length} ❤️
          </div>
        )}

        {/* Unsave button */}
        <button
          onClick={e => { e.stopPropagation(); toggleSave(post.id); }}
          aria-label="Remove from saved"
          style={{ position: "absolute", top: 7, right: 8, width: 28, height: 28, borderRadius: "50%", background: "rgba(0,0,0,0.5)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <IconBookmark size={14} color={saved ? "#C68D4A" : "#fff"} stroke={saved ? 2.5 : 1.5} />
        </button>
      </div>
    );
  }

  // Text-only post — full width row
  return (
    <div onClick={onOpen} style={{
      gridColumn: "span 2",
      background: "var(--med-color-surface)",
      backdropFilter: "blur(20px) saturate(1.4)", WebkitBackdropFilter: "blur(20px) saturate(1.4)",
      border: "none", borderTop: "0.5px solid var(--med-color-divider)",
      padding: "14px 16px", cursor: "pointer",
      display: "flex", alignItems: "flex-start", gap: 12,
    }}>
      <Avatar name={post.author} size={34} />
      <div style={{ flex: 1 }}>
        <p style={{
          fontFamily: '"DM Sans", sans-serif', fontSize: "0.9rem", lineHeight: 1.55,
          color: "var(--med-color-text-primary)", margin: "0 0 5px",
          display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {post.caption}
        </p>
        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.75rem", color: "var(--med-color-text-muted)" }}>
          {formatTime(post.at)}
        </span>
      </div>
      <button
        onClick={e => { e.stopPropagation(); toggleSave(post.id); }}
        aria-label="Remove from saved"
        style={{ background: "none", border: "none", cursor: "pointer", padding: 4, flexShrink: 0 }}
      >
        <IconBookmark size={16} color="var(--med-color-accent)" stroke={2.5} />
      </button>
    </div>
  );
}

// ─── Saved Page ───────────────────────────────────────────────────────────────

function SavedPage() {
  const navigate   = useNavigate();
  const savedIds   = useSaved();
  const savedPosts = mockPosts.filter(p => savedIds.has(p.id));

  const [openPost,       setOpenPost]       = useState<Post | null>(null);
  const [myReactions,    setMyReactions]    = useState<Record<string, Set<string>>>({});
  const [extraComments,  setExtraComments]  = useState<Record<string, Comment[]>>({});

  const toggleReaction = (postId: string, emoji: string) => {
    setMyReactions(prev => {
      const set = new Set(prev[postId] ?? []);
      if (set.has(emoji)) set.delete(emoji); else set.add(emoji);
      return { ...prev, [postId]: set };
    });
  };

  const addComment = (postId: string, text: string) => {
    const c: Comment = { id: `s-${Date.now()}`, user: "Alex", text, at: new Date().toISOString() };
    setExtraComments(prev => ({ ...prev, [postId]: [...(prev[postId] ?? []), c] }));
  };

  const handleNav = (id: string) => {
    if (id === "feed" || id === "post") navigate({ to: "/feed" });
    else if (id === "settings") navigate({ to: "/settings" });
  };

  return (
    <Page>
      <PageInner>

        {/* Header */}
        <header style={{ padding: "32px 16px 20px", textAlign: "center" }}>
          <h1 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "2.1rem", fontWeight: 600, lineHeight: 1.1, color: "var(--med-color-text-primary)", margin: 0, letterSpacing: "0.01em" }}>
            Saved
          </h1>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.8125rem", color: "var(--med-color-text-muted)", margin: "6px 0 0" }}>
            {savedPosts.length === 0 ? "Nothing saved yet" : `${savedPosts.length} saved post${savedPosts.length !== 1 ? "s" : ""}`}
          </p>
        </header>

        {savedPosts.length === 0 ? (

          /* ── Empty state ── */
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 32px", gap: 16 }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--med-color-surface-deep)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconBookmark size={32} color="var(--med-color-text-muted)" />
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "1rem", fontWeight: 600, color: "var(--med-color-text-primary)", margin: "0 0 6px" }}>
                Save posts you love
              </p>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.875rem", color: "var(--med-color-text-muted)", margin: 0, lineHeight: 1.55 }}>
                Tap the bookmark icon on any post<br />to save it here for later.
              </p>
            </div>
            <button
              onClick={() => navigate({ to: "/feed" })}
              style={{ marginTop: 8, padding: "9px 24px", borderRadius: 999, background: COPPER_GRADIENT, border: "none", cursor: "pointer", fontFamily: '"DM Sans", sans-serif', fontSize: "0.9rem", fontWeight: 600, color: "#fff" }}
            >
              Go to Feed
            </button>
          </div>

        ) : (

          /* ── Grid ── */
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "var(--med-color-divider)" }}>
            {savedPosts.map(post => (
              <Thumbnail key={post.id} post={post} onOpen={() => setOpenPost(post)} />
            ))}
          </div>

        )}

      </PageInner>

      <Navbar activeId="saved" onSelect={handleNav} items={NAV} />

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
