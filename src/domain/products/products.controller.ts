import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'auth/decorators/public.decorator';
import { Roles } from 'auth/decorators/roles.decorator';
import { Role } from 'auth/roles/enums/role.enum';
import { IdDto } from 'common/dto/id.dto';
import { PaginationDto } from 'common/dto/pagination.dto';
import { createFileValidators } from 'files/util/file-validation.util';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(Role.MANAGER)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Public()
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Public()
  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    return this.productsService.findOne(id);
  }

  @Roles(Role.MANAGER)
  @Patch(':id')
  update(@Param() { id }: IdDto, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Roles(Role.MANAGER)
  @Delete(':id')
  remove(@Param() { id }: IdDto) {
    return this.productsService.remove(id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post(':id/image')
  uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: createFileValidators('2MB', 'png', 'jpeg'),
      }),
    )
    file: Express.Multer.File,
  ) {
    return file;
  }
}
