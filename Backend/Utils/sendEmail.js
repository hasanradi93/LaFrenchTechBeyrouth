const nodemailer = require('nodemailer')
const nodemailerMailgun = require('nodemailer-mailgun-transport')
const cron = require('node-cron')
const moment = require('moment-timezone')
const getSubscribers = require('../Controllers/subscriber')
const getEmailCompany = require('../Controllers/company')
const logger = require('./logger')
const transporterByMyMail = nodemailer.createTransport({
    service: 'Gmail', // sets automatically host, port and connection security settings
    auth: {
        user: 'hassan93radi@gmail.com',
        pass: 'hassouna93gm'
    }
})
const auth = {
    auth: {
        api_key: 'key-4a01c4bb659819813e3133c7184fdba0',
        domain: 'sandbox12b73f1819b2450ca9c5950bdb5e6e0a.mailgun.org'
    }
}
const transporter = nodemailer.createTransport(nodemailerMailgun(auth))
const daysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthsNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]
const getEmailsSubscribers = async (eventId) => {
    const subscribers = await getSubscribers.getSubscribersForEvent(eventId)
    let emails = ''
    subscribers.forEach(element => {
        emails ? emails = emails + "," + element.email
            : emails = element.email
    })
    logger.info("emails", emails)
    return emails
}
const sendAMailEvent = async (event) => {
    const beirutStartDate = moment.tz(event.startDate, 'Asia/Beirut').toString()
    const dubaiDateDate = moment.tz(event.startDate, 'Asia/Dubai').toString()
    let hourToSend = beirutStartDate.split(' ')[4].split(':')[0]
    let timeToSend = beirutStartDate.split(' ')[4].split(':')[1]
    const convertedB = new Date(beirutStartDate)
    const days = [convertedB.getUTCDate() - 3, convertedB.getUTCDate() - 2, convertedB.getUTCDate() - 1]
    const dateOfDays = [
        new Date(new Date(event.startDate).getTime() - 3 * 60 * 60 * 24 * 1000),
        new Date(new Date(event.startDate).getTime() - 2 * 60 * 60 * 24 * 1000),
        new Date(new Date(event.startDate).getTime() - 60 * 60 * 24 * 1000)
    ]
    const daysNamesArr = [daysNames[dateOfDays[0].getUTCDay()], daysNames[dateOfDays[1].getUTCDay()], daysNames[dateOfDays[2].getUTCDay()]]
    const monthNamesArr = [monthsNames[dateOfDays[0].getUTCMonth()], monthsNames[dateOfDays[1].getUTCMonth()], monthsNames[dateOfDays[2].getUTCMonth()]]
    const datesToSend = [`${timeToSend} ${hourToSend} ${(days[0])} ${monthNamesArr[0]} ${daysNamesArr[0]}`, `00 16 ${(days[1])} ${monthNamesArr[1]} ${daysNamesArr[1]}`, `00 16 ${(days[2])} ${monthNamesArr[2]} ${daysNamesArr[2]}`]
    logger.info("datesToSend", datesToSend)
    for (let i = 0; i < datesToSend.length; i++) {
        cron.schedule(datesToSend[i].toString(), async () => {
            logger.info(`-------- Preparation for sending a mail: ${datesToSend[i]} --------`)
            logger.info("event.id", event.id)
            let subscribersMails = await getEmailsSubscribers(event.id)
            logger.info("subscribersMails", subscribersMails)
            const emailCompany = await getEmailCompany.companyMail()
            let mailOptions = {
                from: emailCompany,
                to: subscribersMails,
                subject: `Reminder: for the event ${event.title}`,
                text: `${event.description}`,
                html: `${event.description}`
            }
            transporter.sendMail(mailOptions, function (error, info) {
                if (error)
                    logger.error("ERROR sending mail", error)
                else
                    logger.info("Succesfully sending mail to subscribers", info)
            })
        })
    }
}
const sendAMailContact = async (data) => {
    const { fName, lName, companyName, email, subject, message } = data
    const emailCompany = await getEmailCompany.companyMail()
    const messageContent = `<p><b>Sender Name :</b> ${fName} ${lName}</p><p><b>Comapne Name :</b> ${companyName}</p><p><b>Message:</b> ${message}</p>`
    const mailOptions = {
        from: email,
        to: emailCompany,
        subject: `${subject}`,
        text: messageContent,
        html: messageContent
    }
    transporterByMyMail.sendMail(mailOptions, function (error, info) {
        if (error)
            logger.error("ERROR sending mail", error)
        else
            logger.info("Succesfully sending mail to company mail", info)
    })
}
const sendSubscriptionDone = async (event, mailSubscriber) => {
    const emailCompany = await getEmailCompany.companyMail()
    const beirutStartDate = moment.tz(event.startDate, 'Asia/Beirut').toString()
    const dubaiDateDate = moment.tz(event.startDate, 'Asia/Dubai').toString()
    const messageContent = `<h2 align='center'>La French Tech Beyrouth</h2>
    <h3>Subscription done successfully</h3>
    <h4><u><b>Event:</b></u> ${event.title}</h4>
    <p><b>Content:</b> ${event.description}</p>
    <p><b>Dates:</b> Beirut ${beirutStartDate} | UAE ${dubaiDateDate}</p>`
    const mailOptions = {
        from: emailCompany,
        to: mailSubscriber,
        subject: `Welcome to LA French Tech Beyrouth`,
        text: messageContent,
        html: messageContent
    }
    transporterByMyMail.sendMail(mailOptions, function (error, info) {
        if (error)
            logger.error("ERROR sending mail", error)
        else
            logger.info("Succesfully sending mail to subscriber", info)
    })
}
module.exports = { sendAMailEvent, sendAMailContact, sendSubscriptionDone }