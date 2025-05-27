'use client';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-background text-foreground">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground mb-6">
          We’d love to hear from you. Reach out to us any time.
        </p>
        <a
          href="mailto:hello@ai-rehab.co.uk"
          className="text-xl font-semibold text-brand-purple hover:underline"
        >
          hello@ai-rehab.co.uk
        </a>
      </div>
    </div>
  );
}
