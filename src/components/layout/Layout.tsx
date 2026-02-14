import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import PageTransition from "../PageTransition";
import TopProgressBar from "../TopProgressBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopProgressBar />
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
