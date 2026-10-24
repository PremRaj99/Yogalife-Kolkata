// Adds one sample blog post for testing the blog page and editor.
// Run from yogalife-kol/: node --env-file=.env.local scripts/seed-test-post.mjs
// Re-running updates the same post (matched by slug). Delete it from /admin?tab=blog when done.
import { MongoClient } from "mongodb";

const slug = "test-post-morning-yoga-routine";
const body = `Starting your day with a few minutes of yoga can change how the rest of it feels. This **test post** shows every formatting option the blog supports.

## Why practise in the morning?

The body is rested and the mind is quiet. A short routine helps you:

- wake up the spine gently
- breathe more deeply
- set a calm tone for the day

### A simple 10-minute sequence

1. Sit comfortably and take five slow breaths
2. Cat–cow stretch, 8 rounds
3. Downward-facing dog, hold for 5 breaths
4. Sun salutation (Surya Namaskar), 3 rounds
5. Rest in Shavasana for 2 minutes

> Yoga is the journey of the self, through the self, to the self.
> — The Bhagavad Gita

## Quick reference

| Pose | Hold | Focus |
|---|---|---|
| Tadasana | 5 breaths | Posture |
| Balasana | 1 minute | Relaxation |
| Bhujangasana | 3 breaths | Spine |

Try to keep the breath *slow and even* through each pose. ~~Rushing~~ is the most common mistake.

Want guidance? [Message us on WhatsApp](https://wa.me/) or visit the studio.

<script>alert("If you see this alert, sanitising is broken.")</script>
`;

const client = new MongoClient(process.env.MONGODB_URI);
try {
  const blogs = client.db(process.env.MONGODB_DB || "yogalife").collection("blogs");
  await blogs.updateOne(
    { slug },
    {
      $set: {
        title: "Test post: a gentle morning yoga routine",
        author: "Yogalife team",
        excerpt: "",
        body,
        updatedAt: new Date(),
      },
      $setOnInsert: { slug, publishedAt: new Date() },
    },
    { upsert: true },
  );
  console.log(`Saved. Open /blog/${slug}`);
} finally {
  await client.close();
}
