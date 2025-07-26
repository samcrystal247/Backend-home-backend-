const createTask = (response, require) => {
  try {
    response.json({ massage: "God is the greatest" });
  } catch (error) {
    console.log(error);
  }
};
const GetAllTask = (response, require) => {
  try {
    response.json({ massage: "hello" });
  } catch (error) {
    console.log(error);
  }
};
const AllTask = (response, require) => {
  try {
    response.json({ massage: "sam" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createTask,
  GetAllTask,
  AllTask,
};
