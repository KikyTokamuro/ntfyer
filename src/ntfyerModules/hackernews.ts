import { NtfyerModule } from "./module.ts";

export class HackerNews implements NtfyerModule {
  // Count of stories
  private count: number;

  /**
   * HackerNews module constructor
   *
   * @param count number
   */
  constructor(count: number = 5) {
    this.count = count;
  }

  /**
   * Get array with ids of new stories
   *
   * @returns Promise<Array<number>>
   */
  private async getNewStories(): Promise<Array<number>> {
    const resp = await fetch(
      "https://hacker-news.firebaseio.com/v0/newstories.json",
    );
    const body = await resp.json();
    return body;
  }

  /**
   * Get story info
   *
   * @param storyId number
   * @returns Promise<string>
   */
  private async getStoryInfo(storyId: number): Promise<string> {
    const resp = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`,
    );
    const body = await resp.json();

    const commentUrl = `https://news.ycombinator.com/item?id=${storyId}`;
    const title = body.title;
    const url = body.url ? body.url : "";

    return `${title}\n${url}\n${commentUrl}\n\n`;
  }

  /**
   * Run module
   *
   * @returns Promise<string>
   */
  async run(): Promise<string> {
    const stories = await this.getNewStories();
    let result = "";

    for (const storyId of stories.slice(0, this.count)) {
      const story = await this.getStoryInfo(storyId);
      result += story;
    }

    return result;
  }
}
