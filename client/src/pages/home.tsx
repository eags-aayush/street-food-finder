import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Warehouse, ShieldQuestion, Utensils } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-700 flex items-center">
      <div className="container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4 flex items-center justify-center">
              <Utensils className="mr-4 h-12 w-12" />
              Street Food Raw Materials Marketplace
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Connect street food vendors with quality raw material suppliers. 
              Fresh ingredients, fair prices, reliable delivery.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white text-gray-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6 text-center">
                <ShoppingCart className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Street Food Vendor</h3>
                <p className="text-gray-600 mb-4">
                  Order fresh raw materials for your street food business
                </p>
                <Link href="/vendor/auth">
                  <Button className="w-full" size="lg">
                    Login as Vendor
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-white text-gray-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6 text-center">
                <Warehouse className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Raw Material Supplier</h3>
                <p className="text-gray-600 mb-4">
                  List your products and manage orders from vendors
                </p>
                <Link href="/supplier/auth">
                  <Button className="w-full" variant="default" size="lg">
                    Login as Supplier
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-white text-gray-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6 text-center">
                <ShieldQuestion className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Admin Panel</h3>
                <p className="text-gray-600 mb-4">
                  Manage vendors, suppliers and monitor marketplace
                </p>
                <Link href="/admin/auth">
                  <Button className="w-full" variant="default" size="lg">
                    Admin Login
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
