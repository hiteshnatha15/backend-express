const Todo = require("../models/Todo");

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Todo.findByIdAndDelete({ _id: id });
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
      message: "Entry deleted successfully",
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
