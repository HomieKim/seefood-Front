import React from "react";
import AppLayout from "components/layout";
import { AppPropsWithLayout } from "types/common";
import "public/font/style.css";
import "styles/globals.scss";
import "styles/custom/calendar.css";
import "react-circular-progressbar/dist/styles.css";
import { DefaultSeo } from "next-seo";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const DEFAULT_SEO = {
  title: "SeeFood",
  description: "동아대학교 Software Project 2022 칼로리 분석 서비스 SeeFood",
  openGraph: {
    type: "website",
    title: "SeeFood - Food Photo Analysis Service",
    description: "donga univ SoftWare Project 2022 SeeFood",
    site_name: "SeeFood",
    images: [
      {
        url: "http://localhost:3050/favicon.ico",
        width: 1200,
        height: 630,
        alt: "SeeFood Logo Image",
      },
    ],
  },
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const layoutHeader = Component.header;
  const hasBack = Component.back;
  const noNav = Component.noNav;
  const noPadding = Component.noPadding;

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <>
      <DefaultSeo {...DEFAULT_SEO} />
      <AppLayout {...{ layoutHeader, noNav, noPadding, hasBack }}>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
              <ReactQueryDevtools initialIsOpen={false} />
            </Hydrate>
          </QueryClientProvider>
        </RecoilRoot>
      </AppLayout>
    </>
  );
}

export default MyApp;
