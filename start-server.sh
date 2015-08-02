#!/bin/bash

cd "$(dirname "$0")"
source .venv/bin/activate

while true; do
	./start-server.py 1>stdout.log 2>stderr.log
	sleep 2
done
