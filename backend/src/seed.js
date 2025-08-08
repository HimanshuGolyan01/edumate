const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create users
  const professor1 = await prisma.user.create({
    data: {
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      role: 'PROFESSOR'
    }
  });

  const professor2 = await prisma.user.create({
    data: {
      name: 'Prof. Michael Chen',
      email: 'michael.chen@university.edu',
      role: 'PROFESSOR'
    }
  });

  const student1 = await prisma.user.create({
    data: {
      name: 'Alice Smith',
      email: 'alice.smith@student.edu',
      role: 'STUDENT'
    }
  });

  const student2 = await prisma.user.create({
    data: {
      name: 'Bob Wilson',
      email: 'bob.wilson@student.edu',
      role: 'STUDENT'
    }
  });

  // Create courses
  const course1 = await prisma.course.create({
    data: {
      title: 'Introduction to React',
      description: 'Learn the fundamentals of React including components, props, state, and hooks.',
      level: 'BEGINNER',
      instructorId: professor1.id
    }
  });

  const course2 = await prisma.course.create({
    data: {
      title: 'Advanced JavaScript',
      description: 'Deep dive into JavaScript concepts including closures, prototypes, and async programming.',
      level: 'ADVANCED',
      instructorId: professor1.id
    }
  });

  const course3 = await prisma.course.create({
    data: {
      title: 'Database Design',
      description: 'Learn SQL, database normalization, and modern database design patterns.',
      level: 'INTERMEDIATE',
      instructorId: professor2.id
    }
  });

  const course4 = await prisma.course.create({
    data: {
      title: 'Node.js Backend Development',
      description: 'Build scalable backend applications with Node.js, Express, and databases.',
      level: 'INTERMEDIATE',
      instructorId: professor2.id
    }
  });

  // Create enrollments
  await prisma.enrollment.create({
    data: {
      userId: student1.id,
      courseId: course1.id
    }
  });

  await prisma.enrollment.create({
    data: {
      userId: student2.id,
      courseId: course1.id
    }
  });

  await prisma.enrollment.create({
    data: {
      userId: student1.id,
      courseId: course3.id
    }
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });