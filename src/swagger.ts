export default {
  openapi: '3.0.0',
  info: {
    title: 'College Directory API',
    version: '1.0.0',
    description: 'A REST API for managing college directory information',
  },
  servers: [
    {
      url: 'https://collegedirectoryapi.onrender.com',
      description: 'Production',
    },
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  paths: {
    '/students': {
      get: {
        summary: 'Get all students',
        operationId: 'getAllStudents',
        tags: ['Students'],
        responses: {
          '200': {
            description: 'List of all students found in the database',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Student',
                  },
                },
              },
            },
          },
          '404': {
            description: 'No students found in the database',
          },
          '500': {
            description: 'Error fetching students',
          },
        },
      },
      post: {
        summary: 'Create a new student',
        operationId: 'createStudent',
        tags: ['Students'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/StudentInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Student created successfully',
          },
          '400': {
            description: 'Request body is required',
          },
          '409': {
            description: 'Student with ID already exists',
          },
          '500': {
            description: 'Error creating student',
          },
        },
      },
    },
    '/students/{studentId}': {
      get: {
        summary: 'Get a student by ID',
        operationId: 'getStudentById',
        tags: ['Students'],
        parameters: [
          {
            in: 'path',
            name: 'studentId',
            required: true,
            schema: {
              type: 'number',
            },
            description: 'The unique identifier for the student',
          },
        ],
        responses: {
          '200': {
            description: 'Student found in the database',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Student',
                },
              },
            },
          },
          '400': {
            description: 'Student ID is required.',
          },
          '404': {
            description: 'Student not found with the given ID',
          },
          '500': {
            description: 'Error fetching student',
          },
        },
      },
      put: {
        summary: 'Update a student',
        operationId: 'updateStudent',
        tags: ['Students'],
        parameters: [
          {
            in: 'path',
            name: 'studentId',
            required: true,
            schema: {
              type: 'number',
            },
            description: 'The unique identifier for the student',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/StudentInput',
              },
            },
          },
        },
        responses: {
          '204': {
            description: 'No Content: Update successful, no content returned.',
          },
          '400': {
            description: 'Student ID is required',
          },
          '404': {
            description: 'Student not found with the given ID',
          },
          '500': {
            description: 'Error updating student',
          },
        },
      },
      delete: {
        summary: 'Delete a student',
        operationId: 'deleteStudent',
        tags: ['Students'],
        parameters: [
          {
            in: 'path',
            name: 'studentId',
            required: true,
            schema: {
              type: 'number',
            },
            description: 'The unique identifier for the student',
          },
        ],
        responses: {
          '200': {
            description: 'Student deleted successfully',
          },
          '400': {
            description: 'Student ID is required',
          },
          '404': {
            description: 'Student not found with the given ID',
          },
          '500': {
            description: 'Error deleting student',
          },
        },
      },
    },
    '/teachers': {
      get: {
        summary: 'Get all teachers',
        operationId: 'getAllTeachers',
        tags: ['Teachers'],
        responses: {
          '200': {
            description: 'List of all teachers found in the database',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Teacher',
                  },
                },
              },
            },
          },
          '404': {
            description: 'No teachers found in the database',
          },
          '500': {
            description: 'Error fetching teachers',
          },
        },
      },
      post: {
        summary: 'Create a new teacher',
        operationId: 'createTeacher',
        tags: ['Teachers'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TeacherInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Teacher created successfully',
          },
          '400': {
            description: 'Request body is required',
          },
          '409': {
            description: 'Teacher with ID already exists',
          },
          '500': {
            description: 'Error creating teacher',
          },
        },
      },
    },
    '/teachers/{teacherId}': {
      get: {
        summary: 'Get a teacher by ID',
        operationId: 'getTeacherById',
        tags: ['Teachers'],
        parameters: [
          {
            in: 'path',
            name: 'teacherId',
            required: true,
            schema: {
              type: 'number',
            },
            description: 'Unique identifier for the teacher',
          },
        ],
        responses: {
          '200': {
            description: 'Teacher found in the database',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Teacher',
                },
              },
            },
          },
          '400': {
            description: 'Teacher ID is required',
          },
          '404': {
            description: 'Teacher not found with the given ID',
          },
          '500': {
            description: 'Error fetching teacher',
          },
        },
      },
      put: {
        summary: 'Update a teacher',
        operationId: 'updateTeacher',
        tags: ['Teachers'],
        parameters: [
          {
            in: 'path',
            name: 'teacherId',
            required: true,
            schema: {
              type: 'number',
            },
            description: 'Teacher ID',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TeacherInput',
              },
            },
          },
        },
        responses: {
          '204': {
            description: 'No Content: Update successful, no content returned.',
          },
          '400': {
            description: 'Teacher ID is required',
          },
          '404': {
            description: 'Teacher not found with the given ID',
          },
          '500': {
            description: 'Error updating teacher',
          },
        },
      },
      delete: {
        summary: 'Delete a teacher',
        operationId: 'deleteTeacher',
        tags: ['Teachers'],
        parameters: [
          {
            in: 'path',
            name: 'teacherId',
            required: true,
            schema: {
              type: 'number',
            },
            description: 'Teacher ID',
          },
        ],
        responses: {
          '200': {
            description: 'Teacher deleted successfully',
          },
          '400': {
            description: 'Teacher ID is required',
          },
          '404': {
            description: 'Teacher not found with the given ID',
          },
          '500': {
            description: 'Error deleting teacher',
          },
        },
      },
    },
    '/courses': {
      get: {
        summary: 'Get all courses',
        operationId: 'getAllCourses',
        tags: ['Courses'],
        responses: {
          '200': {
            description: 'List of all courses',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Course',
                  },
                },
              },
            },
          },
          '404': {
            description: 'No courses found in the database',
          },
          '500': {
            description: 'Error fetching courses',
          },
        },
      },
      post: {
        summary: 'Create a new course',
        operationId: 'createCourse',
        tags: ['Courses'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CourseInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Course created successfully',
          },
          '400': {
            description: 'Request body is required',
          },
          '409': {
            description: 'Course with ID already exists',
          },
          '500': {
            description: 'Error creating course',
          },
        },
      },
    },
    '/courses/{courseName}': {
      get: {
        summary: 'Get a course by name',
        operationId: 'getCourseByName',
        tags: ['Courses'],
        parameters: [
          {
            in: 'path',
            name: 'courseName',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'Course name',
          },
        ],
        responses: {
          '200': {
            description: 'Course found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Course',
                },
              },
            },
          },
          '404': {
            description: 'Course not found with the given name',
          },
          '500': {
            description: 'Error fetching course',
          },
        },
      },
      put: {
        summary: 'Update a course',
        operationId: 'updateCourse',
        tags: ['Courses'],
        parameters: [
          {
            in: 'path',
            name: 'courseName',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'Course name',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CourseInput',
              },
            },
          },
        },
        responses: {
          '204': {
            description: 'No Content: Update successful, no content returned.',
          },
          '400': {
            description: 'Course ID is required',
          },
          '404': {
            description: 'Course not found with the given name',
          },
          '500': {
            description: 'Error updating course',
          },
        },
      },
      delete: {
        summary: 'Delete a course',
        operationId: 'deleteCourse',
        tags: ['Courses'],
        parameters: [
          {
            in: 'path',
            name: 'courseName',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'Course name',
          },
        ],
        responses: {
          '200': {
            description: 'Course deleted successfully',
          },
          '400': {
            description: 'Course ID is required',
          },
          '404': {
            description: 'Course not found with the given name',
          },
          '500': {
            description: 'Error deleting course',
          },
        },
      },
    },
    '/classes': {
      get: {
        summary: 'Get all classes',
        operationId: 'getAllClasses',
        tags: ['Classes'],
        responses: {
          '200': {
            description: 'List of all classes',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Class',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a new class',
        operationId: 'createClass',
        tags: ['Classes'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ClassInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Class created successfully',
          },
          '400': {
            description: 'Invalid input',
          },
        },
      },
    },
    '/classes/{classId}': {
      get: {
        summary: 'Get a class by ID',
        operationId: 'getClassById',
        tags: ['Classes'],
        parameters: [
          {
            in: 'path',
            name: 'classId',
            required: true,
            schema: {
              type: 'number',
            },
            description: 'Class ID',
          },
        ],
        responses: {
          '200': {
            description: 'Class found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Class',
                },
              },
            },
          },
          '404': {
            description: 'Class not found',
          },
        },
      },
      put: {
        summary: 'Update a class',
        operationId: 'updateClass',
        tags: ['Classes'],
        parameters: [
          {
            in: 'path',
            name: 'classId',
            required: true,
            schema: {
              type: 'number',
            },
            description: 'Class ID',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ClassInput',
              },
            },
          },
        },
        responses: {
          '204': {
            description: 'No Content: Update successful, no content returned.',
          },
          '404': {
            description: 'Class not found',
          },
        },
      },
      delete: {
        summary: 'Delete a class',
        operationId: 'deleteClass',
        tags: ['Classes'],
        parameters: [
          {
            in: 'path',
            name: 'classId',
            required: true,
            schema: {
              type: 'number',
            },
            description: 'Class ID',
          },
        ],
        responses: {
          '200': {
            description: 'Class deleted successfully',
          },
          '404': {
            description: 'Class not found',
          },
        },
      },
      '/classes/{classId}/students/add': {
        patch: {
          summary: 'Add a student to a class',
          operationId: 'addStudentToClass',
          tags: ['Classes'],
          parameters: [
            {
              in: 'path',
              name: 'classId',
              required: true,
              schema: { type: 'number' },
              description: 'Class ID',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    studentId: { type: 'number', example: 18 },
                  },
                  required: ['studentId'],
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Student added to class',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Class' },
                },
              },
            },
            '400': { description: 'Invalid input or class full' },
            '404': { description: 'Class not found' },
            '409': { description: 'Student already in class' },
          },
        },
      },
      '/classes/{classId}/students/remove': {
        patch: {
          summary: 'Remove a student from a class',
          operationId: 'removeStudentFromClass',
          tags: ['Classes'],
          parameters: [
            {
              in: 'path',
              name: 'classId',
              required: true,
              schema: { type: 'number' },
              description: 'Class ID',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    studentId: { type: 'number', example: 18 },
                  },
                  required: ['studentId'],
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Student removed from class',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Class' },
                },
              },
            },
            '400': { description: 'Invalid input' },
            '404': { description: 'Class not found' },
            '409': { description: 'Student not in class' },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Student: {
        type: 'object',
        properties: {
          studentId: {
            type: 'number',
            description: 'The unique identifier for the student',
            example: 18,
          },
          firstName: {
            type: 'string',
            description: 'The first name of the student',
            example: 'Bill',
          },
          lastName: {
            type: 'string',
            description: 'The last name of the student',
            example: 'Gates',
          },
          gender: {
            type: 'string',
            description: 'The gender of the student',
            example: 'Male',
          },
          email: {
            type: 'string',
            description: 'The email of the student',
            example: 'bill.gates@gmail.com',
          },
          major: {
            type: 'string',
            description: 'The major of the student',
            example: 'Computer Science',
          },
          expectedGraduation: {
            type: 'number',
            description: 'The expected graduation year of the student',
            example: 2025,
          },
        },
      },
      StudentInput: {
        type: 'object',
        required: ['firstName', 'lastName', 'gender', 'email', 'major'],
        properties: {
          firstName: {
            type: 'string',
            description: 'The first name of the student',
            example: 'Bill',
          },
          lastName: {
            type: 'string',
            description: 'The last name of the student',
            example: 'Gates',
          },
          gender: {
            type: 'string',
            description: 'The gender of the student',
            example: 'Male',
          },
          email: {
            type: 'string',
            description: 'The email of the student',
            example: 'bill.gates@gmail.com',
          },
          major: {
            type: 'string',
            description: 'The major of the student',
            example: 'Computer Science',
          },
          expectedGraduation: {
            type: 'number',
            description: 'The expected graduation year of the student',
            example: 2025,
          },
        },
      },
      Teacher: {
        type: 'object',
        properties: {
          teacherId: {
            type: 'number',
            description: 'The unique identifier for the teacher',
            example: 16,
          },
          firstName: {
            type: 'string',
            description: 'The first name of the teacher',
            example: 'Bill',
          },
          lastName: {
            type: 'string',
            description: 'The last name of the teacher',
            example: 'Gates',
          },
          gender: {
            type: 'string',
            description: 'The gender of the teacher',
            example: 'Male',
          },
          email: {
            type: 'string',
            description: 'The email of the teacher',
            example: 'bill.gates@gmail.com',
          },
          department: {
            type: 'string',
            description: 'The department of the teacher',
            example: 'Computer Science',
          },
          hireYear: {
            type: 'number',
            description: 'The year the teacher was hired',
            example: 2025,
          },
        },
      },
      TeacherInput: {
        type: 'object',
        required: ['firstName', 'lastName', 'gender', 'email', 'department'],
        properties: {
          firstName: {
            type: 'string',
            description: 'The first name of the teacher',
            example: 'Bill',
          },
          lastName: {
            type: 'string',
            description: 'The last name of the teacher',
            example: 'Gates',
          },
          gender: {
            type: 'string',
            description: 'The gender of the teacher',
            example: 'Male',
          },
          email: {
            type: 'string',
            description: 'The email of the teacher',
            example: 'bill.gates@gmail.com',
          },
          department: {
            type: 'string',
            description: 'The department of the teacher',
            example: 'Computer Science',
          },
          hireYear: {
            type: 'number',
            description: 'The year the teacher was hired',
            example: 2025,
          },
        },
      },
      Course: {
        type: 'object',
        properties: {
          courseName: {
            type: 'string',
            description: 'The name of the course',
            example: 'CSE325',
          },
          courseDepartment: {
            type: 'string',
            description: 'The department of the course',
            example: 'Computer Science',
          },
          credits: {
            type: 'number',
            description: 'The number of credits the course is worth',
            example: 3,
          },
          courseDescription: {
            type: 'string',
            description: 'The description of the course',
            example: 'This course is about .Net Development',
          },
        },
      },
      CourseInput: {
        type: 'object',
        required: ['courseName', 'courseDepartment', 'credits'],
        properties: {
          courseName: {
            type: 'string',
            description: 'The name of the course',
            example: 'CSE325',
          },
          courseDepartment: {
            type: 'string',
            description: 'The department of the course',
            example: 'Computer Science',
          },
          credits: {
            type: 'number',
            description: 'The number of credits the course is worth',
            example: 3,
          },
          courseDescription: {
            type: 'string',
            description: 'The description of the course',
            example: 'This course is about .Net Development',
          },
        },
      },
      Class: {
        type: 'object',
        properties: {
          classId: {
            type: 'number',
            description: 'The unique identifier for the class',
            example: 23,
          },
          courseName: {
            type: 'string',
            description: 'The name of the course',
            example: 'CSE325',
          },
          teacherId: {
            type: 'number',
            description: 'The unique identifier for the teacher',
            example: 1,
          },
          semester: {
            type: 'string',
            enum: ['Spring', 'Summer', 'Fall', 'Winter'],
            description: 'The semester of the class',
            example: 'Spring',
          },
          year: {
            type: 'number',
            description: 'The year of the class',
            example: 2025,
          },
          students: {
            type: 'array',
            items: {
              type: 'number',
              description: 'The number of students signed up for the class',
              example: 12,
            },
          },
          seats: {
            type: 'number',
            description: 'The number of seats available in the class',
            example: 30,
          },
        },
      },
      ClassInput: {
        type: 'object',
        required: ['courseName', 'teacherId', 'semester', 'year', 'seats'],
        properties: {
          courseName: {
            type: 'string',
            description: 'The name of the course',
            example: 'CSE325',
          },
          teacherId: {
            type: 'number',
            description: 'The unique identifier for the teacher',
            example: 16,
          },
          semester: {
            type: 'string',
            enum: ['Spring', 'Summer', 'Fall', 'Winter'],
            description: 'The semester of the class',
            example: 'Spring',
          },
          year: {
            type: 'number',
            description: 'The year of the class',
            example: 2025,
          },
          students: {
            type: 'array',
            items: {
              type: 'number',
              description: 'The number of students signed up for the class',
              example: 12,
            },
          },
          seats: {
            type: 'number',
            description: 'The number of seats available in the class',
            example: 30,
          },
        },
      },
    },
  },
};
