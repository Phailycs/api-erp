import { connectToDatabase } from "../controller/dbConnection";

export default async function handler(
  req: any,
  res: any
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const id = req.query.productsId;

        const { db } = await connectToDatabase();

        let result = await db.collection("product").findOne({ id: id })
        
        if (!result) {
          return res.status(404).json({ error: "Product not found" });
        }

        return res.status(200).json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
