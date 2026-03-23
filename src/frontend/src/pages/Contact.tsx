import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const TESTIMONIALS = [
  {
    id: "t1",
    name: "Arjun Mehta",
    role: "Software Engineer",
    rating: 5,
    quote:
      "SkillSure helped me fund my AWS certification without worrying about upfront costs. The pay-as-you-grow model is a game-changer for professionals!",
    initials: "AM",
    color: "#0B6B6E",
  },
  {
    id: "t2",
    name: "Priya Nair",
    role: "Medical Student",
    rating: 5,
    quote:
      "I was skeptical at first, but the privacy features genuinely impressed me. My financial data is only mine. Best fintech app for students in India.",
    initials: "PN",
    color: "#7C3AED",
  },
  {
    id: "t3",
    name: "Rahul Gupta",
    role: "Data Analyst",
    rating: 4,
    quote:
      "The streak multiplier kept me motivated to pay EMIs on time. Earning rewards while paying loans? That's genius! Highly recommend SkillSure.",
    initials: "RG",
    color: "#DB2777",
  },
  {
    id: "t4",
    name: "Sneha Patel",
    role: "UX Designer",
    rating: 5,
    quote:
      "The expense tracker with privacy lock is perfect. I feel in control of my finances without worrying about data leaks. Excellent UX too!",
    initials: "SP",
    color: "#F59E0B",
  },
  {
    id: "t5",
    name: "Vikram Singh",
    role: "CA Student",
    rating: 5,
    quote:
      "Got approved for a Study Abroad Loan in minutes. The process was transparent and the interest is truly income-linked. No hidden charges!",
    initials: "VS",
    color: "#10B981",
  },
  {
    id: "t6",
    name: "Ananya Iyer",
    role: "Marketing Professional",
    rating: 4,
    quote:
      "The savings tracker helps me stay disciplined. I've already saved ₹45,000 for my next certification course using SkillSure's goal system.",
    initials: "AI",
    color: "#6366F1",
  },
];

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setSending(false);
    }, 1000);
  }

  return (
    <div className="animate-fade-in space-y-12">
      {/* Reviews Section */}
      <section>
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            What Our Users Say
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Real stories from students and professionals who grew with
            SkillSure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, idx) => (
            <Card
              key={t.id}
              data-ocid={`reviews.item.${idx + 1}`}
              className="shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all border-border"
            >
              <CardContent className="p-5 space-y-3">
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={`star-${t.id}-${i}`}
                      size={14}
                      className={
                        i < t.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-muted"
                      }
                    />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                {/* User */}
                <div className="flex items-center gap-3 pt-1">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <MessageCircle className="text-teal-600" size={26} />
            Get in Touch
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Have questions? We're here to help. Reach us anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact info */}
          <div className="space-y-4">
            <Card className="shadow-card">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-teal-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Email
                    </p>
                    <a
                      href="mailto:support@skillsure.in"
                      className="text-sm font-medium text-teal-600 hover:underline"
                    >
                      support@skillsure.in
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Phone
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      +91 98765 43210
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-pink-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Address
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      Bengaluru, Karnataka, India
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-name">Name</Label>
                      <Input
                        id="contact-name"
                        data-ocid="contact.input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input
                        id="contact-email"
                        data-ocid="contact.input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-subject">Subject</Label>
                    <Input
                      id="contact-subject"
                      data-ocid="contact.input"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      data-ocid="contact.textarea"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us more about your query..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    data-ocid="contact.submit_button"
                    disabled={sending}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
