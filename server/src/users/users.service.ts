import { Dishes } from './../dish/entity/dishes.entity';
import { Users } from './entity/users.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersCreateDto } from './dto/users.create.dto';
import { UsersUpdateDto } from './dto/users.update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { AllergiesDto } from './dto/allergies.dto';
import { Ingredients } from 'src/ingredient/entity/ingredient.entity';
import { FavDishDto } from './dto/favdish.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Ingredients)
    private ingredientsRepository: Repository<Ingredients>,
    @InjectRepository(Dishes)
    private dishRepository: Repository<Dishes>,
  ) {}

  async create(createUserDto: UsersCreateDto) {
    const user = await this.userRepository.save(createUserDto);
    const token = sign({ ...user }, process.env.JWT_CONSTANT);
    await this.userRepository.update(user.id, { token: token });

    return {
      ...user,
      token: token,
    };
  }

  async update(id: string, usersUpdateDto: Partial<UsersUpdateDto>) {
    const existingUser = await this.findUserById(id);
    Object.assign(existingUser, usersUpdateDto);
    return await this.userRepository.save(existingUser);
  }

  async findUserById(id: string) {
    const users = await this.userRepository.findOne({ where: { id: id } });
    return users;
  }

  async findUserByIdWithHealth(id: string) {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.healthInfo', 'healthInfo')
      .where('user.id = :id', { id })
      .getOne();
    return users;
  }

  async findUserByIdWithAllergies(id: string) {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.allergies', 'ingredients')
      .leftJoinAndSelect('ingredients.categories', 'categories')
      .where('user.id = :id', { id })
      .getOne();

    return users;
  }

  async findUserByIdWithFavDish(id: string) {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.favoritedishes', 'dishes')
      .where('users.id = :id', { id })
      .getOne();
    return user;
  }

  async findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async findOneUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    await this.userRepository.remove(user);
    return {
      status: 200,
      message: `Користувача з id=${id} було видалено`,
    };
  }

  async addAllergies(id, addAllergiesDto: AllergiesDto): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['allergies'],
    });

    if (!user) {
      throw new NotFoundException('Користувача не знайдено');
    }

    const allergy = await this.ingredientsRepository.findOne({
      where: { id: addAllergiesDto.ingredientsId },
    });

    if (!allergy) {
      throw new NotFoundException('Інгредієнту не знайдено');
    }

    const allergyExists = user.allergies.some(
      (a) => a.id === addAllergiesDto.ingredientsId,
    );
    if (allergyExists) {
      throw new HttpException(
        'Ця алергія вже додана користувачу',
        HttpStatus.CONFLICT,
      );
    }

    user.allergies = [...user.allergies, allergy];
    return this.userRepository.save(user);
  }

  async deleteAllergies(id, deleteAllergiesDto: AllergiesDto): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['allergies'],
    });

    if (!user) {
      throw new NotFoundException('Користувача не знайдено');
    }

    const allergyIndex = user.allergies.findIndex(
      (allergy) => deleteAllergiesDto.ingredientsId === allergy.id,
    );

    if (allergyIndex === -1) {
      throw new NotFoundException('Алергію не знайдено у користувача');
    }

    user.allergies.splice(allergyIndex, 1);

    return this.userRepository.save(user);
  }

  async addFavDish(id, addfavdishDto: FavDishDto): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['favoritedishes'],
    });

    if (!user) {
      throw new NotFoundException('Користувача не знайдено');
    }

    const dish = await this.dishRepository.findOne({
      where: { id: addfavdishDto.dishId },
    });

    if (!dish) {
      throw new NotFoundException('Страви не знайдено');
    }

    const dishExists = user.favoritedishes.some(
      (favDish) => favDish.id === addfavdishDto.dishId,
    );
    if (dishExists) {
      throw new HttpException(
        'Ця страва вже додана до улюблених користувача',
        HttpStatus.CONFLICT,
      );
    }

    user.favoritedishes = [...user.favoritedishes, dish];
    return this.userRepository.save(user);
  }

  async deleteFavDish(id, deleteFavDto: FavDishDto): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['favoritedishes'],
    });

    if (!user) {
      throw new NotFoundException('Користувача не знайдено');
    }

    const dishExists = user.favoritedishes.some(
      (dish) => dish.id === deleteFavDto.dishId,
    );
    if (!dishExists) {
      throw new NotFoundException(
        'Страви не знайдено у списку улюблених страв користувача',
      );
    }

    user.favoritedishes = user.favoritedishes.filter(
      (dish) => deleteFavDto.dishId !== dish.id,
    );

    return this.userRepository.save(user);
  }

  async getUserAllergyIds(userId: string): Promise<number[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['allergies'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.allergies.map((allergy) => allergy.id);
  }

  async findUserByIdWithFavDishAndAlergies(
    id: string,
    allergies: number[],
  ): Promise<Users> {
    // Знайти страви, що містять алергени
    const dishesWithAllergens = await this.dishRepository
      .createQueryBuilder('dish')
      .leftJoin('dish.dishingredients', 'dishingredients')
      .leftJoin('dishingredients.ingredient', 'ingredient')
      .where('ingredient.id IN (:...allergies)', { allergies })
      .select('dish.id')
      .getMany();

    const dishIdsWithAllergens = dishesWithAllergens.map((dish) => dish.id);

    // Знайти користувача з його улюбленими стравами, виключаючи страви з алергенами
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.favoritedishes', 'favoritedishes')
      .where('user.id = :id', { id })
      .andWhere('favoritedishes.id NOT IN (:...dishIdsWithAllergens)', {
        dishIdsWithAllergens:
          dishIdsWithAllergens.length > 0 ? dishIdsWithAllergens : [null],
      })
      .getOne();
    return user;
  }
}
