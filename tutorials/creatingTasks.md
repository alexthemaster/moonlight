## Creating tasks

A task is a piece of code that runs at a given time / periodically (using cron).

For creating a cron, you can head over to [crontab.guru](https://crontab.guru) - we also support the non-standard's! (@yearly, @annually, @monthly, @weekly, @daily and @hourly)

To get started with tasks, just add a file in your `tasks` folder and use the following example for JavaScript: 

```js
const { Task } = require('@penfoldium/moonlight');

module.exports = class extends Task {
    constructor(...args) {
        super(...args, {
            time: '* * * * *' // this can either take in a cron or a Date
        })
    }

    run() {

    }

    // This function runs when the bot is first started
    init() {

    }
}
```

or the following for TypeScript:

```ts
import { Task, MoonlightClient, BasePool } from '@penfoldium/moonlight';

export default class extends Task {
    constructor(client: MoonlightClient, pool: BasePool<string, Task>) {
        super(client, pool, {
            time: '* * * * *' // this can either take in a cron or a Date
        })
    }

    public run() {

    }

    // This function runs when the bot is first started
    public init() {

    }
}
```