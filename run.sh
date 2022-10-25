#!/bin/sh
docker compose up -d database
sleep 10
docker compose up -d adminer
docker compose up server --build
