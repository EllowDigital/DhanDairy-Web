import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Small Business Owner",
    avatar: "RS",
    rating: 5,
    text: "DhanDiary has transformed how I manage my business finances. The offline feature is a lifesaver when I'm traveling to remote areas.",
  },
  {
    name: "Priya Patel",
    role: "Freelance Designer",
    avatar: "PP",
    rating: 5,
    text: "Finally, an app that respects my privacy! No ads, no tracking. Just pure, simple expense tracking. Highly recommended!",
  },
  {
    name: "Amit Kumar",
    role: "College Student",
    avatar: "AK",
    rating: 5,
    text: "As a student on a budget, this app helps me track every rupee. The charts make it easy to see where my money goes.",
  },
  {
    name: "Sneha Reddy",
    role: "Homemaker",
    avatar: "SR",
    rating: 5,
    text: "Managing household expenses has never been easier. I love how simple and intuitive the interface is.",
  },
  {
    name: "Vikram Singh",
    role: "Software Engineer",
    avatar: "VS",
    rating: 5,
    text: "Clean UI, fast performance, and works completely offline. This is exactly what I was looking for in a finance app.",
  },
  {
    name: "Ananya Gupta",
    role: "Teacher",
    avatar: "AG",
    rating: 4,
    text: "Great app for daily expense tracking. The backup feature gives me peace of mind knowing my data is safe.",
  },
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-mesh-gradient overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 sm:w-64 h-40 sm:h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="heading-2 text-foreground mb-3 sm:mb-4 text-balance">
            Loved by Thousands
          </h2>
          <p className="body-default">
            See what our users are saying about DhanDiary
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-border hover:border-primary/30 hover:shadow-card transition-all duration-300 bg-card-gradient hover-lift">
                <CardContent className="p-4 sm:p-5 lg:p-6">
                  {/* Quote Icon */}
                  <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-primary/20 mb-2 sm:mb-3" />

                  {/* Rating */}
                  <div className="flex items-center gap-0.5 mb-2 sm:mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                          i < testimonial.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-muted-foreground text-xs sm:text-sm lg:text-base leading-relaxed mb-3 sm:mb-4">
                    "{testimonial.text}"
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-2.5 sm:gap-3 mt-auto">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary font-semibold text-xs sm:text-sm">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-xs sm:text-sm truncate">
                        {testimonial.name}
                      </p>
                      <p className="text-muted-foreground text-[10px] sm:text-xs truncate">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 sm:mt-12 lg:mt-16 text-center"
        >
          <div className="inline-flex flex-col xs:flex-row items-center gap-3 xs:gap-4 sm:gap-6 px-5 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-card border border-border shadow-soft">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                4.8
              </span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      i < 5
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="hidden xs:block w-px h-6 sm:h-8 bg-border" />
            <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">
              Based on <span className="text-foreground font-semibold">25</span>{" "}
              reviews
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
