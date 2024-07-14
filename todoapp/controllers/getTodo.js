const Todo = require("../models/Todo");

exports.getTodo = async (req, res) => {
  try {
    const response = await Todo.find({});
    res.status(200).json({
      success: true,
      data: response,
      message: "Entries fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: "Internal server error",
      message: error.message,
    });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Todo.findById({ _id: id });
    if (!response) {
      return res.status(404).json({
        success: false,
        data: "Not Found",
        message: "Entry not found",
      });
    }
    res.status(200).json({
      success: true,
      data: response,
      message: "Entry fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: "Internal server error",
      message: error.message,
    });
  }
};
