This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Project Architecture

SSG: Static site regeneration

CSR: Client Side Rendering

ISG: Incremental static regeneration

SSR: Server Side Rendering

<img src="README.assets/Screen Shot 2022-03-29 at 1.44.28 PM.png" alt="Screen Shot 2022-03-29 at 1.44.28 PM" style="zoom:50%;" />

<img src="README.assets/Screen Shot 2022-03-27 at 12.41.12 PM.png" alt="Screen Shot 2022-03-27 at 12.41.12 PM" style="zoom:50%;" />

<img src="README.assets/Screen Shot 2022-03-31 at 10.02.38 PM.png" alt="Screen Shot 2022-03-31 at 10.02.38 PM" style="zoom:50%;" />

Issuer is the user's Decentralized ID returned after the authentication process of Magic. 

publicAddress is the public key of user.

favourited: 1 for like, 2 for dislike.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
