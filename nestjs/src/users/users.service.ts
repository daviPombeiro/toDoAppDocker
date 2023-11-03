import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  getUser(token: number): User {
    return this.users[token];
  }

  createUser(user: User): void {
    this.users.push(user);
  }

  updateUser(token: number, user: User): void {
    Object.assign(this.users[token], user);
  }

  deleteUser(token: number): User[] | null {
    return this.users.splice(token, 1);
  }

  authUser(user: User): number {
    return this.users.findIndex(el => el.email === user.email && el.password === user.password);
  }
}
