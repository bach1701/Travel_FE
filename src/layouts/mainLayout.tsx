import React from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import Chatbot from "@/components/Chatbox";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24">{children}</main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default MainLayout;
