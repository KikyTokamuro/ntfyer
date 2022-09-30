import { NtfyerModule } from "./module.ts";

import {
  DOMParser,
  NodeList,
} from "https://deno.land/x/deno_dom@v0.1.35-alpha/deno-dom-wasm.ts";
import { Maybe } from "../maybe.ts";

export class IBashOrgRu implements NtfyerModule {
  // Count of quotes
  private count: number;

  /**
   * IBashOrgRu module constructor
   *
   * @param count string
   */
  constructor(count: number) {
    this.count = count;
  }

  /**
   * Get NodeList with quotes text
   *
   * @returns Promise<NodeList|undefined>
   */
  private async getQuotes(): Promise<NodeList | undefined> {
    const decoder = new TextDecoder("windows-1251");

    const res = await fetch("http://ibash.org.ru/");
    const buffer = await res.arrayBuffer();
    const html = decoder.decode(buffer);

    const document = new DOMParser().parseFromString(html, "text/html");
    const elements = document?.querySelectorAll(".quotbody");

    return elements;
  }

  /**
   * Run module
   *
   * @returns Promise<string|null>
   */
  async run(): Promise<string | null> {
    const quotes = await this.getQuotes();

    return Maybe.from(quotes).match({
      just: (quotes) => {
        let result = "";
        for (let i = 0; i < this.count; i++) {
          result += `${quotes?.item(i).textContent.trim()}\n\n`;
        }
        return result;
      },
      nothing: () => null,
    });
  }
}
