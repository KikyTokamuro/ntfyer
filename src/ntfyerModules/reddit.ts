import { NtfyerModule } from "./module.ts";

// Type of reddit.com story
type RedditStory = {
  data: {
    title: string;
    url: string;
    permalink: string;
  };
};

export class Reddit implements NtfyerModule {
  // Subreddit name
  private subreddit: string;
  // Count of news
  private count: number;

  /**
   * Reddit module constructor
   *
   * @param subreddit string
   * @param count string
   */
  constructor(subreddit: string, count: number) {
    this.subreddit = subreddit;
    this.count = count;
  }

  /**
   * Get array with reddit new stories
   *
   * @returns Promise<Array<RedditStory>>
   */
  private async getNews(): Promise<Array<RedditStory>> {
    const resp = await fetch(
      `https://api.reddit.com/r/${this.subreddit}/new/?limit=${this.count}`,
    );
    const body = await resp.json();
    return body.data.children;
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
      const title = story.data.title;
      const url = story.data.url;
      const commentUrl = `https://reddit.com${story.data.permalink}`;

      result += `${title}\n${url}\n${commentUrl}\n\n`;
    }

    return result;
  }
}
