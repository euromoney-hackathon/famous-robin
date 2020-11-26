import React from "react";
import ChatBot from "react-simple-chatbot";

export default class MarketoChatbot extends React.Component {
    render() {

        const config = {
            width: "300px",
            height: "400px",
            floating: true
        };

        const steps = [
            {
                id : "Greet",
                message: "Hello, Welcome to our marketing site",
                trigger: "Ask name"
            },
            {
                id:"Ask name",
                message: "What is your name",
                trigger: "Waiting-for-user-input"
            },
            {
                id:"Waiting-for-user-input",
                user:true,
                trigger: "interests"
            },
            {
                id:"interests",
                message: "What news content interests you {previousValue}",
                trigger: "Done"
            },
            {
                id:"Done",
                message: "Have a great day",
                end:true
            }
        ];
        return <ChatBot steps={steps} {...config}/>
    }
}