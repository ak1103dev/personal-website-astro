---
title: Bad Practice ในการพัฒนา API ด้วยภาษา JavaScript
description: >-
  โดยปกติแล้ว Web Developer ส่วนใหญ่น่าจะคุ้นเคยกับภาษา JavaScript
  กันอยู่แล้วนะครับ
author: ak1103dev
pubDatetime: 2023-06-02T17:00:00.000Z
postSlug: Bad Practice ในการพัฒนา API ด้วยภาษา JavaScript
featured: true
draft: true
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
