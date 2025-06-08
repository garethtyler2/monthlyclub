// Redesigned layout inspired by the CTA component, glass card, and brand styling.
'use client';

import { useState, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CreateBusinessPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const phrases = ['the service you offer', 'products and prices'];
  const [typing, setTyping] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[index];
    const updateTyping = () => {
      if (isDeleting) {
        setTyping((prev) => {
          const updated = currentPhrase.substring(0, prev.length - 1);
          if (updated === '') {
            setIsDeleting(false);
            setIndex((i) => (i + 1) % phrases.length);
          }
          return updated;
        });
      } else {
        setTyping((prev) => {
          const updated = currentPhrase.substring(0, prev.length + 1);
          if (updated === currentPhrase) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
          return updated;
        });
      }
    };

    const interval = setInterval(updateTyping, 100);
    return () => clearInterval(interval);
  }, [typing, isDeleting, index]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, description, image });
  };

  return (
    <section className="py-10 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-[128px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Progress bar at the top */}
        <p className="text-base font-medium text-gray-100 text-center mb-2">
          Step 1: Describe your business
        </p>
        <div className="w-full h-2 mb-8 bg-gray-700/50 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-brand-purple to-brand-blue w-1/3 animate-pulse" />
        </div>
        <div className="glass-card p-4 md:p-12 max-w-3xl mx-auto animate-fade-in border border-gray-200 shadow-md rounded-lg bg-white/5">
        <h1 className="mb-4 animate-fade-in text-center mx-auto">
            Create Your <span className="gradient-text text-center">AI-Powered Business Page</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mb-6">
            Add your details below and let our AI generate your business summary and product plans—fast, polished, and easy.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image upload and preview section */}
            <div className="flex flex-col items-center space-y-2">
              <label className="block text-base font-semibold text-gray-100 text-center mb-2">
                Business Profile Image
              </label>
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center relative">
                <img
                  src={image ? URL.createObjectURL(image) : "/images/Monthly Club logo.png"}
                  alt="Profile Preview"
                  className="object-cover w-full h-full"
                />
                <label
                  htmlFor="image-upload"
                  className="absolute inset-0 flex items-center justify-center text-xs text-white bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  {image ? "Change" : "+ Add Image"}
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <p className="text-sm text-gray-400 text-center mt-2">
                Add your image <span className="text-xs">(optional)</span>
              </p>
            </div>
            <div>
              <label className="block text-base font-semibold mb-1 text-gray-100">Business Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
                placeholder="Business Name"
              />
            </div>
            <div>
              <label className="block text-base font-semibold mb-1 flex items-center gap-1 text-gray-100">
                Describe your service and what you'd like to sell
                <button
                  type="button"
                  onClick={() => setShowHelp(!showHelp)}
                  className="cursor-pointer text-gray-400 hover:text-gray-400"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </label>
              {showHelp && (
                <div className="text-sm text-gray-400 mb-2 bg-gray-100 p-3 rounded border border-gray-200">
                  Add all your details here — what you do, what you want to offer, and pricing if possible. We'll polish and summarise it all for you on the next page, where you can review and edit easily.
                </div>
              )}
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder={`Include ${typing}`}
                required
              />
              <p className="text-sm text-muted-foreground mt-1">
                Mention what you do and include the kinds of subscriptions you'd like to offer — including pricing if you have something in mind.
              </p>
            </div>
            <Button type="submit" className="w-full hero-button-primary">
              Generate My Business Page
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}