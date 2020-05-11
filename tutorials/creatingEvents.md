# Creating Events

An [event](./Event.html) is pretty easy to create! Just place a file wherever in your `events` folder and use the following syntax: 

```js
const { Event } = require('@penfoldium/moonlight');

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            name: 'name',
            disabled: false,
            event: 'ready', // the event this file listens to
            once: false // whether or not to only listen to the event above once
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