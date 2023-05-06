---
title: จะเริ่มต้นเขียนเว็บยังไงดีนะ ?
description: ในยุคนี้เป็นยุคดิจิทัล ยุคออนไลน์ หลายๆคน น่าจะเคยเข้าเว็บไซต์
author: ak1103dev
pubDatetime: 2023-04-30T17:00:00.000Z
postSlug: จะเริ่มต้นเขียนเว็บยังไงดีนะ
featured: true
draft: false
tags:
  - javascript
  - css
  - html
  - web-application
  - website
---

ในยุคนี้เป็นยุคดิจิทัล ยุคออนไลน์ หลายๆคน น่าจะเคยเข้าเว็บไซต์ เล่นเว็บแอพกันอยู่แล้ว แต่อาจจะไม่รู้ว่าเว็บ สร้างได้ยังไง

ตอนจะเขียนเว็บ นักพัฒนาต้องรู้จัก 3 ภาษานี้ก่อนเป็นพื้นฐาน ก็คือ HTML, CSS, JavaScript

1. HTML ย่อมาจาก HyperText Markup Language เป็นภาษาที่ใช้สร้างวัตถุต่างๆ ในหน้าเว็บ เช่น ปุ่ม ลิงก์
2. CSS ย่อมาจาก Cascading Style Sheets เป็นภาษาที่ใช้ในการตกแต่งเว็บ เช่น ใส่สี ใส่ขนาด
3. JS หรือ JavaScript เป็นภาษาที่ใช้เพิ่มฟังก์ชันการทำงาน เช่น ฟังก์ชันคลิกปุ่ม ให้เริ่มนับเวลา

มาดูตัวอย่างการเขียนเว็บแบบง่ายๆ

1. เริ่มจาก เขียน html ก่อนนะครับ

```html
<!DOCTYPE html>
<html>

<head>
  <title>Example Web</title>
</head>

<body>
  <h1>นาฬิกาจับเวลา</h1>
  <h2>00:00</h2>
  <button>เริ่มจับเวลา</button>
</body>

</html>
```

![](<https://assets.tina.io/2587cc3d-aa2c-4fa6-bb82-c5dd0474418a/Screenshot 2566-05-06 at 21.26.26.png>)

2\. เพิ่ม style ให้ ปุ่มสักหน่อย ให้ดูสวยขึ้น

```html
<!DOCTYPE html>
<html>

<head>
  <title>Example Web</title>
  <!-- เพิ่ม style tag -->
  <style>
    .btn-start {
      background-color: lime;
      border-radius: 5px;
      font-size: 16px;
    }
  </style>
</head>

<body>
  <h1>นาฬิกาจับเวลา</h1>
  <h2>00:00</h2>
  <button class="btn-start">เริ่มจับเวลา</button> <!-- เพิ่ม class btn-start -->
</body>

</html>
```

![](<https://assets.tina.io/2587cc3d-aa2c-4fa6-bb82-c5dd0474418a/Screenshot 2566-05-06 at 21.31.29.png>)

3\. จากนั้นก็เพิ่ม function onClick ไว้สั่งเริ่ม สั่งหยุด

```html
<!DOCTYPE html>
<html>

<head>
  <title>Example Web</title>
  <style>
    .btn-start {
      background-color: lime;
      border-radius: 5px;
      font-size: 16px;
    }
  </style>
</head>

<body>
  <h1>นาฬิกาจับเวลา</h1>
  <h2>00:00</h2>
  <!-- เพิ่ม onclick -->
  <button class="btn-start" onclick="onClick()">เริ่มจับเวลา</button> 

  <script>
    let time = 0
    let isStart = false
    let interval

    const onClick = () => {
      if (isStart) {
        stop()
      } else {
        start()
      }
    }

    const start = () => {
      isStart = true
      interval = setInterval(() => {
        time = time + 1
        const element = document.getElementById('time')
        const h = Math.floor(time / 60).toString().padStart(2, '0')
        const m = (time % 60).toString().padStart(2, '0')
        element.innerHTML = `${h}:${m}`
      }, 1000)
    }

    const stop = () => {
      clearInterval(interval)
      isStart = false
    }
  </script>
</body>

</html>
```

![](<https://assets.tina.io/2587cc3d-aa2c-4fa6-bb82-c5dd0474418a/Screenshot 2566-05-06 at 21.56.10.png>)

เอาคร่าวประมาณนี้ก่อนละกันครับ

สามารถดูเพิ่มเติมได้จาก [https://codepen.io/ak1103dev/pen/GRYQKxL](https://codepen.io/ak1103dev/pen/GRYQKxL)

อันนี้เป็นตัวอย่างแบบง่ายๆ นะครับ จริงๆ เว็บสามารถทำได้อีกหลายอย่างเลยครับ ตามที่เคยเห็นในเว็บต่างๆ ที่เราเคยเข้ากัน

ก็ลองสร้างเว็บที่เราอยากทำง่ายๆ ดูก่อน เช่น จับเวลา, คำนวนเกรดเฉลี่ย, เครื่องคิดเลข, ปฏิทิน แล้วแต่เครื่องมือที่เราต้องการอะนะ

ขอจบเท่านี้ก่อนละกันครับ

#### อ้างอิง

* [https://www.sanook.com/dictionary/dict/dict-computer/search/html/](https://www.sanook.com/dictionary/dict/dict-computer/search/html/)
* [https://www.w3schools.com/css/css\_intro.asp](https://www.w3schools.com/css/css_intro.asp)
