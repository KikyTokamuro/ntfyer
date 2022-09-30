import { NtfyerModule } from "./ntfyerModules/module.ts";

import { HackerNews } from "./ntfyerModules/hackernews.ts";
import { Lobsters } from "./ntfyerModules/lobsters.ts";
import { Reddit } from "./ntfyerModules/reddit.ts";
import { BashOrg } from "./ntfyerModules/bashorg.ts";
import { IBashOrgRu } from "./ntfyerModules/ibashorgru.ts";

// Type for config of module
type moduleConfig = {
  at: string;
  title: string;
  module: NtfyerModule;
};

// Cron format:
// * * * * * *
// | | | | | |
// | | | | | +-- Year              (range: 1900-3000)
// | | | | +---- Day of the Week   (range: 1-7, 1 standing for Monday)
// | | | +------ Month of the Year (range: 1-12)
// | | +-------- Day of the Month  (range: 1-31)
// | +---------- Hour              (range: 0-23)
// +------------ Minute            (range: 0-59)

// Examples:
// 45 17 7 6 * *    -- Every  year, on June 7th at 17:45
// * * * 1,2,3 * *  -- Each minute in January, February or March
// * * * * *        -- At every minute
// 0 8 * * *        -- At 08:00
// 0 */3 * * *      -- At minute 0 past every 3rd hour

// Array of ntfyer modules
const config: Array<moduleConfig> = [
  { at: "* * * * *", title: "HackerNews", module: new HackerNews(5) },
  { at: "* * * * *", title: "Lobsters", module: new Lobsters(5) },
  { at: "* * * * *", title: "Reddit - Typescript", module: new Reddit("typescript", 5), },
  { at: "* * * * *", title: "Reddit - Lisp", module: new Reddit("lisp", 5) },
  { at: "* * * * *", title: "BashOrg", module: new BashOrg(3) },
  { at: "* * * * *", title: "IBashOrgRu", module: new IBashOrgRu(3) }
];

export { config };
