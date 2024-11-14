# CoordinateTracker App
แอพริเคชั่นมือถือที่ใช้ React-native ในการเขียน สามารถระบุละติจูด - ลองติจูดของพื้นที่นั้น อีกทั้งยังสามารถเก็บข้อมูลค่าเฉลี่ยของพิกัดในแต่ละช่วงเวลาและแสดงออกมาเป็น .CSV อีกทั้งยังสามารถใช้ในรูปแบบออนไลน์ได้อีกด้วย

## การใช้งาน
### 1. ระบุข้อมูลพิกัดของพื้นที่ที่อยู่
ภายในหน้าแรก จะมีการแสดงข้อมูล ดังนี้
1. Latitude ละติจูดของพื้นที่นั้น
2. Longtitude ลองติจูดของพื้นที่นั้น
3. Accuracy ความแม่นยำของพิกัดในหน่วยเมตร

### 2. ข้อมูลของพิกัดและการส่งออกไฟล์ CSV
ภายในหน้า Location Data จะมีการแสดงข้อมูล ดังนี้
1. ID หมายเลขของพิกัดนั้น
2. Latitude ละติจูดของพื้นที่นั้น
3. Longtitude ลองติจูดของพื้นที่นั้น
4. Accuracy ความแม่นยำของพิกัดในหน่วยเมตร
5. Time Interval ระยะเวลาที่จะอัพเดทพิกัดในหน่วยมิลลิวินาที เช่น ถ้า Time Interval = 5000 จะเก็บข้อมูลพิกัดทุกๆ 5000 มิลลิวินาที
6. Distance Interval ระยะทางที่จะอัพเดทพิกัดในหน่วยเมตร เช่น ถ้า Distance Interval = 1 จะเก็บข้อมูลพิกัดทุกๆ 1 เมตรที่เปลี่ยนไป
7. Time เวลาที่อัพเดทต่า
โดยจะมีปุ่ม Save as CSV ที่สามารถส่งออกไฟล์ CSV ได้ และปุ่ม Clear Data ที่จะล้างข้อมูลที่เก็บและเก็บใหม่ได้

### 3. ค่าเฉลี่ยในพื้นที่ต่อเวลาที่กำหนด
ภายในหน้า Collection สามารถระบุเวลาได้ จากนั้นแอพจะทำการรวบรวมพิกัดในเวลาที่กำหนด และนำมาคำนวณค่าเฉลี่น

### 3. การตั้งค่า
ในหน้าการตั้งค่า ผู้ใช้สามารถตั้งค่าได้ ดังนี้
1. Accuracy ความแม่นยำของพิกัด โดยจะสามารถแก้ไขได้ 5 ระดับ
* Highest (5) ความแม่นยำพิกัดระดับสูงสุด จะให้ค่าที่ไกล้เคียงที่สุด
* High (4) ความแม่นยำพิกัดระดับสูง จะให้ค่าคาดเคลื่อนประมาณ 10 เมตร
* Balance (3) ความแม่นยำพิกัดระดับปานกลาง จะให้ต่าคลาดเคลื่อนประมาณ 100 เมตร
* Low (2) ความแม่นยำพิกัดระดับต่ำ จะให้ค่าคาดเคลื่อนประมาณ 1 กิโลเมตร
* Lowest (1) ความแม่นยำพิกัดระดับต่ำสุด จะให้ค่าคาดเคลื่อนประมาณ 3 กิโลเมตร
2. Time Interval ระยะเวลาที่จะอัพเดทพิกัดในหน่วยมิลลิวินาที เช่น ถ้า Time Interval = 5000 จะเก็บข้อมูลพิกัดทุกๆ 5000 มิลลิวินาที
3. Distance Interval ระยะทางที่จะอัพเดทพิกัดในหน่วยเมตร เช่น ถ้า Distance Interval = 1 จะเก็บข้อมูลพิกัดทุกๆ 1 เมตรที่เปลี่ยนไป
