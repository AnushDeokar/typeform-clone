# Typeform Clone
This is an open source typeform clone built in Next.js 14 bootstrapped with create-next-app.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **User Management:** [Clerk](https://clerk.com)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **Database:** [Neon](https://neon.tech)

## Features to be implemented

- [x] Authentication with **Clerk**
- [x] ORM using **Drizzle ORM**
- [x] Database on **Neon**
- [x] Validation with **Zod**
- [x] Creating form with multiple input types
- [ ] Publishing and sharing forms
- [ ] User subscriptions with **Stripe**
- [ ] Checkout with **Stripe Checkout**
- [ ] User dashboard to display results

## Running Locally

1. Clone the repository

   ```bash
   git clone https://github.com/AnushDeokar/typeform-clone
   ```

2. Install dependencies using yarn

   ```bash
   yarn install
   ```

3. Copy the `.env.example` to `.env` and update the variables.

   ```bash
   cp .env.example .env
   ```

4. Start the development server

   ```bash
   yarn run dev
   ```

5. Push the database schema

   ```bash
   yarn run db:push
   ```

**Warning: Educational use only**
This project is developed solely for learning Next.js. It is not intended for commercial use or distribution. The project is provided "as-is" without any guarantees or warranties. 


