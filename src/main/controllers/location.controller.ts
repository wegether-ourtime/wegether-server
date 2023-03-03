import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EventService } from '../services';
import { LocationService } from '../services/location.service';
import { QueryPlaceDto } from '../dto/location.dto';

@ApiTags('location')
// @ApiBearerAuth()
@Controller('location')
// @UseGuards(JwtAuthGuard)
//@UsePipes(SanitizePipe)
@UseInterceptors(ClassSerializerInterceptor)
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get('/search-place')
  getPlace(@Query() query: QueryPlaceDto) {
    return this.locationService.findPlaces(query);
  }
}
