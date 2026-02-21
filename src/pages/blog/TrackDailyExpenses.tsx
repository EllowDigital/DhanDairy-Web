import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";

const TrackDailyExpenses = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Track Daily Expenses in India — A Complete Guide",
    description:
      "Learn the best methods to track your daily expenses in India. From manual registers to apps like DhanDiary, discover what works best.",
    image: "https://dhandiary.com/img/Screenshot/2s.jpg",
    datePublished: "2026-02-20",
    dateModified: "2026-02-20",
    author: { "@type": "Person", name: "Sarwan Yadav" },
    publisher: {
      "@type": "Organization",
      name: "EllowDigital",
      logo: {
        "@type": "ImageObject",
        url: "https://dhandiary.com/img/logo.png",
      },
    },
    mainEntityOfPage:
      "https://dhandiary.com/blog/how-to-track-daily-expenses-india",
  };

  return (
    <Layout>
      <SEOHead
        title="How to Track Daily Expenses in India"
        description="Learn the best methods to track your daily expenses in India. From manual registers to apps like DhanDiary, discover what works for Indian households."
        keywords="track daily expenses India, expense tracking methods, personal finance India, DhanDiary expense tracker, daily expense log, money management tips India"
        canonical="/blog/how-to-track-daily-expenses-india"
        structuredData={structuredData}
      />

      <article className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          {/* Back */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-8 sm:mb-10">
            <span className="text-xs font-medium text-primary bg-accent px-2.5 py-1 rounded-full">
              Personal Finance
            </span>
            <h1 className="heading-2 text-foreground mt-4 mb-4 text-balance">
              How to Track Daily Expenses in India — A Complete Guide
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Sarwan Yadav
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> 20 Feb 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> 8 min read
              </span>
            </div>
          </header>

          {/* Featured Image */}
          <img
            src="/img/Screenshot/2s.jpg"
            alt="DhanDiary app showing daily expense tracking"
            className="w-full rounded-xl sm:rounded-2xl mb-8 sm:mb-10 border border-border"
            loading="eager"
          />

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-6 text-foreground [&_h2]:heading-3 [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_li]:text-muted-foreground [&_strong]:text-foreground">
            <p>
              Managing daily expenses is the cornerstone of good personal
              finance. In India, where cash transactions are still common and
              UPI payments happen dozens of times a day, keeping track of where
              your money goes can feel overwhelming. But it doesn't have to be.
            </p>

            <h2>Why Tracking Daily Expenses Matters</h2>
            <p>
              Most Indians don't realize where 30–40% of their monthly income
              goes. Small purchases — chai, auto rides, snacks, recharges — add
              up fast. By tracking every transaction, you gain clarity on
              spending patterns and can redirect money towards savings and
              investments.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Identify unnecessary spending habits</li>
              <li>Set realistic monthly budgets</li>
              <li>Build an emergency fund faster</li>
              <li>Plan for big purchases like gadgets or vacations</li>
            </ul>

            <h2>Traditional Methods vs Digital Tools</h2>
            <p>
              <strong>The Register Method:</strong> Many Indian households still
              use a "khata" (register) for daily expenses. While simple, it's
              hard to analyze trends, calculate totals, or export data. Plus,
              you might forget to write entries.
            </p>
            <p>
              <strong>Spreadsheets:</strong> Google Sheets or Excel offer
              flexibility but require manual entry and aren't mobile-friendly
              for on-the-go tracking.
            </p>
            <p>
              <strong>Finance Apps:</strong> Apps like DhanDiary combine the
              simplicity of a register with powerful features — automatic
              categorization, charts, export options, and offline support.
            </p>

            <h2>Best Practices for Daily Expense Tracking</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Log immediately:</strong> Don't wait until evening.
                Record each expense as it happens.
              </li>
              <li>
                <strong>Categorize everything:</strong> Use categories like
                Food, Transport, Bills, Entertainment, Health.
              </li>
              <li>
                <strong>Review weekly:</strong> Spend 10 minutes every Sunday
                reviewing your weekly spending.
              </li>
              <li>
                <strong>Set spending limits:</strong> Assign monthly limits per
                category and track against them.
              </li>
              <li>
                <strong>Use an offline-first app:</strong> In India, internet
                connectivity isn't always reliable. Choose an app that works
                offline.
              </li>
            </ol>

            <h2>How DhanDiary Makes It Easy</h2>
            <p>
              DhanDiary is specifically designed for Indian users. It supports
              offline tracking, provides beautiful charts for spending insights,
              and lets you export data to PDF, CSV, or Excel. With secure
              authentication and zero ads, it's the privacy-first choice for
              personal finance.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Add transactions in under 5 seconds</li>
              <li>Custom categories for Indian spending patterns</li>
              <li>Weekly & monthly spending insights with charts</li>
              <li>Export to PDF for tax records or sharing with CA</li>
              <li>Works completely offline — perfect for rural India</li>
            </ul>

            <h2>Start Today</h2>
            <p>
              The best time to start tracking your expenses was yesterday. The
              second best time is now. Download DhanDiary and take control of
              your finances in just 5 minutes.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-accent/50 border border-border text-center">
            <h3 className="font-display font-semibold text-foreground text-lg mb-2">
              Ready to track your expenses?
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Download DhanDiary free — no ads, no subscriptions, no data
              collection.
            </p>
            <Button asChild variant="hero" size="lg" className="shadow-glow">
              <Link to="/download">Download DhanDiary Free</Link>
            </Button>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default TrackDailyExpenses;
