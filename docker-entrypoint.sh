#!/bin/sh

# Generate Prisma client
npx prisma generate

# Wait for the database to be ready
until nc -z db 5432; do
  echo "Waiting for the database..."
  sleep 2
done

npx prisma migrate dev --name "init"

# Start the app
exec npm run dev
