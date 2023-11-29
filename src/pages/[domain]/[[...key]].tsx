import { GetStaticPaths, GetStaticProps, NextPage } from "next";

export const Index: NextPage = (props) => {
    return <div>{JSON.stringify(props)}</div>;
};

export default Index;

export const getStaticPaths: GetStaticPaths = async (context) => {
    const domains = Array.from({ length: 10 }).map((_, i) => `localhost:3000`);
    const key = ["/"];
    const result = domains.map((domain) => ({
        params: {
            domain,
            key,
        },
        locale: context.defaultLocale,
    }));

    console.log("getStaticPaths", result);

    return {
        fallback: true,
        paths: result,
    };
};
export const getStaticProps: GetStaticProps = async (context) => {
    const { params, locale, locales } = context;
    console.log("getStaticProps", params, locale, locales);
    return {
        revalidate: 6000,
        props: {
            params,
        },
    };
};
