# How to Create a Blog Post — MakeMyStore

This is the reference guide for anyone (you or a coder) creating blog posts. Everything lives in **Supabase** — no code changes are needed to publish a post. The code file `app/blog/[slug]/page.tsx` already understands everything described below.

---

## 1. Where blog posts live

Table: `public.blogs` in Supabase.

| Column | Required? | What it is |
|---|---|---|
| `title` | Yes | Post headline |
| `slug` | Yes | URL-safe version of the title, lowercase, dashes instead of spaces (e.g. `why-your-store-needs-speed`). Must be unique. |
| `excerpt` | Yes | 1–2 line summary shown on the blog listing page |
| `content` | Yes | Full post body, written in HTML (see section 3) |
| `image_url` | Yes | Main/hero image — shows on the listing card and at the top of the post |
| `image_url_2` | Optional | 2nd image, placed inside the post body wherever you put the `{{IMAGE_2}}` token |
| `image_url_3` | Optional | 3rd image, placed inside the post body wherever you put the `{{IMAGE_3}}` token |
| `author_name` | Optional | Defaults to "MakeMyStore Team" |
| `category` | Optional | Shown as a badge on the listing page, e.g. "Web Performance" |
| `is_live` | Yes | Keep `false` while drafting. Set to `true` to publish. |

Nothing else needs to change in Supabase or in the code to add a new post — just add a new row to this table.

---

## 2. Uploading images

1. Go to Supabase → Storage → bucket **`blog images`**.
2. Upload the image file(s) for this post (hero image + up to 2 extra images).
3. Copy the **public URL** of each uploaded file.
4. Paste those URLs into `image_url` (hero), and `image_url_2` / `image_url_3` (extra images) for that post's row.

---

## 3. Writing the `content` field

`content` is raw HTML. It supports these built-in styles already coded into the site — just use these tags/classes and they'll render correctly, no code changes needed:

**Headings**
```html
<h2>Section Title</h2>
<h3>Subsection</h3>
<h4>Smaller heading</h4>
```

**Paragraphs & lists**
```html
<p>Normal paragraph text.</p>
<ul>
  <li><strong>Bold point</strong> — explanation</li>
</ul>
```

**TL;DR summary box** (goes near the top of a post)
```html
<div class="tldr-box">
<p><strong>TL;DR:</strong> One or two sentence summary here.</p>
</div>
```

**Callout / highlighted quote box**
```html
<div class="callout-box">
Your highlighted note or key stat goes here.
</div>
```

**Tables**
```html
<table>
  <thead>
    <tr><th>Issue</th><th>Fix</th></tr>
  </thead>
  <tbody>
    <tr><td>Slow images</td><td>Compress to WebP</td></tr>
  </tbody>
</table>
```

**Links / buttons — never write a plain raw URL.**
Always wrap links like this:
```html
<a class="cta-btn" href="https://your-link.com">Button Text →</a>
```
❌ Wrong: `Visit us at https://www.makemystore.online`
✅ Right: `<a class="cta-btn" href="https://www.makemystore.online">Visit MakeMyStore →</a>`

**Extra images (image_url_2 / image_url_3)**
These do **not** show automatically — they only appear where you place the token inside `content`. Drop the token exactly where you want that image to appear in the article:
```html
<p>...paragraph before the image...</p>

{{IMAGE_2}}

<p>...paragraph after the image...</p>
```
Use `{{IMAGE_3}}` the same way for the third image. If you don't want an extra image in this post, just don't add the token (and leave `image_url_2` / `image_url_3` empty) — nothing will break or show a blank gap.

If you'd rather manually place an image with a caption instead of using the token system, you can also hand-write a figure block directly (must be a URL from the `blog images` Supabase bucket — never a `/public` folder path):
```html
<figure>
  <img class="post-img" src="PASTE_SUPABASE_IMAGE_URL_HERE" alt="Describe the image" />
  <figcaption>Optional caption text</figcaption>
</figure>
```

---

## 4. Publishing checklist

Before setting `is_live = true`, confirm:

- [ ] `slug` is unique and URL-safe (lowercase, dashes, no spaces)
- [ ] `image_url` is filled in and opens correctly in a browser tab
- [ ] If `image_url_2` / `image_url_3` are filled in, the matching `{{IMAGE_2}}` / `{{IMAGE_3}}` token exists somewhere in `content`
- [ ] Every link in `content` uses `<a class="cta-btn" href="...">Text</a>` — no raw/plain URLs
- [ ] `excerpt` and `category` are filled in (they show on the blog listing page)
- [ ] Read through the rendered post once live to confirm images and buttons appear where expected

---

## 5. For the coder — what NOT to do

- **Do not** add images by placing files in the repo's `/public` folder and hardcoding paths into a post's `content`. All images must come from the Supabase `blog images` storage bucket and be stored as URLs in `image_url` / `image_url_2` / `image_url_3`.
- **Do not** build one-off code changes for a single post. The current system (`app/blog/[slug]/page.tsx`) is already generic — it works the same way for every post via the token system above. If a new kind of content block is needed for many future posts (e.g. video embeds), that's a real code change worth discussing — but per-post hacks should never be necessary.
- **Do not** write raw text URLs in `content`. Always use the `.cta-btn` anchor format so links render as styled, clickable buttons.

---

## 6. Full working example

This is the current PageSpeed post (`why-your-react-nextjs-vite-site-fails-pagespeed`) — use it as a template for structure, image placement, and button formatting when writing new posts.
