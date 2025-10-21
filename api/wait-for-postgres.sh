#!/bin/sh
# wait-for-postgres.sh

set -e

host="$1"
shift
cmd="$@"

# Usamos o pg_isready que é uma ferramenta cliente do PostgreSQL para checar o status da conexão
until pg_isready -h "$host" -p "5432" -U "$POSTGRES_USER"; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec sh -c "$cmd"
