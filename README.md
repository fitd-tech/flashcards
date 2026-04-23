This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Adding new decks

1. Create a new Google Sheet using the template, or by copying another sheet and removing or replacing the data below the headers.
2. Copy the sheet ID from the address bar. (it's the slug)
3. Add the sheet ID to your .env.local file using the convention you have chosen.
4. Add the sheet ID to /utilities/constants.ts, along with slug-like ID as the key.
5. Create a new button in /app/page.tsx with an href to the slug key you just creatd.
6. Add the env variable to the Vercel project under Settings -> Environment Variables using the same key as your local env. Under Environments, remove Development, and toggle Sensitive to true. (this prevents unauthorized users from attempting to hit our Google Cloud service agent)
7. Populate the Google Sheet you created with your intended learning data.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
