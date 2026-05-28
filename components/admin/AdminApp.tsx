"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  type SiteContent,
  type Demo,
  type SessionRow,
  type GalleryPhoto,
  type Faq,
} from "@/lib/content";

function galleryPublicUrl(path: string | null): string | undefined {
  if (!path) return undefined;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return undefined;
  return `${base}/storage/v1/object/public/gallery/${path}`;
}

type Tab = "content" | "demos" | "sessions" | "gallery" | "faqs";

const TABS: { id: Tab; label: string }[] = [
  { id: "content", label: "Copy" },
  { id: "demos", label: "Demos" },
  { id: "sessions", label: "Sessions" },
  { id: "gallery", label: "Gallery" },
  { id: "faqs", label: "FAQ" },
];

const COLORS = ["sky", "peach", "mint", "pink"];

export function AdminApp({
  email,
  initialContent,
  initialDemos,
  initialSessions,
  initialGallery,
  initialFaqs,
}: {
  email: string;
  initialContent: SiteContent;
  initialDemos: Demo[];
  initialSessions: SessionRow[];
  initialGallery: GalleryPhoto[];
  initialFaqs: Faq[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("content");
  const [toast, setToast] = useState<string | null>(null);

  const ping = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const signOut = async () => {
    await createClient().auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="adm">
      <div className="adm-bar">
        <div className="brand serif">Yu+Me admin</div>
        <div className="adm-actions" style={{ margin: 0 }}>
          <span className="who">{email}</span>
          <button className="adm-btn ghost" onClick={signOut}>
            Sign out
          </button>
        </div>
      </div>

      <div className="adm-wrap">
        <div className="adm-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`adm-tab${tab === t.id ? " active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "content" && (
          <ContentEditor initial={initialContent} onSaved={ping} />
        )}
        {tab === "demos" && (
          <DemosEditor initial={initialDemos} onSaved={ping} reload={router.refresh} />
        )}
        {tab === "sessions" && (
          <SessionsEditor initial={initialSessions} onSaved={ping} reload={router.refresh} />
        )}
        {tab === "gallery" && (
          <GalleryEditor initial={initialGallery} onSaved={ping} reload={router.refresh} />
        )}
        {tab === "faqs" && (
          <FaqsEditor initial={initialFaqs} onSaved={ping} reload={router.refresh} />
        )}
      </div>

      {toast && <div className="adm-toast">{toast}</div>}
    </div>
  );
}

/* ---------------- shared field helpers ---------------- */

function Field({
  label,
  value,
  onChange,
  area,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  area?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="adm-field">
      <label>{label}</label>
      {area ? (
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

/* ---------------- Content (all copy) ---------------- */

function ContentEditor({
  initial,
  onSaved,
}: {
  initial: SiteContent;
  onSaved: (m: string) => void;
}) {
  const [c, setC] = useState<SiteContent>(initial);
  const [saving, setSaving] = useState(false);

  // mutate a clone, then commit — keeps deep updates simple.
  const set = (fn: (draft: SiteContent) => void) => {
    setC((prev) => {
      const draft = structuredClone(prev);
      fn(draft);
      return draft;
    });
  };

  const save = async () => {
    setSaving(true);
    const { error } = await createClient()
      .from("site_content")
      .upsert({ id: 1, data: c });
    setSaving(false);
    onSaved(error ? `Error: ${error.message}` : "Copy saved");
  };

  return (
    <>
      <div className="adm-card">
        <h3>Hero</h3>
        {c.hero.metaRows.map((row, i) => (
          <div className="adm-row" key={i}>
            <Field
              label={`Meta ${i + 1} · JP`}
              value={row.jp}
              onChange={(v) => set((d) => void (d.hero.metaRows[i].jp = v))}
            />
            <Field
              label={`Meta ${i + 1} · EN`}
              value={row.en}
              onChange={(v) => set((d) => void (d.hero.metaRows[i].en = v))}
            />
          </div>
        ))}
        <Field
          label="Tagline — lead"
          area
          value={c.hero.taglineLead}
          onChange={(v) => set((d) => void (d.hero.taglineLead = v))}
        />
        <Field
          label="Tagline — highlighted phrase"
          value={c.hero.taglineEm}
          onChange={(v) => set((d) => void (d.hero.taglineEm = v))}
        />
        <Field
          label="Tagline — tail"
          area
          value={c.hero.taglineTail}
          onChange={(v) => set((d) => void (d.hero.taglineTail = v))}
        />
        <div className="adm-row">
          <Field
            label="Primary CTA"
            value={c.hero.ctaPrimary}
            onChange={(v) => set((d) => void (d.hero.ctaPrimary = v))}
          />
          <Field
            label="Secondary CTA"
            value={c.hero.ctaSecondary}
            onChange={(v) => set((d) => void (d.hero.ctaSecondary = v))}
          />
        </div>
        <Field
          label="Next-gathering eyebrow"
          value={c.hero.nextEyebrow}
          onChange={(v) => set((d) => void (d.hero.nextEyebrow = v))}
        />
      </div>

      <div className="adm-card">
        <h3>Next session</h3>
        <div className="adm-row">
          <Field
            label="Date label"
            value={c.next.dateLabel}
            onChange={(v) => set((d) => void (d.next.dateLabel = v))}
          />
          <Field
            label="Date short"
            value={c.next.dateShort}
            onChange={(v) => set((d) => void (d.next.dateShort = v))}
          />
        </div>
        <div className="adm-row">
          <Field
            label="Time label"
            value={c.next.timeLabel}
            onChange={(v) => set((d) => void (d.next.timeLabel = v))}
          />
          <Field
            label="Location label"
            value={c.next.locationLabel}
            onChange={(v) => set((d) => void (d.next.locationLabel = v))}
          />
        </div>
        <Field
          label="Luma URL"
          value={c.next.lumaUrl}
          onChange={(v) => set((d) => void (d.next.lumaUrl = v))}
        />
      </div>

      <div className="adm-card">
        <h3>Manifesto</h3>
        <Field
          label="Eyebrow"
          value={c.manifesto.eyebrow}
          onChange={(v) => set((d) => void (d.manifesto.eyebrow = v))}
        />
        <div className="adm-row">
          <Field
            label="Heading line 1"
            value={c.manifesto.headingLine1}
            onChange={(v) => set((d) => void (d.manifesto.headingLine1 = v))}
          />
          <Field
            label="Heading — italic"
            value={c.manifesto.headingEm}
            onChange={(v) => set((d) => void (d.manifesto.headingEm = v))}
          />
        </div>
        <Field
          label="Heading line 3"
          value={c.manifesto.headingLine3}
          onChange={(v) => set((d) => void (d.manifesto.headingLine3 = v))}
        />
        {c.manifesto.paragraphs.map((p, i) => (
          <Field
            key={i}
            label={`Paragraph ${i + 1} (use [socratica] for the link)`}
            area
            value={p}
            onChange={(v) => set((d) => void (d.manifesto.paragraphs[i] = v))}
          />
        ))}
        <Field
          label="Socratica URL"
          value={c.manifesto.socraticaUrl}
          onChange={(v) => set((d) => void (d.manifesto.socraticaUrl = v))}
        />
        <Field
          label="Emphasis line"
          value={c.manifesto.emph}
          onChange={(v) => set((d) => void (d.manifesto.emph = v))}
        />
        <Field
          label="Emphasis line (pink)"
          value={c.manifesto.emphPink}
          onChange={(v) => set((d) => void (d.manifesto.emphPink = v))}
        />
        {c.manifesto.stats.map((s, i) => (
          <div className="adm-row" key={i}>
            <Field
              label={`Stat ${i + 1} — number`}
              value={s.n}
              onChange={(v) => set((d) => void (d.manifesto.stats[i].n = v))}
            />
            <Field
              label={`Stat ${i + 1} — label`}
              value={s.l}
              onChange={(v) => set((d) => void (d.manifesto.stats[i].l = v))}
            />
          </div>
        ))}
      </div>

      <div className="adm-card">
        <h3>How a session works</h3>
        <Field
          label="Eyebrow"
          value={c.how.eyebrow}
          onChange={(v) => set((d) => void (d.how.eyebrow = v))}
        />
        <Field
          label="Heading (use a new line to split)"
          area
          value={c.how.heading}
          onChange={(v) => set((d) => void (d.how.heading = v))}
        />
        <Field
          label="Sub"
          value={c.how.sub}
          onChange={(v) => set((d) => void (d.how.sub = v))}
        />
        {c.how.steps.map((s, i) => (
          <div className="adm-card" key={i} style={{ background: "#fafafa" }}>
            <div className="adm-row">
              <Field
                label="Number"
                value={s.n}
                onChange={(v) => set((d) => void (d.how.steps[i].n = v))}
              />
              <Field
                label="JP"
                value={s.jp}
                onChange={(v) => set((d) => void (d.how.steps[i].jp = v))}
              />
            </div>
            <Field
              label="Title"
              value={s.t}
              onChange={(v) => set((d) => void (d.how.steps[i].t = v))}
            />
            <Field
              label="Body"
              area
              value={s.body}
              onChange={(v) => set((d) => void (d.how.steps[i].body = v))}
            />
            <ColorPicker
              value={s.color}
              onChange={(v) => set((d) => void (d.how.steps[i].color = v))}
            />
          </div>
        ))}
      </div>

      <div className="adm-card">
        <h3>Upcoming</h3>
        <Field
          label="Eyebrow"
          value={c.upcoming.eyebrow}
          onChange={(v) => set((d) => void (d.upcoming.eyebrow = v))}
        />
        <Field
          label="Heading"
          value={c.upcoming.heading}
          onChange={(v) => set((d) => void (d.upcoming.heading = v))}
        />
        <Field
          label="Luma URL"
          value={c.upcoming.lumaUrl}
          onChange={(v) => set((d) => void (d.upcoming.lumaUrl = v))}
        />
      </div>

      <div className="adm-card">
        <h3>Demos heading</h3>
        <Field
          label="Eyebrow"
          value={c.demos.eyebrow}
          onChange={(v) => set((d) => void (d.demos.eyebrow = v))}
        />
        <Field
          label="Heading (use a new line to split)"
          area
          value={c.demos.heading}
          onChange={(v) => set((d) => void (d.demos.heading = v))}
        />
        <Field
          label="Sub"
          area
          value={c.demos.sub}
          onChange={(v) => set((d) => void (d.demos.sub = v))}
        />
      </div>

      <div className="adm-card">
        <h3>Gallery heading</h3>
        <Field
          label="Eyebrow"
          value={c.gallery.eyebrow}
          onChange={(v) => set((d) => void (d.gallery.eyebrow = v))}
        />
        <Field
          label="Heading"
          value={c.gallery.heading}
          onChange={(v) => set((d) => void (d.gallery.heading = v))}
        />
        <Field
          label="Sub"
          value={c.gallery.sub}
          onChange={(v) => set((d) => void (d.gallery.sub = v))}
        />
        <Field
          label="Instagram URL"
          value={c.gallery.instagramUrl}
          onChange={(v) => set((d) => void (d.gallery.instagramUrl = v))}
        />
      </div>

      <div className="adm-card">
        <h3>FAQ heading</h3>
        <Field
          label="Eyebrow"
          value={c.faqHeading.eyebrow}
          onChange={(v) => set((d) => void (d.faqHeading.eyebrow = v))}
        />
        <Field
          label="Heading"
          value={c.faqHeading.heading}
          onChange={(v) => set((d) => void (d.faqHeading.heading = v))}
        />
      </div>

      <div className="adm-card">
        <h3>Join CTA</h3>
        <Field
          label="Eyebrow"
          value={c.join.eyebrow}
          onChange={(v) => set((d) => void (d.join.eyebrow = v))}
        />
        <Field
          label="Title (use a new line to split)"
          area
          value={c.join.title}
          onChange={(v) => set((d) => void (d.join.title = v))}
        />
        <div className="adm-row">
          <Field
            label="Luma URL"
            value={c.join.lumaUrl}
            onChange={(v) => set((d) => void (d.join.lumaUrl = v))}
          />
          <Field
            label="Reminder email"
            value={c.join.reminderEmail}
            onChange={(v) => set((d) => void (d.join.reminderEmail = v))}
          />
        </div>
      </div>

      <div className="adm-card">
        <h3>Footer</h3>
        <Field
          label="Tagline (use a new line to split)"
          area
          value={c.footer.tagline}
          onChange={(v) => set((d) => void (d.footer.tagline = v))}
        />
        <label className="adm-field" style={{ marginBottom: 6 }}>
          <span style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".04em", color: "var(--ink-soft)" }}>
            Find-us links
          </span>
        </label>
        {c.footer.findUs.map((l, i) => (
          <div className="adm-row" key={i}>
            <Field
              label={`Link ${i + 1} — label`}
              value={l.label}
              onChange={(v) => set((d) => void (d.footer.findUs[i].label = v))}
            />
            <Field
              label={`Link ${i + 1} — URL`}
              value={l.url}
              onChange={(v) => set((d) => void (d.footer.findUs[i].url = v))}
            />
          </div>
        ))}
        <label className="adm-field" style={{ marginBottom: 6 }}>
          <span style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".04em", color: "var(--ink-soft)" }}>
            Socratica links
          </span>
        </label>
        {c.footer.socratica.map((l, i) => (
          <div className="adm-row" key={i}>
            <Field
              label={`Link ${i + 1} — label`}
              value={l.label}
              onChange={(v) => set((d) => void (d.footer.socratica[i].label = v))}
            />
            <Field
              label={`Link ${i + 1} — URL`}
              value={l.url}
              onChange={(v) => set((d) => void (d.footer.socratica[i].url = v))}
            />
          </div>
        ))}
        <Field
          label="Reminder copy"
          value={c.footer.remindCopy}
          onChange={(v) => set((d) => void (d.footer.remindCopy = v))}
        />
        <div className="adm-row">
          <Field
            label="Bottom-left"
            value={c.footer.bottomLeft}
            onChange={(v) => set((d) => void (d.footer.bottomLeft = v))}
          />
          <Field
            label="Bottom-right"
            value={c.footer.bottomRight}
            onChange={(v) => set((d) => void (d.footer.bottomRight = v))}
          />
        </div>
      </div>

      <div className="adm-actions">
        <button className="adm-btn" onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save all copy"}
        </button>
      </div>
    </>
  );
}

function ColorPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="adm-field">
      <label>Color</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {COLORS.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ---------------- generic collection save ---------------- */

async function persistCollection<T extends { id: string; sort_order: number }>(
  table: string,
  items: T[],
  deletedIds: string[]
): Promise<string | null> {
  const sb = createClient();
  if (deletedIds.length) {
    const { error } = await sb.from(table).delete().in("id", deletedIds);
    if (error) return error.message;
  }
  for (let i = 0; i < items.length; i++) {
    const row = { ...items[i], sort_order: i };
    if (row.id.startsWith("new-")) {
      const { id, ...insert } = row;
      const { error } = await sb.from(table).insert(insert);
      if (error) return error.message;
    } else {
      const { error } = await sb.from(table).update(row).eq("id", row.id);
      if (error) return error.message;
    }
  }
  return null;
}

function useCollection<T extends { id: string; sort_order: number }>(initial: T[]) {
  const [items, setItems] = useState<T[]>(initial);
  const [deleted, setDeleted] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const update = (id: string, patch: Partial<T>) =>
    setItems((xs) => xs.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const remove = (id: string) => {
    setItems((xs) => xs.filter((x) => x.id !== id));
    if (!id.startsWith("new-")) setDeleted((d) => [...d, id]);
  };

  const add = (blank: Omit<T, "id" | "sort_order">) =>
    setItems((xs) => [
      ...xs,
      { ...blank, id: `new-${Date.now()}`, sort_order: xs.length } as T,
    ]);

  const move = (id: string, dir: -1 | 1) =>
    setItems((xs) => {
      const i = xs.findIndex((x) => x.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= xs.length) return xs;
      const next = [...xs];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  return { items, setItems, deleted, setDeleted, saving, setSaving, update, remove, add, move };
}

function ItemHead({
  title,
  onUp,
  onDown,
  onDelete,
}: {
  title: string;
  onUp: () => void;
  onDown: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="adm-item-head">
      <span className="ord">{title}</span>
      <div className="adm-actions" style={{ margin: 0 }}>
        <button className="adm-btn ghost" onClick={onUp}>
          ↑
        </button>
        <button className="adm-btn ghost" onClick={onDown}>
          ↓
        </button>
        <button className="adm-btn danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

/* ---------------- Demos ---------------- */

function DemosEditor({
  initial,
  onSaved,
  reload,
}: {
  initial: Demo[];
  onSaved: (m: string) => void;
  reload: () => void;
}) {
  const col = useCollection<Demo>(initial);

  const save = async () => {
    col.setSaving(true);
    const err = await persistCollection("demos", col.items, col.deleted);
    col.setSaving(false);
    onSaved(err ? `Error: ${err}` : "Demos saved");
    if (!err) {
      col.setDeleted([]);
      reload();
    }
  };

  return (
    <>
      {col.items.map((d, i) => (
        <div className="adm-card" key={d.id}>
          <ItemHead
            title={`Demo ${i + 1}`}
            onUp={() => col.move(d.id, -1)}
            onDown={() => col.move(d.id, 1)}
            onDelete={() => col.remove(d.id)}
          />
          <div className="adm-row">
            <Field label="Tag" value={d.tag} onChange={(v) => col.update(d.id, { tag: v })} />
            <Field label="Title" value={d.title} onChange={(v) => col.update(d.id, { title: v })} />
          </div>
          <Field label="Maker" value={d.maker} onChange={(v) => col.update(d.id, { maker: v })} />
          <Field label="Body" area value={d.body} onChange={(v) => col.update(d.id, { body: v })} />
          <ColorPicker value={d.color} onChange={(v) => col.update(d.id, { color: v })} />
        </div>
      ))}
      <div className="adm-actions">
        <button
          className="adm-btn ghost"
          onClick={() =>
            col.add({ tag: "", title: "", maker: "", body: "", color: "sky" })
          }
        >
          + Add demo
        </button>
        <button className="adm-btn" onClick={save} disabled={col.saving}>
          {col.saving ? "Saving…" : "Save demos"}
        </button>
      </div>
    </>
  );
}

/* ---------------- Sessions ---------------- */

function SessionsEditor({
  initial,
  onSaved,
  reload,
}: {
  initial: SessionRow[];
  onSaved: (m: string) => void;
  reload: () => void;
}) {
  const col = useCollection<SessionRow>(initial);

  const setNext = (id: string) =>
    col.setItems((xs) => xs.map((x) => ({ ...x, is_next: x.id === id })));

  const save = async () => {
    col.setSaving(true);
    const err = await persistCollection("sessions", col.items, col.deleted);
    col.setSaving(false);
    onSaved(err ? `Error: ${err}` : "Sessions saved");
    if (!err) {
      col.setDeleted([]);
      reload();
    }
  };

  return (
    <>
      {col.items.map((s, i) => (
        <div className="adm-card" key={s.id}>
          <ItemHead
            title={`Session ${i + 1}`}
            onUp={() => col.move(s.id, -1)}
            onDown={() => col.move(s.id, 1)}
            onDelete={() => col.remove(s.id)}
          />
          <div className="adm-row">
            <Field label="Date label" value={s.date_label} onChange={(v) => col.update(s.id, { date_label: v })} />
            <Field label="Day" value={s.day} onChange={(v) => col.update(s.id, { day: v })} />
          </div>
          <Field label="Title" value={s.title} onChange={(v) => col.update(s.id, { title: v })} />
          <div className="adm-row">
            <Field label="Location" value={s.location} onChange={(v) => col.update(s.id, { location: v })} />
            <Field label="Spots" value={s.spots} onChange={(v) => col.update(s.id, { spots: v })} />
          </div>
          <Field label="Luma URL" value={s.luma_url} onChange={(v) => col.update(s.id, { luma_url: v })} />
          <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 14 }}>
            <input
              type="radio"
              name="is_next"
              checked={s.is_next}
              onChange={() => setNext(s.id)}
              style={{ width: "auto" }}
            />
            This is the next session
          </label>
        </div>
      ))}
      <div className="adm-actions">
        <button
          className="adm-btn ghost"
          onClick={() =>
            col.add({
              date_label: "",
              day: "Sat",
              title: "",
              location: "",
              spots: "",
              luma_url: "",
              is_next: false,
            })
          }
        >
          + Add session
        </button>
        <button className="adm-btn" onClick={save} disabled={col.saving}>
          {col.saving ? "Saving…" : "Save sessions"}
        </button>
      </div>
    </>
  );
}

/* ---------------- Gallery ---------------- */

function GalleryEditor({
  initial,
  onSaved,
  reload,
}: {
  initial: GalleryPhoto[];
  onSaved: (m: string) => void;
  reload: () => void;
}) {
  const col = useCollection<GalleryPhoto>(initial);
  const [uploading, setUploading] = useState<string | null>(null);

  const upload = async (id: string, file: File) => {
    setUploading(id);
    const sb = createClient();
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await sb.storage.from("gallery").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    setUploading(null);
    if (error) {
      onSaved(`Upload error: ${error.message}`);
      return;
    }
    col.update(id, { image_path: path });
    onSaved("Photo uploaded — remember to Save");
  };

  const save = async () => {
    col.setSaving(true);
    const err = await persistCollection("gallery_photos", col.items, col.deleted);
    col.setSaving(false);
    onSaved(err ? `Error: ${err}` : "Gallery saved");
    if (!err) {
      col.setDeleted([]);
      reload();
    }
  };

  return (
    <>
      {col.items.map((g, i) => (
        <div className="adm-card" key={g.id}>
          <ItemHead
            title={`Photo ${i + 1}`}
            onUp={() => col.move(g.id, -1)}
            onDown={() => col.move(g.id, 1)}
            onDelete={() => col.remove(g.id)}
          />
          <div className="adm-row">
            <Field label="Date label" value={g.date_label} onChange={(v) => col.update(g.id, { date_label: v })} />
            <Field label="Tilt (e.g. -3deg)" value={g.tilt} onChange={(v) => col.update(g.id, { tilt: v })} />
          </div>
          {g.image_path ? (
            <img
              src={galleryPublicUrl(g.image_path)}
              alt=""
              style={{ width: 140, height: 140, objectFit: "cover", borderRadius: 8, border: "1px solid var(--line)" }}
            />
          ) : (
            <p className="adm-muted">No image yet — striped placeholder shown on the site.</p>
          )}
          <div className="adm-field">
            <label>{g.image_path ? "Replace photo" : "Upload photo"}</label>
            <input
              type="file"
              accept="image/*"
              disabled={uploading === g.id}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) upload(g.id, f);
              }}
            />
            {uploading === g.id && <span className="adm-muted">Uploading…</span>}
          </div>
        </div>
      ))}
      <div className="adm-actions">
        <button
          className="adm-btn ghost"
          onClick={() => col.add({ image_path: null, date_label: "", tilt: "0deg" })}
        >
          + Add photo slot
        </button>
        <button className="adm-btn" onClick={save} disabled={col.saving}>
          {col.saving ? "Saving…" : "Save gallery"}
        </button>
      </div>
    </>
  );
}

/* ---------------- FAQ ---------------- */

function FaqsEditor({
  initial,
  onSaved,
  reload,
}: {
  initial: Faq[];
  onSaved: (m: string) => void;
  reload: () => void;
}) {
  const col = useCollection<Faq>(initial);

  const save = async () => {
    col.setSaving(true);
    const err = await persistCollection("faqs", col.items, col.deleted);
    col.setSaving(false);
    onSaved(err ? `Error: ${err}` : "FAQ saved");
    if (!err) {
      col.setDeleted([]);
      reload();
    }
  };

  return (
    <>
      {col.items.map((f, i) => (
        <div className="adm-card" key={f.id}>
          <ItemHead
            title={`Q${i + 1}`}
            onUp={() => col.move(f.id, -1)}
            onDown={() => col.move(f.id, 1)}
            onDelete={() => col.remove(f.id)}
          />
          <Field label="Question" value={f.question} onChange={(v) => col.update(f.id, { question: v })} />
          <Field label="Answer" area value={f.answer} onChange={(v) => col.update(f.id, { answer: v })} />
        </div>
      ))}
      <div className="adm-actions">
        <button
          className="adm-btn ghost"
          onClick={() => col.add({ question: "", answer: "" })}
        >
          + Add question
        </button>
        <button className="adm-btn" onClick={save} disabled={col.saving}>
          {col.saving ? "Saving…" : "Save FAQ"}
        </button>
      </div>
    </>
  );
}
