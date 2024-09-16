import { TENOR_API } from "@/config/env";
import { dataMapper, gifResponseMapper } from "@/utils/gifResponseMapper";
import { BAD_REQUEST } from "@/utils/status";
import type { NextFunction, Request, Response } from "express";

// Por Query

export async function getSearchController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { query } = req.params;
  const { pos } = req.query;

  const URL = `${TENOR_API.API_BASE_URL}/search?q=${query}&key=${
    TENOR_API.API_KEY
  }&limit=${20}&pos=${pos}`;

  const resp = await fetch(URL);

  if (resp.status === 404) {
    return next(BAD_REQUEST("Error fetching Gifs"));
  }

  const data = await resp.json();
  const mappedGifs = gifResponseMapper(data);

  return res.status(200).json(mappedGifs);
}

// Por ID

export async function getGifByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { gifId } = req.params;

  const URL = `${TENOR_API.API_BASE_URL}/posts?key=${TENOR_API.API_KEY}&ids=${gifId}`;

  const resp = await fetch(URL);

  if (resp.status === 404) {
    return next(BAD_REQUEST("Error fetching Gif"));
  }

  const data = await resp.json();

  const mappedGif = dataMapper(data.results[0]);

  return res.status(200).json(mappedGif);
}
