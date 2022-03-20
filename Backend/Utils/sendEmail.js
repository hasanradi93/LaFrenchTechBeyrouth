const nodemailer = require('nodemailer')
const nodemailerMailgun = require('nodemailer-mailgun-transport')
const cron = require('node-cron')
const moment = require('moment-timezone')
const { ObjectId } = require('mongodb')
require('../Models/connectToDB')
const Subscriber = require('../Models/subscriber')
const getSubscribers = require('../Controllers/subscriber')
const getEmailCompany = require('../Controllers/company')
const saveMailsSent = require('../Controllers/mails')
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
    console.log("imready eventId", eventId)
    const subscribers = await getSubscribers.getSubscribersForEvent(evenId)
    console.log("subscribers", subscribers)
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
    const datesToSend = [`${timeToSend} ${hourToSend} ${(days[0])} ${monthNamesArr[0]} ${daysNamesArr[0]}`, `${timeToSend} ${hourToSend}  ${(days[1])} ${monthNamesArr[1]} ${daysNamesArr[1]}`, `${timeToSend} ${hourToSend} ${(days[2])} ${monthNamesArr[2]} ${daysNamesArr[2]}`]
    logger.info("days", days)
    logger.info("dateOfDays", dateOfDays)
    logger.info("datesToSend", datesToSend)
    for (let i = 0; i < datesToSend.length; i++) {
        cron.schedule(datesToSend[i].toString(), async () => {
            logger.info(`-------- Preparation for sending a mail: ${datesToSend[i]} --------`)
            logger.info("event.id", event.id)
            // let subscribersMails = await getEmailsSubscribers(event.id)
            // logger.info("subscribersMails", subscribersMails)
            const subscribers = await Subscriber.find({ events: ObjectId(event.id) })
            console.log("subscribersGET", subscribers)

            let emails = ''
            let subscribersId = []
            subscribers.forEach(element => {
                emails ? emails = emails + "," + element.email
                    : emails = element.email
            })
            subscribers.forEach(element => {
                subscribersId.push(element.id)
            })
            logger.info("emails", emails)
            let subscribersMails = emails
            const emailCompany = await getEmailCompany.companyMail()
            const messageContent = `
                <div style='text-align:center;'><img src='cid:logo' alt='La French Tech Beyrouth logo' style='width:128px;height:128px;'/></div>
                <div style='text-align:center;background-color:#425f6c;color:white;height:110px;padding-top:10px;'><h1 style='font-size:44px;'>La French Tech Beyrouth</h1></div> 
                <h3 style='color:#ad1a29;'>Subscription done successfully</h3>
                <h4><u><b style='color:#ad1a29;'>Event:</b></u> ${event.title}</h4>
                <p><b style='color:#ad1a29;'>Content:</b> ${event.description}</p>
                <p><b style='color:#ad1a29;'>Dates:</b> Beirut ${beirutStartDate} | UAE ${dubaiDateDate}</p>`
            let mailOptions = {
                from: emailCompany,
                to: `${subscribersMails}`,
                subject: `Reminder: for the event ${event.title}`,
                text: `${messageContent}`,
                html: `${messageContent}`,
                attachments: [{
                    filename: 'logo-Big.png',
                    path: __dirname + '/logo-Big.png',
                    cid: 'logo'
                }]
            }
            transporterByMyMail.sendMail(mailOptions, function (error, info) {
                if (error)
                    logger.error("ERROR sending mail", error)
                else {
                    logger.info("Succesfully sending mail to subscribers", info)
                    saveMailsSent.mailsForEvent(event.id, subscribersId)
                }

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
    transporter.sendMail(mailOptions, function (error, info) {
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
    const messageContent = `
            <div style='text-align:center;'><img src='cid:logo' alt='La French Tech Beyrouth logo' style='width:128px;height:128px;'/></div>
            <div style='text-align:center;background-color:#425f6c;color:white;height:110px;padding-top:10px;'><h1 style='font-size:44px;'>La French Tech Beyrouth</h1></div> 
            <h3 style='color:#ad1a29;'>Subscription done successfully</h3>
            <h4><u><b style='color:#ad1a29;'>Event:</b></u> ${event.title}</h4>
            <p><b style='color:#ad1a29;'>Content:</b> ${event.description}</p>
            <p><b style='color:#ad1a29;'>Dates:</b> Beirut ${beirutStartDate} | UAE ${dubaiDateDate}</p>`
    const mailOptions = {
        from: emailCompany,
        to: mailSubscriber,
        subject: `Welcome to La French Tech Beyrouth`,
        text: messageContent,
        html: messageContent,
        attachments: [{
            filename: 'logo-Big.png',
            path: __dirname + '/logo-Big.png',
            cid: 'logo'
        }]
    }
    transporterByMyMail.sendMail(mailOptions, function (error, info) {
        if (error)
            logger.error("ERROR sending mail", error)
        else
            logger.info("Succesfully sending mail to subscriber", info)
    })
}
module.exports = { sendAMailEvent, sendAMailContact, sendSubscriptionDone }