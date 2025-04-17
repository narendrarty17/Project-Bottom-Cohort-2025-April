import Footer from "../components/homepage/Footer";
import Header from "../components/homepage/Header";

export default function Portfolio() {
    return (
      <>
        <Header />
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-4">Portfolio</h1>
          {/* Add Portfolio specific content here */}
          <p>View and manage your portfolio.</p>
        </main>
        <Footer />
      </>
    );
  }