import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import * as  mongoose from 'mongoose';
import { UpdateBookDto } from './dto/update-book.dto';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private readonly bookModel: mongoose.Model<Book>

    ){}

    async findAll(title?: string): Promise<Book[]> {
        let filter = {};
        if (title) {
            filter = { title: new RegExp(title, 'i') }; 
        }
        const books = await this.bookModel.find(filter).exec();
        return books;
    }

    async create(book: Book,user:User):Promise<Book> {

        const data=Object.assign(book, {userId: user._id});
        const res=await this.bookModel.create(data)
        return res
    }

    async findById(id: String):Promise<Book> {

        try {
           
            const book = await this.bookModel.findById(id)
            if(!book)
                throw new NotFoundException('Book not found')
            return book;
        } catch (error) {
           throw new NotFoundException(`internal error: ${error}`)
        }
    }

    async update(id: String, book:UpdateBookDto): Promise<Book> {

        try {
            console.log(id,book)
            const updatedBook = await this.bookModel.findByIdAndUpdate(id, book, {new: true})
            console.log(updatedBook)
            if(!updatedBook)
                throw new NotFoundException('Book not found')
            return updatedBook;
        } catch (error) {
            throw new NotFoundException(`internal error: ${error}`)
        }
    }
    async delete(id: String): Promise<Book> {

        try {
            const updatedBook = await this.bookModel.findByIdAndDelete(id);

            // console.log(updatedBook)
            if(!updatedBook)
                throw new NotFoundException('Book not found')
            return updatedBook;
        } catch (error) {
            throw new NotFoundException(`internal error: ${error}`)
        }
    }
}
