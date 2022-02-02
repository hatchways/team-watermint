const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");

// @route GET /requests
// @desc load requests for logged in user
// @access Private
exports.loadRequests = asyncHandler(async (req, res, next) => {
  const requests = await Request.find({ userId: req.user.id });

  if (!requests) {
    res.status(404);
    throw new Error("No requests found");
  }

  res.status(200).json({
    success: {
      requests: requests,
    },
  });
});

// @route POST /requests/create
// @desc create a new request
// @access Private
exports.createRequest = asyncHandler(async (req, res, next) => {
  const { sitterId, start, end } = req.body;
  const userId = req.user.id;

  const startDate = new Date(parseInt(start));
  const endDate = new Date(parseInt(end));

  if (!(startDate instanceof Date) || isNaN(startDate)) {
    res.status(400);
    throw new Error("Invalid start date");
  }

  if (!(endDate instanceof Date) || isNaN(endDate)) {
    res.status(400);
    throw new Error("Invalid end date");
  }

  if (startDate.getTime() >= endDate.getTime()) {
    res.status(400);
    throw new Error("End date must be later than start date");
  }

  const sitter = await User.findById(sitterId);

  if (!sitter) {
    res.status(400);
    throw new Error("Sitter not found");
  }

  const request = await Request.create({
    userId,
    sitterId,
    start: startDate,
    end: endDate,
  });

  if (request) {
    res.status(201).json({
      success: {
        request,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid request data");
  }
});

// @route PUT /requests/approval
// @desc update a request with approved or declined
// @access Private
exports.approveRequest = asyncHandler(async (req, res, next) => {
  const { requestId, accept } = req.body;
  let accepted;
  try {
    accepted = JSON.parse(accept.toLowerCase());
    if (typeof accepted !== "boolean") {
      throw new TypeError();
    }
  } catch (err) {
    res.status(400);
    throw new Error("Invalid request data");
  }

  try {
    const request = await Request.findById(requestId);

    request.accepted = accepted;
    request.declined = !accepted;
    await request.save();

    res.status(200).json({
      success: {
        request,
      },
    });
  } catch (err) {
    res.status(400);
    throw new Error("Invalid request data");
  }
});
