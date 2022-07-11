import { rest } from "msw";
import { API_URL } from "../app/constants";

export const handlers = [
  rest.get(API_URL, (req, res, ctx) => {
    const character = req.url.searchParams.get("character");
    if (character === "homer") {
      return res(
        ctx.json([
          {
            quote: "I hope I didn't brain my damage.",
            character: "Homer Simpson",
            image: "/static/media/homer.cfa369b39b5dd6795d7e.png",
            characterDirection: "Right",
          },
        ])
      );
    } else if (character === "bart") {
      return res(
        ctx.json([
          {
            quote: "Eat my shorts",
            character: "Bart Simpson",
            image: "/static/media/bart.cfa369b39b5dd6795d7e.png",
            characterDirection: "Right",
          },
        ])
      );
    } else {
      return res(ctx.json([]));
    }
  }),
];
