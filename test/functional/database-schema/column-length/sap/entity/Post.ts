import {Entity} from "../../../../../../src";
import {PrimaryColumn} from "../../../../../../src";
import {Column} from "../../../../../../src";

@Entity()
export class Post {

    @PrimaryColumn()
    id: number;

    @Column("varchar", {
        length: 50
    })
    varchar: string;

    @Column("nvarchar", {
        length: 50
    })
    nvarchar: string;

    @Column("varbinary", {
        length: 50
    })
    varbinary: Buffer;

}
