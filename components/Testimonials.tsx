"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    content:
      "Great tool! I popped in some of my long-term knee pain symptoms and found the cause right away. More help than any doctor’s appointment I’ve had!",
    author: "Ethan",
    role: "Improving knee pain and strength",
    delay: 0,
  },
  {
    content:
      "My elbow was annoying me, but not enough to bother the NHS. AI-Rehab spotted my tennis elbow in 2 minutes and I’ve been rehabbing since.",
    author: "Lucy",
    role: "Rehabilitating a long-term issue",
    delay: 100,
  },
  {
    content:
      "Not only figured out I had sciatica and a herniated disc, but I also got exercises to fix and manage it. So impressed!",
    author: "Daniel",
    role: "Dealing with chronic back pain",
    delay: 200,
  },
  {
    content:
      "The progress tracking tools were a game-changer. I could see my improvements every week, which kept me motivated.",
    author: "John",
    role: "Managing chronic back pain",
    delay: 300,
  },
  {
    content:
      "AI Rehab transformed my recovery process. The tailored exercises helped me get back to my daily routine faster than I thought possible.",
    author: "Sarah",
    role: "Recovering from ACL surgery",
    delay: 400,
  },
  {
    content:
      "AI-Rehab’s personal training plans helped me lose 10 pounds in just a month. I’ve never felt stronger or more confident!",
    author: "Jane",
    role: "Achieving weight loss goals",
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
            What <span className="gradient-text">Our Users</span> Are Saying
          </h2>
          <p
            className="text-muted-foreground animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            Real feedback from people using AI-Rehab to recover, prevent injuries, and
            achieve their health goals.
          </p>
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
