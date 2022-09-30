import { NtfyerModule } from "./module.ts";

// Type of lobste.rs story
type LobsterStory = {
  title: string;
  url: string;
  short_id_url: string;
};

export class Lobsters implements NtfyerModule {
  private count: number;

  constructor(count: number = 5) {
    this.count = count;
  }

  /**
   * Get array with lobste.rs news
   *
   * @returns Promise<Array<LobsterStory>>
   */
  private async getNews(): Promise<Array<LobsterStory>> {
    const resp = await fetch("https://lobste.rs/newest.json");
    const body = await resp.json();
    return body;
  }

  /**
   * Run module
   *
   * @returns Promise<string>
   */
  async run(): Promise<string> {
    const news = await this.getNews();
    let result = "";

    for (const story of news.slice(0, this.count)) {
      const title = story.title;
      const url = story.url;
      const commentUrl = story.short_id_url;

      result += `${title}\n${url}\n${commentUrl}\n\n`;
    }

    return result;
  }
}
