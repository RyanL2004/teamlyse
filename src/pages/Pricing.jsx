import { useState } from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/20/solid";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const tiers = [
    {
      name: "Starter",
      id: "tier-starter",
      href: "#",
      priceMonthly: "Free",
      priceAnnual: "Free",
      description: "Get started with AI-powered meeting insights at no cost.",
      features: [
        "Basic AI-generated summaries",
        "Supports up to 3 meetings per month",
        "Limited customization options",
        "Community support",
      ],
      featured: false,
    },
    {
      name: "Pro",
      id: "tier-pro",
      href: "#",
      priceMonthly: "$29",
      priceAnnual: "$290",
      description: "Ideal for professionals and small teams needing automation.",
      features: [
        "Unlimited AI summaries",
        "Meeting transcription & keyword extraction",
        "Basic pet customization",
        "Email & chat support",
      ],
      featured: false,
    },
    {
      name: "Enterprise",
      id: "tier-enterprise",
      href: "#",
      priceMonthly: "$99",
      priceAnnual: "$990",
      description: "The ultimate plan for businesses with advanced features.",
      features: [
        "Custom AI models",
        "Real-time collaboration & analytics",
        "Advanced pet customization",
        "Priority support & dedicated success manager",
        "SSO & enterprise-grade security",
      ],
      featured: true,
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div className="relative isolate bg-neutral-950 px-6 py-24 sm:py-32 lg:px-8 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold text-blue-400">Pricing Plans</h2>
          <p className="mt-2 text-5xl font-semibold tracking-tight">
            Choose the Right Plan for You
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-gray-400 sm:text-xl">
          Start for free, then upgrade as your meetings and collaboration needs grow.
        </p>

        {/* Toggle Button for Monthly/Annual Pricing */}
        <div className="flex justify-center mt-8">
          <div className="bg-gray-800 p-1 rounded-full flex">
            <button
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                billingCycle === "monthly"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                billingCycle === "annual"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setBillingCycle("annual")}
            >
              Annual <span className="text-xs text-yellow-300">(Save 2 Months!)</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <motion.div 
          className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-5xl lg:grid-cols-3"
          key={billingCycle} // Triggers animation on switch
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.featured
                  ? "relative bg-gradient-to-r from-yellow-400 to-yellow-500 to-yellow-600 shadow-2xl text-white"
                  : "bg-gray-800 sm:mx-8 lg:mx-0",
                tier.name === "Pro"
                  ? "bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 shadow-xl"
                  : "bg-neutral-950 text-white hover:bg-black hover:shadow-lg hover:shadow-blue-500/50",
                "rounded-3xl p-8 ring-1 ring-gray-700 sm:p-10 transition-transform hover:scale-105"
              )}
            >
              <h3 id={tier.id} className="text-lg font-semibold text-white">
                {tier.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span className="text-5xl font-semibold">
                  {billingCycle === "monthly" ? tier.priceMonthly : tier.priceAnnual}
                </span>
                {tier.name !== "Starter" && (
                  <span className="text-gray-300 text-base">/ {billingCycle}</span>
                )}
              </p>
              {(billingCycle !== "monthly" && tier.name !== "Starter") && (
                <p className="text-yellow-600 font-semibold mt-2">Save 2 Months!</p>
              )}
              
              
              <p className="mt-4 text-white-900">{tier.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-gray-100 sm:mt-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 text-blue-300" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Call to Action Button */}
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.featured
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-700 text-white font-bold hover:shadow-lg hover:shadow-yellow-500/50"
                    : "bg-gray-900 text-white hover:bg-black hover:shadow-lg hover:shadow-blue-500/50",
                  "mt-8 block rounded-md px-5 py-3 text-center text-lg font-semibold transition-all sm:mt-10"
                )}
              >
                {tier.name === "Starter" ? "Start for Free" : "Get Started"}
              </a>
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Pricing;
