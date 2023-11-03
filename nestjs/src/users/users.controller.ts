import { Controller, Param, Body, Res, Get, Post, Put, Delete } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UserPipe } from './pipes/user.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) { }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  createUser(@Body(new UserPipe()) UserDto: UserDto) {
    this.userService.createUser(UserDto);
  }

  @Post('auth')
  authUser(@Body(new UserPipe()) userDto: UserDto): number {
    return this.userService.authUser(userDto);
  }

  @Put(':token')
  updateUser(@Param('token') token: number, @Body() updateUserDto: UpdateUserDto) {
    this.userService.updateUser(token, updateUserDto);
  }

  @Delete(':token')
  deleteUser(@Param('token') token: number, @Res() res: Response) {
    const deletedUser = this.userService.deleteUser(token);
    res.status(deletedUser ? 200 : 400).send(deletedUser);
  }

  @Get(':token')
  getUser(@Param('token') token: number, @Res() res: Response) {
    const user = this.userService.getUser(token);
    res.status(user ? 200 : 404).send(user);
  }
}
