# 🌙 Moonlight
Moonlight is a feature-packed Discord bot framework built on top of the discord.js wrapper.

<!-- Badges -->
![Dependency status](https://david-dm.org/alexthemaster/moonlight.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/alexthemaster/moonlight)
![GitHub](https://img.shields.io/github/license/alexthemaster/moonlight)
![GitHub issues](https://img.shields.io/github/issues/alexthemaster/moonlight)
![GitHub pull requests](https://img.shields.io/github/issues-pr/alexthemaster/moonlight)
![GitHub contributors](https://img.shields.io/github/contributors/alexthemaster/moonlight)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/alexthemaster/moonlight.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/alexthemaster/moonlight/context:javascript)


## 📝 Requirements
- Node.js (to find out the specific minimum version required, check the [ECMAScript target](https://github.com/alexthemaster/moonlight/blob/master/tsconfig.json#L3) and what Node.js version is [compatible](https://node.green) with it - for example, [Node.js v12.0.0 has 100% support for ES2019](https://i.imgur.com/eMsT1SV.png))

## ⚙ Features
Moonlight comes with a lot of features out of the box, including (but not limited to):
- Command and event handling
- Argument parsing (you can find the built-in arguments [here](https://github.com/alexthemaster/moonlight/tree/master/src/lib/arguments))
- Cron-based tasks (functions that run periodically)
- Paginator util for multi-page embeds
- Monitors
- The ability to have custom guild prefixes ([through the fetchGuildPrefix function](https://github.com/alexthemaster/moonlight/blob/master/src/lib/Client.ts#L151))
- TypeScript support (Moonlight itself is also written in TypeScript to ensure fast, bug-free code)

Upcoming features can be found [here](https://github.com/alexthemaster/moonlight/projects/1).

## 💿 Installation
Moonlight will eventually be published on npm as `@alexthemaster/moonlight` but for now, feel free to use the #build branch (`npm install alexthemaster/moonlight#build`) **(rolling release, can break any time)**

## 📚 Documentation 
[Getting started](https://alexthemaster.github.io/moonlight/classes/_lib_client_.moonlightclient.html#getting-started-with-moonlight)

[Creating commands](https://alexthemaster.github.io/moonlight/classes/_lib_structures_command_.command.html#creating-commands)

[Creating events](https://alexthemaster.github.io/moonlight/classes/_lib_structures_event_.event.html#creating-events)

[Creating tasks](https://alexthemaster.github.io/moonlight/classes/_lib_structures_task_.task.html#creating-tasks)

## GitHub Actions status
![Documentation](https://github.com/alexthemaster/moonlight/workflows/Documentation/badge.svg)
![Build](https://github.com/alexthemaster/moonlight/workflows/Build/badge.svg) 