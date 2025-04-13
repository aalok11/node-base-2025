'use strict';
const Student = require('../../../models/Student');

module.exports = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = 'createdAt',
      order = 'desc',
      role,
      search,
    } = req.query;
    // Build filters
    const filters = {};
    if (search) {
      filters.$or = [{ firstName: { $regex: search, $options: 'i' } }];
    }
    if (role) {
      filters.role = role;
    }
    // Pagination Options.
    const options = {
      skip: (page - 1) * limit,
      limit: parseInt(limit),
      sort: { [sort]: order === 'asc' ? 1 : -1 },
    };

    const students = await Student.find(filters, null, options);
    const totalStudents = await Student.countDocuments(filters);

    res.success({
      students,
      pagination: {
        total: totalStudents,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalStudents / limit),
      },
    });
  } catch (error) {
    console.log('error', error);
    res.serverError(500, { error: 'Failed to fetch students' });
  }
};
