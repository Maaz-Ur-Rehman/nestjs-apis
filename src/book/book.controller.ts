import { Body, Controller, Get, Param, Post, Put,Delete,Query, UseGuards, Req } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('book')
export class BookController {
    constructor(private bookService: BookService){}

    @Get()
    async getAllBooks(@Query('title') title?:string ): Promise<Book[]>{
        return this.bookService.findAll(title);
    }

    @Post('new')
    @UseGuards(AuthGuard())
    async createBook(@Body() book:CreateBookDto , @Req() req): Promise<Book>{
        console.log(req,"req")
        return this.bookService.create(book,req.user)
    }

    @Put(':id')
async updateBook(@Param('id') id: string, @Body() book: UpdateBookDto): Promise<Book> {
    return this.bookService.update(id, book);
}

    @Get(':id')
    async getBook(@Param('id') id:string):Promise<Book>{
        return this.bookService.findById(id)   
    }

    @Delete(':id')
    async DeleteBook(@Param('id') id:string):Promise<Book>{
        return this.bookService.delete(id)   
    }
}
