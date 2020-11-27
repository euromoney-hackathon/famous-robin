import React from "react";
import ChatBot from "react-simple-chatbot";

export default class MarketoChatbot extends React.Component {

    
    userNameCookie = "user_name";

    setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    setGreetingFor(steps) {

        const name = this.getCookie(this.userNameCookie);
        
        if(name === null || name.length === 0)
        {
            steps.push({
                id : "Greet",
                message: "Hello, Welcome to our marketing site",
                trigger: "Ask name"
            });
            steps.push({
                id:"Ask name",
                message: "What is your name",
                trigger: "Waiting-for-user-input"
            });
            steps.push( {
                id:"Waiting-for-user-input",
                user:true,
                validator: (value) => {
                    if(value === null || value === undefined || value.length === 0)
                    {
                        return false;
                    }
                    this.setCookie(this.userNameCookie, value, 30);
                    return true;
                  },
                trigger: "interests"
            });
            return;
        }

        steps.push({
            id:"Welcome-back",
            message: `Welcome back ${name}`,
            trigger: "Done" 
        });
    }


    render() {

        const config = {
            width: "300px",
            height: "400px",
            floating: true
        };

        const steps = [];
        this.setGreetingFor(steps)  

        steps.push( {
            id:"interests",
            message: "What news content interests you {previousValue}",                
            trigger: "Done"
        });
        steps.push({
            id:"Done",
            message: "Have a great day",
            end:true
        });
        return <ChatBot speechSynthesis={{ enable: false, lang: 'en' }} steps={steps} {...config}/>
    }
}