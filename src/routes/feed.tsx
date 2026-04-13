import { useState, useRef } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { styled } from "@alex.radulescu/styled-static";
import { Modal, Textarea } from "@mantine/core";
import { IconHome, IconPencil, IconBookmark, IconUser, IconCamera, IconX } from "@tabler/icons-react";
import { Navbar } from "@/components/Navbar";
import {
  Avatar, ImageCarousel, ReactionBar, FullScreenPost,
  formatTime, COPPER_GRADIENT,
} from "@/components/PostComponents";
import { useSaved, toggleSave } from "@/data/savedStore";
import { mockPosts } from "@/data/feedMockData";
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

// ─── Nav items ────────────────────────────────────────────────────────────────

const NAV = [
  { id: "feed",     icon: <IconHome size={20} />,     label: "Feed" },
  { id: "post",     icon: <IconPencil size={20} />,   label: "New Post" },
  { id: "saved",    icon: <IconBookmark size={20} />, label: "Saved" },
  { id: "settings", icon: <IconUser size={20} />,     label: "Profile" },
];

// ─── Post Card ────────────────────────────────────────────────────────────────

function PostCard({
  post, myReactions, onReact, onOpen, isSaved, onSave,
}: {
  post: Post;
  myReactions: Set<string>;
  onReact: (emoji: string) => void;
  onOpen: () => void;
  isSaved: boolean;
  onSave: () => void;
}) {
  return (
    <div style={{
      background: "var(--med-color-surface)",
      backdropFilter: "blur(20px) saturate(1.4)", WebkitBackdropFilter: "blur(20px) saturate(1.4)",
      borderRadius: 20, border: "1px solid var(--med-color-border)",
      overflow: "hidden", margin: "0 12px 16px",
      boxShadow: "0 4px 16px rgba(120,80,40,0.08)",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px 10px" }}>
        <div onClick={onOpen} style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, cursor: "pointer" }}>
          <Avatar name={post.author} size={38} />
          <div>
            <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.9rem", fontWeight: 600, color: "var(--med-color-text-primary)" }}>
              {post.author}
            </div>
            <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.75rem", color: "var(--med-color-text-muted)", marginTop: 1 }}>
              {formatTime(post.at)}
            </div>
          </div>
        </div>
        {/* Save button */}
        <button
          onClick={e => { e.stopPropagation(); onSave(); }}
          aria-label={isSaved ? "Remove from saved" : "Save post"}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 2px", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <IconBookmark
            size={20}
            color={isSaved ? "var(--med-color-accent)" : "var(--med-color-text-muted)"}
            stroke={isSaved ? 2.5 : 1.5}
          />
        </button>
      </div>

      {/* Images */}
      {post.images.length > 0 && (
        <div onClick={onOpen} style={{ cursor: "pointer" }}>
          <ImageCarousel images={post.images} />
        </div>
      )}

      {/* Caption */}
      {post.caption && (
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.9375rem", lineHeight: 1.55, color: "var(--med-color-text-primary)", margin: 0, padding: post.images.length > 0 ? "10px 14px 4px" : "2px 14px 4px" }}>
          {post.caption}
        </p>
      )}

      {/* Reactions */}
      <ReactionBar baseReactions={post.reactions} mySet={myReactions} onToggle={onReact} />

      {/* Comments preview */}
      {post.comments.length > 0 && (
        <div onClick={onOpen} style={{ padding: "2px 14px 12px", cursor: "pointer" }}>
          {post.comments.slice(-2).map(c => (
            <div key={c.id} style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.8125rem", color: "var(--med-color-text-secondary)", marginBottom: 3, lineHeight: 1.5 }}>
              <span style={{ fontWeight: 600, color: "var(--med-color-text-primary)" }}>{c.user}</span>
              {" "}{c.text}
            </div>
          ))}
          {post.comments.length > 2 && (
            <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.75rem", color: "var(--med-color-text-muted)", marginTop: 5 }}>
              View all {post.comments.length} comments →
            </div>
          )}
        </div>
      )}
      {post.comments.length === 0 && <div style={{ height: 4 }} />}
    </div>
  );
}

// ─── Create Post ──────────────────────────────────────────────────────────────

function CreatePost({ onPost, onClose }: { onPost: (post: Post) => void; onClose: () => void }) {
  const [caption,  setCaption]  = useState("");
  const [previews, setPreviews] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const canPost = caption.trim().length > 0 || previews.length > 0;

  const handlePost = () => {
    if (!canPost) return;
    onPost({ id: Date.now().toString(), author: "Alex", at: new Date().toISOString(), caption: caption.trim(), images: previews, reactions: [], comments: [] });
    onClose();
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <Avatar name="Alex" size={36} />
        <Textarea
          placeholder="Share a moment with the family…"
          value={caption} onChange={e => setCaption(e.target.value)}
          autosize minRows={3} style={{ flex: 1 }}
          styles={{ input: { borderRadius: 12, background: "var(--med-color-input-bg)", border: "1px solid var(--med-color-border)", fontFamily: '"DM Sans", sans-serif', fontSize: "0.9375rem", color: "var(--med-color-text-primary)", resize: "none" } }}
        />
      </div>

      {previews.length > 0 && (
        <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "4px 0 10px" }}>
          {previews.map((src, i) => (
            <div key={i} style={{ position: "relative", flexShrink: 0 }}>
              <img src={src} alt="" style={{ width: 80, height: 80, borderRadius: 10, objectFit: "cover", display: "block" }} />
              <button
                onClick={() => setPreviews(p => p.filter((_, j) => j !== i))}
                style={{ position: "absolute", top: -6, right: -6, width: 20, height: 20, borderRadius: "50%", background: "rgba(42,33,24,0.8)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}
              >
                <IconX size={10} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
        <button
          onClick={() => fileRef.current?.click()}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 999, border: "1px solid var(--med-color-border)", background: "var(--med-color-surface-deep)", cursor: "pointer", fontFamily: '"DM Sans", sans-serif', fontSize: "0.8125rem", fontWeight: 500, color: "var(--med-color-text-secondary)" }}
        >
          <IconCamera size={15} /> Photo
        </button>
        <div style={{ flex: 1 }} />
        <button
          onClick={handlePost} disabled={!canPost}
          style={{ padding: "8px 24px", borderRadius: 999, background: canPost ? COPPER_GRADIENT : "var(--med-color-border)", border: "none", cursor: canPost ? "pointer" : "default", fontFamily: '"DM Sans", sans-serif', fontSize: "0.9rem", fontWeight: 600, color: canPost ? "#fff" : "var(--med-color-text-muted)", transition: "all 140ms ease" }}
        >
          Post
        </button>
      </div>

      <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }}
        onChange={e => { if (e.target.files) setPreviews(p => [...p, ...Array.from(e.target.files!).map(f => URL.createObjectURL(f))]); }}
      />
    </div>
  );
}

// ─── Feed Page ────────────────────────────────────────────────────────────────

function FeedPage() {
  const navigate   = useNavigate();
  const savedIds   = useSaved();

  const [posts,         setPosts]         = useState<Post[]>(mockPosts);
  const [myReactions,   setMyReactions]   = useState<Record<string, Set<string>>>({});
  const [extraComments, setExtraComments] = useState<Record<string, Comment[]>>({});
  const [openPost,      setOpenPost]      = useState<Post | null>(null);
  const [showCreate,    setShowCreate]    = useState(false);

  const toggleReaction = (postId: string, emoji: string) => {
    setMyReactions(prev => {
      const set = new Set(prev[postId] ?? []);
      if (set.has(emoji)) set.delete(emoji); else set.add(emoji);
      return { ...prev, [postId]: set };
    });
  };

  const addComment = (postId: string, text: string) => {
    const c: Comment = { id: `new-${Date.now()}`, user: "Alex", text, at: new Date().toISOString() };
    setExtraComments(prev => ({ ...prev, [postId]: [...(prev[postId] ?? []), c] }));
  };

  const handleNav = (id: string) => {
    if (id === "post")     { setShowCreate(true); return; }
    if (id === "saved")    navigate({ to: "/saved" });
    if (id === "settings") navigate({ to: "/settings" });
  };

  return (
    <Page>
      <FeedInner>

        {/* Header */}
        <header style={{ padding: "32px 16px 18px", textAlign: "center" }}>
          <h1 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "2.1rem", fontWeight: 600, lineHeight: 1.1, color: "var(--med-color-text-primary)", margin: 0, letterSpacing: "0.01em" }}>
            Our Little One
          </h1>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "0.8125rem", color: "var(--med-color-text-muted)", margin: "6px 0 0" }}>
            A private family journal
          </p>
        </header>

        {/* Create post bar */}
        <div
          onClick={() => setShowCreate(true)}
          style={{ margin: "0 12px 20px", padding: "11px 14px", background: "var(--med-color-surface)", backdropFilter: "blur(20px) saturate(1.4)", WebkitBackdropFilter: "blur(20px) saturate(1.4)", borderRadius: 16, border: "1px solid var(--med-color-border)", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", transition: "all 140ms ease" }}
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
            isSaved={savedIds.has(post.id)}
            onSave={() => toggleSave(post.id)}
          />
        ))}

      </FeedInner>

      <Navbar activeId="feed" onSelect={handleNav} items={NAV} />

      {/* Create modal */}
      <Modal opened={showCreate} onClose={() => setShowCreate(false)} title="New moment" styles={{ title: { fontFamily: '"Cormorant Garamond", serif', fontSize: "1.25rem", fontWeight: 600 } }}>
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
