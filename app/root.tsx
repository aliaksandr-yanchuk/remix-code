import {
  Form,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useActionData,
} from "@remix-run/react";
import type { KeyboardEvent } from "react";
import type { LinksFunction, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import appStylesHref from "./app.css?url";

const LOADED_IDS: string[] = [];
const CODE_LENGTH = 6;

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const loader = async () => {
  return json({ ids: LOADED_IDS });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  const id = updates.id as string;
  if (id.length !== CODE_LENGTH) {
    return json({ errors: { id: "Invalid ID" }});
  }

  LOADED_IDS.push(id);

  return redirect(`/ids/${id}`);
};

export default function App() {
  const { ids } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const handleIdInputKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
      // Allow: Ctrl+A
      (event.keyCode == 65 && event.ctrlKey === true) ||
      // Allow: home, end, left, right
      (event.keyCode >= 35 && event.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    } else {
      // Ensure that it is a number and stop the keypress
      if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
        event.preventDefault();
      }
    }
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Remix JWT Decode</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix JWT Decode</h1>
          <div>
            <Form id="id-form" method="post">
              <input
                id="idInput"
                aria-label="Decode ID"
                placeholder="ID"
                type="search"
                name="id"
                inputMode="numeric"
                className={actionData?.errors?.id ? "alert" : ""}
                onKeyDown={handleIdInputKeyDown}
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
