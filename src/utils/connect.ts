import mongoose from 'mongoose'
import config from 'config'


async function connect() {
    try {
        const dbUri = config.get<string>('dbUri')
        await mongoose.connect(dbUri)
        console.log('Connected to db successfully')
    } catch (error) {
        console.log('Could not connect to db')
        process.exit(1)
    }
}


export default connect