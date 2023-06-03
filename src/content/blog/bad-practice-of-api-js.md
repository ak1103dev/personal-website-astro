---
title: Bad Practice ในการพัฒนา API ด้วยภาษา JavaScript
description: >-
  โดยปกติแล้ว Web Developer ส่วนใหญ่น่าจะคุ้นเคยกับภาษา JavaScript
  กันอยู่แล้วนะครับ
author: ak1103dev
pubDatetime: 2023-06-02T17:00:00.000Z
postSlug: Bad Practice ในการพัฒนา API ด้วยภาษา JavaScript
featured: true
draft: false
tags:
  - JavaScript
---

โดยปกติแล้ว Web Developer ส่วนใหญ่น่าจะคุ้นเคยกับภาษา JavaScript กันอยู่แล้วนะครับ แต่ผมไปเจอ project หนึ่งมา มันเป็น legacy code ที่ใครน่าจะร้องโอ้โห มาดูกันว่ามีอะไรบ้างที่ควรปรับปรุง

1.ใช้ var ในการประกาศตัวแปร

การใช้ var ในการประกาศตัวแปร มีข้อเสีย คือ มันสามารถถูกใช้งานได้ในระดับ global ก็คือ สามารถถูกแก้ค่า หรืออ่านค่าตรงไหนก็ได้ใน code โดยไม่มีลำดับก่อนหลัง หรือ scope

```javascript
if (isExsits) {
  var x = 'Already Exsists'
} else {
  var x = 'Not Exists'
}
```

วิธีที่ดีกว่า คือ ควรประกาศเป็น let แทน

```javascript
let x = 'Not Exists'
if (isExsists) {
  x = 'Already Exsists'
}
```

\
2.เขียน callback ซ้อนกันหลายชั้น หรือที่เรียกว่า callback hell\
\
callback มันมีข้อเสีย คือ มันต้องเขียน รับ result กับ error ใน function callback ทำให้ code อ่านยากและจัดการได้ยาก ดังตัวอย่าง

```javascript
const pool = new Pool()
pool.connect(function (client, error, release) {
  client.query('SELECT * FROM table_a WHERE name = $1', [name], function (error, result) {
    pool.connect(function (client, error, release) {
      client.query('SELECT * FROM table_b WHERE name = $1', [name], function (error2, result2) {
        pool.connect(function (client, error, release) {
          client.query('SELECT * FROM table_c WHERE name = $1', [name], function (error3, result3) {
            // ...
          })
        })
      })
    })
  })
})
```

วิธีที่ควรจะเป็น คือ ใช้ promise หรือ async/await แทนนะ

```javascript
const pool = new Pool()
const getSomeData = async () => {
  try {
    const client = await pool.connect()
    const resultA = await client.query('SELECT * FROM table_a WHERE name = $1', [name])
    const resultB = await client.query('SELECT * FROM table_b WHERE name = $1', [name])
    const resultC = await client.query('SELECT * FROM table_c WHERE name = $1', [name])
    client.release()
    return { resultA, resultB, resultC }
  } catch (error) {
    console.log(error)
  }
}
```

ถ้ามี function ที่มันเขียนแบบ async/await หรือ promise ไม่ได้ ปกติเราจะใช้ new Promise แบบนี้

```javascript
const getSomeData = async () => {
  try {
    const someResult = await new Promise((resolve, reject) => {
      client.query('SELECT * FROM table_a WHERE name = $1', [name], function (error, result) {
        if (error) {
          reject(error)
          return
        }
        resolve(result)
      })
    })
    return someResult
  } catch (error) {
    console.log(error)
  }
}
```

3.ใช้ == ในการเปรียบเทียบค่า

ในภาษาอื่นไม่ได้แปลกอะไร แต่ในภาษา JavaScript เนี่ย มันจะมี 2 แบบ คือ == กับ ===\
\== มันจะ true ก็ต่อเมื่อ ค่าของทั้งสองเท่ากันโดยไม่สน data type\
\=== มันจะ true ก็ต่อเมื่อ ค่าของทั้งสองเท่ากัน และ data type ต้องเหมือนกัน\
เขาจึงแนะนำให้ check ด้วย === มากกว่า เพื่อความปลอดภัยของข้อมูล\


```javascript
1 == '1' // true
1 === '1' // false
1 === 1 // true

undefined == null // true
undefined === null // false
undefined === undefined // true
null === null // true

```

4.ไม่ใช้ ORM ในการจัดการ database\
\
คือถ้าเป็นสมัยก่อนก็คงสร้าง database โดยการ click จาก dashboard แล้วก็เขียน sql ใน code ในการ query ต่างๆ แต่ปัจจุบันเรามี library ที่สร้าง schema, releation, แล้วก็ function พื้นฐานพวก insert, update, getData ในการจัดการข้อมูลใน database และก็มี function จัดการ migration database ให้ด้วย มันจะจัดการง่ายกว่า และผิดพลาดน้อยกว่า เวลาเขียนเป็น function ที่โยน json เข้าไป แทนที่จะเขียนเป็น sql string ที่พิมพ์ตกไปตัวหนึ่ง ก็ทำ code พังได้\
\
ตัวอย่าง ORM ที่ใช้กันในปัจจุบันดังๆ ก็ TypeORM, Sequelize, Prisma ดูต่อได้ใน [https://www.prisma.io/dataguide/database-tools/top-nodejs-orms-query-builders-and-database-libraries](https://www.prisma.io/dataguide/database-tools/top-nodejs-orms-query-builders-and-database-libraries)

5.เขียน hardcode พวกค่าต่างๆ ที่แต่ละ Environment ใช้ไม่เหมือนกัน

คือ ไม่ว่าจะ code ภาษาอะไรก็ตาม ถ้าเรามีการแยก Environment เช่น production, staging, development, local\
แล้วมีพวก key , url บางอย่างไม่เหมือนกัน ควรจะแยกไว้ file หนึ่ง เก็บค่าเหล่านี้ เพื่อ read ค่าตามแต่ละ env กำหนด

ก็จะมี library ช่วยจัดการอยู่ เช่น [dotenv](https://www.npmjs.com/package/dotenv "Dotenv"), [config](https://www.npmjs.com/package/config "config"), [env-cmd](https://www.npmjs.com/package/env-cmd "env-cmd")\
\
6.เขียน routes ทั้งหมดไว้ file เดียวกัน

คือ express มันสามารถทำ group routes ได้ เช่น

```javascript
// app.js
const express = require('express')
const routes = require('./routes')

const app = express()

app.use('/', routes)


// routes.js
const express = require('express')
const router = express.Router()
const userRoutes = require('./userRoutes')

router.use('/users', userRoutes)

module.exports = router

// userRoutes.js
const express = require('express')
const router = express.Router()

router.get('/', () => {
  // get user
})
router.post('/login', () => {
  // user login
})

module.exports = router
```

7.ถ้า update version library ได้ควร update\
คือ เวลามี node version ใหม่ออกมา มันจะเปลี่ยน architecture ข้างในค่อนข้างเยอะ (major change นะ) เช่นจาก node 12 เป็น node 14 ทีนี้มันมีบาง library มันพัง เราจึงต้อง update library ให้ version มัน compatible กับ node version ที่เราใช้ด้วย\
แล้วก็เพื่อ fix issue, fix bug, fix security ไปด้วยในตัว\
\
\
ก็ถ้าใครเห็น code ลักษณะทั้ง 7 ข้อก็อย่าเอาเป็นเยี่ยงอย่างนะครับ

code เราเขียนให้คนอ่านด้วยนะครับ ไม่ได้เขียนให้ computer อ่านอย่างเดียว

> ขอบคุณครับ ขอให้มีความสุขในการเขียนโค้ด
