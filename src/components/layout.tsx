import Navbar from "./navbar";
import Footer from "./footer";

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layoutBody" style={{ height: '100vh' }}>
      <Navbar />
      <div className="artboard" style={{ width: "auto", height: "100%" }}>
        {children}
      </div>
      <Footer />
    </div >
  )
}