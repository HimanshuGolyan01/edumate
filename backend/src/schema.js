const { gql } = require('apollo-server-express');

const typeDefs = gql`
  enum Role {
    STUDENT
    PROFESSOR
  }

  enum Level {
    BEGINNER
    INTERMEDIATE
    ADVANCED
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    createdAt: String!
    enrollments: [Enrollment!]!
    courses: [Course!]!
  }

  type Course {
    id: ID!
    title: String!
    description: String!
    level: Level!
    instructor: User!
    instructorId: String!
    createdAt: String!
    updatedAt: String!
    enrollments: [Enrollment!]!
    isEnrolled: Boolean
  }

  type Enrollment {
    id: ID!
    user: User!
    course: Course!
    createdAt: String!
  }

  type Query {
    courses: [Course!]!
    course(id: ID!): Course
    user(id: ID!): User
    enrollment(userId: ID!, courseId: ID!): Enrollment
  }

  type Mutation {
    enrollUser(userId: ID!, courseId: ID!): Enrollment!
    updateCourse(id: ID!, title: String, description: String, level: Level): Course!
    createCourse(title: String!, description: String!, level: Level!, instructorId: ID!): Course!
  }
`;

module.exports = typeDefs;