#!/usr/bin/env bash

playerctlstatus=$(playerctl status 2> /dev/null)

if [[ $playerctlstatus ==  "" ]]; then
    echo ""
else
    echo "$(playerctl metadata title 2> /dev/null) - $(playerctl metadata artist)" 
fi
