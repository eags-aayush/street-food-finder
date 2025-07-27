import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles, Users, TrendingUp } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function Welcome() {
  const [showMainPage, setShowMainPage] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // If already authenticated, redirect to dashboard
  if (isAuthenticated && user) {
    const dashboardPath = `/${user.role}/dashboard`;
    window.location.href = dashboardPath;
    return null;
  }

  const handleContinue = () => {
    setShowMainPage(true);
    // Redirect to home page after animation
    setTimeout(() => {
      window.location.href = "/home";
    }, 1000);
  };

  if (showMainPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-center text-white animate-fade-out">
          <div className="text-6xl mb-4 animate-pulse">✨</div>
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Solution!</h1>
          <p className="text-xl opacity-90">Loading your marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {/* Animated background elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-16 w-20 h-20 bg-white/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-white/15 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 text-center text-white px-8 max-w-4xl mx-auto">
        {/* Team Introduction */}
        <div className="mb-12 animate-slide-down">
          <div className="flex items-center justify-center mb-6">
            <Users className="h-12 w-12 mr-4 text-yellow-300" />
            <div className="text-left">
              <h2 className="text-2xl font-bold text-yellow-300">हम हैं Team</h2>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                ZUPP UP
              </h1>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 animate-slide-up">
            <h3 className="text-3xl font-bold mb-4 flex items-center justify-center">
              <Sparkles className="h-8 w-8 mr-3 text-yellow-300 animate-spin-slow" />
              Welcome to Our Solution!
            </h3>
            <p className="text-xl opacity-90 mb-6 leading-relaxed">
              Street Food Marketplace - सबसे बेस्ट प्लेटफॉर्म जो कनेक्ट करता है 
              <br />
              <span className="text-yellow-300 font-semibold">Street Food Vendors</span> को 
              <span className="text-green-300 font-semibold"> Quality Suppliers</span> के साथ
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 rounded-lg p-4 animate-fade-in-1">
                <div className="text-3xl mb-2">🍛</div>
                <h4 className="font-semibold mb-1">Vendors</h4>
                <p className="text-sm opacity-80">Best quality ingredients</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 animate-fade-in-2">
                <div className="text-3xl mb-2">🏭</div>
                <h4 className="font-semibold mb-1">Suppliers</h4>
                <p className="text-sm opacity-80">Reach more customers</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 animate-fade-in-3">
                <div className="text-3xl mb-2">🚀</div>
                <h4 className="font-semibold mb-1">Growth</h4>
                <p className="text-sm opacity-80">Scale your business</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Stats */}
        <div className="mb-8 animate-slide-up-delayed">
          <div className="flex justify-center items-center space-x-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-300">500+</div>
              <div className="text-sm opacity-80">Happy Vendors</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-green-300">200+</div>
              <div className="text-sm opacity-80">Trusted Suppliers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-300">50k+</div>
              <div className="text-sm opacity-80">Orders Delivered</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="animate-bounce-subtle">
          <Button
            onClick={handleContinue}
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-xl px-8 py-4 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105"
          >
            Enter Marketplace
            <ChevronRight className="ml-2 h-6 w-6 animate-pulse" />
          </Button>
          
          <p className="mt-4 text-sm opacity-70 animate-pulse">
            Experience the future of street food business
          </p>
        </div>
      </div>
    </div>
  );
}