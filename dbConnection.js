// desestrutaração - pegar da biblioteca inteira apenas um único método que vamos trabalhar

const { Pool } = require('pg')

const Client = new Pool({
    connectionString:process.env.DATABASE_URL ||'postgres://ghixxepahouvqd:88243f906e3e329af83f5ebe9b0ce1cf5b17863fce1d0e7a8ee0846979d9c029@ec2-184-73-25-2.compute-1.amazonaws.com:5432/daa1hv989hql1f',
    ssl: {
        rejectUnauthorized: false
    }
})

/*
postgres://ghixxepahouvqd:88243f906e3e329af83f5ebe9b0ce1cf5b17863fce1d0e7a8ee0846979d9c029@ec2-184-73-25-2.compute-1.amazonaws.com:5432/daa1hv989hql1f
*/


// teste de conexão

// async function connectTeste(){
//     const res = await Client.query('SELECT $1::text as message',['Olá mundo'],(err,result)=>{
//         console.log(result.rows[0].message)
//     })
// }
// async function connectTeste(){
//     const res= await Client.query('SELECT $1:: text as message',['Olá mundo'],(err,result) =>{
//         console.log(result.rows[0].message)
//     })
// }
// connectTeste()
// connectTeste()

module.exports= Client