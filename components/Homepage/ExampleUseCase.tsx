

"use client";

export default function ExampleUseCase() {
  return (
    <section className="w-full px-6 py-16 bg-background text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Real Example: How It Works</h2>
        <p className="text-muted-foreground mb-10">
          Meet Danielle — a self-employed cleaner using Monthly Club to build recurring income through subscriptions. Her clients subscribe in seconds, and she gets paid automatically.
        </p>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-left space-y-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
            <div className="text-5xl">🧼</div> <h3 className="text-4xl gradient-text">Danielle </h3>
            <div>
              <h3 className="text-xl font-semibold">
                
                Domestic Cleaner, Manchester</h3>
              <p className="text-muted-foreground">
                Danielle offers Weekly, Fortnightly, and Monthly cleaning subscriptions through her own shareable service page.
              </p>
            </div>
          </div>
          <ol className="list-decimal list-inside space-y-2 pl-4">
            <li>She signed up and created three cleaning plans with simple pricing.</li>
            <li>She shared her custom Monthly Club link with her clients via WhatsApp.</li>
            <li>Now, customers subscribe online — and she gets paid automatically.</li>
          </ol>
          <blockquote className="border-l-4 border-brand-purple pl-4 italic text-muted-foreground">
            “Monthly Club made it so easy. I spend less time on admin and more time with my clients.”
          </blockquote>
        </div>
        <div className="mt-8">
          <a
            href="/guides/service-subscription-examples"
            className="text-sm text-brand-purple hover:underline underline-offset-2"
          >
            See more real-world subscription examples →
          </a>
        </div>
      </div>
    </section>
  );
}