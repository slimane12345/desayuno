import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9F5E3] to-[#E5C564] p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-[#3E2723] mb-4">
            🥐 Desayuno
          </h1>
          <p className="text-xl text-[#795548]">
            Moroccan Breakfast Delivery Platform
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Client App */}
          <Link href="/client" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="text-5xl mb-4 text-center">👤</div>
              <h2 className="text-2xl font-bold text-[#3E2723] mb-2 text-center">
                Client App
              </h2>
              <p className="text-sm text-[#795548] text-center mb-4">
                Browse restaurants, order breakfast, and track deliveries
              </p>
              <div className="text-center">
                <span className="inline-block px-4 py-2 bg-[#D4AF37] text-white rounded-full text-sm font-medium group-hover:bg-[#A68825] transition-colors">
                  Order Now →
                </span>
              </div>
            </div>
          </Link>

          {/* Driver Dashboard */}
          <Link href="/driver" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="text-5xl mb-4 text-center">🛵</div>
              <h2 className="text-2xl font-bold text-[#3E2723] mb-2 text-center">
                Driver App
              </h2>
              <p className="text-sm text-[#795548] text-center mb-4">
                Accept deliveries, manage routes, and track earnings
              </p>
              <div className="text-center">
                <span className="inline-block px-4 py-2 bg-[#3E2723] text-white rounded-full text-sm font-medium group-hover:bg-[#5D4037] transition-colors">
                  Start Driving →
                </span>
              </div>
            </div>
          </Link>

          {/* Admin Panel */}
          <Link href="/admin" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="text-5xl mb-4 text-center">⚙️</div>
              <h2 className="text-2xl font-bold text-[#3E2723] mb-2 text-center">
                Admin Panel
              </h2>
              <p className="text-sm text-[#795548] text-center mb-4">
                Manage restaurants, orders, drivers, and platform settings
              </p>
              <div className="text-center">
                <span className="inline-block px-4 py-2 bg-[#C62828] text-white rounded-full text-sm font-medium group-hover:bg-[#8E0000] transition-colors">
                  Manage Platform →
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[#795548]">
            Built with Next.js, Prisma, and TypeScript
          </p>
        </div>
      </div>
    </div>
  );
}

