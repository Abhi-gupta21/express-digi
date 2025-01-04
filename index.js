import express from 'express';

const app = express()
const port = 3000

app.use(express.json())

let teaData = []
let nextId = 1

app.get('/', (req, res) => {
    res.status(200)
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/teas', (req, res) => { // add new tea
    const {name, price} = req.body // destructuring on the go! classic js 101
    const newTea = {
        id: nextId++,
        name,
        price
    }
    teaData.push(newTea)
    res.status(201)
    res.send(newTea)
})

app.get('/teas', (req, res) => { // get all teas
    res.status(200);
    res.send(teaData)
})

app.get('/teas/:id', (req,res) => { // get a specific tea
    const tea = teaData.find(tea => tea.id === parseInt(req.params.id))
    if (!tea) {
        res.status(404).send("tea not found");
    }else{
        res.status(200).send(tea)
    }
})

//update tea
app.put('/teas/:id', (req,res) => {
    const id = req.params.id
    const tea = teaData.find(tea => tea.id === parseInt(id))
    if (!tea) {
        res.status(404).send("tea not found");
    }else{
        const {name, price} = req.body
        tea.name = name
        tea.price = price
        res.status(200).send(tea)
    }
})

//delete tea
app.delete('/teas/:id', (req,res) => {
    const index = teaData.findIndex(tea => tea.id === parseInt(req.params.id))
    if (index === -1) {
        res.status(404).send("tea not found");
    }else{
        teaData.splice(index, 1)
        res.status(200).send('deleted')
    }
})

app.listen(port, () => {
    console.log(`server is running at port: ${port}...`)
})