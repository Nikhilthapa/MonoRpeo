import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { CreateEducationDto } from './dto/create-education.dto';
import { CreateResumeDto } from './dto/create-resume.dto';
import { VerifyProfileDto } from './dto/verify-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getSkills(userId: string) {
    return this.prisma.userSkill.findMany({
      where: { userId },
      include: { skill: true },
    });
  }

  async addSkill(userId: string, createSkillDto: CreateSkillDto) {
    let skill = await this.prisma.skill.findUnique({
      where: { name: createSkillDto.name },
    });

    if (!skill) {
      skill = await this.prisma.skill.create({
        data: { name: createSkillDto.name, category: createSkillDto.category },
      });
    }

    return this.prisma.userSkill.upsert({
      where: {
        userId_skillId: {
          userId,
          skillId: skill.id,
        },
      },
      create: {
        userId,
        skillId: skill.id,
        proficiency: createSkillDto.proficiency,
      },
      update: {
        proficiency: createSkillDto.proficiency,
      },
    });
  }

  async getExperiences(userId: string) {
    return this.prisma.experience.findMany({
      where: { userId, deletedAt: null },
      orderBy: { startDate: 'desc' },
    });
  }

  async addExperience(userId: string, createExperienceDto: CreateExperienceDto) {
    return this.prisma.experience.create({
      data: {
        userId,
        ...createExperienceDto,
      },
    });
  }

  async getEducations(userId: string) {
    return this.prisma.education.findMany({
      where: { userId, deletedAt: null },
      orderBy: { startDate: 'desc' },
    });
  }

  async addEducation(userId: string, createEducationDto: CreateEducationDto) {
    return this.prisma.education.create({
      data: {
        userId,
        ...createEducationDto,
      },
    });
  }

  async getResumes(userId: string) {
    return this.prisma.resume.findMany({
      where: { userId, deletedAt: null },
      orderBy: { uploadedAt: 'desc' },
    });
  }

  async addResume(userId: string, createResumeDto: CreateResumeDto) {
    if (createResumeDto.isPrimary) {
      await this.prisma.resume.updateMany({
        where: { userId },
        data: { isPrimary: false },
      });
    }

    return this.prisma.resume.create({
      data: {
        userId,
        ...createResumeDto,
      },
    });
  }

  async verifyProfile(userId: string, verifyProfileDto: VerifyProfileDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updateData: any = {};

    if (verifyProfileDto.currentJobFunction !== undefined) {
      updateData.currentJobFunction = verifyProfileDto.currentJobFunction;
    }

    if (verifyProfileDto.currentLocation !== undefined) {
      updateData.preferredLocation = verifyProfileDto.currentLocation;
    }

    if (verifyProfileDto.yearsOfExperience !== undefined) {
      updateData.yearsOfExperience = verifyProfileDto.yearsOfExperience;
    }

    if (verifyProfileDto.currentAnnualSalary !== undefined) {
      updateData.currentAnnualSalary = verifyProfileDto.currentAnnualSalary;
    }

    updateData.profileStatus = 'PENDING_REVIEW';
    updateData.version = { increment: 1 };

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    let resume = null;
    if (
      verifyProfileDto.resumeFileName &&
      verifyProfileDto.resumeFileUrl
    ) {
      await this.prisma.resume.updateMany({
        where: { userId },
        data: { isPrimary: false },
      });

      resume = await this.prisma.resume.create({
        data: {
          userId,
          fileName: verifyProfileDto.resumeFileName,
          fileUrl: verifyProfileDto.resumeFileUrl,
          fileSize: verifyProfileDto.resumeFileSize,
          mimeType: verifyProfileDto.resumeMimeType,
          isPrimary: true,
        },
      });
    }

    return {
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        profileStatus: updatedUser.profileStatus,
      },
      resume,
    };
  }
}
