import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blogs";
import { Clock, Calendar, ArrowLeft, ShieldCheck, Phone, Heart } from "lucide-react";
import HeroEnquiryAction from "@/components/HeroEnquiryAction";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Article Not Found | VR Healthcare" };

  return {
    title: `${post.title} | VR Healthcare Guides`,
    description: post.summary,
    alternates: {
      canonical: `/blogs/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | VR Healthcare`,
      description: post.summary,
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-teal-700">Home</Link>
          <span>/</span>
          <Link href="/blogs" className="hover:text-teal-700">Care Guides</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Article Container */}
        <article className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/90 shadow-sm space-y-8">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4">
              <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-800 font-bold uppercase tracking-wider">
                {post.category}
              </span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.publishDate}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="mt-4 pb-6 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">{post.author}</span>
              <div className="flex items-center gap-1 text-teal-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Family Health Guidance</span>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-5 whitespace-pre-line">
            {post.content}
          </div>

          {/* Non-clinical care reminder */}
          <div className="p-4 bg-teal-50/70 border border-teal-200/80 rounded-2xl text-xs text-teal-900 leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <strong>Care Reminder:</strong> The recommendations above are intended for family informational awareness and everyday support. For medical diagnoses, invasive clinical care, or treatment plans, please consult a certified doctor.
            </div>
          </div>

          {/* Bottom CTA Block inside article */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all care guides</span>
            </Link>

            <HeroEnquiryAction secondary />
          </div>
        </article>
      </div>
    </div>
  );
}
