import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { join } from 'path';

@Controller('image')
@ApiTags('images')
export class ImageController {
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, join(__dirname, '..', '..', '..', '..', 'public', 'images'));
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now();
          cb(null, uniqueSuffix + '_' + file.originalname);
        },
      }),
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    try {
      return {
        path: `${process.env.HOST_URL}/images/${file.filename}`,
      };
    } catch (error) {
      throw new BadRequestException('Upload image failed');
    }
  }
}
