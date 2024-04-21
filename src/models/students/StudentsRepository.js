import pg from "../../database/index.js"
export default class StudentsRepository {
  constructor() {
    this.pg = pg;
  }

  async getStudents() {
    try {
      const allStudents = await this.pg.manyOrNone("SELECT * FROM students");
      console.log(allStudents);
      return allStudents;
    } catch (error) {
      throw error;
    }
  }

  async getStudentById(id) {
    try {
      const student = await this.pg.oneOrNone("SELECT * FROM students WHERE id = $1", id);
      return student;
    } catch (error) {
      throw error;
    }
  }

  async addStudent(student) {
    try {
      await this.pg.none("INSERT INTO students (id, name, age, email, code, grade) VALUES ($1, $2, $3, $4, $5, $6)", [
        student.id,
        student.name,
        student.age,
        student.email,
        student.code,
        student.grade
      ]);
      return student;
    } catch (error) {
      throw error;
    }
  }

  updateStudent(id, name, age, email, code, grade) {
    try {
      const student = this.getStudentById(id);

      if (!student) {
        return null;
      }

      const updatedStudent = this.pg.oneOrNone(
        "UPDATE students SET name = $1, age = $2, email = $3, code = $4, grade = $5 WHERE id = $6 RETURNING *",
        [name, age, email, code, grade, id]
      );

      return updatedStudent;
    } catch (error) {
      throw error;
    }
  }

  async getStudentByEmail(email) {
    try {
      const student = await this.pg.oneOrNone("SELECT * FROM students WHERE email = $1", email);
      return student;
    } catch (error) {
      throw error;
    }
  }

  async getStudentByCode(code) {
    try {
      const student = await this.pg.oneOrNone("SELECT * FROM students WHERE code = $1", code);
      return student;
    } catch (error) {
      throw error;
    }
  }

  async deleteStudent(id) {
    try {
      await this.pg.none("DELETE FROM students WHERE id = $1", id);
    } catch (error) {
      throw error;
    }
  }
}