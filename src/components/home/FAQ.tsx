import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "Is DhanDiary really free?",
    answer:
      "Yes! DhanDiary is completely free to download and use. There are no hidden charges, subscriptions, or in-app purchases. We believe everyone deserves access to simple, effective personal finance tools.",
  },
  {
    question: "Does DhanDiary work offline?",
    answer:
      "Absolutely! DhanDiary is built with an offline-first approach. All your data is stored locally on your device, so you can track expenses even without internet. When you're back online, your data syncs automatically.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Your privacy is our top priority. DhanDiary stores data locally on your device with encryption. We don't have ads, trackers, or analytics that collect personal information. Your financial data stays yours.",
  },
  {
    question: "What platforms is DhanDiary available on?",
    answer:
      "DhanDiary is currently available for Android devices. You can download it from the Indus App Store, Amazon Appstore, or Huawei AppGallery. iOS and web versions are planned for future releases.",
  },
  {
    question: "Can I backup my data?",
    answer:
      "Yes! DhanDiary supports data backup and export features. You can create local backups and restore them whenever needed. Cloud sync is available when you sign in with your account.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account is required to use DhanDiary's core features. However, creating an account (with email, Google, or GitHub) enables cloud sync, backup, and access across multiple devices.",
  },
];

const FAQ = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent text-accent-foreground text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Got Questions?
          </div>
          <h2 className="heading-2 text-foreground mb-3 sm:mb-4 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="body-default max-w-lg mx-auto">
            Everything you need to know about DhanDiary. Can't find what you're
            looking for?
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion
            type="single"
            collapsible
            className="space-y-2 sm:space-y-3"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card-gradient border border-border rounded-xl sm:rounded-2xl px-4 sm:px-6 data-[state=open]:shadow-card transition-all duration-300"
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary py-3.5 sm:py-4 lg:py-5 text-sm sm:text-base [&[data-state=open]>svg]:rotate-180">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-3.5 sm:pb-4 lg:pb-5 leading-relaxed text-xs sm:text-sm lg:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-6 sm:mt-8 lg:mt-10 text-center p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-accent/50 border border-border"
          >
            <h3 className="font-display font-semibold text-foreground text-sm sm:text-base lg:text-lg mb-1.5 sm:mb-2">
              Still have questions?
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm lg:text-base mb-3 sm:mb-4">
              We're here to help. Reach out to our support team.
            </p>
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link to="/contact">
                <Mail className="w-4 h-4" />
                Contact Support
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
