import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const menuCategories = [
  {
    name: "LOMO",
    items: [
      {
        name: "Spaghetti Bolognese",
        image: "/placeholder.svg?height=200&width=200",
        price: "$18.99",
      },
      {
        name: "Fresh Salad",
        image: "/placeholder.svg?height=200&width=200",
        price: "$12.99",
      },
    ],
  },
  {
    name: "SALAD",
    items: [
      {
        name: "Caesar Salad",
        image: "/placeholder.svg?height=200&width=200",
        price: "$14.99",
      },
      {
        name: "Greek Salad",
        image: "/placeholder.svg?height=200&width=200",
        price: "$13.99",
      },
    ],
  },
  {
    name: "BEER",
    items: [
      {
        name: "Craft Beer",
        image: "/placeholder.svg?height=200&width=200",
        price: "$8.99",
      },
      {
        name: "Draft Beer",
        image: "/placeholder.svg?height=200&width=200",
        price: "$7.99",
      },
    ],
  },
];

export function MenuSection() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="grid gap-8">
          {menuCategories.map((category) => (
            <div key={category.name}>
              <h2 className="mb-6 text-2xl font-bold">{category.name}</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {category.items.map((item) => (
                  <Card key={item.name} className="overflow-hidden">
                    <CardContent className="p-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={200}
                        height={200}
                        className="aspect-square object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.price}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
