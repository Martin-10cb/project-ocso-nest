import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './entities/region.entity';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private RegionRepository: Repository<Region>
  ){}

  create(createRegionDto: CreateRegionDto) {
    return this.RegionRepository.save(createRegionDto)
  }

  findAll() {
    return this.RegionRepository.find()
  }

  findOne(id: number) {
    const region = this.RegionRepository.findOneBy({
      regionId: id
    })
    if(!region) throw new NotFoundException("Region Not Found")
    return region;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const region = await this.RegionRepository.preload({
      regionId: id,
      ...updateRegionDto
    })
    if(!updateRegionDto) throw new NotFoundException()
    return region;
  }

  remove(id: number) {
    return this.RegionRepository.delete({
      regionId: id
    })
  }
}
