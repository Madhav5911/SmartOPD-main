import { Link } from "react-router-dom";
import { Users, Clock, Shield, CheckCircle2, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import PublicLayout from "@/components/PublicLayout";

const Index = () => {
  return (
    <PublicLayout>
      {/* Hero Section - Simple and Direct */}
      <section className="bg-background border-b">
        <div className="container py-16 md:py-24 max-w-3xl mx-auto px-4">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Wait Less. See More.
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              SmartOPD lets patients register online, get a real-time token, and arrive just when the doctor is ready. It's used by clinics across the city.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="h-14 px-8 text-base rounded-lg">
                <Link to="/register">
                  Register as Patient
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base rounded-lg">
                <Link to="/queue">
                  Check Live Queue
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Stats Section */}
      <section className="bg-card border-b">
        <div className="container py-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <p className="text-muted-foreground">Patients registered</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Doctors using the system</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">30 min</div>
              <p className="text-muted-foreground">Average time saved per visit</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Simple Steps */}
      <section className="bg-background">
        <div className="container py-16 md:py-24 max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center">How it works</h2>
          
          <div className="space-y-8">
            <div className="flex gap-6 md:gap-8">
              <div className="shrink-0">
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">1</div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Register online</h3>
                <p className="text-muted-foreground text-lg">Enter your name, phone, and pick your doctor. Takes 30 seconds.</p>
              </div>
            </div>

            <div className="flex gap-6 md:gap-8">
              <div className="shrink-0">
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">2</div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Get your token number</h3>
                <p className="text-muted-foreground text-lg">You'll see your position in the queue. No need to sit in the clinic yet.</p>
              </div>
            </div>

            <div className="flex gap-6 md:gap-8">
              <div className="shrink-0">
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">3</div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Come when you're called</h3>
                <p className="text-muted-foreground text-lg">The queue updates live every 30 seconds. You'll see exactly when the doctor will see you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Doctors Use It */}
      <section className="bg-card border-t border-b">
        <div className="container py-16 md:py-24 px-4">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Why doctors trust it</h2>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto items-center">
            {/* Image */}
            <div className="flex justify-center">
              <img 
                src="/image.png" 
                alt="Doctor using SmartOPD" 
                className="w-full h-auto max-w-xs md:max-w-sm rounded-xl shadow-lg"
              />
            </div>

            {/* Benefits */}
            <div className="space-y-6">
            <div className="flex gap-4">
              <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">HIPAA Compliant</h3>
                <p className="text-muted-foreground text-sm">Patient data is encrypted and secure. Meets all healthcare privacy requirements.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Reduces No-Shows</h3>
                <p className="text-muted-foreground text-sm">When patients know exactly when to come, they show up. No wasted appointment slots.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Better Flow</h3>
                <p className="text-muted-foreground text-sm">Hospitals report 15-20% improvement in patient throughput.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Activity className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Easy for Staff</h3>
                <p className="text-muted-foreground text-sm">No complicated training needed. It integrates with your existing clinic workflow.</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Patients Use It */}
      <section className="bg-background">
        <div className="container py-16 md:py-24 px-4">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Why patients prefer it</h2>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto items-center">
            {/* Benefits */}
            <div className="space-y-6">
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">No more wasted time</h3>
                <p className="text-muted-foreground text-sm">Come to the clinic when you're actually next. Not 2 hours early.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Know your queue position</h3>
                <p className="text-muted-foreground text-sm">See live updates on how many people are ahead of you.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Works on any phone</h3>
                <p className="text-muted-foreground text-sm">No app to download. Just visit the website and register.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">No shared waiting rooms</h3>
                <p className="text-muted-foreground text-sm">Stay safe. Avoid crowded clinic waiting areas.</p>
              </div>
            </div>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <img 
                src="/image2.png" 
                alt="Patient using SmartOPD on phone" 
                className="w-full h-auto max-w-xs md:max-w-sm rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground border-t">
        <div className="container py-16 md:py-20 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to get your token?</h2>
          <p className="text-lg opacity-90 mb-8">It only takes 30 seconds to register.</p>
          <Button asChild size="lg" variant="secondary" className="h-14 px-12 text-base rounded-lg">
            <Link to="/register">
              Create Account
            </Link>
          </Button>
        </div>
      </section>

      {/* Simple Footer Info */}
      <section className="bg-card border-t">
        <div className="container py-12 max-w-3xl mx-auto px-4">
          <div className="text-center space-y-4 text-muted-foreground text-sm">
            <p>SmartOPD is built for real clinics. Used by doctors and trusted by patients.</p>
            <p>Your data is encrypted. No tracking. No ads.</p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Index;
