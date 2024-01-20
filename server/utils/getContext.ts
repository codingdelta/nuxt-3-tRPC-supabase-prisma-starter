import { H3Event } from "h3";

type Context = {
  userId: string;
  isAdmin: boolean;
};

export default function getContext(event: H3Event): Context {
  return {
    userId: event.context.user.id || "",
    isAdmin: event.context.user.isAdmin || "",
  };
}
