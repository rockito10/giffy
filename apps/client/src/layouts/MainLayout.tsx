import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

interface Props {
  children: React.ReactNode;
}

export function MainLayout({ children }: Props) {
  return (
    <div className="grid h-dvh grid-rows-[auto,1fr,auto]">
      <Header className="sticky top-0 z-20" />

      <main className="flex-grow p-4 md:p-8">{children}</main>
      <Footer />
    </div>
  );
}
