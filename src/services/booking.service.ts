import { prisma } from "../lib/prisma";
import type { Booking, BookingStatus } from "@prisma/client";

export class BookingService {
 
  // Método para criar uma nova reserva com a lógica de busca de quarto
 static async create(data: {
  userId: string;
  hotelId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
 }): Promise<Booking> {

  // Verifica se a data de check-in é anterior à data de check-out
  if (data.checkIn >= data.checkOut) {
   throw new Error("checkIn deve ser antes de checkOut");
  }

  const { hotelId, checkIn, checkOut, guests, totalPrice, userId } = data;

  // Encontra um quarto disponível no hotel
  const availableRooms = await prisma.room.findMany({
   where: {
    hotelId: hotelId,
    capacity: {
     gte: guests, // Capacidade do quarto deve ser maior ou igual ao número de hóspedes
    },
    bookings: {
     none: { // Nenhuma reserva que se sobreponha às novas datas
      AND: [
       { checkIn: { lte: checkOut } },
       { checkOut: { gte: checkIn } },
      ],
     },
    },
   },
   orderBy: {
    capacity: 'asc' // Prioriza quartos menores para otimizar a alocação
   }
  });

  if (availableRooms.length === 0) {
   throw new Error("Nenhum quarto disponível para as datas e número de hóspedes especificados.");
  }

  // Seleciona o primeiro quarto disponível encontrado
  const selectedRoom = availableRooms[0];

  // Cria a reserva no banco de dados com o ID do quarto selecionado
  const newBooking = await prisma.booking.create({
   data: {
    checkIn: checkIn,
    checkOut: checkOut,
    guests: guests,
    totalPrice: totalPrice,
    status: "PENDING",
    userId: userId,
    hotelId: hotelId,
    roomId: selectedRoom.id,
   },
  });

  return newBooking;
 }
  

  
  // Métodos de leitura e atualização existentes
 static listByUser(userId: string) {
  return prisma.booking.findMany({
   where: { userId },
   include: { hotel: true, room: true },
   orderBy: { checkIn: "desc" }
  });
 }

 static updateStatus(id: string, status: BookingStatus) {
  return prisma.booking.update({ where: { id }, data: { status } });
 }

 static cancel(id: string) {
  return prisma.booking.update({ where: { id }, data: { status: "CANCELLED" } });
 }

 static findById(id: string) {
  return prisma.booking.findUnique({ where: { id }, include: { hotel: true, room: true } });
 }
}