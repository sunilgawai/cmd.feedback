import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="p-4 bg-gradient-to-b from-pink-100 to-white min-h-screen">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold">Welcome,</h2>
          <div className="flex items-center gap-2 text-gray-600">
            <span>10000002</span>
            <Star className="w-4 h-4 text-pink-600" />
            <span>Start Anise</span>
          </div>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4">
            Make every visit more rewarding
          </h3>
          <p className="text-gray-600">
            We offer a variety of homemade pastries and sweets, including the
            almond-topped semolina cakes called harissa and the indulgent kunafa
            topped with pistachios. 
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
