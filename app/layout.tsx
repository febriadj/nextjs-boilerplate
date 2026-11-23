import { metadata } from "./metadata";
import { geistSans, geistMono } from "./fonts";
import "./globals.css";

export { metadata };

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            <body className="h-full">{children}</body>
        </html>
    );
}
