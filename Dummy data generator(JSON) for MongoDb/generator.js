import mongoose from 'mongoose';
import express from 'express';
import path from 'path';
import { Employee } from './models/Employee.js';

const app = express();
const port = 3000;

let names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Hank', 'Ivy', 'Jack'];
let lang = ['python', 'java', 'javascript', 'c++', 'swift', 'rust', 'go', 'dart', 'pascal', 'assembly'];
let cities = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'];
let sec = [true, false];

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/Company')

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'public', 'index.html'));
});

app.get('/generate', async (req, res) => {
  try {
    await Employee.deleteMany();
    for (let i = 0; i < 10; i++) {
      const employee = new Employee({
        name: names[Math.floor(Math.random() * names.length)],
        salary: Math.random() * 10000 + Math.random() * 1000,
        language: lang[Math.floor(Math.random() * lang.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
        isManager: sec[Math.floor(Math.random() * sec.length)]
      });
      await employee.save();
    }

    const employees = await Employee.find();
    res.json({ employees });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
