import { pool } from "../../../config/database";
import { CustomError } from "../../../domain/errors/custom.error";
import { Classroom, CreateClassroom, UpdateClassroom } from "../../../domain/interfaces/classroom.interface";

export class ClassroomService {

    public async getAllClassrooms(): Promise<Classroom[]> {
        const sql = `SELECT * FROM classrooms ORDER BY id;`;
        const classrooms = await pool.query<Classroom>(sql);
        return classrooms.rows;
    }

    public async getClassroomById(id: number): Promise<Classroom | null> {
        const sql = `SELECT * FROM classrooms WHERE id = $1;`;
        const classroom = (await pool.query<Classroom>(sql, [id])).rows[0];
        return classroom ?? null;
    }

    public async createClassroom(classroom: CreateClassroom): Promise<Classroom> {
        const sql = `
            INSERT INTO classrooms (
                code,
                building,
                capacity,
                status
            )
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [
            classroom.code,
            classroom.building,
            classroom.capacity,
            classroom.status
        ];
        const classroomCreated = (await pool.query<Classroom>(sql, values)).rows[0];
        if(!classroomCreated) {
            throw CustomError.internalServer(`No se pudo crear el aula`);
        }
        return classroomCreated;
    }

    public async updateClassroom(
        id: number,
        classroom: UpdateClassroom
    ): Promise<Classroom> {
        const existingClassroom = await this.getClassroomById(id);
        if(!existingClassroom) {
            throw CustomError.notFound(`No existe un aula con ese id`);
        }
        const sql = `
            UPDATE classrooms
            SET
                code = $1,
                building = $2,
                capacity = $3,
                status = $4
            WHERE id = $5
            RETURNING *;
        `;
        const values = [
            classroom.code,
            classroom.building,
            classroom.capacity,
            classroom.status,
            id,
        ];
        const classroomUpdated = (await pool.query<Classroom>(sql, values)).rows[0];
        if(!classroomUpdated) {
            throw CustomError.internalServer(`No se pudo actualizar el aula`);
        }
        return classroomUpdated;
    }

    public async deleteClassroom(id: number): Promise<boolean> {
        const existingClassroom = await this.getClassroomById(id);
        if(!existingClassroom) {
            throw CustomError.notFound(`No existe un aula con ese id`);
        }
        const sql = `
            DELETE FROM classrooms
            WHERE id = $1
            RETURNING id;
        `;
        const classroomDeleted = await pool.query(sql, [id]);
        return classroomDeleted.rowCount !== null && classroomDeleted.rowCount > 0;
    }

}
