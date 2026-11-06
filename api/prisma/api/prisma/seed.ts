import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // --- Genres ---
  const genres = [
    { name: 'Fiction' },
    { name: 'Science Fiction' },
    { name: 'Mystery' },
    { name: 'Non-Fiction' },
  ];

  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { name: genre.name },
      update: {},
      create: genre,
    });
  }

  // --- Books (16 books across 4 genres) ---
  const books = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', genreName: 'Fiction', publishedAt: new Date('1925-04-10') },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084', genreName: 'Fiction', publishedAt: new Date('1960-07-11') },
    { title: '1984', author: 'George Orwell', isbn: '9780451524935', genreName: 'Fiction', publishedAt: new Date('1949-06-08') },
    { title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '9780141439518', genreName: 'Fiction', publishedAt: new Date('1813-01-28') },

    { title: 'Dune', author: 'Frank Herbert', isbn: '9780441172719', genreName: 'Science Fiction', publishedAt: new Date('1965-08-01') },
    { title: 'Neuromancer', author: 'William Gibson', isbn: '9780441569595', genreName: 'Science Fiction', publishedAt: new Date('1984-03-01') },
    { title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', isbn: '9780441478125', genreName: 'Science Fiction', publishedAt: new Date('1969-01-01') },
    { title: 'Foundation', author: 'Isaac Asimov', isbn: '9780553293357', genreName: 'Science Fiction', publishedAt: new Date('1951-07-01') },

    { title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', isbn: '9780307454546', genreName: 'Mystery', publishedAt: new Date('2005-08-01') },
    { title: 'Gone Girl', author: 'Gillian Flynn', isbn: '9780307588371', genreName: 'Mystery', publishedAt: new Date('2012-05-01') },
    { title: 'The Name of the Rose', author: 'Umberto Eco', isbn: '9780544409398', genreName: 'Mystery', publishedAt: new Date('1980-01-01') },
    { title: 'In the Woods', author: 'Tana French', isbn: '9780385513711', genreName: 'Mystery', publishedAt: new Date('2007-03-06') },

    { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', genreName: 'Non-Fiction', publishedAt: new Date('2011-03-01') },
    { title: 'A Brief History of Time', author: 'Stephen Hawking', isbn: '9780553380163', genreName: 'Non-Fiction', publishedAt: new Date('1988-04-01') },
    { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', isbn: '9780374533557', genreName: 'Non-Fiction', publishedAt: new Date('2011-09-13') },
    { title: 'Educated', author: 'Tara Westover', isbn: '9780399590504', genreName: 'Non-Fiction', publishedAt: new Date('2018-02-06') },
  ];

  for (const book of books) {
    const { genreName, ...data } = book;
    const genre = await prisma.genre.findUniqueOrThrow({ where: { name: genreName } });

    await prisma.book.upsert({
      where: { isbn: data.isbn },
      update: {},
      create: {
        ...data,
        genreId: genre.id,
      },
    });
  }

  console.log(`Seeded ${genres.length} genres and ${books.length} books.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });   
