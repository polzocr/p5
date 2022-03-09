let firstNameRegex = /^[a-zA-Zàáâäãåąčćęèéêëėįìíîïłńòóôöõùúûüųūÿýżźñç,.'-]+$/u;
let lastNameRegex = /^[a-zA-Zàáâäãåąčćęèéêëėįìíîïłńòóôöõùúûüųūÿýżźñç ,.'-]+$/u;
let addressRegex = /^[a-zA-Zàáâäãåąčćęèéêëėįìíîïłńòóôöõùúûüųūÿýżźñç ,.'-123456789]+$/u;
let cityRegex = /^[a-zA-Zàáâäãåąčćęèéêëėįìíîïłńòóôöõùúûüųūÿýżźñç ,.'-]+$/u;
let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



export {firstNameRegex, lastNameRegex, addressRegex, cityRegex, emailRegex};