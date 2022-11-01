import axios from "axios";
export default async function handler(req, res) {
  const fetchData = await axios.get("https://j47p1le9j8.execute-api.ap-south-1.amazonaws.com/");
  res.status(200).json(fetchData.data);
}
