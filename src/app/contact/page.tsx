import { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Orbit Tech & TOP Graphics",
  description: "Get in touch with Orbit Tech to discuss your next big project.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container px-4 md:px-6 mx-auto">
        
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Let&apos;s talk.</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Whether you have a clear vision or just a rough idea, we&apos;re here to help you turn it into reality. Reach out and let&apos;s create something extraordinary together.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-24">
          {/* Contact Details Side */}
          <div className="space-y-12 lg:col-span-1">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:hello@orbittech.com" className="text-muted-foreground hover:text-primary transition-colors">
                      hello@orbittech.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+2347058799440" className="text-muted-foreground hover:text-primary transition-colors">
                      +234 705 879 9440
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Office</p>
                    <p className="text-muted-foreground">
                      Lagos, Nigeria<br />
                      (Available Worldwide)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-muted/30 border border-border/40">
              <h4 className="font-semibold mb-2">Response Time</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We aim to respond to all inquiries within 24 hours during regular business days.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
