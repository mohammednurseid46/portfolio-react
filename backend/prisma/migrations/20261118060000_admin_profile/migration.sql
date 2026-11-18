ALTER TABLE "Admin"
ADD COLUMN "name" TEXT NOT NULL DEFAULT 'Mohammednur Seid',
ADD COLUMN "email" TEXT NOT NULL DEFAULT 'mohammednurseid46@gmail.com',
ADD COLUMN "phone" TEXT NOT NULL DEFAULT '+251945733006',
ADD COLUMN "tagline" TEXT NOT NULL DEFAULT 'Code, Learn, Innovate.',
ADD COLUMN "intro" TEXT NOT NULL DEFAULT 'I build elegant, high-performance digital solutions, from clean interfaces to the APIs and databases behind them.',
ADD COLUMN "linkedin" TEXT NOT NULL DEFAULT 'https://www.linkedin.com/in/mohammednur-seid-97873a3aa',
ADD COLUMN "github" TEXT NOT NULL DEFAULT 'https://github.com/mohammednurseid46',
ADD COLUMN "roles" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
