import { features } from "../constants";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-cyan-900/20 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Research & Fact-Check
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              with AI Intelligence
            </span>
          </h1>

          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Harness the power of advanced AI to verify facts, conduct deep research, and uncover truth across the internet.
            Get comprehensive insights backed by verified sources in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            { }
            <button className="px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105">
              Create Topic
            </button>
            <button className="px-8 py-4 border border-zinc-600 rounded-lg font-semibold text-lg hover:border-zinc-400 hover:bg-zinc-900/50 transition-all">
              Watch Demo
            </button>
          </div>

          <div className="flex justify-center gap-8 text-sm text-zinc-500">
            <div>✓ No credit card required</div>
            <div>✓ 5 free researches</div>
            <div>✓ Instant results</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4">Powerful Features</h2>
          <p className="text-center text-zinc-400 text-lg mb-16 max-w-2xl mx-auto">
            Everything you need for intelligent research and fact-checking
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-8 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-zinc-700 transition-all hover:-translate-y-2"
                >
                  <div className="mb-4">
                    <IconComponent className="w-10 h-10 text-blue-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "1", title: "Enter Your Query", desc: "Ask any question or topic you want researched" },
              { step: "2", title: "AI Analyzes", desc: "Our agents research across multiple sources" },
              { step: "3", title: "Get Verified Results", desc: "Receive comprehensive, fact-checked insights" },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                </div>
                <p className="text-zinc-400 ml-16">{item.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-6 -right-6 text-2xl text-zinc-700">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


      {(
        <section className="py-24 px-6 relative">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-800/50 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Research Smarter?</h2>
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
              Join thousands of researchers, journalists, and professionals using AI-powered fact-checking
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105">
              Get Started Free
            </button>
          </div>
        </section>
      )
      }


      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center flex-col md:flex-row gap-8">
          <div className="text-zinc-400">© 2024 ResearchAI. Powered by advanced AI agents.</div>
          <div className="flex gap-6 text-zinc-400">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
