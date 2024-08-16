import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly UserService: UserService) { }

    @Post('signup')
    async signupUser(
        @Body() userData: Prisma.UserCreateInput
    ): Promise<UserModel> {
        return this.UserService.createdUser(userData)
    }

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<UserModel> {

        const user = await this.UserService.user({ id: Number(id) });

        if(!user) {
            throw new NotFoundException('Usuário não encontrado.');
        }

        return user;
    }

    @Patch(':id')
    async updateUser(
        @Body() userData: Prisma.UserUpdateInput,
        @Param('id') id: string
    ): Promise<UserModel> {
        return this.UserService.updateUser({
            where: { id: Number(id) },
            data: userData
        });
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<UserModel> {
        return this.UserService.deleteUser({ id: Number(id) });
    }
}
