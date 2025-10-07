import "../globals.css";
import { NotificationProvider } from "../frontend/components/Notification";
import { AuthProvider } from "../frontend/context/AuthContext";
import Footer from "@/frontend/components/Footer";
export const metadata = {
  title: "Ecommerce App",
  description: "Admin/User Auth Example",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NotificationProvider>
        <AuthProvider>{children}</AuthProvider>
        </NotificationProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
