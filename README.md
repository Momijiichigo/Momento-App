# Momento App

Momento - Mobile app that lets you discover time capsules of your memories
https://docs.google.com/presentation/d/1zsh0NKxN-Br3vJdHc80IJXy1dX3vmX2RuEF5d_NgcB0/edit?usp=sharing
## Run

For details, please see `justfile`.

```sh
just dev-desktop
# or on Mac
just dev-mac
# or on Android
source env_vars.sh
just dev-android
#or on iphone
just dev-ios
```

## Tech Stack

- Mobile App Frontend
    - Tauri
    - Typescript
    - SolidJS
    - TailwindCSS

- DB
    - Supabase

- APIs
    - HERE Map API

