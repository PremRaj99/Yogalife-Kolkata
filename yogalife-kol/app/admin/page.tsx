import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin";
import { isPastEntry, normalizeFeedRows, type FeedRow } from "@/lib/event-feed";
import type { TimelineEntry } from "@/lib/event-schemas";
import { getDb } from "@/lib/mongodb";
import {
  adminSignIn,
  adminSignOut,
  createEntry,
  createPost,
  deleteEntry,
  deletePost,
  deleteRegistration,
  updateEntry,
  updatePost,
} from "./actions";
import { formatPostDate, type BlogPost } from "@/lib/blog";
import { FormDialog } from "./form-dialog";
import { BlogEditor } from "./blog-editor";
import { DateTimeFields } from "./date-time-fields";
import { matchesRegistration } from "./registration-filter";
import { EmailActions, SelectAll } from "./email-actions";
import { Toolbar, type SortOption } from "./toolbar";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

type TimelineDoc = { kind: TimelineEntry["kind"]; order: number; row: FeedRow };
type RegistrationDoc = {
  eventId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  eventTitle: string;
  createdAt: Date;
};

const tabs = [
  { id: "events", label: "Events" },
  { id: "notices", label: "Notices" },
  { id: "registrations", label: "Registrations" },
  { id: "blog", label: "Blog" },
] as const;
type Tab = (typeof tabs)[number]["id"];

const blogSorts: SortOption[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "title", label: "Title A–Z" },
];

function PostFields({ post }: { post?: BlogPost }) {
  return (
    <div className="admin-fields">
      <label className="field admin-wide">
        Title
        <input className="input" name="title" required maxLength={200} defaultValue={post?.title} />
      </label>
      <label className="field admin-wide">
        Author
        <input className="input" name="author" maxLength={100} defaultValue={post?.author} />
      </label>
      <label className="field admin-wide">
        Summary (optional, shown on the blog list)
        <textarea className="input" name="excerpt" rows={2} maxLength={300} defaultValue={post?.excerpt} />
      </label>
      <BlogEditor defaultValue={post?.body} />
    </div>
  );
}

function BlogTable({
  posts,
  query,
  sort,
}: {
  posts: (BlogPost & { _id: { toString(): string } })[];
  query: string;
  sort: string;
}) {
  const q = query.toLowerCase();
  const rows = posts
    .filter((post) => !q || [post.title, post.author, post.excerpt].join(" ").toLowerCase().includes(q))
    .sort((a, b) => {
      if (sort === "oldest") return a.publishedAt.getTime() - b.publishedAt.getTime();
      if (sort === "title") return a.title.localeCompare(b.title);
      return b.publishedAt.getTime() - a.publishedAt.getTime();
    });
  return (
    <section className="admin-panel" aria-labelledby="blog-heading">
      <div className="admin-panel-head">
        <div>
          <h2 id="blog-heading">Blog</h2>
          <p className="small muted">
            {query ? `${rows.length} of ${posts.length} shown` : `${posts.length} total`}
          </p>
        </div>
        <FormDialog label="Add post" buttonClass="button" title="Add post" submitLabel="Publish post" action={createPost}>
          <PostFields />
        </FormDialog>
      </div>
      <Toolbar tab="blog" query={query} sort={sort} options={blogSorts} placeholder="Search posts by title or author…" />
      {rows.length === 0 ? (
        <p className="admin-empty">
          {posts.length === 0 ? "No posts yet. Use “Add post” to write one." : `No posts match “${query}”.`}
        </p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Published</th>
                <th scope="col" className="admin-actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((post) => {
                const id = post._id.toString();
                return (
                  <tr key={id}>
                    <td className="admin-title-cell">{post.title}</td>
                    <td data-label="Author">{post.author || "–"}</td>
                    <td data-label="Published">{formatPostDate(post.publishedAt)}</td>
                    <td className="admin-actions-cell">
                      <div className="admin-row-actions">
                        <Link className="secondary-button" href={`/blog/${post.slug}`} target="_blank">View</Link>
                        <FormDialog label="Edit" title="Edit post" submitLabel="Save changes" action={updatePost}>
                          <input type="hidden" name="_id" value={id} />
                          <PostFields post={post} />
                        </FormDialog>
                        <FormDialog label="Delete" buttonClass="secondary-button admin-danger-outline" title="Delete post?" submitLabel="Delete" danger action={deletePost}>
                          <input type="hidden" name="_id" value={id} />
                          <p>“{post.title}” will be removed from the website. This can’t be undone.</p>
                        </FormDialog>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

const todayIst = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

const timelineSorts: SortOption[] = [
  { value: "recent", label: "Recently added" },
  { value: "date-desc", label: "Date: latest first" },
  { value: "date-asc", label: "Date: earliest first" },
  { value: "title", label: "Title A–Z" },
];
const registrationSorts: SortOption[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "name", label: "Name A–Z" },
  { value: "event", label: "Event A–Z" },
];
const pickSort = (options: SortOption[], value?: string) =>
  options.some((option) => option.value === value) ? value! : options[0].value;

function EntryFields({ entry }: { entry?: TimelineEntry }) {
  return (
    <div className="admin-fields">
      <label className="field admin-wide">
        Title
        <input className="input" name="title" required maxLength={200} defaultValue={entry?.title} />
      </label>
      <DateTimeFields
        dateKey={entry?.dateKey}
        datePrecision={entry?.datePrecision}
        dateLabel={entry?.dateLabel}
        time={entry?.time}
      />
      <label className="field admin-wide">
        Location
        <input className="input" name="location" maxLength={200} defaultValue={entry?.location} />
      </label>
      <label className="field admin-wide">
        Description
        <textarea className="input" name="description" rows={5} maxLength={5000} defaultValue={entry?.description} />
      </label>
      {entry?.image && (
        <div className="field admin-wide">
          Current image
          <Image src={entry.image} alt="" width={160} height={90} style={{ objectFit: "cover" }} />
          <label>
            <input type="checkbox" name="removeImage" /> Remove image
          </label>
        </div>
      )}
      <label className="field admin-wide">
        {entry?.image ? "Replace image (optional, max 4 MB)" : "Image (optional, max 4 MB)"}
        <input className="input" type="file" name="image" accept="image/*" />
      </label>
    </div>
  );
}

function TimelineTable({
  kind,
  docs,
  registrationCounts,
  query,
  sort,
}: {
  kind: TimelineEntry["kind"];
  docs: (TimelineDoc & { _id: { toString(): string } })[];
  registrationCounts: Map<string, number>;
  query: string;
  sort: string;
}) {
  const label = kind === "event" ? "event" : "notice";
  const today = todayIst();
  const q = query.toLowerCase();
  const rows = docs
    .flatMap((doc) => {
      const entry = normalizeFeedRows([doc.row], kind)[0];
      return entry ? [{ doc, entry }] : [];
    })
    .filter(
      ({ entry }) =>
        !q ||
        [entry.title, entry.description, entry.location, entry.dateLabel, entry.time]
          .join(" ")
          .toLowerCase()
          .includes(q),
    )
    .sort((a, b) => {
      // Undated entries go last when sorting by date.
      if (sort === "date-asc")
        return (a.entry.dateKey ?? "9999").localeCompare(b.entry.dateKey ?? "9999");
      if (sort === "date-desc")
        return (b.entry.dateKey ?? "").localeCompare(a.entry.dateKey ?? "");
      if (sort === "title") return a.entry.title.localeCompare(b.entry.title);
      return b.doc.order - a.doc.order;
    });
  return (
    <section className="admin-panel" aria-labelledby={`${kind}-heading`}>
      <div className="admin-panel-head">
        <div>
          <h2 id={`${kind}-heading`}>{kind === "event" ? "Events" : "Notices"}</h2>
          <p className="small muted">
            {query ? `${rows.length} of ${docs.length} shown` : `${docs.length} total`}
          </p>
        </div>
        <FormDialog label={`Add ${label}`} buttonClass="button" title={`Add ${label}`} submitLabel={`Add ${label}`} action={createEntry}>
          <input type="hidden" name="kind" value={kind} />
          <EntryFields />
        </FormDialog>
      </div>
      <Toolbar
        tab={kind === "event" ? "events" : "notices"}
        query={query}
        sort={sort}
        options={timelineSorts}
        placeholder={`Search ${label}s by title, date or location…`}
      />
      {rows.length === 0 ? (
        <p className="admin-empty">
          {docs.length === 0
            ? `No ${label}s yet. Use “Add ${label}” to create one.`
            : `No ${label}s match “${query}”.`}
        </p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Location</th>
                {kind === "event" && <th scope="col">Status</th>}
                {kind === "event" && <th scope="col">Registrations</th>}
                <th scope="col" className="admin-actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ doc, entry }) => {
                const id = doc._id.toString();
                const past = isPastEntry(entry, today);
                return (
                  <tr key={id}>
                    <td className="admin-title-cell">{entry.title}</td>
                    <td data-label="Date">{entry.dateLabel}</td>
                    <td data-label="Time">{entry.time || "–"}</td>
                    <td data-label="Location">{entry.location || "–"}</td>
                    {kind === "event" && (
                      <td data-label="Status">
                        <span className={"admin-status " + (past ? "is-past" : "is-open")}>
                          {past ? "Past" : "Open"}
                        </span>
                      </td>
                    )}
                    {kind === "event" && <td data-label="Registrations">{registrationCounts.get(entry.id) ?? 0}</td>}
                    <td className="admin-actions-cell">
                      <div className="admin-row-actions">
                        <FormDialog label="Edit" title={`Edit ${label}`} submitLabel="Save changes" action={updateEntry}>
                          <input type="hidden" name="_id" value={id} />
                          <input type="hidden" name="kind" value={kind} />
                          <EntryFields entry={entry} />
                        </FormDialog>
                        <FormDialog label="Delete" buttonClass="secondary-button admin-danger-outline" title={`Delete ${label}?`} submitLabel="Delete" danger action={deleteEntry}>
                          <input type="hidden" name="_id" value={id} />
                          <p>
                            “{entry.title}” will be removed from the website. This can’t be undone.
                          </p>
                        </FormDialog>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function RegistrationsTable({
  registrations,
  query,
  sort,
}: {
  registrations: (RegistrationDoc & { _id: { toString(): string } })[];
  query: string;
  sort: string;
}) {
  const rows = registrations
    .filter((item) => matchesRegistration(item, query))
    .sort((a, b) => {
      if (sort === "oldest") return a.createdAt.getTime() - b.createdAt.getTime();
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "event")
        return (
          a.eventTitle.localeCompare(b.eventTitle) ||
          b.createdAt.getTime() - a.createdAt.getTime()
        );
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  return (
    <section className="admin-panel" aria-labelledby="registrations-heading">
      <div className="admin-panel-head">
        <div>
          <h2 id="registrations-heading">Registrations</h2>
          <p className="small muted">
            {query
              ? `${rows.length} of ${registrations.length} shown`
              : `${registrations.length} total`}
          </p>
        </div>
        {rows.length > 0 && (
          <div className="admin-row-actions">
            <EmailActions emails={rows.map((item) => item.email)} />
            {/* Plain <a>: this is a file download, not a page navigation. */}
            <a
              className="button"
              href={`/admin/export${query ? `?q=${encodeURIComponent(query)}` : ""}`}
              download
            >
              Export CSV{query ? " (filtered)" : ""}
            </a>
          </div>
        )}
      </div>
      <Toolbar
        tab="registrations"
        query={query}
        sort={sort}
        options={registrationSorts}
        placeholder="Search by name, email, phone or event…"
      />
      {rows.length === 0 ? (
        <p className="admin-empty">
          {registrations.length === 0
            ? "No registrations yet."
            : `No registrations match “${query}”.`}
        </p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th scope="col" className="admin-check-col"><SelectAll total={rows.length} /></th>
                <th scope="col">Event</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Message</th>
                <th scope="col">Registered</th>
                <th scope="col" className="admin-actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => {
                const id = item._id.toString();
                return (
                  <tr key={id}>
                    <td className="admin-check-col">
                      <input type="checkbox" data-pick value={item.email} aria-label={`Select ${item.name}`} />
                    </td>
                    <td className="admin-title-cell">{item.eventTitle}</td>
                    <td data-label="Name">{item.name}</td>
                    <td data-label="Email"><a href={"mailto:" + item.email}>{item.email}</a></td>
                    <td data-label="Phone"><a href={"tel:" + item.phone.replace(/[^+\d]/g, "")}>{item.phone}</a></td>
                    <td data-label="Message" className="admin-message-cell">{item.message || "–"}</td>
                    <td data-label="Registered">
                      {item.createdAt.toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="admin-actions-cell">
                      <div className="admin-row-actions">
                        <a className="secondary-button" href={"mailto:" + item.email}>Email</a>
                        <FormDialog label="Delete" buttonClass="secondary-button admin-danger-outline" title="Delete registration?" submitLabel="Delete" danger action={deleteRegistration}>
                          <input type="hidden" name="_id" value={id} />
                          <p>
                            {item.name}’s registration for “{item.eventTitle}” will be removed. This can’t be undone.
                          </p>
                        </FormDialog>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; tab?: string; q?: string; sort?: string }>;
}) {
  const { error, tab: tabParam, q, sort } = await searchParams;
  const query = (q ?? "").trim().slice(0, 100);
  const session = await auth();

  if (!isAdminEmail(session?.user?.email)) {
    return (
      <main className="admin-page admin-signin-page">
        <div className="admin-signin">
          <h1>Yogalife admin</h1>
          <p className="muted">Sign in with an approved Google account to manage notices, events, registrations and blog posts.</p>
          {error && (
            <p className="field-error" role="alert">
              This Google account doesn&apos;t have admin access.
            </p>
          )}
          <form action={adminSignIn}>
            <button className="button" type="submit">Sign in with Google</button>
          </form>
        </div>
      </main>
    );
  }

  const tab: Tab = tabs.some((item) => item.id === tabParam) ? (tabParam as Tab) : "events";
  const db = await getDb();
  const [docs, registrations, posts] = await Promise.all([
    db.collection<TimelineDoc>("timeline").find().sort({ order: 1 }).toArray(),
    db.collection<RegistrationDoc>("registrations").find().sort({ createdAt: -1 }).limit(500).toArray(),
    db.collection<BlogPost>("blogs").find().sort({ publishedAt: -1 }).toArray(),
  ]);
  const events = docs.filter((doc) => doc.kind === "event");
  const notices = docs.filter((doc) => doc.kind === "notice");
  const registrationCounts = new Map<string, number>();
  for (const item of registrations) {
    registrationCounts.set(item.eventId, (registrationCounts.get(item.eventId) ?? 0) + 1);
  }
  const counts: Record<Tab, number> = {
    events: events.length,
    notices: notices.length,
    registrations: registrations.length,
    blog: posts.length,
  };

  return (
    <main className="admin-page">
      <header className="admin-topbar">
        <div className="admin-container admin-topbar-inner">
          <Link href="/" className="admin-brand">Yogalife admin</Link>
          <form action={adminSignOut} className="admin-user">
            <span className="small muted">{session?.user?.email}</span>
            <button className="secondary-button" type="submit">Sign out</button>
          </form>
        </div>
      </header>
      <div className="admin-container">
        <nav className="admin-tabs" aria-label="Admin sections">
          {tabs.map((item) => (
            <Link
              key={item.id}
              href={`/admin?tab=${item.id}`}
              className="admin-tab"
              aria-current={tab === item.id ? "page" : undefined}
            >
              {item.label}
              <span className="admin-tab-count">{counts[item.id]}</span>
            </Link>
          ))}
        </nav>
        {tab === "events" && (
          <TimelineTable kind="event" docs={events} registrationCounts={registrationCounts} query={query} sort={pickSort(timelineSorts, sort)} />
        )}
        {tab === "notices" && (
          <TimelineTable kind="notice" docs={notices} registrationCounts={registrationCounts} query={query} sort={pickSort(timelineSorts, sort)} />
        )}
        {tab === "registrations" && (
          <RegistrationsTable registrations={registrations} query={query} sort={pickSort(registrationSorts, sort)} />
        )}
        {tab === "blog" && (
          <BlogTable posts={posts} query={query} sort={pickSort(blogSorts, sort)} />
        )}
      </div>
    </main>
  );
}
