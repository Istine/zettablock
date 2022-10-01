import axios from "axios";
import logger from "../logger";

export const getMentionedUsers = (message: string) => {
  try {
    const re = /@(?=.{1,20}(?:\s|$))[a-z][a-z0-9]+(?:[._][a-z0-9]+)?/gi;
    const results = message.match(re);
    if (results) return removeSymbol(results as string[], "@");
    else return [];
  } catch (error) {
    logger.error(`${error.message} - ${error.stack}`)
    throw new Error("Error getting users");
  }
};

const removeSymbol = (arr: string[], symbol: RegExp | string): string[] => {
  return arr.map((user: string) => user.replace(symbol, ""));
};

export const getEmoticons = (message: string) => {
  try {
    const re = /\(([^)]+)\)/gi;
    const results = message.match(re);
    if (results) return removeSymbol(results as string[], /[\])}[{(]/g);
    else return [];
  } catch (error) {
    logger.error(`${error.message} - ${error.stack}`)
    throw new Error("Error getting emoticons");
  }
};

export const getLinks = (message: string) => {
  try {
    const re = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    const results = message.match(re);
    if (results) return buildTitleandUrlObjs(results as string[]);
    else return [];
  } catch (error) {
    logger.error(`${error.message} - ${error.stack}`)
    throw new Error("Error getting links");
  }
};

const buildTitleandUrlObjs = (urlArray: string[]) => {
  const linksArray = urlArray.map(async (url: string) => {
    const title = await getTitleFromUrl(url);
    return {
      url,
      title,
    };
  });
  return linksArray;
};

const getTitleFromUrl = async (url: string) => {
  const response = await axios.get(url);
  const body = response.data;
  const title = parseTitle(body);
  return title;
};

const parseTitle = (body: string) => {
  let match = body.match(/<title>(.*?)<\/title>/);
  console.log(body);
  
  if (!match || typeof match[1] !== "string") return "Title Not FOund";
  return match[1];
};
