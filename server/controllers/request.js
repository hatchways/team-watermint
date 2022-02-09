const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");

// @route GET /requests
// @desc load requests for logged in sitter
// @access Private
exports.loadRequests = asyncHandler(async (req, res, next) => {
  const requests = await Request.find({ sitterId: req.user.id })
    .populate({
      path: "userId",
      model: "user",
      select: "name email",
    })
    .populate({
      path: "sitterId",
      model: "user",
      select: "name email",
    })
    .sort({ start: "asc" });

  res.status(200).json({
    success: {
      requests: requests,
    },
  });
});

// @route POST /requests
// @desc User creates a new request
// @access Private
exports.createRequest = asyncHandler(async (req, res, next) => {
  const { sitterId, start, end } = req.body;
  const userId = req.user.id;

  const sitter = await User.findById(sitterId);
  if (!sitter) {
    res.status(404);
    throw new Error("Sitter not found");
  }

  if (sitterId === userId) {
    res.status(400);
    throw new Error("Invalid sitterId: cannot create a request to oneself");
  }

  const request = await Request.create({
    userId,
    sitterId,
    start: new Date(start),
    end: new Date(end),
  });

  if (request) {
    res.status(201).json({
      success: {
        request,
      },
    });
  }
});

// @route PUT /requests/:requestid
// @desc update a request with one of the following status:
//       ["pending", "accepted", "declined", "completed"]
// @access Private
exports.handleRequest = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  const { requestId } = req.params;

  const request = await Request.findById(requestId);

  if (!request) {
    res.status(404);
    throw new Error("Request not found");
  }

  if (request.sitterId.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Permission denied");
  }

  request.status = status;
  const saved = await request.save();

  if (saved) {
    res.status(200).json({
      success: {
        request,
      },
    });
  }
});