import { Navigate, Route, Routes } from "react-router-dom";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AboutPage } from "@/pages/AboutPage";
import { BookPage } from "@/pages/BookPage";
import { ConfirmationPage } from "@/pages/ConfirmationPage";
import { ContactPage } from "@/pages/ContactPage";
import { DestinationDetailPage } from "@/pages/DestinationDetailPage";
import { DestinationsPage } from "@/pages/DestinationsPage";
import { EventsPage } from "@/pages/EventsPage";
import { HomePage } from "@/pages/HomePage";
import { PropertiesPage } from "@/pages/PropertiesPage";
import { PropertyDetailPage } from "@/pages/PropertyDetailPage";

export function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:slug" element={<PropertyDetailPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route
            path="/destinations/:slug"
            element={<DestinationDetailPage />}
          />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/book" element={<BookPage />} />
          <Route
            path="/book/confirmation/:id"
            element={<ConfirmationPage />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}
