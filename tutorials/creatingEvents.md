## Creating events

An event is arguably one of the most important things your bot will listen to. 

To get started with events, just place a file wherever in your `events` folder and use the following example for JavaScript: 

```js
const { Event } = require('@penfoldium/moonlight');

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            name: 'name', // this will default to the filename
            disabled: false, // this will default to false
            event: 'ready', // the event this file listens to (autocomplete is available and all!)
            once: false // whether or not to only listen to the event above once, defaults to false
        })
    }

    // The run function will get passed any argument the event is supposed to get (e.g. message for the message event)
    run() {

    }

    // This function runs when the bot is first started
    init() {

    }
}
```

and the following for TypeScript:

```ts
import { Event, MoonlightClient, BasePool } from '@penfoldium/moonlight';

export default class extends Event {
    constructor(client: MoonlightClient, pool: BasePool<string, Event>) {
        super(client, pool, {
            name: 'name', // this will default to the filename
            disabled: false, // this will default to false
            event: 'ready', // the event this file listens to (autocomplete is available and all!)
            once: false // whether or not to only listen to the event above once, defaults to false
        })
    }

    // The run function will get passed any argument the event is supposed to get (e.g. message for the message event)
    public run() {

    }

    // This function runs when the bot is first started
    public init() {

    }
}
```