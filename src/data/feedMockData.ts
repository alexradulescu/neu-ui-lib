export type EmojiType = "❤️" | "😍" | "👏" | "🎉" | "😊";
export const REACTION_EMOJIS: EmojiType[] = ["❤️", "😍", "👏", "🎉", "😊"];

export type Reaction = { emoji: EmojiType; user: string; at: string };
export type Comment  = { id: string; user: string; text: string; at: string };
export type Post     = {
  id: string; author: string; at: string;
  caption: string; images: string[];
  reactions: Reaction[]; comments: Comment[];
};

export const mockPosts: Post[] = [
  {
    id: "1",
    author: "Alex",
    at: "2026-04-13T09:30:00Z",
    caption: "Sunday morning light ✨ She discovered the garden today and wouldn't stop chasing butterflies.",
    images: [
      "https://picsum.photos/seed/flora1/600/600",
      "https://picsum.photos/seed/flora2/600/600",
      "https://picsum.photos/seed/flora3/600/600",
    ],
    reactions: [
      { emoji: "❤️", user: "Mom",          at: "2026-04-13T09:45:00Z" },
      { emoji: "😍", user: "Grandma Rose", at: "2026-04-13T09:52:00Z" },
      { emoji: "❤️", user: "Aunt Sarah",   at: "2026-04-13T10:05:00Z" },
      { emoji: "👏", user: "Uncle Mike",   at: "2026-04-13T10:15:00Z" },
      { emoji: "😍", user: "Mom",          at: "2026-04-13T10:20:00Z" },
    ],
    comments: [
      { id: "c1", user: "Mom",          text: "Oh my goodness, she's growing so fast! 😭",                           at: "2026-04-13T09:50:00Z" },
      { id: "c2", user: "Grandma Rose", text: "The light in that first photo is just magical! Send me a print?",     at: "2026-04-13T10:00:00Z" },
      { id: "c3", user: "Aunt Sarah",   text: "Look at those little legs!! I need to squeeze her cheeks asap 🥰",    at: "2026-04-13T10:08:00Z" },
    ],
  },
  {
    id: "2",
    author: "Alex",
    at: "2026-04-12T16:20:00Z",
    caption: "First time trying strawberries 🍓 The face she made was absolutely priceless.",
    images: ["https://picsum.photos/seed/picnic1/600/600"],
    reactions: [
      { emoji: "😊", user: "Mom",          at: "2026-04-12T16:35:00Z" },
      { emoji: "🎉", user: "Uncle Mike",   at: "2026-04-12T17:00:00Z" },
      { emoji: "❤️", user: "Grandma Rose", at: "2026-04-12T17:15:00Z" },
    ],
    comments: [
      { id: "c4", user: "Uncle Mike",   text: "Hahaha that expression!! Future food critic confirmed 🍓",                   at: "2026-04-12T17:05:00Z" },
      { id: "c5", user: "Grandma Rose", text: "She has your face when you tried olives as a baby, Alex! Exactly the same!", at: "2026-04-12T17:20:00Z" },
    ],
  },
  {
    id: "3",
    author: "Alex",
    at: "2026-04-11T21:00:00Z",
    caption: "She said \"dada\" clearly three times today. I may have cried a little. Actually a lot. Best day ever. 🥹",
    images: [],
    reactions: [
      { emoji: "❤️", user: "Mom",          at: "2026-04-11T21:10:00Z" },
      { emoji: "😍", user: "Grandma Rose", at: "2026-04-11T21:15:00Z" },
      { emoji: "🎉", user: "Aunt Sarah",   at: "2026-04-11T21:20:00Z" },
      { emoji: "🎉", user: "Uncle Mike",   at: "2026-04-11T21:25:00Z" },
      { emoji: "❤️", user: "Aunt Sarah",   at: "2026-04-11T21:30:00Z" },
    ],
    comments: [
      { id: "c6", user: "Mom",          text: "We heard!! She kept saying it on the video call 💕",                               at: "2026-04-11T21:12:00Z" },
      { id: "c7", user: "Grandma Rose", text: "The first word is always the sweetest. You cried because you're a wonderful father ❤️", at: "2026-04-11T21:18:00Z" },
      { id: "c8", user: "Uncle Mike",   text: "Dada is the GOAT, congrats man 🏆",                                                at: "2026-04-11T21:28:00Z" },
    ],
  },
  {
    id: "4",
    author: "Alex",
    at: "2026-04-10T14:45:00Z",
    caption: "Park day with Grandma Rose — these two are inseparable 🌿",
    images: [
      "https://picsum.photos/seed/nature1/600/600",
      "https://picsum.photos/seed/nature2/600/600",
    ],
    reactions: [
      { emoji: "😍", user: "Mom",        at: "2026-04-10T15:00:00Z" },
      { emoji: "❤️", user: "Aunt Sarah", at: "2026-04-10T15:10:00Z" },
      { emoji: "😊", user: "Uncle Mike", at: "2026-04-10T15:30:00Z" },
    ],
    comments: [
      { id: "c9",  user: "Grandma Rose", text: "The best afternoon of my whole year. My heart is full 🌿", at: "2026-04-10T15:05:00Z" },
      { id: "c10", user: "Mom",          text: "She looks so happy!! Those cheeks omg 😭",                  at: "2026-04-10T15:15:00Z" },
    ],
  },
];
