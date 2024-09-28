import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Region {

    @PrimaryGeneratedColumn('increment')
    regionId: number;
    @Column('text')
    regionName: string;
    @Column('array')
    regionStates: string[];
}
