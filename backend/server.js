const express = require('express')
const db = require('./config/db')
const app = express()
const port = process.env.PORT || 3000;


db.connection
    .once('open', () => console.log("connected to db"))
    .on("error", (err) => console.log("error connecting db -->", err))


app.listen(port, function () {
    console.log('App listening to Port ' + port)
})


app.use(express.json());

app.use(express.urlencoded({ extended: true }))

app.use('/', require('./routes/root'))



// fetch('users/register', {
//   method: 'POST',
//   headers: {
//       'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//       name: 'Iphone',
//       email: 'iphone@gmail.com',
//       password: 'ghujiuhju'
//   })
// })
// .then(res => res.json())
// .then(res => console.log(res))

// fetch('users/logout/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNmYTc2NjcyYjdlOGFiYTllMzMzMGYiLCJpYXQiOjE2ODE4OTM0MDN9.h_hEN26jvaqcaKfE_9uhZ1S3YJgkEDbwY_T2RoEmDx4', {
//     method: 'DELETE',
//     headers: {
//         'Content-Type': 'application/json'
//     },
   
//   })
//   .then(res => res.json())
//   .then(res => console.log(res))