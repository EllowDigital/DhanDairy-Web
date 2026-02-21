import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { pageSEO } from "@/components/shared/SEOHead.constants";

const blogPosts = [
  {
    slug: "how-to-track-daily-expenses-india",
    title: "How to Track Daily Expenses in India — A Complete Guide",
    excerpt:
      "Learn the best methods to track your daily expenses in India. From manual registers to apps like DhanDiary, discover what works for Indian households and professionals.",
    date: "2026-02-20",
    readTime: "8 min read",
    category: "Personal Finance",
    image: "/img/Screenshot/2s.jpg",
  },
  {
    slug: "best-free-finance-apps-android-2025",
    title: "Best Free Finance Apps for Android in 2025 — Top Picks",
    excerpt:
      "Compare the top free personal finance apps for Android in 2025. We review features, privacy, offline support, and which app is best for Indian users.",
    date: "2026-02-18",
    readTime: "10 min read",
    category: "App Reviews",
    image: "/img/Screenshot/4s.jpg",
  },
  {
    slug: "dhandiary-vs-other-expense-trackers",
    title: "DhanDiary vs Other Expense Trackers — Honest Comparison",
    excerpt:
      "How does DhanDiary compare to popular expense trackers? We break down features, privacy, cost, and offline support to help you choose the right app.",
    date: "2026-02-15",
    readTime: "7 min read",
    category: "Comparison",
    image: "/img/Screenshot/6s.jpg",
  },
];

const Blog = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "DhanDiary Blog — Personal Finance Tips & App Guides",
    url: "https://dhandiary.netlify.app/blog",
    description:
      "Expert tips on personal finance management, expense tracking, and money-saving strategies for Indians.",
    publisher: {
      "@type": "Organization",
      name: "EllowDigital",
      url: "https://ellowdigital.space",
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: "Sarwan Yadav",
      },
      publisher: {
        "@type": "Organization",
        name: "EllowDigital",
      },
      url: `https://dhandiary.netlify.app/blog/${post.slug}`,
    })),
  };

  return (
    <Layout>
      <SEOHead {...pageSEO.blog} structuredData={structuredData} />

      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent text-accent-foreground text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Finance Tips & Guides
            </div>
            <h1 className="heading-2 text-foreground mb-3 sm:mb-4 text-balance">
              DhanDiary Blog
            </h1>
            <p className="body-default max-w-lg mx-auto">
              Expert articles on personal finance, expense tracking tips, and
              app comparisons to help you manage money better.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 max-w-4xl mx-auto">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block bg-card-gradient border border-border rounded-xl sm:rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-card transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-56 lg:w-64 shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 sm:h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 p-5 sm:p-6 lg:p-8">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-medium text-primary bg-accent px-2.5 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <h2 className="font-display font-semibold text-foreground text-base sm:text-lg lg:text-xl mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
