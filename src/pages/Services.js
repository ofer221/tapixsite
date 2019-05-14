import React, { Component } from 'react'

import Section from '../components/Section'


class Services extends Component {

  render () {
    return (
      <Section sectionId={"services"}
               sectionTitle={"שירותים"}
               textOrder={"0"}
               images={this.props.images} >

        <p>אנו מתמחים בחריטה וכרסום תוך ליווי מקצועי של צוות מתכנתים כרסמים וחרטים בעלי נסיון רב במגוון תחומים, ביניהם - </p>
        <ul style={{direction:"rtl","listStyle":"none","textAlign":"right"}}>

          <li><i className="fas fa-check mb-1 ml-2"></i>ייצור חלקים מדויקים במגוון חומרים</li>
          <li><i className="fas fa-check mb-1 ml-2"></i>ייצור תתי מכלולים</li>
          <li><i className="fas fa-check mb-1 ml-2"></i>סדרות ייצור גדולות וקטנות</li>
          <li><i className="fas fa-check mb-1 ml-2"></i>בדיקה ובקרת איכות</li>
          <li><i className="fas fa-check mb-1 ml-2"></i>ליווי אישי ומקצועי</li>
          <li><i className="fas fa-check mb-1 ml-2"></i>מענה הנדסי לכל שלבי הפיתוח והייצור</li>
        </ul>
        <p>
          וכל זה על ידי שימוש בכלי עיבוד ותוכנה מתקדמים ביותר. קהל היעד שלנו הוא -
        </p>
        <ul style={{direction:"rtl","listStyle":"none","textAlign":"right"}}>
          <li><i className="fas fa-check mb-1 ml-2"></i>חברות טכנולוגיות</li>
          <li><i className="fas fa-check mb-1 ml-2"></i>גופים גדולים</li>
          <li><i className="fas fa-check mb-1 ml-2"></i>מגזר פרטי</li>
          <li><i className="fas fa-check mb-1 ml-2"></i>יחידים</li>
        </ul>
      </Section>
    )
  }
}

export default Services
