import {
  Form,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import appStylesHref from "./app.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Remix Code</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix Code</h1>
          <div>
            <Form id="id-form" role="search">
              <input
                id="q"
                aria-label="Decode ID"
                placeholder="ID"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={true} />
            </Form>
            <Form method="post">
              <button type="submit">Load</button>
            </Form>
          </div>
          <nav>
            <ul>
              <li>
                <Link to={`/`}>Root</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div id="detail">
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
