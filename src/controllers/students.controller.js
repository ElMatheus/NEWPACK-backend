import StudentsRepository from "../models/students/StudentsRepository.js";
import Student from "../models/students/Student.js";

const studentsRepository = new StudentsRepository();

export const getStudents = async (req, res) => {
  try {
    const students = await studentsRepository.getStudents();
    if (!students) {
      return res.status(404).send({ message: "Não há estudantes cadastrados" });
    }
    return res.status(200).send({ totalStudents: students.length, students });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar estudante", error: error.message });
  }
};

export const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await studentsRepository.getStudentById(id);

    if (!student) {
      res.status(404).send({ message: "Estudante não encontrado!" });
    }
    return res.status(200).send({ message: "Estudante encontrado", student });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar um estudante", error: error.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    const { name, age, email, code, grade } = req.body;

    const studentAlreadyExists = await studentsRepository.getStudentByEmail(email);


    if (studentAlreadyExists) {
      return res.status(409).send({ message: "Estudante já cadastrado" });
    }

    const student = new Student(name, age, email, code, grade);
    studentsRepository.addStudent(student);

    return res.status(201).send(student);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar um estudante", error: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email, code, grade } = req.body;

    const studentById = await studentsRepository.getStudentById(id);
    const studentByEmail = await studentsRepository.getStudentByEmail(email);

    if(!studentById) {
      return res.status(404).send({ message: "Estudante não encontrado!" });
    }

    if (studentByEmail && studentByEmail.id !== id) {
      return res.status(409).send({ message: "Email já cadastrado" });
    }

    const student = await studentsRepository.updateStudent(id, name, age, email, code, grade);

    return res
    .status(200)
    .send({ message: "Estudante atualizado com sucesso", student });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar um estudante", error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await studentsRepository.getStudentById(id);

    if (!student) res.status(404).send({ message: "Estudante não encontrado!" });

    await studentsRepository.deleteStudent(id);

    return res
    .status(200)
    .send({ message: "Estudante deletado com sucesso", student });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao deletar um estudante", error: error.message });
  }
};