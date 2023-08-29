<div align="center">
    <h1>Safari</h1>
    <strong>
         <p>An e-commerce website inspired by <a href="https://www.amazon.com/">Amazon</a></p>
    </strong>
    <strong>
         <p><a href="https://safari-commerce.netlify.app/">You can view the live site here »</a></p>
    </strong>
</div>

<br />

<h3 align="center">Desktop View:</h3>

https://user-images.githubusercontent.com/79429518/179728229-e5010a3a-28c6-4eb5-926b-e63daf5d4d88.mp4

<br />

<h3 align="center">Mobile View:</h3>

https://user-images.githubusercontent.com/79429518/179766763-8a2b3092-408f-49f5-8f7e-ef03f900058b.mp4

<br />

## Table of Contents
1. [About the Project](#about-the-project)
     * [Built With...](#built-with)
     * [Features](#features)
2. [Usage](#usage)
3. [Building the Project](#building-the-project)
     * [Prerequisites](#prerequisites)
     * [Installation](#installation)

<br />

## About the Project 
I have created this project to expand my knowledge with React and Next JS, as well as structuring a mid-level complexity project integrating Redux logic and Stripe. It is an e-commerce website inspired by [Amazon](https://www.amazon.com/) which you can choose to buy items/products and add them to your cart. This project uses Stripe as a payment service provider that accepts credit cards, digital wallets and many other payment methods. Right after working with [Filmflix,](https://github.com/AdmiralFirefox/filmflix) I'm thinking for an e-commerce site to work with and I choose Amazon as an inspiration. Like Filmflix, this project also took me months to finish, while also focusing on my college studies. As much as possible, I've tried to maintain this project, whenever a certain package package has an update, as well as adding minor features, bug fixes and performance improvements.

### Built With...
* [Next Js](https://nextjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Stripe](https://stripe.com/)
* [Firebase](https://firebase.google.com/)
* [Firestore](https://cloud.google.com/firestore)
* [Redux Toolkit](https://redux-toolkit.js.org/)
* [Redux Thunk](https://redux.js.org/usage/writing-logic-thunks)
* [React Query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/)
* [React Hook Form](https://react-hook-form.com/)
* [Framer Motion](https://www.framer.com/motion/)
* [MUI](https://mui.com/)
* [SASS](https://sass-lang.com/)
* [Fakestore API](https://fakestoreapi.com/)

### Features
☑️ Add/remove products to cart. <br />
☑️ Add/remove products to favorites. <br />
☑️ View information of a product. <br />
☑️ View products by categories. <br />
☑️ Sort product by lowest and highest on prices, as well as lowest and highest on ratings. <br />
☑️ Search products. <br />
☑️ Uses [Stripe](https://stripe.com/) to accept payments. <br />
☑️ Uses [Firestore](https://cloud.google.com/firestore) to keep track of ordered products. <br /> 
☑️ Users can sign up with their google account, create their own Safari account, and sign in anonymously. <br />
☑️ Responsive Layout (can be viewed from a galaxy fold to a 4k monitor screen). <br />

<br />

## Usage

<img src="public/documentation/SafariPaymentDemo.gif" alt="Safari Payment Demo" width="100%" height="100%">

<br />

This project is running in test mode. When processing payment, make sure to:

* Use `4242424242424242` as a test card number.
* Use a valid future date, e.g. `12/34`.
* Use any three-digit CVC.
* Use any value you like for other form fields.

Read more about testing on Stripe at https://stripe.com/docs/testing.

<br />

## Building the Project
Follow these steps to run this project on your local machine:

### Prerequisites

* Install the latest [LTS Version of Node](https://nodejs.org/en/) and [Git](https://git-scm.com/) 

* Install the latest version of npm

```bash
npm install npm@latest -g
```

### Installation

1. Clone the Project

```bash
git clone https://github.com/AdmiralFirefox/safari
```

2. Install npm packages and dependencies

```bash
npm install
```

3. Create .env.local file

4. Sign up to [Stripe](https://stripe.com/) and get your Publishable and Secret Keys. Add them to your .env.local file

```bash 
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXX

STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXX
```

5. Go to your Webhooks settings and get your Webhook Secret Key. Add them to your .env.local file

```bash
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXX
```

6. Sign in to [Firebase](https://firebase.google.com/), create a project and get your configurations, and add it to your .env.local file

```bash
NEXT_PUBLIC_API_KEY=XXXXXXXXXXXXXXX
NEXT_PUBLIC_AUTH_DOMAIN=XXXXXXXXXXXXXXX
NEXT_PUBLIC_PROJECT_ID=XXXXXXXXXXXXXXX
NEXT_PUBLIC_STORAGE_BUCKET=XXXXXXXXXXXXXXX
NEXT_PUBLIC_MESSAGING_SENDER_ID=XXXXXXXXXXXXXXX
NEXT_PUBLIC_APP_ID=XXXXXXXXXXXXXXX
NEXT_PUBLIC_MEASUREMENT_ID=XXXXXXXXXXXXXXX
```

7. Start the Application

```bash
npm run dev
```