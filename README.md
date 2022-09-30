# ntfyer
Sending various information to your ntfy.sh topic by time

### Dependencies that are used
 - [logger](https://deno.land/x/logger@v1.0.2/)
 - [deno_cron](https://deno.land/x/deno_cron@v1.0.0/)
 - [args](https://deno.land/x/args@2.1.1/)
 - [deno_dom](https://deno.land/x/deno_dom@v0.1.35-alpha/)

### Build binary
```sh
deno compile --allow-net main.ts
```

### Run compiled binary 
```sh
./ntfyer --topic test-topic-AAAAAAA
```

### Run without compile
```sh
deno run --allow-net main.ts --topic test-topic-AAAAAAA
```

### Help
```sh
USAGE:
  deno run --allow-net main.ts --topic <text>
DESCRIPTION:
  Sending various information to your ntfy.sh topic by time
OPTIONS:
  --help, -?
    Show help
  --logging <text> [default: ]
    Enable logging to directory
  --topic <text> [default: ntfyer-default-topic]
    ntfy.sh topic
```

### Setting modules
Modules are configured in the `./src/config.ts` file. 

In it, you can configure the default modules, **as well as add new ones**.

The cron format is used to set the time to be executed a module.

```
* * * * * *
| | | | | |
| | | | | +-- Year              (range: 1900-3000)
| | | | +---- Day of the Week   (range: 1-7, 1 standing for Monday)
| | | +------ Month of the Year (range: 1-12)
| | +-------- Day of the Month  (range: 1-31)
| +---------- Hour              (range: 0-23)
+------------ Minute            (range: 0-59)

Examples:
45 17 7 6 * *    -- Every  year, on June 7th at 17:45
* * * 1,2,3 * *  -- Each minute in January, February or March
* * * * *        -- At every minute
0 8 * * *        -- At 08:00
0 */3 * * *      -- At minute 0 past every 3rd hour
```

### Default modules
 - BashOrg - Getting quotes from the site [bash.org](http://www.bash.org/)
 - IBashOrgRu - Getting quotes from the site [ibash.org.ru](http://ibash.org.ru/)
 - HackerNews - Getting new posts from the site [news.ycombinator.com](https://news.ycombinator.com/)
 - Lobsters - Getting new posts from the site [lobste.rs](https://lobste.rs/)
 - Reddit - Getting new posts by subreddit from the site [reddit.com](https://reddit.com/)