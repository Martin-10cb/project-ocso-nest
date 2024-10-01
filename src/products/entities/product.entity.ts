import { ApiProperty } from '@nestjs/swagger';
import { Provider } from 'src/providers/entities/provider.entity';
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
@Entity()
export class Product {

    @ApiProperty()
    @PrimaryGeneratedColumn("uuid")
    productId: string;

    @ApiProperty()
    @Column({type:"text"})
    productName: string;

    @ApiProperty()
    @Column({type:"float"})
    productPrice: number;

    @ApiProperty()
    @Column({type:"int"})
    productCountSeal: number;
    @ManyToOne(() => Provider, (provider) => provider.products, {
        eager: true, //Carga la informacion del proveedor del producto
    })
    @JoinColumn({
        name: "providerId",
    })
    provider: Provider
}
