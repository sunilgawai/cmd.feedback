import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Contact Us</h1>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Phone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>+91 7397973154</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>sunilgawai7397@gmail.com</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              SRA - L9 Mahatma Phule Nagar, MIDC Bhosari, Pune Maharashtra Pune
              - 411026
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
