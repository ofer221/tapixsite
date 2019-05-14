import React, { Component } from 'react'

import Image from 'react-bootstrap/Image'
import iso from '../images/iso.jpg'
import Section from '../components/Section'

class About extends Component {

  render () {
    return (
      <Section sectionId={"about"}
               sectionTitle={"קצת עלינו"}
               textOrder={"1"}
               images={this.props.images} >

        <p >
          תאפיקס - חברה לעיבוד שבבי מדוייק, ממוקמת באיזור התעשייה קרית ביאליק. לרשותנו מבנה המשתרע על
          כ-1,500 מ"ר ובו מכונות לחריטה וכרסום ב3, 4 ו5 צירים עם יכולת לעבד מגוון חומרי גלם במגוון גדלים. כמו כן, לרשותנו מחלקת בקרת איכות עם ציוד בדיקה מתקדם וצוות מקצועי המסוגל לתת מענה לכל דרישות הפיתוח והייצור.
        </p >
        <p>
          החברה מאושרת ע"י מכון התקנים ועובדת לפי תקן iso9001. כבר כ-10 שנים אנו מבצעים עבודות ופרויקטים לחברות המובילות בשוק וללקוחות פרטיים בתחומים שונים - תעופתי, בטחוני,רפואי ועוד..
        </p>
        <p style={{"fontWeight":"bold"}}>נשמח לעמוד בכל אתגר ובעיה אשר יוצבו בפנינו באופן המקצועי ביותר.</p>
        <Image src={iso} fluid className="d-inline-block align-top" />
      </Section>
    )
  }
}

export default About
