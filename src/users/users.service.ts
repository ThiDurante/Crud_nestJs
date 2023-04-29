import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './Schemas/user.schema';
import { Model } from 'mongoose';
import { hashPassword } from 'src/utils/encryption';
import { usersSeeds } from 'src/seeds/usersSeeds';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async onModuleInit() {
    try {
      const users = await this.userModel.find();
      if (users.length < 1) {
        Promise.all(
          usersSeeds.map(async (user) => await this.userModel.create(user)),
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async create(createUserDto: CreateUserDto) {
    const encryptedUser = await hashPassword(createUserDto);
    console.log(encryptedUser);

    const user = new this.userModel(encryptedUser);
    return user.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateUserDto },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.userModel.findByIdAndRemove({ _id: id });
  }
}
