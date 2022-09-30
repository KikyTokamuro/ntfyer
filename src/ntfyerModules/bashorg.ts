import { NtfyerModule } from "./module.ts";

import {
  DOMParser,
  NodeList,
} from "https://deno.land/x/deno_dom@v0.1.35-alpha/deno-dom-wasm.ts";
import { Maybe } from "../maybe.ts";

export class BashOrg implements NtfyerModule {
  // Count of quotes
  private count: number;

  /**
   * BashOrg module constructor
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
    const resp = await fetch("http://www.bash.org/?latest");
    const html = await resp.text();

    // Get quotes elements
    const document = new DOMParser().parseFromString(html, "text/html");
    const elements = document?.querySelectorAll(".qt");

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
          result += `${quotes?.item(i).textContent}\n\n`;
        }
        return result;
      },
      nothing: () => null,
    });
  }
}
