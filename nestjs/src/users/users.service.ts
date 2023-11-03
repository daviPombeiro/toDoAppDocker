import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcryptjs';
import { UpdateUser } from './interfaces/updateUser.interface';
import { CreateUser } from './interfaces/createUser.interface';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  getUser(email: string) {
    let user = JSON.parse(JSON.stringify(this.users.find(el => el.email === email)));

    if (!user) throw new NotFoundException();

    delete user['password'];

    return user;
  }

  createUser(user: CreateUser) {
    let newUser: User = {
      userId: this.users.length,
      email: user.email,
      name: user.name,
      password: this.generateHash(user.password)
    };

    this.users.push(newUser);
  }

  updateUser(email: string, user: UpdateUser) {
    const index = this.users.findIndex(el => el.email === email)
    if (user.password) user.password = this.generateHash(user.password);
    let modUser = JSON.parse(JSON.stringify(Object.assign(this.users[index], user)));

    delete modUser["password"];

    return modUser;
  }

  deleteUser(email: string) {
    const index = this.users.findIndex(el => el.email === email);
    if (index === -1) throw new BadRequestException();

    let user = this.users.splice(index, 1)[0];

    delete user["password"];

    return user;
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find(el => el.email === email);
  }

  private generateHash(password: string): string {
    return bcrypt.hashSync(password);
  }
}
