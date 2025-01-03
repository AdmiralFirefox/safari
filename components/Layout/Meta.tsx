import Head from "next/head";

const Meta = ({
  title = "Safari",
  keywords = "Safari, Safari Store, Safari E-Commerce",
  description = "Shop and check valuable items and check out.",
}) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
};

export default Meta;
