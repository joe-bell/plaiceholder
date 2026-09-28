#!/bin/sh
# Put the repo's pinned Node (.node-version) and corepack-managed pnpm on PATH.
#
# Source (don't execute) from non-interactive entry points that need node/pnpm
# but don't load fnm or nvm from an interactive shell profile, such as git hooks:
#
#   . "$(git rev-parse --show-toplevel)/scripts/setup-node.sh"
#
# Uses fnm, falling back to nvm; machines on a system node remain unaffected.
# Only exposes an already-installed runtime: a commit never downloads a Node.

_setup_node_root=$(git rev-parse --show-toplevel 2>/dev/null) || _setup_node_root=$PWD
_setup_node_version=$(cat "$_setup_node_root/.node-version" 2>/dev/null)

# fnm's shell integration is an `eval` in an interactive profile, which a hook's
# `sh` never runs, so activate it here. `--shell bash` is required: bare
# `fnm env` fails to infer the shell under `sh`. Its output is POSIX-compatible.
_setup_node_fnm_used=false
_setup_node_saved_path="$PATH"
if command -v fnm >/dev/null 2>&1; then
  eval "$(fnm env --shell bash)"
  if fnm use "$_setup_node_version" >/dev/null 2>&1; then
    _setup_node_fnm_used=true
  else
    # Drop fnm's default-version dir so it can't shadow a system or nvm Node.
    PATH="$_setup_node_saved_path"
    export PATH
    unset FNM_MULTISHELL_PATH
  fi
fi

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [ "$_setup_node_fnm_used" != true ] && [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
  # nvm doesn't read .node-version itself, so pass the version explicitly.
  nvm use --silent "$_setup_node_version" >/dev/null 2>&1 || true
fi

# Activate the `packageManager` pnpm shim (no-op if already enabled / absent).
command -v corepack >/dev/null 2>&1 && corepack enable >/dev/null 2>&1 || true

unset _setup_node_root _setup_node_version _setup_node_fnm_used _setup_node_saved_path
