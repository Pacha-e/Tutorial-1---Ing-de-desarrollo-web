# Course Projects

This repository holds the projects I build during the Web Development Engineering
course. The tutorials are cumulative, so each one keeps growing the same code base.

| Project | Tutorials | What it is |
| ------- | --------- | ---------- |
| [`fullstack/`](fullstack/) | 01, 02 | MPA / SSR application with Express, TypeScript and EJS |
| [`frontend/`](frontend/) | 03, 04 | SPA / CSR application with Vue.js, TypeScript, Pinia and Tailwind |

## Tutorial 01 — MPA / SSR with Express (`fullstack/`)

A multi-page application rendered on the server (MPA / SSR). It is built with Node.js
and Express, written in TypeScript, uses EJS for the views, a shared layout through
`express-ejs-layouts`, and Tailwind CSS for the styling. The app follows a simple
MVC structure: the routes point to controllers, and the controllers render views.

### Tech stack

| Layer        | Tool                                  |
| ------------ | ------------------------------------- |
| Runtime      | Node.js                               |
| Web server   | Express                               |
| Language     | TypeScript (ESM / NodeNext)           |
| Views        | EJS + express-ejs-layouts             |
| Styling      | Tailwind CSS                          |

### Requirements

- **Node.js 26** is the version the tutorial targets. Any recent LTS (24+) also works;
  I ran it on Node 24. Check your version with:

  ```bash
  node -v
  ```

### Project structure

```
fullstack/
├── package.json
├── tsconfig.json
└── src/
    ├── Index.ts                 # Application entry point
    ├── routes/
    │   └── Routes.ts            # Maps URLs to controller methods
    ├── controllers/
    │   └── HomeController.ts     # Prepares data and renders the views
    ├── views/
    │   ├── layouts/
    │   │   └── app.ejs           # Shared layout (sidebar + header)
    │   └── home/
    │       ├── index.ejs         # Home page
    │       ├── about.ejs         # About page
    │       └── contact.ejs       # Contact page
    ├── assets/
    │   └── css/
    │       └── input.css         # Tailwind source file
    └── public/
        └── css/
            └── style.css         # Tailwind output (generated)
```

### How it works

1. `Index.ts` starts Express, sets EJS as the view engine, serves the static files
   from `src/public`, and enables the shared layout `layouts/app`.
2. `Routes.ts` registers every URL (`/`, `/about`, `/contact`) and connects it to a
   method on the controller.
3. `HomeController.ts` builds a small `viewData` object (used for the page title) and
   renders the matching EJS view.
4. Each view fills the `content` block of `app.ejs`, so every page shares the same
   sidebar and header while only the main area changes.

### Running the app in development

The server and the Tailwind compiler run in **two separate terminals**, both from
inside the `fullstack/` folder.

Install the dependencies first:

```bash
cd fullstack
npm install
```

Terminal 1 — start the server (auto-reloads on changes):

```bash
npm run dev
```

Terminal 2 — compile Tailwind and watch for changes:

```bash
npm run dev:css
```

Then open the app in the browser:

- Home:    http://localhost:3000/
- About:   http://localhost:3000/about
- Contact: http://localhost:3000/contact

### Building for production

```bash
npm run build   # compiles Tailwind (minified) and TypeScript into dist/
npm start       # runs the compiled server from dist/
```

### Available scripts

| Script            | What it does                                             |
| ----------------- | ------------------------------------------------------- |
| `npm run dev`     | Starts the server with `tsx watch` (live reload).       |
| `npm run dev:css` | Compiles Tailwind and watches the source CSS.           |
| `npm run build`   | Builds the CSS (minified) and compiles TypeScript.      |
| `npm start`       | Runs the compiled app from `dist/`.                     |

### The Contact section (assignment)

The tutorial ends by asking to add a new `Contact` section. I added it end to end:

- a `contact` method in `HomeController.ts`,
- a `/contact` route in `Routes.ts`,
- a `contact.ejs` view with basic contact information,
- a `Contact` link in the sidebar of `app.ejs`.

## Tutorial 02 — Models and books (`fullstack/`)

Tutorial 02 completes the MVC of the same Express app by adding the model layer.

| Piece | File |
| ----- | ---- |
| Model | `src/models/Book.ts` |
| In-memory "database" | `src/data/books.ts` |
| List of books | `src/views/home/books.ejs` → `/books` |
| Single book | `src/views/home/show.ejs` → `/books/:id` |
| Book not found | `src/views/home/notFound.ejs` (404) |

`/main-point` (the URL used by the tutorial) redirects to `/books`.

### Assignment: the bugs of Tutorial 02

The tutorial asks to find the 10+ mistakes it introduces on purpose and to propose a
cleaner version without adding libraries. The full list — 15 issues and how each one
is solved here — is in [`fullstack/TUTORIAL-02-FIXES.md`](fullstack/TUTORIAL-02-FIXES.md).

## Tutorial 03 — SPA / CSR with Vue.js (`frontend/`)

A single-page application rendered on the client (SPA / CSR), scaffolded with
`create-vue`: Vue 3, TypeScript, Vue Router, Pinia, ESLint + oxlint, Prettier, and
Tailwind CSS through the `@tailwindcss/vite` plugin.

The layout of the Express app was rebuilt as a Vue component: `App.vue` holds the
sidebar and the header, and `<RouterView />` swaps the page. The header title comes
from `meta.title` of each route.

> While installing, `npm install` failed because `oxlint` (`~1.74.0`) did not match the
> version required by `eslint-plugin-oxlint` (`~1.73.0`). As the tutorial anticipates,
> `oxlint` was pinned to `~1.73.0` in `package.json`.

### Assignment: the Contact section

`ContactView.vue`, a `/contact` route, and a `Contact` link in the sidebar.

### Running the app

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173/
```

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Vite dev server with HMR.                     |
| `npm run build`     | Type-check and build for production.          |
| `npm run type-check`| Runs `vue-tsc`.                               |
| `npm run lint`      | Runs oxlint and ESLint (with `--fix`).        |
| `npm run format`    | Formats `src/` with Prettier.                 |

## Tutorial 04 — Books, services and Pinia (`frontend/`)

Tutorial 04 grows the SPA with the layers a real application needs.

| Layer | File | Purpose |
| ----- | ---- | ------- |
| Interface | `src/interfaces/BookInterface.ts` | Shape of a book |
| DTO | `src/dtos/CreateBookDTO.ts` | Input of the creation form (`Omit<BookInterface, 'id'>`) |
| Store | `src/stores/bookstore.ts` | Pinia store holding the books |
| Seeder | `src/stores/bookseeder.ts` | Initial data of the "database" |
| Persistence | `src/PiniaConfig.ts` | Loads and saves the whole Pinia state in `localStorage` (key `piniaState`) |
| Service | `src/services/BookService.ts` | The only place the views touch the store |
| Views | `src/views/Books*.vue` | List, detail and creation pages |

Routes: `/books`, `/books/create` and `/books/:id` (the literal route is declared
before the dynamic one so `create` is never read as an id).

The views never import the store or the data directly — they only call
`BookService`. Swapping `localStorage` for a real API later means rewriting one file.

### Assignment: delete the last book

`BookService.deleteLastBook()` plus a `Delete last book` button in
`BooksIndexView.vue`. The button is disabled when the library is empty, and the
change is written to `localStorage` by the same watcher that persists everything else.

Because books can now be deleted, `createBook` no longer derives the new id from
`books.length + 1` (which repeats ids after a deletion): it uses the highest id in
use plus one.
