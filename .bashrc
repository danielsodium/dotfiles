#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls --color=auto'
alias grep='grep --color=auto'

# Clear the kitty scroll buffer
alias clear='printf "\E[H\E[3J"'
alias :q='exit'
function nv() { 
    neovide $1 & disown 
}

# fzf completion
source /usr/share/fzf/key-bindings.bash
source /usr/share/fzf/completion.bash

# Show code preview in fzf
export FZF_DEFAULT_OPTS="--preview 'bat --color=always {}'"
export FZF_DEFAULT_COMMAND="fd --type f"
 
# webrtc
export PATH=~/depot_tools:$PATH

# PS1='[\u@\h \W]\$ '
export PS1="\[\e[36m\]\u\[\e[m\]\[\e[36m\]@\[\e[m\]\[\e[36m\]\h\[\e[m\] \[\e[34m\]\W\[\e[m\] \[\e[32m\]\\$\[\e[m\] "

if [[ $(echo $TERM) == "xterm-kitty" ]]; then
    fastfetch
fi
