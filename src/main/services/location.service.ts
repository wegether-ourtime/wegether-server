import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateUserEventDto } from '../dto';
import { QueryPlaceDto } from '../dto/location.dto';

@Injectable()
export class LocationService {
  constructor(private readonly httpService: HttpService) {}

  async findPlaces(query: QueryPlaceDto) {
    const { search, nextPage } = query;
    const url =
      `https://maps.googleapis.com/maps/api/place/textsearch/json?` +
      `query=${search ? search.replace(' ', '%20') : ''}` +
      (nextPage ? `&pagetoken=${nextPage}` : '') +
      `&key=${process.env.GM_API_KEY}`;

    const { data } = await firstValueFrom(this.httpService.get(url));
    return {
      nextPage: data['next_page_token'],
      data: data.results.map((r: any) => {
        return {
          name: r['name'],
          lat: r['geometry']['location']['lat'],
          lng: r['geometry']['location']['lng'],
          address: r['formatted_address'],
        };
      }),
    };
  }
}
