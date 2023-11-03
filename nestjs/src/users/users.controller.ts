import { Controller, UseGuards, HttpCode, HttpStatus, Param, Body, Request, Get, Post, Put, Delete } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './users.service';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UserPipe } from './pipes/user.pipe';
import { CreateUserDto } from './dtos/createUser.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UserService) { }

  @Get('all')
  @UseGuards(AuthGuard)
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  createUser(@Body(new UserPipe()) UserDto: CreateUserDto) {
    this.userService.createUser(UserDto);
  }

  @Put()
  @UseGuards(AuthGuard)
  updateUser(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(req.payload.email, updateUserDto);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  deleteUser(@Request() req) {
    return this.userService.deleteUser(req.payload.email);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  getUser(@Request() req) {
    return this.userService.getUser(req.payload.email);
  }
}
