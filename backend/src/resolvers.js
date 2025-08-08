const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    courses: async () => {
      return await prisma.course.findMany({
        include: {
          instructor: true,
          enrollments: {
            include: {
              user: true
            }
          }
        }
      });
    },

    course: async (_, { id }) => {
      return await prisma.course.findUnique({
        where: { id },
        include: {
          instructor: true,
          enrollments: {
            include: {
              user: true
            }
          }
        }
      });
    },

    user: async (_, { id }) => {
      return await prisma.user.findUnique({
        where: { id },
        include: {
          enrollments: {
            include: {
              course: true
            }
          },
          courses: true
        }
      });
    },

    enrollment: async (_, { userId, courseId }) => {
      return await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId
          }
        },
        include: {
          user: true,
          course: true
        }
      });
    }
  },

  Mutation: {
    enrollUser: async (_, { userId, courseId }) => {
      try {
        return await prisma.enrollment.create({
          data: {
            userId,
            courseId
          },
          include: {
            user: true,
            course: true
          }
        });
      } catch (error) {
        throw new Error('Already enrolled or invalid data');
      }
    },

    updateCourse: async (_, { id, ...updates }) => {
      return await prisma.course.update({
        where: { id },
        data: updates,
        include: {
          instructor: true,
          enrollments: {
            include: {
              user: true
            }
          }
        }
      });
    },

    createCourse: async (_, { title, description, level, instructorId }) => {
      return await prisma.course.create({
        data: {
          title,
          description,
          level,
          instructorId
        },
        include: {
          instructor: true,
          enrollments: {
            include: {
              user: true
            }
          }
        }
      });
    }
  },

  Course: {
    isEnrolled: async (parent, _, context) => {
      // This would require user context from authentication
      // For now, return false
      return false;
    }
  }
};

module.exports = resolvers;