import { Providers } from "./providers";

const DESCRIPTION =
  "Junior Software Developer and ML Engineer — building performant web applications and intelligent solutions.";

export const metadata = {
  metadataBase: new URL("https://chris-jones.co.uk"),
  title: {
    default: "Chris Jones",
    template: "%s | Chris Jones",
  },
  description: DESCRIPTION,
  icons: { icon: "/favicon/favicon.ico" },
  openGraph: {
    title: "Chris Jones",
    description: DESCRIPTION,
    type: "website",
    url: "https://chris-jones.co.uk",
    siteName: "Chris Jones",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chris Jones",
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
