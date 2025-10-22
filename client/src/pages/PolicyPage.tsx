import { useRoute, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumb from "@/components/Breadcrumb";

const policyContent: Record<string, { title: string; content: JSX.Element }> = {
  "privacy-policy": {
    title: "Privacy Policy",
    content: (
      <div className="prose prose-slate max-w-none">
        <h3>Introduction</h3>
        <p>
          Welcome to SkillSet. This Policy and Terms & Conditions document governs your use of our website and services. 
          By accessing or using our LMS, you agree to comply with and be bound by these terms. If you do not agree with 
          any part of these terms, please do not use our services.
        </p>

        <h3>1. Definitions</h3>
        <ul>
          <li><strong>LMS</strong>: Learning Management System.</li>
          <li><strong>User</strong>: Any individual or entity accessing or using the LMS.</li>
          <li><strong>Content</strong>: All materials, including text, images, videos, and other multimedia, provided through the LMS.</li>
        </ul>

        <h3>2. Registration</h3>
        <p>
          To access certain features of our LMS, you may need to register and create an account. You agree to provide 
          accurate and complete information during registration and to update your information as necessary to keep it 
          accurate and complete.
        </p>

        <h3>3. Account Security</h3>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials and for all activities 
          that occur under your account. Notify us immediately of any unauthorized use of your account.
        </p>

        <h3>4. Use of the LMS</h3>
        <p>
          You may use the LMS for lawful educational purposes. You agree not to use the LMS in any way that breaches 
          any applicable local, national, or international law or regulation.
        </p>

        <h3>5. Content Standards</h3>
        <p>
          These standards apply to any and all material which you contribute to the LMS. Contributions must be accurate 
          (where they state facts), be genuinely held (where they state opinions), and comply with applicable law.
        </p>
      </div>
    )
  },
  "terms-of-service": {
    title: "Terms of Service",
    content: (
      <div className="prose prose-slate max-w-none">
        <h3>Introduction</h3>
        <p>
          Welcome to SkillSet. This Policy and Terms & Conditions document governs your use of our website and services. 
          By accessing or using our LMS, you agree to comply with and be bound by these terms.
        </p>

        <h3>1. Definitions</h3>
        <ul>
          <li><strong>LMS</strong>: Learning Management System.</li>
          <li><strong>User</strong>: Any individual or entity accessing or using the LMS.</li>
          <li><strong>Content</strong>: All materials, including text, images, videos, and other multimedia, provided through the LMS.</li>
        </ul>

        <h3>2. Permitted Use</h3>
        <p>You may use the LMS for lawful educational purposes. You agree not to:</p>
        <ul>
          <li>Breach any applicable local, national, or international law or regulation</li>
          <li>Send, knowingly receive, upload, download, use, or re-use any material that does not comply with our content standards</li>
          <li>Transmit any unsolicited or unauthorized advertising or promotional material</li>
          <li>Transmit any data that contains viruses or other harmful programs</li>
        </ul>
      </div>
    )
  },
  "cookie-policy": {
    title: "Cookie Policy",
    content: (
      <div className="prose prose-slate max-w-none">
        <h3>Introduction</h3>
        <p>
          This Cookie Policy explains how SkillSet uses cookies and similar technologies to recognize you when you visit 
          our website. It explains what these technologies are and why we use them, as well as your rights to control 
          our use of them.
        </p>

        <h3>What are Cookies?</h3>
        <p>
          Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
          Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well 
          as to provide reporting information.
        </p>

        <h3>Why Do We Use Cookies?</h3>
        <p>
          We use cookies for several reasons. Some cookies are required for technical reasons in order for our Website 
          to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable 
          us to track and target the interests of our users to enhance the experience on our Website.
        </p>

        <h3>Types of Cookies We Use</h3>
        <h4>Essential Cookies</h4>
        <p>
          These cookies are strictly necessary to provide you with services available through our Website and to use 
          some of its features, such as access to secure areas.
        </p>

        <h4>Performance and Functionality Cookies</h4>
        <p>
          These cookies are used to enhance the performance and functionality of our Website but are non-essential to 
          their use. However, without these cookies, certain functionality may become unavailable.
        </p>
      </div>
    )
  },
  "become-instructor": {
    title: "Become an Instructor",
    content: (
      <div className="prose prose-slate max-w-none">
        <h3>Join Our Teaching Community</h3>
        <p>
          Share your expertise and passion with learners worldwide. As an instructor on our platform, you'll have 
          the opportunity to create courses, engage with students, and earn income from your knowledge.
        </p>

        <h3>Requirements</h3>
        <ul>
          <li>Proven expertise in your subject area</li>
          <li>Ability to create engaging educational content</li>
          <li>Commitment to student success</li>
          <li>Professional communication skills</li>
        </ul>

        <h3>Benefits</h3>
        <ul>
          <li>Earn revenue from your courses</li>
          <li>Access to our marketing and promotional tools</li>
          <li>Student analytics and feedback</li>
          <li>Community of fellow instructors</li>
        </ul>

        <h3>How to Apply</h3>
        <p>
          To become an instructor, please contact us at instructor@elmond.org with your credentials, teaching 
          experience, and proposed course topics. Our team will review your application and get back to you within 
          5-7 business days.
        </p>
      </div>
    )
  }
};

export default function PolicyPage() {
  const [, params] = useRoute("/:slug");
  const slug = params?.slug || "privacy-policy";
  
  const policy = policyContent[slug] || policyContent["privacy-policy"];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: policy.title }]} />

        <h1 className="font-display font-bold text-3xl md:text-4xl mb-8" data-testid="text-policy-title">
          {policy.title}
        </h1>

        <Card>
          <CardContent className="p-8">
            {policy.content}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
