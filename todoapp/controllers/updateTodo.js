const Todo = require("../models/Todo");

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const response = await Todo.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        title,
        description,
        updatedAt: Date.now(),
      }
    );
    res.status(200).json({
      success: true,
      data: response,
      message: "Entry updated successfully",
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
