import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blogs";
import { BookOpen, Clock, Calendar, ArrowRight, User } from "lucide-react";
import HeroEnquiryAction from "@/components/HeroEnquiryAction";

export const metadata = {
  title: "Home Healthcare & Eldercare Guides | VR Healthcare",
  description:
    "Expert practical guides on home care assistance, elderly routine management, fall prevention, and post-hospital recovery care for families.",
};

export default function BlogsPage() {
  const blogs = getAllBlogPosts();

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-teal-700">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Care Guides &amp; Articles</span>
        </nav>

        {/* Header Block */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-teal-600" />
            <span>Family Knowledge &amp; Guidance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Home Healthcare &amp; Patient Care Guides
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Helpful, compassionate insights and care advice to assist families in making informed home care decisions for their loved ones.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {blogs.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:shadow-md card-hover-effect flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-800 font-bold">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-3 hover:text-teal-700 transition-colors">
                  <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.publishDate}</span>
                </div>

                <Link
                  href={`/blogs/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 hover:underline"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Need personalized help CTA */}
        <div className="bg-gradient-to-r from-teal-800 to-slate-900 rounded-3xl p-8 sm:p-10 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold">Need Advice for a Family Member?</h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              Our 24/7 care coordination desk can discuss your patient&apos;s condition and explain suitable care options across all regions.
            </p>
          </div>
          <HeroEnquiryAction secondary />
        </div>
      </div>
    </div>
  );
}
