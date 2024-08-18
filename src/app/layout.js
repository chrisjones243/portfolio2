import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>Chris Jones</title>
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
