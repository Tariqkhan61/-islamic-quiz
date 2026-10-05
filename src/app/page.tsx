import Link from "next/link";

export default function Home() {

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      {/* Navbar */}
      <nav className="border-b border-emerald-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
              <span className="text-white font-bold text-sm">IQ</span>
            </div>
            <span className="text-xl font-bold text-emerald-900">
              IslamicQuiz
            </span>
          </div>
          <button className="rounded-lg bg-emerald-700 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-800 transition">
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <div className="inline-block mb-6 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-800">
          ✨ Free Islamic Knowledge Platform
        </div>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
          Master Islamic Knowledge
          <span className="block bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
            One Quiz at a Time
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-gray-600 mb-10">
          Test your understanding of Quran, Hadith, Seerah, and Islamic history.
          Learn, compete, and grow your knowledge daily.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
  <Link
    href="/quiz"
    className="rounded-lg bg-emerald-700 px-8 py-3.5 text-base font-semibold text-white hover:bg-emerald-800 transition shadow-lg shadow-emerald-700/20 inline-flex items-center justify-center min-w-[200px]"
  >
    Start Quiz Now
  </Link>
  <Link
  href="#categories"
  className="rounded-lg border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-700 hover:bg-gray-50 transition inline-flex items-center justify-center min-w-[200px]"
>
  Explore Categories
</Link>
</div>
      </section>

            {/* Categories Preview */}
      <section id="categories" className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Popular Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: "Quran", icon: "📖", slug: "quran" },
            { name: "Hadith", icon: "📜", slug: "hadith" },
            { name: "Seerah", icon: "🕌", slug: "seerah" },
            { name: "Fiqh", icon: "⚖️", slug: "fiqh" },
            { name: "History", icon: "🏛️", slug: "history" },
            { name: "Prophets", icon: "🌟", slug: "prophets" },
          ].map((cat) => (
            <Link
              key={cat.name}
              href={`/quiz?category=${cat.slug}`}
              className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-5 text-center hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-100 transition block"
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="font-semibold text-gray-800 group-hover:text-emerald-700">
                {cat.name}
              </div>
            </Link>
          ))}
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center">
          <div className="text-sm text-gray-500 mb-1">
            © 2026 IslamicQuiz. Built with ❤️ for the Ummah.
          </div>
          <div className="text-sm font-semibold text-emerald-800">
            Developed by <span className="text-amber-600">M Tariq Mahboob</span>
          </div>
        </div>
      </footer>
    </main>
  );
}