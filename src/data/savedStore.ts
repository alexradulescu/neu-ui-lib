import { useState, useEffect } from "react";

// ─── Module-level store (survives re-renders, shared across all components) ───

function load(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem("neu-saved") ?? "[]")); }
  catch { return new Set(); }
}

let _ids = load();
const _listeners = new Set<() => void>();

function _notify() {
  localStorage.setItem("neu-saved", JSON.stringify([..._ids]));
  _listeners.forEach(l => l());
}

export function toggleSave(id: string) {
  if (_ids.has(id)) _ids.delete(id); else _ids.add(id);
  _notify();
}

export function isSaved(id: string) {
  return _ids.has(id);
}

/** Reactive hook — re-renders whenever the saved set changes */
export function useSaved() {
  const [ids, setIds] = useState(() => new Set(_ids));
  useEffect(() => {
    const l = () => setIds(new Set(_ids));
    _listeners.add(l);
    return () => { _listeners.delete(l); };
  }, []);
  return ids;
}
