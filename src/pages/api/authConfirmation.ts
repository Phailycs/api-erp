import authVerification from "./controller/apiAuthVerification";
import apiConfig from "./controller/rateLimit";
import { connectToDatabase } from "./controller/dbConnection";

export default async function handler(req: any, res: any) {
  
    apiConfig.limiter;

  const { method } = req;
  const authToken = (req.headers.authorization || "").split("Bearer ").at(1);

  switch (method) {
    case "POST":
      try {
        
        var request = req.body

        const verifyResult = JSON.parse(request);
        const emailUser = verifyResult.email;

        let authResult = await authVerification(authToken, emailUser);
        if (authResult == "true") {
          res.status(200).json({ message: "Success" });
        } else if (authResult == "false"){
          res.status(500).json({ error: "Invalid token" });
        } else {
          res.status(201).json({ message: authResult });
        }
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
