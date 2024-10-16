import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Buffer } from "buffer";

type DecodedInfoMessage = {
  messageSender?: string
  messageAt?: string
  messageSubject?: string
  messagePriority?: number
}

type DecodedInfo = {
  inboxAlias?: string
  inboxId?: string
  messages?: Record<string, DecodedInfoMessage>
}

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  const res = await fetch(`https://coding-assignment-v1.now.sh/api/v1/inbox/${params.id}`);

  const body = await res.json();

  let result: DecodedInfo;
  if (body?.payload) {
    const base64Payload = body.payload.split(".")[1];
    const payload = Buffer.from(base64Payload, "base64");
    result = JSON.parse(payload.toString());
  } else {
    result = {};
  }

  return json(result);
};

export default function IdRoute() {
  const info: DecodedInfo = useLoaderData<typeof loader>();

  const formatDate = (date: string | undefined) => {
    return date ? new Intl.DateTimeFormat('ja-JP', {
      timeStyle: "medium",
      dateStyle: "short",
    }).format(new Date(date)) : "";
  }

  const formatPriority = (priority: number | undefined) => {
    return priority
      ? (priority === 0 && "緊急") || (priority === 1 && "高") || (priority === 2 && "中") || (priority === 3 && "低")
      : "なし";
  }

  return info ? (
    <>
      <span><b>受信箱のエイリアス:</b> {info.inboxAlias}</span>
      <span><b>受信箱のID:</b> {info.inboxId}</span>
      {info.messages && (
        <>
          <span><b>メッセージ:</b></span>
          {Object.values(info.messages).map((item: DecodedInfoMessage, index: number) => (
            <div key={index} className="messages">
              <span><b>メッセージ送信者: </b>{item.messageSender}</span>
              <span><b>メッセージ送信時間: </b>{formatDate(item.messageAt)}</span>
              <span><b>メッセージのタイトル: </b>{item.messageSubject}</span>
              <span><b>メッセージの優先度: </b>{formatPriority(item.messagePriority)}</span>
            </div>
          ))}
        </>
      )}
    </>
  ) : "";
}