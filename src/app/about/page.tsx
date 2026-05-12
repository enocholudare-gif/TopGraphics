import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code, PenTool, Lightbulb, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Orbit Tech & TOP Graphics",
  description: "Learn about our mission, vision, and the creative minds behind our premium design solutions.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="container px-4 md:px-6 mx-auto mb-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Crafting Digital <span className="text-primary/80">Excellence</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Orbit Tech is a creative agency specializing in premium brand identities, modern web experiences, and stunning digital art. We don&apos;t just design; we build digital ecosystems that help your brand thrive.
          </p>
        </div>
      </section>

      {/* Story / Image Section */}
      <section className="container px-4 md:px-6 mx-auto mb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-muted/30 border border-border/50">
            <Image 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
              alt="Creative Studio Workspace" 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  What started as a passion for aesthetics and code has evolved into a full-service creative powerhouse. At Orbit Tech, we believe that great design is the intersection of logic and imagination.
                </p>
                <p>
                  Under the TOPgraphics portfolio, we&apos;ve helped dozens of startups and established enterprises rethink their visual identity and digital footprint. We treat every project as a unique challenge that requires a bespoke solution.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border/40">
              <div>
                <h4 className="text-4xl font-bold text-foreground mb-2">50+</h4>
                <p className="text-sm text-muted-foreground font-medium">Projects Delivered</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-foreground mb-2">100%</h4>
                <p className="text-sm text-muted-foreground font-medium">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-muted/20 py-24 border-y border-border/40 mb-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground">The principles that guide our creative process and client relationships.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <PenTool className="h-6 w-6" />,
                title: "Pixel Perfection",
                desc: "We obsess over the details because the little things make the biggest impact."
              },
              {
                icon: <Lightbulb className="h-6 w-6" />,
                title: "Innovation",
                desc: "We stay ahead of trends to ensure your brand feels modern and relevant."
              },
              {
                icon: <Code className="h-6 w-6" />,
                title: "Robust Execution",
                desc: "Beautiful design means nothing if it isn't backed by flawless technical execution."
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Collaboration",
                desc: "We don&apos;t work for you; we work with you as an extension of your team."
              }
            ].map((value, i) => (
              <div key={i} className="bg-background border border-border/50 p-8 rounded-2xl hover:border-primary/50 transition-colors">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container px-4 md:px-6 mx-auto text-center">
        <div className="max-w-2xl mx-auto bg-primary/5 border border-primary/20 rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to collaborate?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Let&apos;s discuss how Orbit Tech can help elevate your next project.
          </p>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-transform hover:scale-105"
          >
            Get in touch <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
