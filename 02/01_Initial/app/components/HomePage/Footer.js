import FooterColumn from "./FooterColumn";
import { footerData } from "../../assets/HomePage/footerData";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      {/* Top Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        {footerData.map((col, idx) => (
          <FooterColumn key={idx} title={col.title} items={col.items} />
        ))}
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400 space-y-2">
        <p>StockTracker Pro © 2025 | Data provided for educational purposes only</p>
        <p>Not financial advice. Trading involves risk.</p>
      </div>
    </footer>
  );
}
