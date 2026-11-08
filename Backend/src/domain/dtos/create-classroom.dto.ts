export class CreateClassroomDTO {

    private constructor(
        public readonly code: string,
        public readonly building: string,
        public readonly capacity: number,
        public readonly status: boolean
    ) {}

    static create(
        object: { [key: string]: any },
    ): [string | undefined, CreateClassroomDTO?]{
        const {
            code,
            building,
            capacity,
            status
        } = object;

        if(!code) return ["Missing code"];
        if(!building) return ["Missing building"];
        if(capacity === undefined) return ["Missing capacity"];
        if(status === undefined) return ["Missing status"];

        if(code.length > 20)
            return ["code is too large, max length is 20 characters"];
        if(building.length > 100)
            return ["building is too large, max length is 100 characters"];
        if(!Number.isInteger(capacity) || capacity < 1 || capacity > 500)
            return ["capacity must be an integer between 1 and 500"];
        if(typeof status !== "boolean")
            return ["status must be a boolean"];

        return [
            undefined,
            new CreateClassroomDTO(
                code,
                building,
                capacity,
                status
            )
        ];

    }

}
