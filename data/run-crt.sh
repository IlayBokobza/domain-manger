#!/usr/bin/expect -f

set timeout -1
spawn ./crt.sh
match_max 100000
expect "(press 'c' to cancel):"
send -- "1\r"
expect eof