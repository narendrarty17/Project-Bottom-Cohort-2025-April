import Image from 'next/image';

export default function ActionSection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          {/* Your Section Heading */}
        </h2>
        <p className="text-gray-600 mb-6">
          {/* Descriptive text */}
        </p>
        <button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-all">
          {/* Create account button */}
        </button>
      </div>
    </section>
  );
}
