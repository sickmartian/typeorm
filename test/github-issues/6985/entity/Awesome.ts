import {Column, Entity, PrimaryColumn} from "../../../../src";

@Entity()
export class AwesomeEntity {
    @PrimaryColumn()
    id: string;

    @Column("simple-array")
    myField: string[] = [];

    constructor(data: Partial<AwesomeEntity>) {
        Object.assign(this, data);
    }
}
