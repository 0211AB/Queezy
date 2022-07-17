import React from 'react'

const topics = [
    { id: 1, name: "Select category" },
    { id: 9, name: "General Knowledge" },
    { id: 10, name: "Entertainment: Books" },
    { id: 11, name: "Entertainment: Film" },
    { id: 12, name: "Entertainment: Music" },
    { id: 13, name: "Entertainment: Musicals & Theatres" },
    { id: 14, name: "Entertainment: Television" },
    { id: 15, name: "Entertainment: Video Games" },
    { id: 16, name: "Entertainment: Board Games" },
    { id: 17, name: "Science & Nature" },
    { id: 18, name: "Science: Computers" },
    { id: 19, name: "Science: Mathematics" },
    { id: 20, name: "Mythology" },
    { id: 21, name: "Sports" },
    { id: 22, name: "Geography" },
    { id: 23, name: "History" },
    { id: 24, name: "Politics" },
    { id: 25, name: "Art" },
    { id: 26, name: "Celebrities" },
    { id: 27, name: "Animals" },
    { id: 28, name: "Vehicles" },
    { id: 29, name: "Entertainment: Comics" },
    { id: 30, name: "Science: Gadgets" },
    { id: 31, name: "Entertainment: Japanese Anime & Manga" },
    { id: 32, name: "Entertainment: Cartoon & Animations" },
  ];

const TestAccordian = (props) => {
    //console.log(props)
  return (
    <div>
        <input type="radio" name="example_accordion" id="section1" className="accordion__input" />
        <label htmlFor="section1" className="accordion__label"> Quiz Expires On {props.data.expiry.split('T')[0]}</label>
        <div className="accordion__content">
          <p>Quiz ID : {props.data.uuid}</p>
          <p>Duration: {props.data.time} minutes.<br/>
            Number of Questions: {props.data.amount} <br/>
            Topic : {topics[props.data.topic]!==undefined?topics[props.data.topic].name:props.data.topic}<br/>
            </p>
        </div>
    </div>
  )
}

export default TestAccordian