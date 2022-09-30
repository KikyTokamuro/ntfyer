export class NtfyClient {
  private topic: string;

  constructor(topic: string) {
    this.topic = topic;
  }

  /**
   * Send data to ntfy.sh topic
   *
   * @param text string
   * @param headers HeadersInit
   */
  public send(text: string, headers: HeadersInit) {
    fetch(`https://ntfy.sh/${this.topic}`, {
      method: "POST",
      body: text,
      headers: headers,
    });
  }
}
