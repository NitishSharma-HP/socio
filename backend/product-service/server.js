import app from './index.js' //entry point for app

const port = process.env.PORT || 4002
app.listen(port, ()=> console.log(`Server is running on http://localhost:${port}`))