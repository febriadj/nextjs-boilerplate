import { metadata } from "./metadata";
import { geistSans, geistMono } from "./fonts";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export { metadata };

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            <body className="h-full">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
