"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const CourseModel_1 = require("../models/CourseModel");
// Create Course
exports.CourseController = {
    createCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, category, level, duration, instructor, price, rating, studentsEnrolled, lessons } = req.body;
                const newCourse = yield CourseModel_1.CourseModel.create({
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
                res.status(201).send(newCourse);
            }
            catch (error) {
                res.status(500).send({
                    message: 'Internal server error'
                });
            }
        });
    },
    fetchCourseList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category, level, sortBy, sortOrder, page, pageSize } = req.query;
                // Construct filtering options
                const whereOptions = {};
                if (category)
                    whereOptions.category = category;
                if (level)
                    whereOptions.level = level;
                // Construct sorting options
                const order = [];
                if (sortBy) {
                    order.push([sortBy, sortOrder === 'desc' ? 'DESC' : 'ASC']);
                }
                // Pagination
                const pageLimit = Number(pageSize);
                const offsetPage = Number(page);
                const limit = pageLimit || 10;
                const offset = offsetPage * pageLimit || 0;
                // Fetch courses based on filtering, sorting, and pagination options
                const courses = yield CourseModel_1.CourseModel.findAll({
                    where: whereOptions,
                    order,
                    limit,
                    offset
                });
                res.send(courses);
            }
            catch (error) {
                res.status(500).send({
                    error: 'Internal server error'
                });
            }
        });
    },
    fetchCourseByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const courseDetail = yield CourseModel_1.CourseModel.findOne({
                    where: {
                        id
                    }
                });
                if (!courseDetail) {
                    return res.status(404).send({
                        error: "Course not Found"
                    });
                }
                res.send(courseDetail);
            }
            catch (error) {
                res.status(500).send({
                    error: 'Internal server error'
                });
            }
        });
    },
    // Update Course
    updateCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const updatedFields = req.body;
                let updatedCourse = yield CourseModel_1.CourseModel.findOne({
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
                yield updatedCourse.update(updatedFields);
                res.status(200).send({
                    message: "Course updated successfully"
                });
            }
            catch (error) {
                res.status(500).send({
                    message: 'Internal server error'
                });
            }
        });
    }
};
//# sourceMappingURL=courseController.js.map