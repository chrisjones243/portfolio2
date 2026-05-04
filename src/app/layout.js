import { Providers } from "./providers";

const DESCRIPTION =
  "Junior Software Developer and ML Engineer — building performant web applications and intelligent solutions.";

export const metadata = {
  // TODO: replace with your production URL before deploying
  metadataBase: new URL("https://example.com"),
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
    // Uncomment once you have an OG image at /public/og-image.png:
    // images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Chris Jones" }],
  },
  twitter: {
    card: "summary",
    title: "Chris Jones",
    description: DESCRIPTION,
    // images: ["/og-image.png"],
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
