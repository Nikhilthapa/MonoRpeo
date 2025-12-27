import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSkillDto } from './dto/create-skill.dto';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { CreateEducationDto } from './dto/create-education.dto';
import { CreateResumeDto } from './dto/create-resume.dto';

@Controller('users/:userId')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('skills')
  async getSkills(@Param('userId') userId: string) {
    return this.profileService.getSkills(userId);
  }

  @Post('skills')
  async addSkill(@Param('userId') userId: string, @Body() createSkillDto: CreateSkillDto) {
    return this.profileService.addSkill(userId, createSkillDto);
  }

  @Get('experience')
  async getExperiences(@Param('userId') userId: string) {
    return this.profileService.getExperiences(userId);
  }

  @Post('experience')
  async addExperience(@Param('userId') userId: string, @Body() createExperienceDto: CreateExperienceDto) {
    return this.profileService.addExperience(userId, createExperienceDto);
  }

  @Get('education')
  async getEducations(@Param('userId') userId: string) {
    return this.profileService.getEducations(userId);
  }

  @Post('education')
  async addEducation(@Param('userId') userId: string, @Body() createEducationDto: CreateEducationDto) {
    return this.profileService.addEducation(userId, createEducationDto);
  }

  @Get('resumes')
  async getResumes(@Param('userId') userId: string) {
    return this.profileService.getResumes(userId);
  }

  @Post('resumes')
  async addResume(@Param('userId') userId: string, @Body() createResumeDto: CreateResumeDto) {
    return this.profileService.addResume(userId, createResumeDto);
  }
}
