const express = require('express');
const bcrypt = require('bcryptjs')
const redis = require("redis")

const app = express()
const saltRounds = 10

//redisと接続するための設定
const config ={
    socket:{
        "host":process.env.REDIS_HOST,
        "port":process.env.REDIS_PORT
    }
}
const client = redis.createClient(config)

//expressでjsonのやり取りを行うため
app.use(express.json());

app.post('/link/api/add', async function (request, response) {
    //Request
    //  string id
    //  string pass
    //  string token

    const id = request.body.id
    const password = request.body.password
    const token = request.body.token
    
    if ( typeof id != "string" || typeof password != "string" || typeof token != "string" ){
        response.status(400).json({"status":"BadRequest"})
        console.log("GG")
        return
    }
    //DBと接続
    await client.connect()
    
    const keyExist = await client.exists(id)
    //既にテーブルに存在する場合
    if (keyExist == 1){
        const result = await client.hGetAll(id)
        //Password照合
        const passwordCheck = await bcrypt.compare(password,result.hashPassword)
        //Passwordが不一致の場合
        if (passwordCheck == false){
            response.status(403).json({"status":"AuthError"})
        }

    }
    //Passwordをハッシュ及びナンス処理
    hashPassword = await bcrypt.hash(password,saltRounds)
    
    //hash形式で保存
    await client.hSet(id,"hashPassword",hashPassword)
    await client.hSet(id,"token",token)
    await client.quit()

    response.status(200).send(null)
})


app.post("/link/api/get",async function(request,response) {
    //Request
    //  string id
    //  string pass
    //Response
    //  strin token

    const id = request.body.id
    const password = request.body.password
    
    if ( typeof id != "string" || typeof password != "string"){
        response.status(400).json({"status":"BadRequest"})
        return
    }

    //DBと接続
    await client.connect()
    const keyExist = await client.exists(id)
    //テーブルに存在しない場合
    if (keyExist == 0){
        await client.quit()
        response.status(400).json({"status":"BadRequest"})
        return
    }

    //idと紐づけされた全データを取得
    const result = await client.hGetAll(id)
    await client.quit()

    //Password照合
    const passwordCheck = await bcrypt.compare(password,result.hashPassword)
    if (passwordCheck == false){
        response.status(403).json({"status":"AuthError"})
        return
    }
    console.log(result.token)
    response.status(200).send(result.token)
})


app.post("/link/api/remove",async function(request,response) {
    //Request
    //  string id
    //  string password

    const id = request.body.id
    const password = request.body.password
    
    if ( typeof id != "string" || typeof password != "string"){
        response.status(400).json({"status":"BadRequest"})
        return
    }

    //DBと接続
    await client.connect()
    
    const keyExist = await client.exists(id)
    //テーブルに存在しない場合
    if (keyExist == 0){
        response.status(400).json({"status":"BadRequest"})
        await client.quit()
        return
    }

    //idと紐づけされた全データを取得
    const result = await client.hGetAll(id)

    //Password照合
    const passwordCheck = await bcrypt.compare(password,result.hashPassword)
    if (passwordCheck == true){
        //テーブルから削除
        await client.del(id)
        response.status(200).send(null)
        await client.quit()
        return
    }
    await client.quit()
    response.status(403).send({"status":"AuthError"})
})

app.listen(process.env.SERVER_PORT,"0.0.0.0", () => console.log('GitPATLink Server Online'))