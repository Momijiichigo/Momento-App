set shell := ["zsh", "-c"]

set export
# JAVA_HOME := "/opt/android-studio/jbr"
# ANDROID_HOME := x"$HOME/Android/Sdk"
# NDK_HOME := x"$ANDROID_HOME/ndk/" + shell(x"ls -1 $ANDROID_HOME/ndk")

# I'm still waiting for concurrent support for justfile
# https://github.com/casey/just/issues/626
# for now, I just use `npm:concurrently` on deno

init_env_vars:
  source ./env_vars.sh

test:
  echo $NDK_HOME

dev-desktop: init_env_vars
  cargo tauri dev

dev-ios: init_env_vars
  cargo tauri ios dev

init-android: init_env_vars
  cargo tauri android init

dev-android: init_env_vars
  cargo tauri android dev

# prepare `./tauri-app/app-icon.png` (1240x1240px with transparency)
gen-app-icons: init_env_vars
  cargo tauri icon --ios-color #fff

