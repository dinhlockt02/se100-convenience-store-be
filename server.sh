#!/bin/sh
sleep 5
prisma migrate dev
sleep 10
npm run start:dev
