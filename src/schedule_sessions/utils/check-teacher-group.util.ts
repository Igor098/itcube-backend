import type { TeacherDetail } from '@/teacher_details/entities/teacher_detail.entity';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import type { Repository } from 'typeorm';

export async function checkTeacherGroups(
  teacherDetailRepository: Repository<TeacherDetail>,
  teacherId: number,
  groupId: number,
): Promise<void> {
  const teacher = await teacherDetailRepository.findOne({
    where: { id: teacherId },
    relations: { groups: true },
  });

  if (!teacher) {
    throw new NotFoundException('Преподаватель не найден!');
  }

  if (!teacher.groups.some((group) => group.id === groupId)) {
    throw new ForbiddenException('Вы не можете изменить это занятие!');
  }
}
