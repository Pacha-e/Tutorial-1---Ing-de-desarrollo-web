# Course Projects

This repository holds the projects I build during the Web Development Engineering
course. Every tutorial lives in its own folder so the work stays organized as the
course moves forward.

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
