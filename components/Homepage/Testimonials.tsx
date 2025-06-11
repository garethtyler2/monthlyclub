"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    content:
      "Monthly Club made it so easy to turn my cleaning services into subscriptions. I just set up my plans, shared the link, and got my first customer the next day!",
    author: "Amira",
    role: "Domestic Cleaner",
    delay: 0,
  },
  {
    content:
      "Game changer for my dog grooming business. I used to track bookings manually—now it’s all automated and predictable.",
    author: "Leo",
    role: "Mobile Dog Groomer",
    delay: 100,
  },
  {
    content:
      "I’ve been able to offer my massage clients weekly plans and cut down on no-shows. It’s like I finally have a real system!",
    author: "Nina",
    role: "Massage Therapist",
    delay: 200,
  },
  {
    content:
      "Simple, beautiful, and it just works. My clients love the ease of signing up and managing their plans.",
    author: "James",
    role: "Personal Trainer",
    delay: 300,
  },
  {
    content:
      "Monthly Club helped me grow my lash extension business without hiring staff or chasing invoices.",
    author: "Tasha",
    role: "Beauty Specialist",
    delay: 400,
  },
  {
    content:
      "I was up and running in 10 minutes. The service page looks amazing and the recurring payments work like a charm.",
    author: "Raj",
    role: "Gardener",
    delay: 500,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 relative overflow-hidden">
      {/* Gradient background effect */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-[128px] -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4 animate-fade-in">
            What <span className="gradient-text">Our Businesses</span> Are Saying
          </h2>
          <p
            className="text-muted-foreground animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            Real feedback from service providers growing their income and customer base with Monthly Club.
          </p>
          <div className="mt-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <a
              href="/guides/hairdresser-subscriptions"
              className="text-sm text-brand-purple underline underline-offset-2 hover:text-brand-purple/80"
            >
              See how hairdressers, cleaners, and pros use subscriptions →
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card/50 backdrop-blur-sm border border-white/10 animate-fade-in"
              style={{ animationDelay: `${testimonial.delay}ms` }}
            >
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-brand-purple opacity-50 mb-4" />
                <p className="mb-6 text-sm md:text-base">{testimonial.content}</p>
                <div>
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
