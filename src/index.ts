import app from '../app'
import userRoutes from './routes/index'

app.get('/', (req, res) => {
    res.send({
        message : "index.ts"
    })
})

app.use('/api', userRoutes)