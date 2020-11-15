import {Connection} from "../../../src";
import {closeTestingConnections, createTestingConnections, reloadTestingDatabases} from "../../utils/test-utils";
import {AwesomeEntity} from "./entity/Awesome";
import { expect } from "chai";

describe("github issues > #6985 SAP HANA Driver using text column type for simple-array and simple-enum which is unsupported", () => {

    let connections: Connection[];
    before(async () => connections = await createTestingConnections({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["sap"],
    }));
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("should not crash on table creation, should allow 'unlimited' number of rows", () => Promise.all(connections.map(async connection => {
        const repository = connection.getRepository(AwesomeEntity);
        const EXPECTED_LENGTH = 50000;
        let values: string[]= [];
        for (let i = 0; i < EXPECTED_LENGTH; i++) {
            values.push("1234567890");
        }
        await repository.insert(new AwesomeEntity({
            id: "Hi!",
            myField: values
        }));

        let result = await repository.find({});
        expect(result).to.have.length(1);
        expect(result[0].myField).to.have.length(EXPECTED_LENGTH);
    })));
});
