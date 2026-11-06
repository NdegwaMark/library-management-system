# Library Management System

A NestJS + Prisma + PostgreSQL backend for managing a library book catalog.

## Setup

1. `cp api/.env.example api/.env` and fill in your real database credentials.
2. `npx prisma migrate dev --name init`
3. `npx prisma db seed`

## Schema Decisions

### Why Book references Genre (foreign key) instead of embedding it

A **document database** approach would embed the genre object inside each book document. That duplicates the genre name in every row and makes renames or deletions a multi-document update.

By giving `Book` a `genreId` foreign key that points to a separate `Genre` table:

- **Single source of truth** – a genre is stored once; renaming "Sci-Fi" to "Science Fiction" is a single `UPDATE`.
- **Integrity** – the database enforces that every book points to a valid genre (no orphaned or misspelled values).
- **Queryability** – filtering "all books in a genre" is a simple indexed join rather than scanning embedded sub-documents.
- **Extensibility** – adding metadata to a genre (e.g., a description or color tag) doesn't require rewriting every book row.

The trade-off is one extra JOIN at read time, which is negligible with an index on `genreId` and is the standard relational pattern.

### Prisma vs. a Document Database – One Notable Difference

In a document store (e.g., MongoDB) you'd model the Book→Genre link by **embedding** the genre object or by storing a reference (`genreId`) and doing a manual `$lookup` to resolve it. Prisma (on PostgreSQL) makes the foreign key a **first-class, enforced schema constraint**: you declare `@relation(fields: [genreId], references: [id])` and the generated client handles the join transparently with full type safety. In a document DB, that referential integrity is something *you* must enforce in application code.   
