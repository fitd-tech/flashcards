This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Adding new decks

1. Create a new Google Sheet using the template, or by copying another sheet and removing or replacing the data below the headers.
2. Share the sheet with the Google Cloud service worker using the email address provided.
3. Copy the sheet ID from the address bar. (it's the slug)
4. Add the sheet ID to your .env.local file using the convention you have chosen.
5. Add the sheet ID to /utilities/constants.ts -> spreadsheetSlugToEnvVar, along with slug-like ID as the key.
6. Add the relevant deck information to /utilities/constants.ts -> decks.
7. Create a new button in /app/page.tsx with an href to the slug key you just creatd.
8. Add the env variable to the Vercel project under Settings -> Environment Variables using the same key as your local env. Under Environments, remove Development, and toggle Sensitive to true. (this prevents unauthorized users from attempting to access our Sheet)
9. Populate the Google Sheet you created with your intended learning data.

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
