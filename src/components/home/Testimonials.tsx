import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

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
    <section className="section-padding bg-section-gradient overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
            Testimonials
          </p>
          <h2 className="heading-2 text-foreground text-balance">
            Loved by thousands
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group"
            >
              <div className="h-full p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-500 hover-lift">
                <Quote className="w-8 h-8 text-primary/15 mb-4" />

                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-muted-foreground text-sm lg:text-base leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-semibold text-sm">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">
                      {testimonial.name}
                    </p>
                    <p className="text-muted-foreground text-xs truncate">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 px-8 py-5 rounded-2xl bg-card border border-border shadow-soft">
            <div className="flex items-center gap-2">
              <span className="font-display text-3xl lg:text-4xl font-bold text-foreground">
                4.8
              </span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>
            </div>
            <div className="w-px h-8 bg-border" />
            <p className="text-muted-foreground text-sm">
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
