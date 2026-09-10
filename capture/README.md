# capture

Capture layer for the automated **Laws of UX** evaluation system.

One URL in, four artifacts out. The artifacts are the input to the two
evaluation channels: the **screenshot** feeds the visual laws, the
**wireframe + node table** feed the structural laws.

## Install

```
npm i playwright
```

Chromium must already be present. The scripts default to the browser bundled in
this container; override it with `CHROMIUM_PATH` if yours lives elsewhere:

```
export CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome
```

Do not run `playwright install` — nothing here downloads a browser.

## Run

```
node capture.js <url> --out <dir> [--viewport 1440x900] [--timeout 30000]
```

Example:

```
node capture.js https://example.com --out out/example
```

Exit code `0` on success, `1` on failure. On failure **nothing is written**, so a
half-finished capture can never be mistaken for a good one.

| Flag | Default | Meaning |
| --- | --- | --- |
| `--out <dir>` | *(required)* | Output directory; created if missing |
| `--viewport WxH` | `1440x900` | Capture viewport in CSS px |
| `--timeout <ms>` | `30000` | Navigation timeout |

`1440x900` is a frozen decision of the project. The flag exists so a deliberate
experiment can vary it; the default never moves.

If `HTTPS_PROXY` is set, it is passed to Chromium (`NO_PROXY` becomes the bypass
list). Chromium does not read those variables on its own, so without this every
navigation in a proxied environment fails with `ERR_TUNNEL_CONNECTION_FAILED`.

## Outputs

### `screenshot.png`

The rendered page at exactly the capture viewport, `deviceScaleFactor: 1`, so
1 CSS px = 1 device px. **Visible area only** — never `fullPage`. Laws about
first impression and visual hierarchy are about the first screen, not about a
stitched 12000px-tall image.

### `wireframe.png`

The same geometry, same dimensions, redrawn as an abstraction: element boxes as
**outlined** rectangles, text nodes as **filled** bars, pure black on white. No
colour, no typography, no imagery.

It is generated from the browser's **layout tree**, never by segmenting the
screenshot raster. `DOMSnapshot.captureSnapshot` is called over a CDP session
(`context.newCDPSession(page)`) with `includePaintOrder: true` and
`computedStyles: ['position']`. Boxes come out of the engine after layout, so
the wireframe is a *measurement*, not an interpretation of pixels.

Because both images are the same size at the same scale factor, they are
pixel-comparable: box *n* in the wireframe sits over the same pixels as the
thing it abstracts in the screenshot.

A node is **retained** — drawn, and given a record in `nodes.json` — only when
all three hold:

1. **It paints.** It has a paint order entry in the snapshot. Elements with
   `display:none` never reach the layout tree at all, so they are gone before
   this test.
2. **Its box has non-zero area.** `w > 0` and `h > 0`.
3. **It is not fully covered.** No other node with a *strictly higher* paint
   order fully contains its box. Ancestors and descendants are excluded from
   this test: a wrapper containing its own child is ordinary nesting, not
   occlusion, and a wrapper paints before its children anyway. What this removes
   is the element hidden behind an opaque box drawn later.

Without step 3 the output draws the HTML document structure instead of the page
a person actually sees.

Rectangles are emitted in ascending paint order so overlaps stack the way the
page does.

### `nodes.json`

One record per retained node. `id` is the DOM node index and is also the `id` of
the corresponding `<rect>` in the wireframe, so a consumer can go from a box to
its data and back.

```json
{
  "id": 35,
  "bounds": { "x": 744, "y": 116, "w": 648, "h": 220 },
  "isClickable": false,
  "nodeName": "IMG",
  "attributes": { "alt": "Product dashboard preview" },
  "position": "static",
  "parentId": 34,
  "paintOrder": 3
}
```

| Field | Meaning |
| --- | --- |
| `id` | Node index in the snapshot; matches the wireframe rectangle |
| `bounds` | `{x, y, w, h}` in CSS px, document-absolute |
| `isClickable` | From `NodeTreeSnapshot.isClickable` — "whether this DOM node responds to mouse clicks" |
| `nodeName` | `"A"`, `"BUTTON"`, `"DIV"`, `"#text"`, … |
| `attributes` | Only identity-bearing ones: `alt`, `aria-label`, `href`, `role`, `type`, `placeholder`, `title`, `name`, `id`, `class` |
| `position` | Computed `position`: `static`/`relative`/`absolute`/`fixed`/`sticky`, or `null` |
| `parentId` | Nearest **retained** ancestor, or `null` |
| `paintOrder` | Global paint order index |

Two conventions worth knowing:

- **`parentId` is the nearest retained ancestor, not the raw DOM parent.** The
  raw parent is very often filtered out, and a dangling index would make
  `nodes.json` unusable as a tree for a consumer that only sees retained boxes.
- **`position` can be `null`.** That means the engine reported no computed
  `position` for that node (the `#document` node, for one). It is recorded as
  `null` rather than defaulted to `"static"`, because a substituted value would
  read downstream as a real measurement. The count of such nodes appears in
  `meta.notes`.

### `meta.json`

Provenance for the capture: `url`, `finalUrl`, `httpStatus`, `capturedAt` (ISO),
`viewport`, `userAgent`, `chromiumVersion`, `sha256` of both PNGs, node counts
(`retained` / `totalLayoutNodes` / `totalDomNodes`), and `notes`.

`notes` is where anything that could affect a measurement is recorded instead of
being swallowed: a non-2xx status, `networkidle` never being reached, iframes
excluded, the document being scrolled, layout entries dropped for unusable
bounds, nodes with no computed `position`.

## Fidelity check

```
node verify-fidelity.js [--tolerance 1] [--out <dir>] [--keep]
```

Captures every fixture in `fixtures/` and compares each retained box against the
geometry the fixture declares. Each fixture element that is being asserted
carries its own expected box in its `id`:

```html
<div id="exp_40_60_300_120" style="left:40px;top:60px;width:300px;height:120px"></div>
```

`exp_<x>_<y>_<w>_<h>`, CSS px, document-absolute. Deviation for a node is the
**maximum** absolute error over `x`, `y`, `w`, `h` — the worst edge, not an
average, because an average hides a single bad edge. The script prints the
maximum deviation per fixture and a `PASS`/`FAIL` against the tolerance. Exit
code `0` on pass, `1` on fail.

The check runs in both directions: an expectation declared in the fixture but
absent from `nodes.json` is a **failure**, not a skipped row. Retained nodes
that carry no expectation (`#document`, text nodes) are counted and reported.

`--tolerance` is parsed and printed **before** the first box is measured.
Choosing a threshold after seeing the numbers is not a test.

The three fixtures cover the layout modes the structural laws depend on:

| Fixture | What it pins down |
| --- | --- |
| `fixtures/absolute.html` | Four absolutely-positioned boxes at exact coordinates |
| `fixtures/grid.html` | 3x3 CSS grid, explicit tracks, zero gap |
| `fixtures/flex.html` | Flex row, `gap: 20px`, `align-items: flex-start` |

None of them depend on text metrics, so their expectations are exact by
construction rather than font-dependent.

## Known limitations

- **Content painted outside the layout tree has no box and does not appear in
  the wireframe.** Anything drawn inside a `<canvas>`, and anything baked into a
  raster image, is invisible to `DOMSnapshot`: the `<canvas>` and the `<img>`
  each contribute exactly one rectangle, and everything inside them — a chart's
  bars, a hero image's composition, text rendered into a PNG — contributes
  nothing. A page that expresses its structure through images or canvas will
  produce a wireframe far emptier than the page looks. The screenshot channel is
  the only one that sees that content, so any law evaluated on such a page must
  be evaluated there.
- **`visibility: hidden` and `opacity: 0` elements are retained.** They still
  get a layout box and a paint order entry from CDP, so they pass the retention
  test as defined above even though they paint nothing visible. They will appear
  as rectangles in the wireframe.
- **Only the main frame is measured.** Boxes inside an iframe are expressed in
  that frame's own coordinate space, so merging them would silently corrupt the
  geometry. Sub-documents are excluded and their count is recorded in
  `meta.notes`.
- **Bounds are document-absolute, not clipped to the viewport.** A node that
  sits below or to the right of the capture area still gets a record; the
  wireframe simply clips it. The screenshot shows only the first screen, so
  `nodes.json` can describe boxes the screenshot does not contain.
- **`isClickable` is the browser's own heuristic**, not a claim that a user can
  reach or activate the element.
- **Scroll-driven and time-driven behaviour is out of scope.** This is a single
  static capture at the load event (plus a best-effort `networkidle` wait);
  animations, lazy-loaded content below the fold and transient states may be
  captured mid-flight. When `networkidle` is not reached it is recorded in
  `meta.notes` rather than hidden.
