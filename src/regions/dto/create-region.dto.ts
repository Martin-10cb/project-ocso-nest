import { Region } from "../entities/region.entity";
import { Product } from '../../products/entities/product.entity';
import { IsArray, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRegionDto extends Region{

    @ApiProperty()
    @IsString()
    @MaxLength(100)
    regionName: string;

    @ApiProperty()
    @IsArray()
    regionStates: string[];
}
