import { Public } from '#/auth/decorators/public.decorator.js';
import { Roles } from '#/auth/decorators/roles.decorator.js';
import { Role } from '#/auth/roles/enums/role.enum.js';
import { IdDto } from '#/common/dto/id.dto.js';
import { IdFilenameDto } from '#/files/dto/id-filename.dto.js';
import { FileSchema } from '#/files/swagger/schemas/file.schema.js';
import { FilesSchema } from '#/files/swagger/schemas/files.schema.js';
import { File } from '#/files/types/file.types.js';
import { createParseFilePipe } from '#/files/util/file-validation.util.js';
import {
  MULTIPART_FORMDATA_KEY,
  MaxFileCount,
} from '#/files/util/file.constants.js';
import { ApiPaginatedResponse } from '#/querying/swagger/decorators/api-paginated-response.decorator.js';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto.js';
import { QueryProductsDto } from './dto/querying/query-products.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { Product } from './entities/product.entity.js';
import { ProductsService } from './products.service.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles([Role.MANAGER])
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiPaginatedResponse(Product)
  @Public()
  @Get()
  findAll(@Query() queryProductsDto: QueryProductsDto) {
    return this.productsService.findAll(queryProductsDto);
  }

  @Public()
  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    return this.productsService.findOne(id);
  }

  @Roles([Role.MANAGER])
  @Patch(':id')
  update(@Param() { id }: IdDto, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Roles([Role.MANAGER])
  @Delete(':id')
  remove(@Param() { id }: IdDto) {
    return this.productsService.remove(id);
  }

  @ApiConsumes(MULTIPART_FORMDATA_KEY)
  @ApiBody({ type: FilesSchema })
  @Roles([Role.MANAGER])
  @UseInterceptors(FilesInterceptor('files', MaxFileCount.PRODUCT_IMAGES))
  @Post(':id/images')
  uploadImages(
    @Param() { id }: IdDto,
    @UploadedFiles(createParseFilePipe('2MB', 'png', 'jpeg'))
    files: File[],
  ) {
    return this.productsService.uploadImages(id, files);
  }

  @ApiOkResponse({ type: FileSchema })
  @Roles([Role.MANAGER])
  @Get(':id/images/:filename')
  downloadImage(@Param() { id, filename }: IdFilenameDto) {
    return this.productsService.downloadImage(id, filename);
  }

  @Roles([Role.MANAGER])
  @Delete(':id/images/:filename')
  deleteImage(@Param() { id, filename }: IdFilenameDto) {
    return this.productsService.deleteImage(id, filename);
  }
}
