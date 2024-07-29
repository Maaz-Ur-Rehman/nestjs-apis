import { IsEmpty, IsEnum, IsNotEmpty, isNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "../schemas/book.schema";
import { User } from "../../auth/schemas/user.schema";


export class CreateBookDto{
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsNotEmpty()
    @IsString()
    author: string;
    @IsNotEmpty()
    @IsString()
    description: string;
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsEnum(Category,{message:"Please enter a category"})
    category: Category;

    @IsEmpty({message:"You cannot pass user id"})
    userId:User

}