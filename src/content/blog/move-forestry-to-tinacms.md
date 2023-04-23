---
title: ย้ายจาก Forestry.io มาที่ tina CMS
description: พอดีวันศุกร์ ผมได้รับ email ว่า Forestry.io ได้ปิดระบบ
author: ak1103dev
pubDatetime: 2023-04-22T17:00:00.000Z
postSlug: move-forestry-to-tinacms
featured: true
tags:
  - headless-cms
  - tinacms
  - forestry
ogImage: 'https://assets.tina.io/2587cc3d-aa2c-4fa6-bb82-c5dd0474418a/tina-cms.png'
---

พอดีวันศุกร์ ผมได้รับ email ว่า Forestry.io ได้ปิดระบบ ตัวเองแล้ว ให้ย้ายมาใช้ที่ tina CMS นะครับ ok ผมว่างวันนี้พอดีเลยทำการย้ายซะเลย\
\
ผมก็เข้าไปดู document ในส่วนของการ migrate ตาม link นี้ [https://tina.io/docs/forestry/migrate/](https://tina.io/docs/forestry/migrate/)

1. clone project เดิมมาก่อน
2. จากนั้น ก็ เปิด terminal เข้าไปที่ project นั้น
3. run npx @tinacms/cli@latest init แล้วทำตาม video ได้เลยครับ (มันมีดึง config ของ forestry มาให้ด้วย)
4. เปิด package.json มา แก้ scripts\
   \- "dev": "tinacms dev -c \\"astro dev\\""\
   \- "start": "tinacms dev -c \\"astro dev\\""\
   \- "build": "tinacms build && astro build"
5. test สักหน่อย โดยการ run `yarn dev` แล้วดูที่ [http://localhost:3000/admin/index.html](http://localhost:3000/admin/index.html) ก็จะมี หน้าจัดการ
6. git commit, git push ได้เลย เพื่อให้มัน deploy เหมือนเดิม

ok ครับ ประมาณนี้ เผื่อใครอยากทำ blog ก็มาใช้ tina cms ได้ อันนี้ผมก็ใช้ plan free นะ แล้วก็มีแบบพวก template และ cloud ให้ด้วย ถ้าใครยังไม่ได้มี blog อยู่แล้ว แต่ถ้ามีอยู่แล้วก็ลองมาใช้ได้เลย ถ้าทำเป็นพวกแนวๆ markdown อยู่แล้วนะครับ

ขอให้สนุกในการเขียน blog ขอบคุณครับ
