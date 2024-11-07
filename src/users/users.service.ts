import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();

    const emailGiven = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (emailGiven) {
      return null;
    }

    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    await user.hashPassword();
    return await this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { id } });
  }
}
