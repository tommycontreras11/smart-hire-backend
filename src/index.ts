import { connectDatabase } from "./database/connection"
import app from "./app"

async function main() {
    await connectDatabase()
    app.listen(process.env.APP_PORT || 3000)
    console.log(`Server running on port ${process.env.APP_PORT || 3000} 🚀`)
}

main()