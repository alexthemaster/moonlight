## Creating commands

Commands are arguably the most important thing a Discord bot can have.

Note: commands have flags which you can access by running this.flags (the flags are a Map!)

To get started with commands, just add a file in your `commands` folder and use the following example for JavaScript: 

```js
const { Command } = require('@penfoldium/moonlight');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'name', // defaults to the filename
            description: '',
            disabled: false, // defaults to false
            aliases: ['aliases2'], // aliases go into an array
            nsfw: false, // whether or not this command should only run in a NSFW channel - defaults to false
            canRunInDM: true, // whether or not this command can run in DMs - defaults to true
            ownerOnly: false, // whether or not this command can only be ran by the owner - defaults to false
            cooldown: 5, // the number of seconds before a user can run this command again - defaults to 0
            usage: '', // the usage string for this command to be passed to the argument parser (<> is a required argument, [] is an optional argument; for exact matches use the word you want matched inside the argument types. if you want to specify what the argument should parse to, add a : and the argument type after it (for example: <joke:string> will be a required argument called joke, which needs to be a string); you can also use * before a string to take use the all the text provided by the user (for example: [*rant:string] will be an optional argument called rant, which will process all the text))
            usageDelim: undefined, // the usage delimiter - defaults to undefined (this is the string used to separate an argument from another in usage)
            requiredPermissions: [], // an array of permissions the user is required to have to run the command
            requiredBotPermissions: [] // an array of permissions the bot requires to run the command properly
        });

        // You can also use a function called customizeResponse to customize the response of arguments that failed to parse
        // Example: the usage string is <user:user> but the user that ran the command hasn't mentioned another user or provided an invalid user ID
        // this.customizeResponse('user', "Please provide a user");
    }

    // Args will be an object containing the parsed arguments (for example: if you have <age:number> as the usage string, then args will be { age: theParsedNumber} )
    run(message, args) {

    }

    // This function runs when the bot is first started
    init() {

    }
}
```

or the following for TypeScript:

```ts
import { Command, MoonlightClient, BasePool } from '@penfoldium/moonlight';
import { Message } from 'discord.js';

export default class extends Command {
    constructor(client: MoonlightClient, pool: BasePool<string, Command>) {
        super(client, pool, {
            name: 'name', // defaults to the filename
            description: '',
            disabled: false, // defaults to false
            aliases: ['aliases2'], // aliases go into an array
            nsfw: false, // whether or not this command should only run in a NSFW channel - defaults to false
            canRunInDM: true, // whether or not this command can run in DMs - defaults to true
            ownerOnly: false, // whether or not this command can only be ran by the owner - defaults to false
            cooldown: 5, // the number of seconds before a user can run this command again - defaults to 0
            usage: '', // the usage string for this command to be passed to the argument parser (<> is a required argument, [] is an optional argument; for exact matches use the word you want matched inside the argument types. if you want to specify what the argument should parse to, add a : and the argument type after it (for example: <joke:string> will be a required argument called joke, which needs to be a string); you can also use * before a string to take use the all the text provided by the user (for example: [*rant:string] will be an optional argument called rant, which will process all the text))
            usageDelim: undefined, // the usage delimiter - defaults to undefined (this is the string used to separate an argument from another in usage)
            requiredPermissions: [], // an array of permissions the user is required to have to run the command
            requiredBotPermissions: [] // an array of permissions the bot requires to run the command properly
        });

        // You can also use a function called customizeResponse to customize the response of arguments that failed to parse
        // Example: the usage string is <user:user> but the user that ran the command hasn't mentioned another user or provided an invalid user ID
        // this.customizeResponse('user', "Please provide a user");
    }

    // Any arguments the event receives will be passed to the run function (for example `message` for the message event)
    public run(message: Message, args: object) {

    }

    // This function runs when the bot is first started
    public init() {

    }
}
```