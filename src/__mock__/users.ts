import { PasswordService } from '@spetushkou/api-expressjs';

export const users = [
  {
    name: 'Admin User',
    email: 'admin@company.com',
    password: PasswordService.hashSync('123456'),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'jdoe@company.com',
    password: PasswordService.hashSync('123456'),
    isAdmin: false,
  },
  {
    name: 'Adam Smith',
    email: 'asmith@company.com',
    password: PasswordService.hashSync('123456'),
    isAdmin: false,
  },
];
