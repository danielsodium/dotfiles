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

# fzf completion
source /usr/share/fzf/key-bindings.bash
source /usr/share/fzf/completion.bash

# Show code preview in fzf
export FZF_DEFAULT_OPTS="--preview 'bat --color=always {}'"
export FZF_DEFAULT_COMMAND="fd --type f"
 
# webrtc
export PATH=~/depot_tools:$PATH

# PS1='[\u@\h \W]\$ '
export PS1="\e[0;36m\u@\h \e[0;34m\W \e[0;32m\$ \e[m"
fastfetch
