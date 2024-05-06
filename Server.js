const express = require('express');
const cors = require("cors")

const PORT = 2024;
const app = express() 
app.use(cors())
app.use(express.json()) 

let animals = [ ];

app.get('/animals', (req, res) => 
    {
    res.json(animals);
});

app.post('/animals', (req, res) =>
     {
    const newAnimal = req.body;
    animals.push(newAnimal);
    res.status(201).json(newAnimal);
});

app.put('/animals/:id', (req, res) => 
    {
    const id = parseInt(req.params.id);
    const updatedAnimal = req.body;
    
    animals = animals.map(animal => {
        if (animal.id === id) {
            return { ...animal, ...updatedAnimal };
        }
        return animal;
    });
    
    res.json(animals.find(animal => animal.id === id));
});

app.delete('/animals/:id', (req, res) => 
    {
    const id = parseInt(req.params.id);
    animals = animals.filter(animal => animal.id !== id);
    res.status(204).end();
});

app.listen(PORT, () => 
    {
    console.log(`Server is running at ${PORT}`);
});
