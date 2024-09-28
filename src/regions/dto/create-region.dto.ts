import { Region } from "../entities/region.entity";
import { Product } from '../../products/entities/product.entity';
import { IsArray, IsString, MaxLength } from "class-validator";

export class CreateRegionDto extends Region{
    @IsString()
    @MaxLength(100)
    regionName: string;
    @IsArray()
    regionStates: string[];
}
