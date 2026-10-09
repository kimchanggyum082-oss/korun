# KORUN Homepage — Client Feedback Checklist

Source: `코런 홈페이지.pptx` (client review deck, 10 slides).
Each slide compares a **Prev. Ver** screenshot (current/live site) against a **New Ver.** screenshot (this project), with an English comment.

Legend: `[ ]` open · `[~]` in progress · `[x]` done · `[?]` needs confirmation.

## Checklist

| #   | Page / section               | Feedback                                          | Status | Notes                                               |
| --- | ---------------------------- | ------------------------------------------------- | ------ | --------------------------------------------------- |
| 1   | Job Posting (main)           | Incorrect Korean translation on the mobile banner | `[x]`  | `data.ts` mobile tagline contradicted the desktop   |
| 2   | Job Posting (main)           | Product-card text appears doubled on hover        | `[x]`  | Hover image already contains the title              |
| 3   | Products / Patent (×5)       | "The area that changes color when you hover"      | `[x]`  | Added the original's hover overlay to galleries     |
| 4   | Products – Valve Gate        | "Clicking does not zoom the screen"               | `[x]`  | Application images now open the shared Lightbox     |
| 5   | Products – Single Nozzles    | "A new window opens"                              | `[x]`  | Inquiry button no longer opens a mail window        |
| 6   | Interesting Items            | "The text alignment method is different"          | `[x]`  | Body rebuilt into per-line centered paragraphs      |
| 7   | News&Events                  | "Paragraphs aren't formatted properly"            | `[x]`  | Article body rebuilt from the original markup       |
| 8   | Business / Overseas Location | "They want the image to be inserted"              | `[x]`  | Location now has editable name, description, images |

## Detail

### 1. Job Posting — incorrect translation (Slide 1)

- The mobile banner reads **"오시는 길을 알려드립니다"** ("directions / how to find us") while the desktop banner reads the correct recruitment line **"자사의 채용정보를 알려드립니다."** ("we inform you of our job openings").
- Fix: `src/lib/data.ts` → `aboutContent["job-posting"].detailTaglineMobile`.

### 2. Doubled text on product-card hover (Slide 1)

- Home product cards (`/` "We making smart flow of Resin") show the product title twice on hover.
- Cause: the hover image (`hoverSrc`, e.g. the dark-green "Valve Gate System" card) already contains the title, but `Products.tsx` also overlays a white title `<span>`.
- Fix: `src/components/home/Products.tsx` → remove the redundant hover title span.

### 3. Hover color change (Slides 2, 3, 4, 5)

- Verified in a headless browser against the live original: gallery items (`/24`, `/16`) fade in a `.text_wrap > .title` cell with `background: rgba(0,0,0,0.5)` on hover (`.hover_show_overlay`), darkening the white thumbnail to grey. Captured normal vs hover screenshots to confirm.
- Fix: added the same overlay (`bg-black/50`, `opacity-0 → group-hover:opacity-100`, `duration-300`) to `ProductGallery` (mobile + PC) and `AboutGallery` (certificate + facility).
- Affected: `src/components/products/ProductGallery.tsx`, `src/components/about/AboutGallery.tsx`.

### 4. Clicking does not zoom (Slide 3)

- Product-page application images (`AppSection` / `MApp` in `src/components/products/ProductBlockView.tsx`) rendered as plain images with no click handler. `ProductGallery` already opens the shared `Lightbox`, so only the application images were affected.
- Fix: added `src/components/products/ZoomTrigger.tsx` and wrapped the application images in it so clicking opens the shared `Lightbox` (matches the original's `_image_widget_lightbox`).

### 5. A new window opens (Slide 4)

- The product ""Contact us >"" / ""문의하기 >"" button (`IntroBody` in `src/components/products/ProductBlockView.tsx`) used `href={`mailto:${company.email}`}`, which opens a mail window/tab. The original renders this button as `href="#"`.
- Fix: changed the button to `href="#"` (and dropped the now-unused `company` import) to match the original and stop the new window.

### 6. Text alignment differs (Slide 6)

- The PESU article body was a single merged block, so it rendered as one wide centered paragraph instead of the original's manually-broken, centered lines.
- Fix: rebuilt the blocks in `src/lib/data.ts` from the original markup (`korun15.co.kr/32/?bmode=view&idx=37612077`), restoring the per-line centered paragraphs and the small grey (12px) closing block. All block types used (`text` with `align`/`fontSize`/`color`, `br`, `hr`, `image`) are editable in the admin `BlockEditor` (`ItemForms`).

### 7. Paragraph formatting lost (Slide 7)

- The INTERMOLD KOREA article (`idx 160786757`) stored its body as a few run-on text blocks, so paragraph/bullet breaks were lost.
- Fix: reconstructed the blocks in `src/lib/data.ts` from the original article markup (`korun15.co.kr/34/?idx=160786757&bmode=view`) — intro lines kept centered, product details/bullets restored as separate paragraphs with `align: "left"`, and the product names bolded (`parts`).

### 8. Insert images on location pages (Slides 8–10)

- The company-location content only had a title, headings, labels and the map. Extended it so each location supports a **name**, a **description**, and a **multiple-image gallery**, all editable from the admin.
- Editable keys added to the `about` group: `about.location.name` (text), `about.location.description` (textarea), `about.location.images` (`imageList`).
- Render: `CompanyLocationView` shows the name/description above the contact table and the images (hover overlay + lightbox) below the map, only when set — so the default page is unchanged. Source list (`about-resolve.ts`) and the renderer (`src/components/about/LocationImages.tsx`) updated.
- The original logo/map/facility assets are not bundled; the client can now upload them through the dashboard.
