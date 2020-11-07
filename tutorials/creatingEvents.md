## Creating events

### ⚠ Note: if you want to run something AFTER the bot is ready, please use the `moonlightReady` event instead of simply using `ready`

An event is arguably one of the most important things your bot will listen to. 

To get started with events, just add a file in your `events` folder and use the following example for JavaScript: 

```js
const { Event } = require('@alexthemaster/moonlight');

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            name: 'name', // defaults to the filename
            disabled: false, // defaults to false
            event: 'ready', // the event this file listens to (autocomplete is available and all!)
            once: false // whether or not to only listen to the event above once, defaults to false
        })
    }

    // Any arguments the event receives will be passed to the run function (for example `message` for the message event)
    run() {

    }

    // This function runs when the bot is first started
    init() {

    }
}
```

or the following for TypeScript:

```ts
import { Event, MoonlightClient, BasePool } from '@alexthemaster/moonlight';

export default class extends Event {
    constructor(client: MoonlightClient, pool: BasePool<string, Event>) {
        super(client, pool, {
            name: 'name', // defaults to the filename
            disabled: false, // defaults to false
            event: 'ready', // the event this file listens to (autocomplete is available and all!)
            once: false // whether or not to only listen to the event above once, defaults to false
        })
    }

    // Any arguments the event receives will be passed to the run function (for example `message` for the message event)
    public run() {

    }

    // This function runs when the bot is first started
    public init() {

    }
}
```