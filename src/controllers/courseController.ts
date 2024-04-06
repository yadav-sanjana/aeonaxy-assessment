import { where } from 'sequelize';
import { CourseModel } from '../models/CourseModel';
import { Request } from 'express'

interface CourseInput {
    title: string;
    description: string;
    category: string;
    level: string;
    duration?: string;
    instructor?: string;
    price?: number;
    rating?: number;
    studentsEnrolled?: number;
    lessons?: any[];
}

// Create Course
export const CourseController = {
    async createCourse(req: Request<CourseInput>, res) {
        try {
            const { title, description, category, level, duration, instructor, price, rating, studentsEnrolled, lessons } = req.body

            const newCourse = await CourseModel.create({
                title,
                description,
                category,
                level,
                duration,
                instructor,
                price,
                rating,
                studentsEnrolled,
                lessons
            });

            res.status(201).send(newCourse)
        } catch (error) {
            res.status(500).send({
                message: 'Internal server error'
            });
        }

    },
    async fetchCourseList(req, res) {
        try {
            const { category, level, sortBy, sortOrder, page, pageSize } = req.query;

            // Construct filtering options
            const whereOptions: any = {};
            if (category) whereOptions.category = category;
            if (level) whereOptions.level = level;

            // Construct sorting options
            const order: any = [];
            if (sortBy) {
                order.push([sortBy as string, sortOrder === 'desc' ? 'DESC' : 'ASC']);
            }

            // Pagination
            const pageLimit: number = Number(pageSize);
            const offsetPage: number = Number(page);
            const limit: number = pageLimit || 10;
            const offset: number = offsetPage * pageLimit || 0;

            // Fetch courses based on filtering, sorting, and pagination options
            const courses = await CourseModel.findAll({
                where: whereOptions,
                order,
                limit,
                offset
            })

            res.send(courses)
        } catch (error) {
            res.status(500).send({
                error: 'Internal server error'
            });
        }
    },

    async fetchCourseByID(req, res) {
        const id = req.params.id
        try {
            const courseDetail = await CourseModel.findOne({
                where: {
                    id
                }
            });

            if (!courseDetail) {
                return res.status(404).send({
                    error: "Course not Found"
                })
            }

            res.send(courseDetail);
        } catch (error) {
            res.status(500).send({
                error: 'Internal server error'
            });
        }
    },

    // Update Course
    async updateCourse(req, res) {
        try {
            const id = req.params.id
            const updatedFields = req.body
            let updatedCourse = await CourseModel.findOne({
                where: {
                    id
                }
            });

            if (!updatedCourse) {
                return res.status(404).send({
                    message: 'Course not found'
                });
            }

            // Updating course with req.body fields
            await updatedCourse.update(updatedFields);

            res.status(200).send({
                message: "Course updated successfully"
            });
        } catch (error) {
            res.status(500).send({
                message: 'Internal server error'
            });
        }
    }

}
