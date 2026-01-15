#!/bin/bash

# -----------------------------------------------------------------------------
# Configuration
# -----------------------------------------------------------------------------
# You can change the battery path if yours is BAT1 instead of BAT0
BATTERY_PATH="/sys/class/power_supply/BAT0"

# Icons (Nerd Fonts)
ICON_MUSIC=" "
ICON_WIFI=" "
ICON_WIFI_OFF="睊"
ICON_BT=""
ICON_BAT_FULL=" "
ICON_BAT_CHARGING=" "
ICON_CLOCK=" "

# -----------------------------------------------------------------------------
# Loops indefinitely to update the bar
# -----------------------------------------------------------------------------
while true; do

    # --- 1. Playerctl (Music) ---
    # Get status (Playing/Paused)
    PLAYER_STATUS=$(playerctl status --player=spotify 2>/dev/null)
    
    if [ "$PLAYER_STATUS" = "Playing" ]; then
        # Format: SONG_NAME - ARTIST
        MEDIA_INFO=$(playerctl metadata --player=spotify --format "{{ title }} - {{ artist }}" 2>/dev/null)
        # Truncate if too long (optional, max 40 chars)
        if [ ${#MEDIA_INFO} -gt 40 ]; then
            MEDIA_INFO="${MEDIA_INFO:0:40}..."
        fi
        MUSIC_STR="$MEDIA_INFO | "
    else
        MUSIC_STR="" # Hide if not playing
    fi

    # --- 2. Wifi ---
    # Get the active SSID
    WIFI_SSID=$(nmcli -t -f active,ssid dev wifi | grep '^yes' | cut -d: -f2)
    
    if [ -n "$WIFI_SSID" ]; then
        WIFI_STR="$ICON_WIFI $WIFI_SSID"
    else
        WIFI_STR="$ICON_WIFI_OFF Disconnected"
    fi

    # --- 3. Bluetooth ---
    # Check if powered on
    BT_POWERED=$(bluetoothctl show | grep "Powered: yes")
    
    if [ -n "$BT_POWERED" ]; then
        # Check for connected devices
        BT_DEVICE=$(bluetoothctl info | grep "Name" | cut -d ' ' -f 2-)
        if [ -n "$BT_DEVICE" ]; then
            BT_STR="$ICON_BT $BT_DEVICE"
        else
            BT_STR="$ICON_BT On"
        fi
    else
        BT_STR="$ICON_BT Off"
    fi

    # --- 4. Battery ---
    if [ -d "$BATTERY_PATH" ]; then
        BAT_CAPACITY=$(cat "$BATTERY_PATH/capacity")
        BAT_STATUS=$(cat "$BATTERY_PATH/status")
        
        if [ "$BAT_STATUS" = "Charging" ]; then
            BAT_ICON=$ICON_BAT_CHARGING
        else
            BAT_ICON=$ICON_BAT_FULL
        fi
        
        BAT_STR="$BAT_ICON $BAT_CAPACITY%"
    else
        BAT_STR=""
    fi

    # --- 5. Time ---
    # Requested format: HH:MM AM EST
    # Note: 'EST' is hardcoded text here. If you want the actual system timezone, use %Z
    TIME_STR=$(date +'%I:%M %p EST')

    # --- OUTPUT ---
    echo "$MUSIC_STR$WIFI_STR $BT_STR  $BAT_STR | $TIME_STR"

    # Sleep for 1 second before updating again
    sleep 5
done
