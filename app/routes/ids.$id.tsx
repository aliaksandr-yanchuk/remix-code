import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  const res = await fetch(`https://coding-assignment-v1.now.sh/api/v1/inbox/${params.id}`);
  return json(await res.json());
};

export default function IdRoute() {
  const info = useLoaderData<typeof loader>();
  return (
    <div>{info.payload}</div>
  );
}