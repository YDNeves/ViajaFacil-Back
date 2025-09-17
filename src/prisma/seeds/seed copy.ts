/* import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // Criar usuário
  const user = await prisma.user.create({
    data: {
      name: "João da Silva",
      email: "joao@example.com",
      password: "hashedpassword",
    },
  });


  // Criar hotel
  const hotel = await prisma.hotel.create({
    data: {
      name: "Hotel Luxo Luanda",
      image: "https://picsum.photos/800/400?random=2",
      location: "Luanda, Angola",
      rating: 4.5,
      reviewsCount: 120,
      price: 150,
      originalPrice: 200,
      amenities: ["Wi-Fi", "Piscina", "Academia", "Estacionamento"],
      distance: "2 km do centro",
      deal: "Desconto de 25%",
      description: "Hotel de luxo com vista para o mar.",
      images: [
        "https://picsum.photos/800/400?random=3",
        "https://picsum.photos/800/400?random=4"
      ],
    },
  });

  // Criar quarto
  const room = await prisma.room.create({
    data: {
      name: "Suíte Master",
      price: 250,
      originalPrice: 300,
      capacity: 2,
      amenities: ["Ar-condicionado", "Varanda", "Banheira"],
      image: "https://picsum.photos/800/400?random=5",
      hotelId: hotel.id,
    },
  });

  // Criar avaliação
  await prisma.review.create({
    data: {
      rating: 5,
      comment: "Excelente estadia!",
      userId: user.id,
      hotelId: hotel.id,
    },
  });

  // Criar reserva
  await prisma.booking.create({
    data: {
      checkIn: new Date("2025-09-01"),
      checkOut: new Date("2025-09-05"),
      guests: 2,
      totalPrice: 1000,
      status: "CONFIRMED",
      userId: user.id,
      hotelId: hotel.id,
      roomId: room.id,
    },
  });

 // Histórico de busca
  await prisma.searchHistory.create({
    data: {
      destination: "Luanda",
      filtersUsed: { rating: "4+", priceRange: [100, 300] },
      userId: user.id,
    },
  });
 
  console.log("✅ Seed finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
 */