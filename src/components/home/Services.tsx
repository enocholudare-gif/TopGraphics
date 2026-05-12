"use client";

import { motion } from "framer-motion";
import { PenTool, Layout, MonitorSmartphone, Palette } from "lucide-react";

const services = [
  {
    icon: <PenTool className="h-6 w-6" />,
    title: "Brand Identity",
    description: "Memorable logos, typography, and color systems that define your unique brand voice."
  },
  {
    icon: <Layout className="h-6 w-6" />,
    title: "Graphic Design",
    description: "Stunning visual concepts and creative designs that communicate your brand's message effectively."
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Digital Art",
    description: "Custom illustrations, posters, and graphic elements tailored to your visual needs."
  },
  {
    icon: <MonitorSmartphone className="h-6 w-6" />,
    title: "UI/UX Design",
    description: "Intuitive user experiences and beautiful interfaces for web and mobile applications."
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-muted/20 border-t border-border/40">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Our Expertise</h2>
          <p className="text-muted-foreground text-lg">
            We offer a comprehensive suite of design services to help your brand stand out in a crowded digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background border border-border/50 rounded-xl p-8 hover:border-primary/50 transition-colors"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
