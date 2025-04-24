import Footer from "../components/homepage/Footer";
import Header from "../components/homepage/Header";

export default function Watchlist() {
    return (
      <>
        <Header />
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-4">Watchlist</h1>
          {/* Add Watchlist specific content here */}
          <p>Your watched stocks.</p>
        </main>
        <Footer />
      </>
    );
  }