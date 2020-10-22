import bcrypt from 'bcrypt';

export const users = [
  {
    name: 'Admin User',
    email: 'admin@company.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'jdoe@company.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Adam Smith',
    email: 'asmith@company.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
];
