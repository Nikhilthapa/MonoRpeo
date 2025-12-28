import { Controller, Get, Post, Param, Body, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader, ApiParam, ApiBody } from '@nestjs/swagger';
import {
  CreateSkillDto,
  CreateExperienceDto,
  CreateEducationDto,
  CreateResumeDto,
} from '../dto/profile.dto';

@ApiTags('User Profiles')
@Controller('api/users/:userId')
export class ProfileController {
  @Get('skills')
  @ApiOperation({ summary: 'Get user skills', description: 'Retrieve all skills for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Skills retrieved successfully' })
  @ApiHeader({ name: 'Authorization', required: true, description: 'Bearer token' })
  async getSkills(@Param('userId') userId: string) {
    return { message: 'This endpoint is proxied to the auth service' };
  }

  @Post('skills')
  @ApiOperation({ summary: 'Add skill', description: 'Add a new skill to user profile' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiBody({ type: CreateSkillDto })
  @ApiResponse({ status: 201, description: 'Skill added successfully' })
  @ApiHeader({ name: 'Authorization', required: true, description: 'Bearer token' })
  async addSkill(@Param('userId') userId: string, @Body() createSkillDto: CreateSkillDto) {
    return { message: 'This endpoint is proxied to the auth service' };
  }

  @Get('experience')
  @ApiOperation({ summary: 'Get user work experience', description: 'Retrieve all work experiences for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Experiences retrieved successfully' })
  @ApiHeader({ name: 'Authorization', required: true, description: 'Bearer token' })
  async getExperiences(@Param('userId') userId: string) {
    return { message: 'This endpoint is proxied to the auth service' };
  }

  @Post('experience')
  @ApiOperation({ summary: 'Add work experience', description: 'Add a new work experience to user profile' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiBody({ type: CreateExperienceDto })
  @ApiResponse({ status: 201, description: 'Experience added successfully' })
  @ApiHeader({ name: 'Authorization', required: true, description: 'Bearer token' })
  async addExperience(@Param('userId') userId: string, @Body() createExperienceDto: CreateExperienceDto) {
    return { message: 'This endpoint is proxied to the auth service' };
  }

  @Get('education')
  @ApiOperation({ summary: 'Get user education', description: 'Retrieve all education records for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Education records retrieved successfully' })
  @ApiHeader({ name: 'Authorization', required: true, description: 'Bearer token' })
  async getEducations(@Param('userId') userId: string) {
    return { message: 'This endpoint is proxied to the auth service' };
  }

  @Post('education')
  @ApiOperation({ summary: 'Add education', description: 'Add a new education record to user profile' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiBody({ type: CreateEducationDto })
  @ApiResponse({ status: 201, description: 'Education added successfully' })
  @ApiHeader({ name: 'Authorization', required: true, description: 'Bearer token' })
  async addEducation(@Param('userId') userId: string, @Body() createEducationDto: CreateEducationDto) {
    return { message: 'This endpoint is proxied to the auth service' };
  }

  @Get('resumes')
  @ApiOperation({ summary: 'Get user resumes', description: 'Retrieve all resumes for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Resumes retrieved successfully' })
  @ApiHeader({ name: 'Authorization', required: true, description: 'Bearer token' })
  async getResumes(@Param('userId') userId: string) {
    return { message: 'This endpoint is proxied to the auth service' };
  }

  @Post('resumes')
  @ApiOperation({ summary: 'Add resume', description: 'Add a new resume to user profile' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiBody({ type: CreateResumeDto })
  @ApiResponse({ status: 201, description: 'Resume added successfully' })
  @ApiHeader({ name: 'Authorization', required: true, description: 'Bearer token' })
  async addResume(@Param('userId') userId: string, @Body() createResumeDto: CreateResumeDto) {
    return { message: 'This endpoint is proxied to the auth service' };
  }
}
