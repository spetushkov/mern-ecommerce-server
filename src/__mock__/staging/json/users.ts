import { PasswordService } from '@spetushkou/api-expressjs';

export const users = [
  {
    name: 'admin',
    email: 'admin@company.com',
    password: PasswordService.hashSync('123456'),
    roles: ['ADMIN', 'EDITOR', 'AUTHOR'],
  },
  {
    name: 'user1',
    email: 'user1@company.com',
    password: PasswordService.hashSync('123456'),
    roles: ['EDITOR', 'AUTHOR'],
  },
  {
    name: 'user2',
    email: 'user2@company.com',
    password: PasswordService.hashSync('123456'),
    roles: ['AUTHOR'],
  },
];
