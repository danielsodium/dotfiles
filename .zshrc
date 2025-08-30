ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"

if [ ! -d "$ZINIT_HOME" ]; then
  mkdir -p "$(dirname $ZINIT_HOME)"
  git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
fi

source "${ZINIT_HOME}/zinit.zsh"

# plugins
# zinit light zsh-users/zsh-syntax-highlighting
zinit light Aloxaf/fzf-tab

zinit snippet OMZP::archlinux
zinit snippet OMZP::command-not-found

# load completions
autoload -U compinit && compinit
zinit cdreplay -q

# Keybindings
bindkey -e
bindkey '^[w' kill-region

HISTSIZE=5000
HISTFILE=~/.zsh_history
SAVEHIST=$HISTSIZE
HISTDUP=erase
setopt appendhistory
setopt sharehistory
setopt hist_ignore_space
setopt hist_ignore_all_dups
setopt hist_save_no_dups
setopt hist_ignore_dups
setopt hist_find_no_dups

zstyle ':completion:*' matcher-list 'm:{a-z}={A-Za-z}'
zstyle ':completion*' list-colors "${(s.:.)LS_COLORS}"
zstyle ':completion*' menu no
zstyle 'fzf-tab-complete:cd:*' fzf-preview 'ls --color $realpath'
zstyle 'fzf-tab-complete:__zoxide_z:*' fzf-preview 'ls --color $realpath'

alias ls='ls --color'
alias vim=nvim
alias c='clear'
alias ta='tmux attach'
alias tm='tmux new -s'
alias trm='tmux rename-session -t "$(tmux display-message -p "#S")"'
alias tk='tmux kill-session -t "$(tmux display-message -p "#S")"'
alias tls='tmux ls'

eval "$(fzf --zsh)"
eval "$(zoxide init --cmd cd zsh)"

# prompt
eval "$(oh-my-posh init zsh --config $HOME/.config/ohmyposh/config.yaml)"

# Auto-start or attach to tmux
if command -v tmux &>/dev/null; then
  if [[ -z "$TMUX" ]]; then
    # Find the most recent *unattached* session
    latest_unattached=$(tmux ls -F '#{session_attached} #{session_name}' 2>/dev/null \
      | awk '$1 == 0 {print $2}' | tail -n 1)

    if [[ -n "$latest_unattached" ]]; then
      tmux attach -t "$latest_unattached"
    else
      # Generate a random short word for the session name
      if [[ -f /usr/share/dict/words ]]; then
        name=$(shuf -n1 /usr/share/dict/words | tr '[:upper:]' '[:lower:]' | grep -E '^[a-z]{3,8}$')
      fi
      # fallback list if dict is missing
      if [[ -z "$name" ]]; then
        words=(oak pine birch lime snow ash star mist fox ant bee ray orb zen fig pebble)
        name=${words[$RANDOM % ${#words[@]}]}
      fi
      # ensure uniqueness
      while tmux has-session -t "$name" 2>/dev/null; do
        name="${name}$((RANDOM % 100))"
      done
      tmux new -s "$name"
    fi
  fi
fi


