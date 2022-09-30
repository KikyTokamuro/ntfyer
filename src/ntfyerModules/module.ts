export interface NtfyerModule {
  run(): Promise<string | null>;
}
