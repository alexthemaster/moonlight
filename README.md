# 🌙 Moonlight
Moonlight is a feature-packed Discord bot framework built on top of the discord.js wrapper.

## 📝 Requirements
- Node.js (to find out the specific minimum version required, check the [ECMAScript target](https://github.com/penfoldium/moonlight/blob/master/tsconfig.json#L3) and what Node.js version is [compatible](https://node.green) with it - for example, [Node.js v12.0.0 has 100% support for ES2019](https://i.imgur.com/eMsT1SV.png))

## ⚙ Features
Moonlight comes with a lot of features out of the box, including (but not limited to):
- Command and event handling
- Argument parsing (you can find the built-in arguments [here](https://github.com/penfoldium/moonlight/tree/master/src/lib/arguments))
- Cron-based tasks (functions that run periodically)
- Paginator util for multi-page embeds
- Monitors
- TypeScript support (Moonlight itself is also written in TypeScript to ensure fast, bug-free code)

Upcoming features can be found [here](https://github.com/penfoldium/moonlight/projects/1).

## 💿 Installation
Moonlight will eventually be published on npm as `@penfoldium/moonlight` but for now, feel free to use the #build branch (`npm install penfoldium/moonlight#build`) **(rolling release, can break any time)**

## 📚 Documentation 
[Getting started](https://penfoldium.github.io/moonlight/classes/_lib_client_.moonlightclient.html#getting-started-with-moonlight)

[Creating commands](https://penfoldium.github.io/moonlight/classes/_lib_structures_command_.command.html#creating-commands)

[Creating events](https://penfoldium.github.io/moonlight/classes/_lib_structures_event_.event.html#creating-events)

[Creating tasks](https://penfoldium.github.io/moonlight/classes/_lib_structures_task_.task.html#creating-tasks)

## GitHub Actions status
![Documentation](https://github.com/penfoldium/moonlight/workflows/Documentation/badge.svg)
![Build](https://github.com/penfoldium/moonlight/workflows/Build/badge.svg) 