import { OrderStatus, Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    await tx.order.deleteMany();
    await tx.user.deleteMany();
    await tx.product.deleteMany();
    await tx.category.deleteMany();

    const cat1 = await tx.category.create({
      data: { name: 'Electronics' },
    });
    const cat2 = await tx.category.create({
      data: { name: 'Books' },
    });
    const cat3 = await tx.category.create({
      data: { name: 'Computers' },
    });
    const cat4 = await tx.category.create({
      data: { name: 'Games' },
    });

    const p1 = await tx.product.create({
      data: {
        name: 'Book of Cain',
        description:
          'The writings of an elderly scholar about this perilous world.',
        price: 102.5,
        categories: { connect: [{ id: cat2.id }] },
      },
    });
    const p2 = await tx.product.create({
      data: {
        name: 'Smart TV',
        price: 2350,
        categories: { connect: [{ id: cat1.id }, { id: cat3.id }] },
      },
    });
    const p3 = await tx.product.create({
      data: {
        name: 'Macbook Pro',
        price: 1200,
        categories: { connect: [{ id: cat3.id }] },
      },
    });
    const p4 = await tx.product.create({
      data: {
        name: 'Gaming PC',
        description: 'Latest generation hardware for the best experience.',
        price: 2000,
        categories: { connect: [{ id: cat3.id }] },
      },
    });
    const p5 = await tx.product.create({
      data: {
        name: 'Game Mechanics: Advanced Game Design',
        description: 'Learn how to craft well-designed game mechanics.',
        price: 149.9,
        categories: { connect: [{ id: cat2.id }] },
      },
    });
    const p6 = await tx.product.create({
      data: {
        name: 'Warcraft III: Reign of Chaos',
        description: 'A true classic in the RTS genre.',
        price: 25.99,
        categories: { connect: [{ id: cat4.id }] },
      },
    });

    const u1 = await tx.user.create({
      data: {
        name: 'Pedro Faria',
        email: 'jarulf@mail.com',
        phone: '988888888',
        password: '123456',
      },
    });
    const u2 = await tx.user.create({
      data: {
        name: 'Chris Metzen',
        email: 'chris@blizz.com',
        phone: '977777777',
        password: '654321',
      },
    });

    const oi1: Prisma.OrderItemCreateManyOrderInput = {
      productId: p1.id,
      quantity: 2,
      price: p1.price,
    };
    const oi2: Prisma.OrderItemCreateManyOrderInput = {
      productId: p3.id,
      quantity: 1,
      price: p3.price,
    };
    const oi3: Prisma.OrderItemCreateManyOrderInput = {
      productId: p3.id,
      quantity: 2,
      price: p3.price,
    };
    const oi4: Prisma.OrderItemCreateManyOrderInput = {
      productId: p5.id,
      quantity: 2,
      price: p5.price,
    };

    const pay1: Prisma.PaymentCreateWithoutOrderInput = {};

    const o1 = await tx.order.create({
      data: {
        customer: { connect: { id: u1.id } },
        items: { create: [oi1, oi2] },
        status: OrderStatus.AWAITING_SHIPMENT,
        payment: { create: pay1 },
      },
    });
    const o2 = await tx.order.create({
      data: {
        customer: { connect: { id: u2.id } },
        items: { create: [oi3] },
        status: OrderStatus.AWAITING_PAYMENT,
      },
    });
    const o3 = await tx.order.create({
      data: {
        customer: { connect: { id: u1.id } },
        items: { create: [oi4] },
        status: OrderStatus.AWAITING_PAYMENT,
      },
    });
  });
};

const main = async () => {
  try {
    await seed();
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

main();
