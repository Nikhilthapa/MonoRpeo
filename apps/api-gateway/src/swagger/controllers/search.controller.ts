import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Search')
@Controller('api/search')
export class SearchController {
  @Get()
  @ApiOperation({ summary: 'Search', description: 'Perform a search query' })
  @ApiQuery({ name: 'q', required: false, description: 'Search query string' })
  @ApiQuery({ name: 'type', required: false, description: 'Search type filter' })
  @ApiResponse({ status: 200, description: 'Search results retrieved successfully' })
  async search(@Query() query: any) {
    return { message: 'This endpoint is proxied to the search service' };
  }
}
