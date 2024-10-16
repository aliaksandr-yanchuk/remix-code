import {
  Form,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import appStylesHref from "./app.css?url";

const LOADED_IDS: string[] = [];

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const loader = async () => {
  return json({ ids: LOADED_IDS });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  LOADED_IDS.push(updates.id as string);

  return redirect(`/ids/${updates.id}`);
};

export default function App() {
  const { ids } = useLoaderData<typeof loader>();

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
            <Form id="id-form" method="post">
              <input
                id="idInput"
                aria-label="Decode ID"
                placeholder="ID"
                type="search"
                name="id"
              />
              <div id="search-spinner" aria-hidden hidden={true} />
              <button type="submit">Load</button>
            </Form>
          </div>
          <nav>
            <ul>
              <li>
                <Link to={`/`}>Root</Link>
              </li>
              {ids.map((id, index) => (
                <li key={index}>
                  <Link to={`ids/${id}`}>
                    {id}
                  </Link>
                </li>
              ))}
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
