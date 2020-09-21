import { 
  Entity, Column, PrimaryGeneratedColumn
} from 'typeorm'

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: "varchar", length: 50 })
  street: string

  @Column({type: "varchar", length: 50 })
  suite: string

  @Column({type: "varchar", length: 50 })
  city: string

  @Column({type: "int", width: 9 })
  zipcode: number

}
