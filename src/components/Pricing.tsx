
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  
  const plans = [
    {
      name: "Basic",
      description: "Perfect for small businesses and startups",
      monthlyPrice: 999,
      yearlyPrice: 9990,
      features: [
        "Custom responsive design",
        "Up to 5 pages",
        "Contact form",
        "Basic SEO setup",
        "2 rounds of revisions",
      ],
      isPopular: false
    },
    {
      name: "Pro",
      description: "Ideal for growing businesses and e-commerce",
      monthlyPrice: 1999,
      yearlyPrice: 19990,
      features: [
        "Everything in Basic",
        "Up to 10 pages",
        "E-commerce integration",
        "Advanced SEO optimization",
        "Content management system",
        "Performance optimization",
        "4 rounds of revisions",
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      description: "Complete solution for large businesses",
      monthlyPrice: 3999,
      yearlyPrice: 39990,
      features: [
        "Everything in Pro",
        "Unlimited pages",
        "Custom functionality",
        "Dedicated support",
        "API integrations",
        "Analytics dashboard",
        "Priority maintenance",
        "Unlimited revisions",
      ],
      isPopular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your business needs with no hidden fees or surprises.
          </p>
          
          <div className="flex items-center justify-center mb-8">
            <div className="bg-muted rounded-full p-1 inline-flex">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isMonthly ? "bg-primary text-white" : "text-foreground/70"
                }`}
                onClick={() => setIsMonthly(true)}
              >
                Monthly
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !isMonthly ? "bg-primary text-white" : "text-foreground/70"
                }`}
                onClick={() => setIsMonthly(false)}
              >
                Yearly (Save 20%)
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`quantum-card relative ${
                plan.isPopular 
                  ? "border-primary/50 shadow-lg shadow-primary/20 animate-pulse-glow" 
                  : "border-border"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardContent className="pt-8">
                <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                <p className="text-foreground/70 text-sm mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    ETB {isMonthly ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  <span className="text-foreground/70 ml-2">
                    {isMonthly ? "/month" : "/year"}
                  </span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                      <span className="text-foreground/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className={`w-full ${plan.isPopular ? "quantum-button-primary" : "quantum-button"}`}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
                >
                  Choose {plan.name}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
